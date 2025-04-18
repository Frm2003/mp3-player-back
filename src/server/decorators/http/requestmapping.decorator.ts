import { Readable } from 'stream';
import { FastifyRequest, FastifyReply } from 'fastify';

interface iProps {
    method: HttpMethods,
    path?: string,
    contentType?: ContentType,
}

export function RequestMapping({ method, path = '', contentType = 'application/json' }: iProps) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: FastifyRequest, res: FastifyReply) {
            try {
                const bodyParamIndices: number[] = Reflect.getOwnMetadata('body_params', target, propertyKey) || [];
                const args: any[] = [];

                bodyParamIndices.forEach(index => {
                    args[index] = req.body;
                });

                const result = await originalMethod.apply(this, [...args, req, res]);

                if (!result) {
                    console.warn('Nenhum resultado retornado.');
                    return res.status(204).send();
                }

                if (result instanceof Readable) {
                    console.log('Respondendo com stream');

                    res.raw.writeHead(200, {
                        'Content-Type': contentType,
                        'Content-Disposition': `inline; filename="output.${getFileExtension(contentType)}"`,
                    });

                    result.on('error', (err) => {
                        console.error('Erro na stream:', err);
                        res.raw.destroy(err);
                    });

                    result.pipe(res.raw);
                    return;
                }

                if (Buffer.isBuffer(result)) {
                    console.log('Respondendo com buffer');
                    return res
                        .header('Content-Type', contentType)
                        .header('Content-Disposition', `inline; filename="output.${getFileExtension(contentType)}"`)
                        .send(result);
                }

                if (result instanceof Object) {
                    console.log('Respondendo com JSON');
                    return res.status(200).send(result);
                }

                res.status(200).send(result);

            } catch (error) {
                console.error('Erro interno:', error);
                res.status(500).send({ error: 'Internal Server Error' });
            }
        };

        if (!target.routes) target.routes = [];

        const route: RouteDefinition = {
            method,
            route: path,
            handler: descriptor.value,
        }

        target.routes.push(route);
    };
}

function getFileExtension(contentType: string): string {
    const map: Record<string, string> = {
        'audio/mpeg': 'mp3',
        'audio/mp4': 'm4a',
        'audio/webm': 'webm',
        'video/webm': 'webm',
        'application/json': 'json',
    };
    return map[contentType] || 'bin';
}

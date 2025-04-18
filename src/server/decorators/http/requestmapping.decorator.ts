import { Readable } from 'stream';
import { FastifyRequest, FastifyReply } from 'fastify';

interface iProps {
    method: string,
    path?: string,
    contentType: string,
}

export function RequestMapping({ method, path, contentType = 'application/json' }: iProps) {
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
                    return res.status(204).send(); // No Content
                }

                if (result instanceof Readable) {
                    console.log('Respondendo com stream');

                    // Adiciona headers antes de enviar qualquer dado
                    res.raw.writeHead(200, {
                        'Content-Type': contentType,
                        'Content-Disposition': `inline; filename="output.${getFileExtension(contentType)}"`,
                    });

                    result.on('error', (err) => {
                        console.error('Erro na stream:', err);
                        res.raw.destroy(err); // Garante que o erro não fique invisível
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

                console.log('Respondendo com JSON');
                return res.status(200).send(result);

            } catch (error) {
                console.error('Erro interno:', error);
                res.status(500).send({ error: 'Internal Server Error' });
            }
        };

        if (!target.routes) target.routes = [];

        target.routes.push({
            method,
            route: path || '',
            handler: descriptor.value,
        });
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

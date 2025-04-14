import { FastifyInstance, RouteHandlerMethod } from 'fastify';

import fs from 'fs';
import path from 'path';

interface iRoute {
    method: 'get' | 'post' | 'put' | 'delete';
    route: string | undefined;
    handler: RouteHandlerMethod;
}

export const registerRoutes = (fastify: FastifyInstance): void => {
    const controllersPath: string = path.join(process.cwd(), 'src', 'api/controller');

    const files: string[] = fs.readdirSync(controllersPath);

    files
        .filter((file: string) =>
            file.endsWith('.controller.ts') || file.endsWith('.controller.js')
        )
        .forEach((file: string) => {
            const controllerModule = require(path.join(controllersPath, file));
            const object = Object.values(controllerModule);

            object.forEach((controllerClass: any) => {
                const { path, routes }: { path: string, routes: iRoute[] } = controllerClass.prototype;

                routes.forEach((method) => {
                    fastify.route({
                        method: method.method,
                        url: path + method.route,
                        handler: method.handler,
                    });
                });
            });
        });
};
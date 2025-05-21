import { FastifyInstance } from 'fastify';

import path from 'path';
import { filterAndInstantiateControllers, readFiles } from '../utils';

export interface ControllerClass {
    new(...args: any[]): any;
    prototype: {
        type: string;
        name: string;
        dependencies: string[];
    };
    routes: RouteDefinition[];
    path: string;
}

export let controllerMap = new Map<string, ControllerClass>();

const raiz: string = path.resolve('./', 'src');

export const registerControllers = async (fastify: FastifyInstance, serviceMap: Map<string, any>): Promise<void> => {
    const files: string[] = await readFiles(raiz);
    controllerMap = filterAndInstantiateControllers<ControllerClass>(files, 'controller', serviceMap);

    for (const controller of controllerMap.values()) {
        const { path: basePath, routes } = controller;

        if (!basePath || !routes) continue;

        routes.forEach((route: any) => {
            fastify.route({
                method: route.method,
                url: basePath + route.route,
                handler: route.handler.bind(controller),
            });
        });
    }
};

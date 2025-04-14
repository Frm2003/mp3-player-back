type HttpMethod = 'get' | 'post' | 'put' | 'delete'

interface RouteDefinition {
    method: HttpMethod;
    route: string | undefined;
    handler: Function;
}

export function RequestMapping({
    method,
    path,
}: {
    method: HttpMethod;
    path?: string;
}) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.routes) target.routes = [];
        if (!target.variavbles) target.variavbles = {};

        const routeDef: RouteDefinition = {
            method,
            route: path || '',
            handler: descriptor.value,
        };

        target.routes.push(routeDef);
    };
}
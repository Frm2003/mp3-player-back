export function Body() {
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
        const existingBodyParams: number[] = Reflect.getOwnMetadata('body_params', target, propertyKey) || [];
        existingBodyParams.push(parameterIndex);
        Reflect.defineMetadata('body_params', existingBodyParams, target, propertyKey);
    };

}
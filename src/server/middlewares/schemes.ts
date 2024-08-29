interface SchemaObject {
    $id: string;
    type: string;
    properties: {[key: string]: any};
    required: string[];
}

export interface Schemas {
    [key: string]: SchemaObject;
}

export const schemas: Schemas = {
    userSchema: {
        $id: 'userSchema',
        type: 'object',
        properties: {
            nome: {type: 'string'},
            senha: {type: 'string'},
        },
        required: ['nome', 'senha'],
    },
};
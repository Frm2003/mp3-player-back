import {JSONSchema7} from 'json-schema';

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
    // MODEL USER
    userSchema: {
        $id: 'userSchema',
        type: 'object',
        properties: {
            id: {type: 'integer'},
            nome: {type: 'string'},
            senha: {type: 'string'},
            criadoEm: {type: 'string', format: 'date-time'},
        },
        required: ['nome', 'senha'],
    },
    queryUser: {
        $id: 'queryUser',
        type: 'object',
        properties: {
            id: {type: 'integer', minimum: 1},
        },
        required: ['id'],
    },
};

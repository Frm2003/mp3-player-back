import { FastifyReply, FastifyRequest } from 'fastify';

export const validationBody = { schema: { body: { $ref: 'userSchema#' } } };
export const validationQuery = { schema: { querystring: { $ref: 'queryUser#' } } };

const path = require('path')

interface User {
	id: number;
	nome: String;
	senha: String;
	criadoEm: Date;
}

interface tipoQuery {
	id: number;
}

export const insert = async (
	req: FastifyRequest<{ Body: User }>,
	res: FastifyReply
): Promise<FastifyReply<any>> => {
	return res.status(200).send(req.body);
};

export const selectById = async (req: FastifyRequest<{ Querystring: tipoQuery }>,
	res: FastifyReply
): Promise<FastifyReply<any>> => {
	return res.status(200).send(req.query);
};

export class User {
	id: number;
	nome: String;
	senha: String;
	criadoEm: Date;

	constructor(id: number, nome: String, senha: String, criadoEm: Date) {
		this.id = id;
		this.nome = nome;
		this.senha = senha;
		this.criadoEm = criadoEm;
	}
}

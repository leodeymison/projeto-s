import { PrismaClient } from '@prisma/client';

export const connection = new PrismaClient();

export async function POST(req: Request) {
	const b = await req.json();

	let cpf = b["cpf"];
	const user = "d24c8207759c17e03d384e7f4dbce11c";

	if(cpf){
		cpf = cpf.replace(/\D/g, '');
	} else {
		return Response.json({
			message: "CPF é obrigatório"
		});
	}

	const exist = await connection.peoples.findUnique({
		where: {
			cns: cpf
		}
	})

	if(exist){
		// ? USA REGISTRO EXISTENTE
		return Response.json({
			nome: exist.nome,
			nascimento: exist.nascimento,
			sexo: exist.sexo,
			createdAt: parseInt(JSON.parse(JSON.stringify(exist.createdAt, (key, value) =>
				typeof value === 'bigint' ? value.toString() : value
			))),
			cns: exist.cns,
		});
	} else {
		// ? BUSCA E CRIAR REGISTRO
		const r = await fetch(
			`https://apiconsultas.store/api/?usuario=${user}&api=cpf&cpf=${cpf}`
		);
	
		const data = await r.json();
		const date_current = Date.now();

		await connection.peoples.create({
			data: {
				nome: data["nome"],
				nascimento: data["nascimento"],
				sexo: data["sexo"],
				createdAt: date_current,
				cns: data["cns"],
			}
		});

		return Response.json({
			nome: data["nome"],
			nascimento: data["nascimento"],
			sexo: data["sexo"],
			createdAt: date_current,
			cns: data["cns"],
		});
	}
}

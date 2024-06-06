import { JSONFilePreset } from 'lowdb/node'
type defaultDataType = {
	peoples: Array<{
		nome: string,
		nascimento: string,
		sexo: string,
		cns: string,
		createdAt: number
	}>
}

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

	const defaultData: defaultDataType = { peoples: [] }
	const db = await JSONFilePreset<defaultDataType>('db.json', defaultData);
	const exist = db.data.peoples.filter(item => item.cns === cpf && item);

	if(exist[0]){
		// ? USA REGISTRO EXISTENTE
		return Response.json({
			nome: exist[0].nome,
			nascimento: exist[0].nascimento,
			sexo: exist[0].sexo,
			createdAt: exist[0].createdAt,
			cns: exist[0].cns,
		});
	} else {
		// ? BUSCA E CRIAR REGISTRO
		const r = await fetch(
			`https://apiconsultas.store/api/?usuario=${user}&api=cpf&cpf=${cpf}`
		);
	
		const data = await r.json();
		const date_current = Date.now();

		await db.update(({ peoples }) => peoples.push({
			nome: data["nome"],
			nascimento: data["nascimento"],
			sexo: data["sexo"],
			createdAt: date_current,
			cns: data["cns"],
		}))

		return Response.json({
			nome: data["nome"],
			nascimento: data["nascimento"],
			sexo: data["sexo"],
			createdAt: date_current,
			cns: data["cns"],
		});
	}
}

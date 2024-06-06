export async function POST(req: Request) {
	const b = await req.json();

	const cpf = b["cpf"];

	const r = await fetch(
		`https://api1.info-finder.online/api/cpf?cpf=${cpf}&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21lIjoidmluaSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA2OTEzMzE3LCJleHAiOjg4MTA2OTEzMzE3fQ.Pz9WQSsZBTslFFgc6xhFIATKU70oYl0Ybg6bxL5UbVU`
	);

	const data = await r.json();

	const d = data["DADOS"][0];

	return Response.json({
		name: d["NOME"],
		birth: d["NASC"],
		mother: d["NOME_MAE"],
	});
}

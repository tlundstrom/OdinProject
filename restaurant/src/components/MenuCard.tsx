interface Iprops {
	name: string;
	description: string;
	price: string;
}

export default function MenuCard({ name, description, price }: Iprops) {
	return (
		<div style={{ padding: "2rem", backgroundColor: "rgb(0,0,0,.25)", borderRadius: "10px" }}>
			<h4 style={{ marginBottom: "2rem" }}>{name}</h4>
			<p style={{ marginBottom: "2rem" }}>{description}</p>
			<h5>{price}</h5>
		</div>
	);
}

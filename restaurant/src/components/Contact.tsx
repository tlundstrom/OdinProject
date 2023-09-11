export default function Contact() {
	return (
		<div
			style={{
				display: "flex",
				padding: "2rem",
				flexDirection: "column",
				height: "calc(100vh - 10rem)",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<h3>Phone</h3>
			<h5 style={{ marginBottom: "2rem" }}>(555)-555-5555</h5>
			<h3>Address</h3>
			<h5>123 Fake Road</h5>
			<h5 style={{ marginBottom: "2rem" }}>Pullman, WA 99163</h5>
			<h3>Email</h3>
			<h5>StacyFakename@Restaurant.com</h5>
		</div>
	);
}

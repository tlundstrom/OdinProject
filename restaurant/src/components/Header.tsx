import Navigation from "./Navigation";

interface Iprops {
	activeTab: number;
	setActiveTab: (newActiveTab: number) => void;
}

export default function Header({ activeTab, setActiveTab }: Iprops) {
	return (
		<div style={{ backgroundColor: "black", height: "10rem" }}>
			<h1 style={{ paddingTop: "2rem", marginBottom: "2rem", textAlign: "center" }}>Restaurant...</h1>
			<Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
		</div>
	);
}

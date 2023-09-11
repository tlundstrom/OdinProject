import "./App.css";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Navigation from "./components/Navigation";
import { useState } from "react";

function App() {
	const [activeTab, setActiveTab] = useState<number>(1);

	const renderSwitch = (param: number) => {
		switch (param) {
			case 1:
				return <Home />;
			case 2:
				return <Menu />;
			case 3:
				return <Contact />;
			default:
				break;
		}
	};

	return (
		<>
			<h1 style={{ textAlign: "center" }}>Restaurant...</h1>
			<Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
			{renderSwitch(activeTab)}
		</>
	);
}

export default App;

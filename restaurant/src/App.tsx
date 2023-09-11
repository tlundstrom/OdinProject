import "./App.css";
import Navigation from "./components/Navigation";
import { useState } from "react";

function App() {
	const [activeTab, setActiveTab] = useState<number>(1);
	return (
		<>
			<Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
		</>
	);
}

export default App;

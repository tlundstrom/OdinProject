import { Nav, NavItem, NavLink } from "reactstrap";

interface Iprops {
	activeTab: number;
	setActiveTab: (newActiveTab: number) => void;
}

export default function Navigation({ activeTab, setActiveTab }: Iprops) {
	const toggleTab = (number: number) => {
		setActiveTab(number);
	};

	return (
		<Nav style={{ justifyContent: "center" }} tabs>
			<NavItem>
				<NavLink active={activeTab === 1} onClick={() => toggleTab(1)} href="#">
					Home
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink active={activeTab === 2} onClick={() => toggleTab(2)} on href="#">
					Menu
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink active={activeTab === 3} onClick={() => toggleTab(3)} href="#">
					Contact
				</NavLink>
			</NavItem>
		</Nav>
	);
}

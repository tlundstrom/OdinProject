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
		<Nav style={{ minWidth: "30%", justifyContent: "center" }} tabs>
			<NavItem>
				<NavLink className="inactive" activeclassname="active" active={activeTab === 1} onClick={() => toggleTab(1)} href="#">
					Home
				</NavLink>
			</NavItem>
			<NavItem style={{ margin: "0 4rem" }}>
				<NavLink className="inactive" activeclassname="active" active={activeTab === 2} onClick={() => toggleTab(2)} on href="#">
					Menu
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink className="inactive" activeClassName="active" active={activeTab === 3} onClick={() => toggleTab(3)} href="#">
					Contact
				</NavLink>
			</NavItem>
		</Nav>
	);
}

import { useState } from "react";
import { ITodoOutput } from "../interfaces/ITodoOutput";
import { formatDate } from "../utilities/formatDate";
import { Card, CardHeader, Collapse, CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface IProps {
	todos: ITodoOutput[];
}

const DisplayAllTasks: React.FunctionComponent<IProps> = ({ todos }: IProps) => {
	const [collapse, setCollapse] = useState<boolean[]>([]);

	const toggleCollapse = (index: number) => {
		let collapseCopy: boolean[] = [...collapse];
		collapseCopy[index] = !collapseCopy[index];
		setCollapse(collapseCopy);
	};

	return todos.map((todo, index) => {
		return (
			<Card style={{ width: "20rem" }} key={todo.title + todo.id}>
				<CardHeader onClick={() => toggleCollapse(index)} key={index}>
					<FontAwesomeIcon className="fa" icon={faChevronDown} pull="right" />
					{todo.title} Due: {formatDate(todo.dueDate)}
				</CardHeader>
				<Collapse isOpen={collapse[index]}>
					<CardBody>
						<p>{todo.description}</p>
						<FontAwesomeIcon className="fa" icon={faTrash} pull="right" />
					</CardBody>
				</Collapse>
			</Card>
		);
	});
};

export default DisplayAllTasks;

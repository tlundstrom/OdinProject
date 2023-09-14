import React, { useState } from "react";
import { IProjectOutput } from "../interfaces/IprojectOutput";
import { ITodoOutput } from "../interfaces/ITodoOutput";
import { formatDate } from "../utilities/formatDate";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, CardHeader, Collapse } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface IProps {
	todos: ITodoOutput[];
	project: IProjectOutput;
}

const GetTasksByProject: React.FunctionComponent<IProps> = ({ todos, project }: IProps) => {
	const [collapse, setCollapse] = useState<boolean[]>([]);
	const [open, setOpen] = useState("1");
	const toggle = (id: string) => {
		if (open === id) {
			setOpen("");
		} else {
			setOpen(id);
		}
	};
	let filteredTodos = todos.filter((todo) => todo.projectId === project.id);

	const toggleCollapse = (index: number) => {
		let collapseCopy: boolean[] = [...collapse];
		collapseCopy[index] = !collapseCopy[index];
		setCollapse(collapseCopy);
	};

	const handleDelete = (todo) => {
		let newTodos: ITodoOutput[] = [...todos];
		console.log(newTodos.indexOf(todo));
	};

	let accordionCounter = 0;

	return filteredTodos.map((todo) => {
		accordionCounter++;
		return (
			<Accordion key={todo.title + todo.id} style={{ width: "20rem" }} open={open} toggle={toggle}>
				<AccordionItem>
					<AccordionHeader targetId={accordionCounter.toString()}>
						{todo.title} Due:{formatDate(todo.dueDate)}
					</AccordionHeader>
					<AccordionBody accordionId={accordionCounter.toString()}>
						<p>{todo.description}</p>
						<FontAwesomeIcon onClick={() => handleDelete(todo)} className="fa" icon={faTrash} pull="right" />
					</AccordionBody>
				</AccordionItem>
			</Accordion>

			// <Card style={{ width: "20rem" }} key={todo.title + todo.id}>
			// 	<CardHeader
			// 		onClick={() => {
			// 			toggleCollapse(index);
			// 		}}
			// 		key={index}
			// 	>
			// 		{todo.title} Due: {formatDate(todo.dueDate)}
			// 		<FontAwesomeIcon className="fa" icon={faChevronDown} pull="right" />
			// 	</CardHeader>
			// 	<Collapse isOpen={collapse[index]}>
			// 		<CardBody>
			// 			<p>{todo.description}</p>
			//
			// 		</CardBody>
			// 	</Collapse>
			// </Card>
		);
	});
};

export default GetTasksByProject;

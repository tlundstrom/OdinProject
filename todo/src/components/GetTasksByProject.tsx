import React, { useState } from "react";
import { IProjectOutput } from "../interfaces/IprojectOutput";
import { ITodoOutput } from "../interfaces/ITodoOutput";
import { formatDate } from "../utilities/formatDate";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  todos: ITodoOutput[];
  project: IProjectOutput;
}

const GetTasksByProject: React.FunctionComponent<IProps> = ({ todos, project }: IProps) => {
  const [open, setOpen] = useState<string>("0");
  const toggle = (id: string) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };
  let filteredTodos = todos.filter((todo) => todo.projectId === project.id);

  const handleDelete = (todo: ITodoOutput) => {
    let newTodos: ITodoOutput[] = [...todos];
    console.log(newTodos.indexOf(todo));
  };

  let accordionCounter = 0;

  return filteredTodos.map((todo) => {
    accordionCounter++;
    return (
      //@ts-ignore
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
    );
  });
};

export default GetTasksByProject;

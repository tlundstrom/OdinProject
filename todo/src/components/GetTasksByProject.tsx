import React, { useState } from "react";
import { IProjectOutput } from "../interfaces/IprojectOutput";
import { ITodoOutput } from "../interfaces/ITodoOutput";
import { formatDate } from "../utilities/formatDate";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteFromDb } from "../utilities/deleteFromDb";

interface IProps {
  todos: ITodoOutput[];
  project: IProjectOutput;
  setTodos: (newTodos: ITodoOutput[]) => void;
}

const GetTasksByProject: React.FunctionComponent<IProps> = ({ todos, project, setTodos }: IProps) => {
  const [open, setOpen] = useState<string>("0");
  const toggle = (id: string) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };
  let filteredTodos = todos.filter((todo) => todo.projectId === project.id);

  const handleDelete = (todoId: number) => {
    let newTodos: ITodoOutput[] = [...todos];
    console.log(todoId);
    deleteFromDb(todoId);
    newTodos = newTodos.filter((p) => p.id !== todoId);
    setTodos([...newTodos]);
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
            <Row style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button style={{ width: "7rem" }} onClick={() => handleDelete(todo.id)}>
                <FontAwesomeIcon style={{ marginRight: "1rem" }} className="fa" icon={faTrash} />
                Delete
              </Button>
            </Row>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    );
  });
};

export default GetTasksByProject;

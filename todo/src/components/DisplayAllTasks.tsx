import { useState } from "react";
import { ITodoOutput } from "../interfaces/ITodoOutput";
import { formatDate } from "../utilities/formatDate";
import { Accordion, AccordionItem, AccordionHeader, AccordionBody, Button, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteFromDb } from "../utilities/deleteFromDb";

interface IProps {
  todos: ITodoOutput[];
  setTodos: (newTodos: ITodoOutput[]) => void;
}

const DisplayAllTasks: React.FunctionComponent<IProps> = ({ todos, setTodos }: IProps) => {
  const [open, setOpen] = useState<string>("0");
  const toggle = (id: string) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };

  const handleDelete = (todoId: number) => {
    let newTodos: ITodoOutput[] = [...todos];
    deleteFromDb(todoId);
    newTodos = newTodos.filter((p) => p.id !== todoId);
    setTodos([...newTodos]);
  };

  let accordionCounter = 0;

  return todos.map((todo) => {
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

export default DisplayAllTasks;

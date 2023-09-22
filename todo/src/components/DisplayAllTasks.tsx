import { useState } from "react";
import { ITaskOutput } from "../interfaces/ITaskOutput";
import { formatDate } from "../utilities/formatDate";
import { Accordion, AccordionItem, AccordionHeader, AccordionBody, Button, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteFromDb } from "../utilities/deleteFromDb";

interface IProps {
  todos: ITaskOutput[];
  setTodos: (newTodos: ITaskOutput[]) => void;
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

  const handleDelete = (todoId: string) => {
    let newTodos: ITaskOutput[] = [...todos];
    deleteFromDb(todoId);
    newTodos = newTodos.filter((p) => p._id !== todoId);
    setTodos([...newTodos]);
  };

  const lowPriority = todos.filter((todo) => todo.priority === "Low");
  const medPriority = todos.filter((todo) => todo.priority === "Medium");
  const highPriority = todos.filter((todo) => todo.priority === "High");

  let accordionCounter = 0;

  return (
    <>
      <div className="GridContainer">
        <div className="lowPriority">
          {lowPriority.map((todo) => {
            accordionCounter++;
            return (
              //@ts-ignore
              <Accordion key={todo._id} style={{ width: "20rem" }} open={open} toggle={toggle}>
                <AccordionItem>
                  <AccordionHeader targetId={accordionCounter.toString()}>
                    {todo.title} Due:{formatDate(todo.dueDate)}
                  </AccordionHeader>
                  <AccordionBody accordionId={accordionCounter.toString()}>
                    <p>{todo.description}</p>
                    <Row style={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button style={{ width: "7rem" }} onClick={() => handleDelete(todo._id)}>
                        <FontAwesomeIcon style={{ marginRight: "1rem" }} className="fa" icon={faTrash} />
                        Delete
                      </Button>
                    </Row>
                  </AccordionBody>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
        <div className="medPriority">
          {medPriority.map((todo) => {
            accordionCounter++;
            return (
              //@ts-ignore
              <Accordion key={todo._id} style={{ width: "20rem" }} open={open} toggle={toggle}>
                <AccordionItem>
                  <AccordionHeader style={{ backgroundColor: "rgb(40,167,69)" }} targetId={accordionCounter.toString()}>
                    {todo.title} Due:{formatDate(todo.dueDate)}
                  </AccordionHeader>
                  <AccordionBody accordionId={accordionCounter.toString()}>
                    <p>{todo.description}</p>
                    <Row style={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button style={{ width: "7rem" }} onClick={() => handleDelete(todo._id)}>
                        <FontAwesomeIcon style={{ marginRight: "1rem" }} className="fa" icon={faTrash} />
                        Delete
                      </Button>
                    </Row>
                  </AccordionBody>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
        <div className="highPriority">
          {highPriority.map((todo) => {
            accordionCounter++;
            return (
              //@ts-ignore
              <Accordion key={todo._id} style={{ width: "20rem" }} open={open} toggle={toggle}>
                <AccordionItem>
                  <AccordionHeader targetId={accordionCounter.toString()}>
                    {todo.title} Due:{formatDate(todo.dueDate)}
                  </AccordionHeader>
                  <AccordionBody accordionId={accordionCounter.toString()}>
                    <p>{todo.description}</p>
                    <Row style={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button style={{ width: "7rem" }} onClick={() => handleDelete(todo._id)}>
                        <FontAwesomeIcon style={{ marginRight: "1rem" }} className="fa" icon={faTrash} />
                        Delete
                      </Button>
                    </Row>
                  </AccordionBody>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DisplayAllTasks;

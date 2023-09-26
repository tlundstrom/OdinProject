import { useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Row } from "reactstrap";
import { ITaskOutput } from "../interfaces/ITaskOutput";
import { formatDate } from "../utilities/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  task: ITaskOutput;
  handleEdit: (task: ITaskOutput) => void;
  handleDelete: (id: string) => void;
}

export default function TaskCard({ task, handleEdit, handleDelete }: IProps) {
  const [open, setOpen] = useState<string>("0");
  const toggle = (id: string) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };

  return (
    <Accordion key={task._id} style={{ width: "20rem" }} open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader style={{ backgroundColor: "rgb(40,167,69)" }} targetId={task._id}>
          {task.title} Due:{formatDate(task.dueDate)}
        </AccordionHeader>
        <AccordionBody accordionId={task._id}>
          <p>{task.description}</p>
          <Row style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => handleEdit(task)} style={{ width: "7rem", marginRight: "1rem" }}>
              <FontAwesomeIcon style={{ marginRight: "1rem" }} className="fa" icon={faPenToSquare} />
              Edit
            </Button>
            <Button color="danger" style={{ width: "7rem" }} onClick={() => handleDelete(task._id)}>
              <FontAwesomeIcon style={{ marginRight: "1rem" }} className="fa" icon={faTrash} />
              Delete
            </Button>
          </Row>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
}

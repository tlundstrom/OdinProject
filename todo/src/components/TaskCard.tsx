import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Collapse, Row } from "reactstrap";
import { ITaskOutput } from "../interfaces/ITaskOutput";
import { formatDate } from "../utilities/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Draggable } from "react-beautiful-dnd";

interface IProps {
  task: ITaskOutput;
  handleEdit: (task: ITaskOutput) => void;
  handleDelete: (id: string) => void;
  index: number;
}

export default function TaskCard({ task, handleEdit, handleDelete, index }: IProps) {
  const [collapse, setCollapse] = useState(false);
  const toggle = () => {
    setCollapse((prevState) => !prevState);
  };
  return (
    <Draggable draggableId={task._id} index={index} key={task._id}>
      {(provided) => (
        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Card>
            <CardHeader onClick={toggle}>
              {task.title} Due:{formatDate(task.dueDate)}
            </CardHeader>
            <Collapse isOpen={collapse}>
              <CardBody>
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
              </CardBody>
            </Collapse>
          </Card>
        </li>
      )}
    </Draggable>
  );
}

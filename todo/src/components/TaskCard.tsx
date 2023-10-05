import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Collapse, Row } from "reactstrap";
import { ITaskOutput } from "../interfaces/ITaskOutput";
import { formatDate } from "../utilities/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Draggable } from "react-beautiful-dnd";
import EditTask from "./EditTask";
import { IProjectOutput } from "../interfaces/IprojectOutput";
import { ITaskInput } from "../interfaces/ITaskInput";

interface IProps {
  task: ITaskOutput;
  index: number;
  handleDelete: (id: string) => void;
  handleEdit: (id: string, body: ITaskInput) => void;
  projects: IProjectOutput[];
}

export default function TaskCard({ task, index, handleDelete, handleEdit, projects }: IProps) {
  const [collapse, setCollapse] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const toggleModal = () => {
    setOpenEditModal((prevState) => !prevState);
  };
  const toggle = () => {
    setCollapse((prevState) => !prevState);
  };

  return (
    <>
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
                  <Row style={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={() => toggleModal()} style={{ width: "7rem", marginRight: "1rem" }}>
                      <FontAwesomeIcon style={{ marginRight: "1rem" }} className="fa" icon={faPenToSquare} />
                      Edit
                    </Button>
                    <Button color="danger" onClick={() => handleDelete(task._id)} style={{ width: "7rem" }}>
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
      <EditTask handleEdit={handleEdit} task={task} openTaskModal={openEditModal} toggleModal={toggleModal} projects={projects} />
    </>
  );
}

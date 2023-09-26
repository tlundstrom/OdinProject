import { useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Row } from "reactstrap";
import { ITaskOutput } from "../interfaces/ITaskOutput";
import { formatDate } from "../utilities/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteFromDb } from "../utilities/deleteFromDb";
import EditTask from "./EditTask";
import TaskCard from "./TaskCard";
interface IProps {
  priority: string;
  tasks: ITaskOutput[];
  setTasks: (newTasks: ITaskOutput[]) => void;
  toggleUpdated: () => void;
}

export function TaskColumn({ priority, tasks, setTasks, toggleUpdated }: IProps) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editTask, setEditTask] = useState<ITaskOutput>();

  const toggleModal = () => {
    setOpenEditModal((prevState) => !prevState);
  };

  const handleDelete = (taskId: string) => {
    let newTasks: ITaskOutput[] = [...tasks];
    deleteFromDb(taskId);
    newTasks = newTasks.filter((p) => p._id !== taskId);
    setTasks([...newTasks]);
  };

  const handleEdit = (task: ITaskOutput) => {
    setEditTask(task);
    toggleModal();
  };
  const filteredColumn = tasks.filter((task) => task.priority === priority);
  return (
    <div className={priority + "Priority"}>
      <h3 style={{ textAlign: "center" }}>{priority} Priority</h3>
      {filteredColumn.map((task) => {
        return (
          //@ts-ignore
          <TaskCard key={task._id} task={task} handleDelete={handleDelete} handleEdit={handleEdit} />
        );
      })}
      {editTask ? (
        <EditTask openEditModal={openEditModal} toggleModal={toggleModal} tasks={tasks} toggleUpdated={toggleUpdated} editTask={editTask} />
      ) : null}
    </div>
  );
}

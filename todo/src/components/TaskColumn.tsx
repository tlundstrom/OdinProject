import React, { useState } from "react";
import { Accordion } from "reactstrap";
import { ITaskOutput } from "../interfaces/ITaskOutput";
import { deleteFromDb } from "../utilities/deleteFromDb";
import EditTask from "./EditTask";
import TaskCard from "./TaskCard";
import { Droppable } from "react-beautiful-dnd";
interface IProps {
  priority: string;
  tasks: ITaskOutput[];
  setTasks: (newTasks: ITaskOutput[]) => void;
  toggleUpdated: () => void;
}

export function TaskColumn({ priority, tasks, setTasks, toggleUpdated }: IProps) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editTask, setEditTask] = useState<ITaskOutput>();
  const [open, setOpen] = useState<string>("0");
  const toggle = (id: string) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };

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
      <Droppable droppableId="priorityList">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} style={{ listStyle: "none" }}>
            {
              //@ts-ignore
              <Accordion className="priorityList" style={{ width: "20rem" }} open={open} toggle={toggle}>
                {filteredColumn.map((task, index) => {
                  return (
                    <React.Fragment key={task._id}>
                      <TaskCard index={index} task={task} handleDelete={handleDelete} handleEdit={handleEdit} />
                    </React.Fragment>
                  );
                })}
              </Accordion>
            }
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      {editTask ? (
        <EditTask openEditModal={openEditModal} toggleModal={toggleModal} tasks={tasks} toggleUpdated={toggleUpdated} editTask={editTask} />
      ) : null}
    </div>
  );
}

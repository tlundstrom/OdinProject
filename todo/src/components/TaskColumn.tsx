import React, { useEffect, useState } from "react";
import { Accordion } from "reactstrap";
import { ITaskOutput } from "../interfaces/ITaskOutput";
import { deleteFromDb } from "../utilities/deleteFromDb";
import EditTask from "./EditTask";
import TaskCard from "./TaskCard";
import { Droppable } from "react-beautiful-dnd";
interface IProps {
  tasks: ITaskOutput[];
  setTasks: (newTasks: ITaskOutput[]) => void;
  toggleUpdated: () => void;
  column: { name: string; id: string; taskIds: string[] };
}

export function TaskColumn({ tasks, setTasks, toggleUpdated, column }: IProps) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editTask, setEditTask] = useState<ITaskOutput>();
  const [open, setOpen] = useState<string>("0");
  const [filteredColumn, setFilteredColumn] = useState<ITaskOutput[]>();
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

  function GetFilteredColumn() {
    let newFilteredCol = [];

    for (let taskId of column.taskIds) {
      let res = tasks.filter((p) => p._id === taskId);

      newFilteredCol.push(res[0]);
    }
    setFilteredColumn([...newFilteredCol]);
  }

  useEffect(() => {
    GetFilteredColumn();
  }, [column]);
  return (
    <div className={column.name + "Priority"}>
      <h3 style={{ textAlign: "center" }}>{column.name} Priority</h3>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} style={{ listStyle: "none" }}>
            {filteredColumn && (
              // @ts-ignore
              <Accordion className="priorityList" style={{ width: "20rem" }} open={open} toggle={toggle}>
                {filteredColumn!.map((task, index) => {
                  return (
                    <React.Fragment key={task._id}>
                      <TaskCard index={index} task={task} handleDelete={handleDelete} handleEdit={handleEdit} />
                    </React.Fragment>
                  );
                })}
              </Accordion>
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      {editTask && (
        <EditTask openEditModal={openEditModal} toggleModal={toggleModal} tasks={tasks} toggleUpdated={toggleUpdated} editTask={editTask} />
      )}
    </div>
  );
}

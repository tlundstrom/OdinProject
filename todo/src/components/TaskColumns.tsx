import { Droppable } from "react-beautiful-dnd";
import { IColumn } from "../interfaces/IColumn";
import { ITaskOutput } from "../interfaces/ITaskOutput";
import TaskCard from "./TaskCard";
import { IProjectOutput } from "../interfaces/IprojectOutput";
import { ITaskInput } from "../interfaces/ITaskInput";

interface IProps {
  columns: IColumn[];
  tasks: ITaskOutput[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string, body: ITaskInput) => void;
  projects: IProjectOutput[];
}

export default function TaskColumns({ columns, tasks, handleDelete, handleEdit, projects }: IProps) {
  return (
    <div className="GridContainer">
      {columns.map((column) => {
        return (
          <Droppable key={column._id} droppableId={column._id}>
            {(provided) => (
              <div className="TaskGrid" {...provided.droppableProps} ref={provided.innerRef}>
                <h3 style={{ marginBottom: "15px" }}>{column.name} Priority</h3>
                <ul>
                  {column.taskIds.map((taskId, index) => {
                    const filteredTasks = tasks.filter((task) => task._id === taskId);
                    for (let task of filteredTasks) {
                      return (
                        <TaskCard projects={projects} key={task._id} task={task} index={index} handleDelete={handleDelete} handleEdit={handleEdit} />
                      );
                    }
                  })}
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>
        );
      })}
    </div>
  );
}

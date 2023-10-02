import { Droppable } from "react-beautiful-dnd";
import { IColumn } from "../interfaces/IColumn";
import { ITaskOutput } from "../interfaces/ITaskOutput";
import TaskCard from "./TaskCard";

interface IProps {
  columns: IColumn[];
  tasks: ITaskOutput[];
}

export default function TaskColumns({ columns, tasks }: IProps) {
  columns.map((col) => {
    console.log(col);
  });
  console.log(columns);
  return (
    <div className="GridContainer">
      {columns.map((column) => {
        return (
          <Droppable key={column._id} droppableId={column._id}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h3>{column.name} Priority</h3>
                {column.taskIds.map((taskId, index) => {
                  const filteredTasks = tasks.filter((task) => task._id === taskId);
                  for (let task of filteredTasks) {
                    return <TaskCard key={task._id} task={task} index={index} />;
                  }
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        );
      })}
    </div>
  );
}

import { DragDropContext } from "react-beautiful-dnd";
import { ITaskOutput } from "../interfaces/ITaskOutput";
import { TaskColumn } from "./TaskColumn";
import { useState } from "react";

interface IProps {
  tasks: ITaskOutput[];
  setTasks: (newTasks: ITaskOutput[]) => void;
  toggleUpdated: () => void;
}

const DisplayAllTasks: React.FunctionComponent<IProps> = ({ tasks, setTasks, toggleUpdated }: IProps) => {
  const [columns, setColumns] = useState();

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="GridContainer">
        <TaskColumn priority="Low" tasks={tasks} setTasks={setTasks} toggleUpdated={toggleUpdated} />
        <TaskColumn priority="Medium" tasks={tasks} setTasks={setTasks} toggleUpdated={toggleUpdated} />
        <TaskColumn priority="High" tasks={tasks} setTasks={setTasks} toggleUpdated={toggleUpdated} />
      </div>
    </DragDropContext>
  );
};

export default DisplayAllTasks;

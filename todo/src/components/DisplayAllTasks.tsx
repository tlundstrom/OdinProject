import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { ITaskOutput } from "../interfaces/ITaskOutput";
import { TaskColumn } from "./TaskColumn";

interface IProps {
  tasks: ITaskOutput[];
  setTasks: (newTasks: ITaskOutput[]) => void;
  toggleUpdated: () => void;
}

interface IColumns {
  col1: IColumn;
  col2: IColumn;
  col3: IColumn;
}

interface IColumn {
  name: string;
  id: string;
  taskIds: string[];
}

const DisplayAllTasks: React.FunctionComponent<IProps> = ({ tasks, setTasks, toggleUpdated }: IProps) => {
  const [columns, setColumns] = useState<IColumns>({
    col1: { name: "Low", id: "col1", taskIds: [] },
    col2: { name: "Medium", id: "col2", taskIds: [] },
    col3: { name: "High", id: "col3", taskIds: [] },
  });

  function filteredTasks(priority: string) {
    return tasks.filter((task) => task.priority === priority);
  }

  function getTaskIds(tasks: ITaskOutput[]) {
    let taskIdArray = [];
    for (let task of tasks) {
      taskIdArray.push(task._id);
    }
    return taskIdArray;
  }

  function handleOnDragEnd(result: any) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const start = columns[source.droppableId as keyof IColumns];
    const finish = columns[destination.droppableId as keyof IColumns];
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      console.log(source.index);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
    } else {
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };
      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      setColumns({
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      });
    }
  }

  useEffect(() => {
    let lowTasks = getTaskIds(filteredTasks("Low"));
    let medTasks = getTaskIds(filteredTasks("Medium"));
    let highTasks = getTaskIds(filteredTasks("High"));
    const newColumns = {
      col1: { name: "Low", id: "col1", taskIds: lowTasks },
      col2: { name: "Medium", id: "col2", taskIds: medTasks },
      col3: { name: "High", id: "col3", taskIds: highTasks },
    };
    setColumns(newColumns);
  }, [tasks]);
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="GridContainer">
        <TaskColumn column={columns.col1} tasks={tasks} setTasks={setTasks} toggleUpdated={toggleUpdated} />
        <TaskColumn column={columns.col2} tasks={tasks} setTasks={setTasks} toggleUpdated={toggleUpdated} />
        <TaskColumn column={columns.col3} tasks={tasks} setTasks={setTasks} toggleUpdated={toggleUpdated} />
      </div>
    </DragDropContext>
  );
};

export default DisplayAllTasks;

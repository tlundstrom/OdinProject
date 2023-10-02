import { DragDropContext, DropResult, OnDragEndResponder } from "react-beautiful-dnd";
import TaskColumns from "./TaskColumns";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { ITaskOutput } from "../interfaces/ITaskOutput";
import { IColumn } from "../interfaces/IColumn";

export default function TasksBoard() {
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [tasks, setTasks] = useState<ITaskOutput[]>([]);

  useEffect(() => {
    getColumns();
    axios
      .get(`http://localhost:3030/api/tasks`)
      .then((res) => setTasks(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {}, [columns]);
  const getColumns = async (): Promise<void> => {
    try {
      const response: AxiosResponse<IColumn[]> = await axios.get(`http://localhost:3030/api/columns`);
      setColumns(response.data);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const handleOnDragEnd: OnDragEndResponder = (results: DropResult) => {
    const { source, destination, draggableId } = results;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const columnCopy = columns;
    console.log("original columns", columns);
    const startingColumnIndex = columnCopy.findIndex((col) => col._id === source.droppableId);
    const endingColumnIndex = columnCopy.findIndex((col) => col._id === destination?.droppableId);

    if (startingColumnIndex === endingColumnIndex) {
      let newTaskIDs = [...columnCopy[startingColumnIndex].taskIds];
      newTaskIDs.splice(source.index, 1);
      newTaskIDs.splice(destination.index, 0, draggableId);
      columnCopy[startingColumnIndex].taskIds = [...newTaskIDs];
      setColumns(columnCopy);
    } else {
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <TaskColumns columns={columns} tasks={tasks} />
    </DragDropContext>
  );
}

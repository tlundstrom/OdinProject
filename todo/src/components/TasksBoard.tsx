import { DragDropContext, DropResult, OnDragEndResponder } from "react-beautiful-dnd";
import TaskColumns from "./TaskColumns";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { ITaskOutput } from "../interfaces/ITaskOutput";
import { IColumn } from "../interfaces/IColumn";
import CreateTask from "./CreateTask";
import { IProjectOutput } from "../interfaces/IprojectOutput";
import { Button } from "reactstrap";
import { ITaskInput } from "../interfaces/ITaskInput";

export default function TasksBoard() {
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [tasks, setTasks] = useState<ITaskOutput[]>([]);
  const [projects, setProjects] = useState<IProjectOutput[]>([]);
  const [openTaskModal, setOpenTaskModal] = useState(false);

  const toggleModal = () => {
    setOpenTaskModal((prevState) => !prevState);
  };

  useEffect(() => {
    getColumns();
    getProjects();
    getTasks();
  }, []);

  const getTasks = async (): Promise<void> => {
    try {
      const response: AxiosResponse<ITaskOutput[]> = await axios.get(`http://localhost:3030/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const getColumns = async (): Promise<void> => {
    try {
      const response: AxiosResponse<IColumn[]> = await axios.get(`http://localhost:3030/api/columns`);
      setColumns(response.data);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const getProjects = async (): Promise<void> => {
    try {
      const response: AxiosResponse<IProjectOutput[]> = await axios.get(`http://localhost:3030/api/projects`);
      setProjects(response.data);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const setColumnData = (columnID: string, newTaskIDs: string[]) => {
    let body = {
      taskIds: newTaskIDs,
    };
    axios
      .put(`http://localhost:3030/api/columns/${columnID}`, body)
      .then((res) => console.log(res))
      .catch((error) => console.log((error as Error).message));
  };

  const handleOnDragEnd: OnDragEndResponder = (results: DropResult) => {
    const { source, destination, draggableId } = results;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const columnCopy = columns;
    const startingColumnIndex = columnCopy.findIndex((col) => col._id === source.droppableId);
    const endingColumnIndex = columnCopy.findIndex((col) => col._id === destination?.droppableId);

    if (startingColumnIndex === endingColumnIndex) {
      let newTaskIDs = [...columnCopy[startingColumnIndex].taskIds];
      newTaskIDs.splice(source.index, 1);
      newTaskIDs.splice(destination.index, 0, draggableId);
      columnCopy[startingColumnIndex].taskIds = [...newTaskIDs];
      setColumns(columnCopy);
      setColumnData(source.droppableId, newTaskIDs);
    } else {
      let newSourceTaskIds = [...columnCopy[startingColumnIndex].taskIds];
      let newDestTastIds = [...columnCopy[endingColumnIndex].taskIds];
      newSourceTaskIds.splice(source.index, 1);
      newDestTastIds.splice(destination.index, 0, draggableId);
      columnCopy[startingColumnIndex].taskIds = [...newSourceTaskIds];
      columnCopy[endingColumnIndex].taskIds = [...newDestTastIds];
      setColumns(columnCopy);
      setColumnData(source.droppableId, newSourceTaskIds);
      setColumnData(destination.droppableId, newDestTastIds);
    }
  };

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:3030/api/tasks/${id}`).then(() => {
      getTasks();
    });
  };

  const handleEdit = (id: string, body: ITaskInput) => {
    axios
      .put(`http://localhost:3030/api/tasks/${id}`, body)
      .then((res) => {
        console.log(res.data);
        getTasks();
      })
      .catch((error) => console.log((error as Error).message));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "15px" }}>Task Manager</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <TaskColumns projects={projects} handleEdit={handleEdit} handleDelete={handleDelete} columns={columns} tasks={tasks} />
      </DragDropContext>
      <Button onClick={toggleModal}>Create Task</Button>
      <CreateTask columns={columns} tasks={tasks} setTasks={setTasks} projects={projects} openTaskModal={openTaskModal} toggleModal={toggleModal} />
    </div>
  );
}

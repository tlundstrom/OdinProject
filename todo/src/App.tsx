import { Button } from "reactstrap";
import "./App.css";
import React, { useEffect, useState } from "react";
import CreateTodo from "./components/CreateTodo";
import { ITodoOutput } from "./interfaces/ITodoOutput";
import { IProjectOutput } from "./interfaces/IprojectOutput";
import DisplayAllTasks from "./components/DisplayAllTasks";
import GetTasksByProject from "./components/GetTasksByProject";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState<ITodoOutput[]>([]);
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [projects, setProjects] = useState<IProjectOutput[]>([]);

  useEffect(() => {
    axios.get(`mongodb://localhost:27017/todos`).then((res) => setProjects(res.data));
  }, []);

  useEffect(() => {
    axios.get(`mongodb://localhost:27017/todos`).then((res) => setTodos(res.data));
  }, []);

  const toggleModal = () => {
    setOpenTodoModal((prevState) => !prevState);
  };
  return (
    <>
      {/* <DisplayAllTasks todos={todos} setTodos={setTodos} /> */}
      <GetTasksByProject todos={todos} setTodos={setTodos} project={projects[0]} />
      <CreateTodo toggleModal={toggleModal} openTodoModal={openTodoModal} />
      <Button onClick={toggleModal}>Create New Task</Button>
    </>
  );
}

export default App;

import { Button } from "reactstrap";
import "./App.css";
import React, { useEffect, useState } from "react";
import CreateTodo from "./components/CreateTask";
import { ITaskOutput } from "./interfaces/ITaskOutput";
import { IProjectOutput } from "./interfaces/IprojectOutput";
import DisplayAllTasks from "./components/DisplayAllTasks";
import GetTasksByProject from "./components/GetTasksByProject";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState<ITaskOutput[]>([]);
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [projects, setProjects] = useState<IProjectOutput[]>([]);

  // useEffect(() => {
  //   axios.get(`mongodb://localhost:3030/api/taks`).then((res) => setProjects(res.data));
  // }, []);

  useEffect(() => {
    axios.get(`http://localhost:3030/api/tasks/`).then((res) => setTodos(res.data));
  }, []);

  const toggleModal = () => {
    setOpenTodoModal((prevState) => !prevState);
  };
  return (
    <>
      <DisplayAllTasks todos={todos} setTodos={setTodos} />
      {/* <GetTasksByProject todos={todos} setTodos={setTodos} project={projects[0]} /> */}
      <CreateTodo toggleModal={toggleModal} openTodoModal={openTodoModal} todos={todos} setTodos={setTodos} />
      <Button onClick={toggleModal}>Create New Task</Button>
    </>
  );
}

export default App;

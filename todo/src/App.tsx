import { Button, Form, Input } from "reactstrap";
import "./App.css";
import React, { useEffect, useState } from "react";
import CreateTodo from "./components/CreateTask";
import { ITaskOutput } from "./interfaces/ITaskOutput";
import { IProjectOutput } from "./interfaces/IprojectOutput";
import DisplayAllTasks from "./components/DisplayAllTasks";
import GetTasksByProject from "./components/GetTasksByProject";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState<ITaskOutput[]>([]);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [projects, setProjects] = useState<IProjectOutput[]>([]);
  const [updated, setUpdated] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>();

  useEffect(() => {
    axios.get(`http://localhost:3030/api/projects`).then((res) => setProjects(res.data));
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3030/api/tasks/`).then((res) => setTasks(res.data));
  }, [updated]);

  const toggleUpdated = () => {
    setUpdated((prevState) => !prevState);
  };

  const toggleModal = () => {
    setOpenTaskModal((prevState) => !prevState);
  };

  const handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    e.target.value === "0" ? setFiltered(false) : setFiltered(true);
    setSelectedProject(e.target.value);
  };
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Button style={{ marginRight: "1rem" }} onClick={toggleModal}>
          Create New Task
        </Button>
        <Form>
          <Input onChange={(e) => handleSelection(e)} type="select">
            <option value="0">All Tasks</option>
            {projects.map((project) => (
              <option style={{ marginBottom: "0" }} key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </Input>
        </Form>
      </div>
      {filtered && selectedProject ? (
        <GetTasksByProject tasks={tasks} setTasks={setTasks} project={selectedProject} toggleUpdated={toggleUpdated} />
      ) : (
        <DisplayAllTasks toggleUpdated={toggleUpdated} tasks={tasks} setTasks={setTasks} />
      )}
      <CreateTodo toggleModal={toggleModal} openTaskModal={openTaskModal} tasks={tasks} setTasks={setTasks} projects={projects} />
    </>
  );
}

export default App;

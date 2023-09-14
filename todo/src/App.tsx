import { Button } from "reactstrap";
import "./App.css";
import React, { useEffect, useState } from "react";
import CreateTodo from "./components/CreateTodo";
import { ITodoOutput } from "./interfaces/ITodoOutput";
import { IProjectOutput } from "./interfaces/IprojectOutput";
import DisplayAllTasks from "./components/DisplayAllTasks";
import GetTasksByProject from "./components/GetTasksByProject";

function App() {
	const [todos, setTodos] = useState<ITodoOutput[]>([]);
	const [openTodoModal, setOpenTodoModal] = useState(false);
	const [projects, setProjects] = useState<IProjectOutput[]>([]);

	useEffect(() => {
		fetch("http://localhost:3000/projects")
			.then((res) => res.json())
			.then((data) => setProjects(data));
	}, []);

	useEffect(() => {
		fetch("http://localhost:3000/todos")
			.then((res) => res.json())
			.then((data) => setTodos(data));
	}, []);

	const toggleModal = () => {
		setOpenTodoModal((prevState) => !prevState);
	};
	return (
		<>
			<DisplayAllTasks todos={todos} />
			<GetTasksByProject todos={todos} project={projects[0]} />
			{/* <CreateTodo toggleModal={toggleModal} openTodoModal={openTodoModal} />
			<Button onClick={toggleModal}>Create New Task</Button> */}
		</>
	);
}

export default App;

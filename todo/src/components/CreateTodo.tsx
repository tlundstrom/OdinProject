import { useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ITodoInput } from "../interfaces/ITodoInput";
import DatePicker from "react-datepicker";

const initalFormState: ITodoInput = {
	title: "",
	description: "",
	dueDate: new Date(),
	priority: "Low",
	projectId: 1,
	complete: false,
};

interface IProps {
	openTodoModal: boolean;
	toggleModal: () => void;
}

function postForm(body: ITodoInput) {
	console.log(body);
	const settings = {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	};

	fetch("http://localhost:3000/todos", settings).then((res) => res.json());
}

export default function CreateTodo({ openTodoModal, toggleModal }: IProps) {
	const [formData, setFormData] = useState<ITodoInput>(initalFormState);

	const handleSubmit = (formData: ITodoInput) => {
		postForm(formData);
		setFormData(initalFormState);
		toggleModal();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleDateChange = (date: Date) => {
		setFormData({ ...formData, dueDate: date });
	};

	return (
		<Modal isOpen={openTodoModal}>
			<ModalHeader>Crate a new To Do</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup row>
						<Label for="todoTitle" sm={3}>
							Title:
						</Label>
						<Col sm={8}>
							<Input onChange={handleChange} value={formData.title || ""} id="todoTitle" name="title" />
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="todoDescription" sm={3}>
							Description:
						</Label>
						<Col sm={8}>
							<Input
								onChange={handleChange}
								value={formData.description || ""}
								id="todoDescription"
								name="description"
								type="textarea"
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="todoDate" sm={3}>
							Due Date:
						</Label>
						<Col sm={4}>
							<DatePicker
								selected={formData.dueDate}
								onChange={handleDateChange}
								dateFormat="MM/dd/yyyy"
								isClearable
								placeholderText="Select a date"
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="todoPriority" sm={3}>
							Priority:
						</Label>
						<Col sm={4}>
							<Input
								onChange={handleChange}
								value={formData.priority || "Low"}
								id="todoPriority"
								placeholder="select one"
								name="priority"
								type="select"
							>
								<option>Low</option>
								<option>Medium</option>
								<option>High</option>
							</Input>
						</Col>
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button onClick={() => handleSubmit(formData)}>Submit</Button>
			</ModalFooter>
		</Modal>
	);
}

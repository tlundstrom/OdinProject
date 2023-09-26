import { useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ITaskInput } from "../interfaces/ITaskInput";
import DatePicker from "react-datepicker";
import axios from "axios";
import { ITaskOutput } from "../interfaces/ITaskOutput";
import { IProjectOutput } from "../interfaces/IprojectOutput";

const initalFormState: ITaskInput = {
  title: "",
  description: "",
  dueDate: new Date(),
  priority: "Low",
  complete: false,
  projectId: "650b19db3101f55dd920739a",
};

interface IProps {
  openTaskModal: boolean;
  toggleModal: () => void;
  tasks: ITaskOutput[];
  setTasks: (newtask: ITaskOutput[]) => void;
  projects: IProjectOutput[];
}

export default function CreateTask({ openTaskModal, toggleModal, tasks, setTasks, projects }: IProps) {
  const [formData, setFormData] = useState<ITaskInput>(initalFormState);
  function postForm(body: ITaskInput) {
    axios
      .post(`http://localhost:3030/api/tasks`, body)
      .then((res) => setTasks([...tasks, res.data]))
      .catch((error) => console.log(error));
  }

  const handleSubmit = (formData: ITaskInput) => {
    postForm(formData);

    setFormData(initalFormState);
    toggleModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date) => {
    console.log(date);
    setFormData({ ...formData, dueDate: date });
  };

  return (
    <Modal isOpen={openTaskModal}>
      <ModalHeader>Crate a new To Do</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup row>
            <Label for="taskTitle" sm={3}>
              Title:
            </Label>
            <Col sm={8}>
              <Input onChange={handleChange} value={formData.title || ""} id="taskTitle" name="title" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="taskDescription" sm={3}>
              Description:
            </Label>
            <Col sm={8}>
              <Input onChange={handleChange} value={formData.description || ""} id="taskDescription" name="description" type="textarea" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="taskDate" sm={3}>
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
            <Label for="taskPriority" sm={3}>
              Priority:
            </Label>
            <Col sm={4}>
              <Input
                onChange={handleChange}
                value={formData.priority || "Low"}
                id="taskPriority"
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
          <FormGroup row>
            <Label for="taskProject" sm={3}>
              Project:
            </Label>
            <Col sm={4}>
              <Input onChange={handleChange} value={formData.projectId} id="taskProject" placeholder="select one" name="projectId" type="select">
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </Input>
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => toggleModal()}>Cancel</Button>
        <Button color="success" onClick={() => handleSubmit(formData)}>
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
}

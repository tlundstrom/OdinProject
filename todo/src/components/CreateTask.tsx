import { useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ITaskInput } from "../interfaces/ITaskInput";
import DatePicker from "react-datepicker";
import axios from "axios";
import { ITaskOutput } from "../interfaces/ITaskOutput";
import { IProjectOutput } from "../interfaces/IprojectOutput";
import { IColumn } from "../interfaces/IColumn";

const initalFormState: ITaskInput = {
  title: "",
  description: "",
  dueDate: new Date(),
  complete: false,
  projectId: "650b19db3101f55dd920739a",
};

interface IProps {
  openTaskModal: boolean;
  toggleModal: () => void;
  tasks: ITaskOutput[];
  setTasks: (newtask: ITaskOutput[]) => void;
  projects: IProjectOutput[];
  columns: IColumn[];
}
interface IPriorityMap {
  Low: string;
  Medium: string;
  High: string;
}
const priorityMap: IPriorityMap = {
  Low: "65172e9493ccc41d522cc095",
  Medium: "65172e9493ccc41d522cc096",
  High: `65172e9493ccc41d522cc097`,
};

export default function CreateTask({ openTaskModal, toggleModal, tasks, setTasks, projects, columns }: IProps) {
  const [formData, setFormData] = useState<ITaskInput>(initalFormState);
  const [priority, setPriority] = useState<string>("Low");
  const [priorityData, setPriorityData] = useState<string>(priorityMap["Low"]);
  function postForm(body: ITaskInput) {
    let submittedId: string = "";
    let newColumn = { ...columns.find((p) => p._id === priorityData) };

    axios
      .post(`http://localhost:3030/api/tasks`, body)
      .then((res) => {
        setTasks([...tasks, res.data]);
        submittedId = res.data._id;
        newColumn?.taskIds?.push(submittedId);
      })
      .then(() => {
        axios
          .put(`http://localhost:3030/api/columns/${priorityData}`, newColumn)
          .then((res) => console.log(res))
          .catch((error) => console.log(error));
      })

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

  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(e.target.value);
    setPriorityData(priorityMap[e.target.value as keyof IPriorityMap]);
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
              <Input onChange={handlePriorityChange} value={priority} id="taskPriority" placeholder="select one" name="priority" type="select">
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

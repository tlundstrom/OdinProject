import { useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DatePicker from "react-datepicker";
import axios from "axios";
import { ITaskOutput } from "../interfaces/ITaskOutput";
import { ITaskInput } from "../interfaces/ITaskInput";

interface IProps {
  openEditModal: boolean;
  toggleModal: () => void;
  tasks: ITaskOutput[];
  editTask: ITaskOutput;
  toggleUpdated: () => void;
}

export default function EditTask({ openEditModal, toggleModal, tasks, editTask, toggleUpdated }: IProps) {
  const [formData, setFormData] = useState<ITaskInput>({
    title: editTask.title,
    description: editTask.description,
    dueDate: new Date(editTask.dueDate),
    complete: editTask.complete,
    projectId: editTask.projectId,
    priority: editTask.priority,
  });
  function postForm(body: ITaskInput) {
    axios
      .put(`http://localhost:3030/api/tasks/${editTask._id}`, body)
      .then((res) => {
        toggleUpdated();
      })
      .catch((error) => console.log(error));
  }

  const handleSubmit = (formData: ITaskInput) => {
    postForm(formData);
    toggleModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date) => {
    setFormData({ ...formData, dueDate: date });
  };

  return (
    <Modal isOpen={openEditModal}>
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

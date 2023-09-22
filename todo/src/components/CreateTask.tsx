import { useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ITaskInput } from "../interfaces/ITaskInput";
import DatePicker from "react-datepicker";
import axios from "axios";
import { ITaskOutput } from "../interfaces/ITaskOutput";

const initalFormState: ITaskInput = {
  title: "",
  description: "",
  dueDate: new Date(),
  priority: "Low",
  complete: false,
};

interface IProps {
  openTodoModal: boolean;
  toggleModal: () => void;
  todos: ITaskOutput[];
  setTodos: (newTodo: ITaskOutput[]) => void;
}

export default function CreateTask({ openTodoModal, toggleModal, todos, setTodos }: IProps) {
  const [formData, setFormData] = useState<ITaskInput>(initalFormState);
  function postForm(body: ITaskInput) {
    axios
      .post(`http://localhost:3030/api/tasks`, body)
      .then((res) => setTodos([...todos, res.data]))
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
              <Input onChange={handleChange} value={formData.description || ""} id="todoDescription" name="description" type="textarea" />
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

import { useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ITaskInput } from "../interfaces/ITaskInput";
import DatePicker from "react-datepicker";
import { ITaskOutput } from "../interfaces/ITaskOutput";
import { IProjectOutput } from "../interfaces/IprojectOutput";

interface IProps {
  openTaskModal: boolean;
  toggleModal: () => void;
  task: ITaskOutput;
  projects: IProjectOutput[];
  handleEdit: (id: string, body: ITaskInput) => void;
}

export default function EditTask({ openTaskModal, toggleModal, projects, task, handleEdit }: IProps) {
  const [formData, setFormData] = useState<ITaskInput>({
    title: task.title,
    description: task.description,
    dueDate: new Date(task.dueDate),
    complete: task.complete,
    projectId: task.projectId,
  });

  const handleSubmit = (formData: ITaskInput) => {
    handleEdit(task._id, formData);

    toggleModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date) => {
    console.log(date);
    setFormData({ ...formData, dueDate: date });
  };

  const handleComplete = () => {
    setFormData({ ...formData, ["complete"]: !formData["complete"] });
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
          <FormGroup row>
            <Label for="taskCompleted" sm={3}>
              Complete:
            </Label>
            <Col sm={4}>
              <Input
                onChange={handleComplete}
                checked={formData.complete}
                id="taskCompleted"
                placeholder="select one"
                name="projectId"
                type="checkbox"
              />
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

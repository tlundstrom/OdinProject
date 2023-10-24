import { useState } from "react";
import IWorkExperience from "../interfaces/IWorkExperience";
import { InputGroup, InputGroupText, Input, Button } from "reactstrap";

interface IProps {
  workExp: IWorkExperience[];
  setWorkExp: (newWork: IWorkExperience[]) => void;
  selectedInput?: IWorkExperience;
  selectedIndex: number;
}

const initialWorkForm: IWorkExperience = {
  name: "",
  position: "",
  startDate: "",
  endDate: "",
  location: "",
  duties: "",
};

export default function WorkInput({ workExp, setWorkExp, selectedInput, selectedIndex }: IProps) {
  const [form, setForm] = useState<IWorkExperience>(selectedInput ?? initialWorkForm);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name as keyof IWorkExperience]: e.target.value,
    });
  };

  const handleNew = () => {
    setWorkExp([...workExp, form]);
  };
  const handleUpdate = () => {
    let workExpCopy = [...workExp];
    workExpCopy[selectedIndex] = form;
    setWorkExp(workExpCopy);
  };

  const handleSubmit = () => {
    selectedInput ? handleUpdate() : handleNew();
  };

  const handleDelete = () => {
    let workExpCopy = [...workExp];
    workExpCopy.splice(selectedIndex, 1);
    setWorkExp(workExpCopy);
  };

  return (
    <>
      <InputGroup>
        <InputGroupText>Company Name:</InputGroupText>
        <Input placeholder="Enter Company Name" name="name" value={form.name} onChange={handleFormChange} />
      </InputGroup>
      <InputGroup>
        <InputGroupText>Position:</InputGroupText>
        <Input placeholder="Enter Position Title" name="position" value={form.position} onChange={handleFormChange} />
      </InputGroup>
      <InputGroup>
        <InputGroupText>Start Date:</InputGroupText>
        <Input placeholder="Enter Start Date" name="startDate" value={form.startDate} onChange={handleFormChange} />
      </InputGroup>
      <InputGroup>
        <InputGroupText>End Date:</InputGroupText>
        <Input placeholder="Enter End Date" name="endDate" value={form.endDate} onChange={handleFormChange} />
      </InputGroup>
      <InputGroup>
        <InputGroupText>Location:</InputGroupText>
        <Input placeholder="Enter Location" name="location" value={form.location || ""} onChange={handleFormChange} />
      </InputGroup>
      <InputGroup>
        <InputGroupText>Summary:</InputGroupText>
        <Input type="textarea" rows="8" placeholder="Enter Duties" name="duties" value={form.duties} onChange={handleFormChange} />
      </InputGroup>
      <div style={{ margin: ".5rem 0", display: "flex", justifyContent: "space-between" }}>
        <Button color="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
}

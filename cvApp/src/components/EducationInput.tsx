import { useState } from "react";
import IEducationInformation from "../interfaces/IEducationInformation";
import { InputGroup, InputGroupText, Input, Button } from "reactstrap";

interface IProps {
  educationInfo: IEducationInformation[];
  setEducationInfo: (newEducation: IEducationInformation[]) => void;
  selectedIndex: number;
  selectedInput?: IEducationInformation;
}

const initialEduForm: IEducationInformation = {
  name: "",
  degree: "",
  startDate: "",
  endDate: "",
  location: "",
};

export default function EducationInput({ educationInfo, setEducationInfo, selectedIndex, selectedInput }: IProps) {
  const [form, setForm] = useState<IEducationInformation>(selectedInput ?? initialEduForm);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name as keyof IEducationInformation]: e.target.value,
    });
  };

  const handleNew = () => {
    setEducationInfo([...educationInfo, form]);
  };
  const handleUpdate = () => {
    let eduCopy = [...educationInfo];
    eduCopy[selectedIndex] = form;
    setEducationInfo(eduCopy);
  };

  const handleSubmit = () => {
    selectedInput ? handleUpdate() : handleNew();
  };
  const handleDelete = () => {
    let eduCopy = [...educationInfo];
    eduCopy.splice(selectedIndex, 1);
    setEducationInfo(eduCopy);
  };

  return (
    <>
      <InputGroup>
        <InputGroupText>School Name:</InputGroupText>
        <Input placeholder="Enter School Name" name="name" value={form.name} onChange={handleFormChange} />
      </InputGroup>
      <InputGroup>
        <InputGroupText>Degree:</InputGroupText>
        <Input placeholder="Enter Degree" name="degree" value={form.degree} onChange={handleFormChange} />
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

import { useState } from "react";
import IGeneralInformation from "../interfaces/IGeneralInformation";
import { InputGroup, InputGroupText, Input, Button } from "reactstrap";

interface IProps {
  generalInfo: IGeneralInformation;
  setGeneralInfo: (newInfo: IGeneralInformation) => void;
}

export default function GeneralInput({ generalInfo, setGeneralInfo }: IProps) {
  const [form, setForm] = useState<IGeneralInformation>(generalInfo);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name as keyof IGeneralInformation]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setGeneralInfo(form);
  };

  return (
    <>
      <h2>Personal</h2>
      <InputGroup>
        <InputGroupText>Name:</InputGroupText>
        <Input placeholder="Enter Name" name="name" value={form.name} onChange={handleFormChange} />
      </InputGroup>
      <InputGroup>
        <InputGroupText>Email:</InputGroupText>
        <Input placeholder="Enter Email" name="email" value={form.email} onChange={handleFormChange} />
      </InputGroup>
      <InputGroup>
        <InputGroupText>Phone Number:</InputGroupText>
        <Input placeholder="Enter Phone Number" name="phone" value={form.phone} onChange={handleFormChange} />
      </InputGroup>
      <InputGroup>
        <InputGroupText>Location:</InputGroupText>
        <Input placeholder="Enter Location" name="location" value={form.location} onChange={handleFormChange} />
      </InputGroup>
      <div style={{ margin: ".5rem 0", display: "flex", justifyContent: "flex-end" }}>
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
}

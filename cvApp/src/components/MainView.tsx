import { useState } from "react";
import InputArea from "./InputArea";
import IGeneralInformation from "../interfaces/IGeneralInformation";
import IEducationInformation from "../interfaces/IEducationInformation";
import IWorkExperience from "../interfaces/IWorkExperience";
import CvArea from "./CvArea";

const initialInfo: IGeneralInformation = {
  name: "",
  email: "",
  phone: "",
  location: "",
};

export const initialEducation: IEducationInformation[] = [
  {
    name: "",
    degree: "",
    startDate: "",
    endDate: "",
  },
];

export const initialWorkExperience: IWorkExperience[] = [
  {
    name: "",
    position: "",
    startDate: "",
    endDate: "",
    duties: "",
  },
];

export default function MainView() {
  const [generalInfo, setGeneralInfo] = useState<IGeneralInformation>(initialInfo);
  const [educationInfo, setEducationInfo] = useState<IEducationInformation[]>(initialEducation);
  const [workExp, setWorkExp] = useState<IWorkExperience[]>(initialWorkExperience);

  return (
    <div style={{ display: "flex", padding: "3rem", justifyContent: "space-around" }}>
      <InputArea
        generalInfo={generalInfo}
        setGeneralInfo={setGeneralInfo}
        educationInfo={educationInfo}
        setEducationInfo={setEducationInfo}
        workExp={workExp}
        setWorkExp={setWorkExp}
      />
      <CvArea generalInfo={generalInfo} educationInfo={educationInfo} workExp={workExp} />
    </div>
  );
}

import IEducationInformation from "../interfaces/IEducationInformation";
import IGeneralInformation from "../interfaces/IGeneralInformation";
import IWorkExperience from "../interfaces/IWorkExperience";
import FormArea from "./FormArea";
import GeneralInput from "./GeneralInput";

interface IProps {
  generalInfo: IGeneralInformation;
  setGeneralInfo: (newInfo: IGeneralInformation) => void;
  educationInfo?: IEducationInformation[];
  setEducationInfo: (newEducation: IEducationInformation[]) => void;
  workExp?: IWorkExperience[];
  setWorkExp: (newWork: IWorkExperience[]) => void;
}
export default function InputArea({ generalInfo, setGeneralInfo, educationInfo, setEducationInfo, workExp, setWorkExp }: IProps) {
  return (
    <div style={{ width: "30%" }}>
      <GeneralInput generalInfo={generalInfo} setGeneralInfo={setGeneralInfo} />
      <FormArea educationInfo={educationInfo} setEducationInfo={setEducationInfo} />
      <FormArea workExp={workExp} setWorkExp={setWorkExp} />
    </div>
  );
}

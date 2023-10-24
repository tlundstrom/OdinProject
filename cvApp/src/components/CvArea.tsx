import IEducationInformation from "../interfaces/IEducationInformation";
import IGeneralInformation from "../interfaces/IGeneralInformation";
import IWorkExperience from "../interfaces/IWorkExperience";
import EducationArea from "./EducationArea";
import ExperienceArea from "./ExperienceArea";
import PersonalInfo from "./PersonalInfo";

interface IProps {
  generalInfo: IGeneralInformation;
  educationInfo: IEducationInformation[];
  workExp: IWorkExperience[];
}

const CvArea = ({ generalInfo, educationInfo, workExp }: IProps) => {
  return (
    <div style={{ width: "8.5in", height: "11in", boxShadow: "0 0 5px 5px gray" }}>
      <PersonalInfo generalInfo={generalInfo} />
      <div style={{ padding: "3rem 0" }}>
        <EducationArea educationInfo={educationInfo} />
        <ExperienceArea workExp={workExp} />
      </div>
    </div>
  );
};

export default CvArea;

import IEducationInformation from "../interfaces/IEducationInformation";
import EducationItem from "./EducationItem";

interface IProps {
  educationInfo: IEducationInformation[];
}

export default function EducationArea({ educationInfo }: IProps) {
  return (
    <>
      {educationInfo[0]?.name.length > 0 && (
        <div style={{ padding: "2rem 4rem" }}>
          <div style={{ display: "flex", alignContent: "center", justifyContent: "center", backgroundColor: "lightgray" }}>
            <h4 style={{ margin: ".3rem 0 " }}>Education</h4>
          </div>
          <div>
            {educationInfo.map((education, index) => {
              return <EducationItem key={`${education.startDate}${education.name}${index}`} education={education} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

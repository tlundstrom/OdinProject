import IEducationInformation from "../interfaces/IEducationInformation";
interface IProps {
  education: IEducationInformation;
}

export default function EducationItem({ education }: IProps) {
  return (
    <>
      {education.name.length > 0 && (
        <div style={{ display: "flex", margin: "1rem 0" }}>
          <div style={{ width: "2in" }}>
            <div>
              {education.startDate} - {education.endDate}
            </div>
            <div>{education.location}</div>
          </div>
          <div>
            <div>
              <strong>{education.name}</strong>
            </div>
            <div>{education.degree}</div>
          </div>
        </div>
      )}
    </>
  );
}

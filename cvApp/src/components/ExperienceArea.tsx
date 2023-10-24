import IWorkExperience from "../interfaces/IWorkExperience";
import ExperienceItem from "./ExperienceItem";

interface IProps {
  workExp: IWorkExperience[];
}
export default function ExperienceArea({ workExp }: IProps) {
  return (
    <>
      {workExp[0]?.name.length > 0 && (
        <div style={{ padding: "2rem 4rem" }}>
          <div style={{ display: "flex", alignContent: "center", justifyContent: "center", backgroundColor: "lightgray" }}>
            <h4 style={{ margin: ".3rem 0 " }}>Professional Experience</h4>
          </div>
          <div>
            {workExp.map((job, index) => {
              return <ExperienceItem key={`${job.startDate}${job.name}${index}`} job={job} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

import IWorkExperience from "../interfaces/IWorkExperience";
interface IProps {
  job: IWorkExperience;
}

export default function ExperienceItem({ job }: IProps) {
  return (
    <>
      {job.name.length > 0 && (
        <div style={{ display: "flex", margin: "1rem 0" }}>
          <div style={{ width: "2in" }}>
            <div>
              {job.startDate} - {job.endDate}
            </div>
            <div>{job.location}</div>
          </div>
          <div>
            <div>
              <strong>{job.name}</strong>
            </div>
            <div>{job.position}</div>
            <div className="jobDuties" style={{ marginTop: ".3rem", maxWidth: "calc(688-2in)" }}>
              {job.duties}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

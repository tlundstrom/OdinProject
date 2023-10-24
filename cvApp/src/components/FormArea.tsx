import IEducationInformation from "../interfaces/IEducationInformation";
import IWorkExperience from "../interfaces/IWorkExperience";
import EducationInput from "./EducationInput";
import WorkInput from "./WorkInput";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button } from "reactstrap";
import { useEffect, useState } from "react";
import { initialEducation, initialWorkExperience } from "./MainView";

interface IProps {
  workExp?: IWorkExperience[];
  setWorkExp?: (newWork: IWorkExperience[]) => void;
  educationInfo?: IEducationInformation[];
  setEducationInfo?: (newEducation: IEducationInformation[]) => void;
}

export default function FormArea({ workExp, setWorkExp, educationInfo, setEducationInfo }: IProps) {
  const [open, setOpen] = useState<string>("0");
  const toggle = (id: string) => {
    if (open === id) {
      setOpen("0");
    } else {
      setOpen(id);
    }
  };
  useEffect(() => {
    if ((educationInfo && educationInfo[0].name === "") || (workExp && workExp[0].name === "")) {
      setOpen("");
    }
  }, []);

  const handleAddEducation = () => {
    if (educationInfo && setEducationInfo) {
      let eduCopy = [...educationInfo];
      eduCopy.push(initialEducation[0]);
      setEducationInfo(eduCopy);
    }
  };
  const handleAddExperience = () => {
    if (workExp && setWorkExp) {
      let workCopy = [...workExp];
      workCopy.push(initialWorkExperience[0]);
      setWorkExp(workCopy);
    }
  };

  if (educationInfo && setEducationInfo) {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between", padding: ".5rem 0" }}>
          <h2>Education</h2> <Button onClick={handleAddEducation}>Add Education</Button>
        </div>

        {
          // @ts-ignore
          <Accordion open={open} toggle={toggle}>
            {educationInfo.map((edu, index) => {
              return (
                <AccordionItem key={`${edu.name}${edu.startDate}${index}`}>
                  <AccordionHeader targetId={`${edu.name}${edu.startDate}`}>{edu.name.length > 0 ? edu.name : "Enter a new school"}</AccordionHeader>
                  <AccordionBody accordionId={`${edu.name}${edu.startDate}`}>
                    <EducationInput
                      key={`${edu.name}${edu.startDate}`}
                      educationInfo={educationInfo}
                      setEducationInfo={setEducationInfo}
                      selectedIndex={index}
                      selectedInput={edu}
                    />
                  </AccordionBody>
                </AccordionItem>
              );
            })}
          </Accordion>
        }
      </>
    );
  }
  if (workExp && setWorkExp) {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between", padding: ".5rem 0" }}>
          <h2>Experience</h2>
          <Button onClick={handleAddExperience}>Add Experience</Button>
        </div>
        {
          // @ts-ignore
          <Accordion open={open} toggle={toggle}>
            {workExp.map((job, index) => {
              return (
                <AccordionItem key={`${job.name}${job.startDate}${index}`}>
                  <AccordionHeader targetId={`${job.name}${job.startDate}`}>
                    {job.name.length > 0 ? job.name : "Enter a new position"}
                  </AccordionHeader>
                  <AccordionBody accordionId={`${job.name}${job.startDate}`}>
                    <WorkInput
                      key={`${job.name}${job.startDate}`}
                      workExp={workExp}
                      setWorkExp={setWorkExp}
                      selectedIndex={index}
                      selectedInput={job}
                    />
                  </AccordionBody>
                </AccordionItem>
              );
            })}
          </Accordion>
        }
      </>
    );
  }
  return <></>;
}

import { ITaskOutput } from "../interfaces/ITaskOutput";

import { TaskColumn } from "./TaskColumn";

interface IProps {
  tasks: ITaskOutput[];
  project: string;
  setTasks: (newTasks: ITaskOutput[]) => void;
  toggleUpdated: () => void;
}

const GetTasksByProject: React.FunctionComponent<IProps> = ({ tasks, project, setTasks, toggleUpdated }: IProps) => {
  let filteredTasks = tasks.filter((task) => task.projectId === project);
  return (
    <div className="GridContainer">
      <TaskColumn priority="Low" tasks={filteredTasks} setTasks={setTasks} toggleUpdated={toggleUpdated} />
      <TaskColumn priority="Medium" tasks={filteredTasks} setTasks={setTasks} toggleUpdated={toggleUpdated} />
      <TaskColumn priority="High" tasks={filteredTasks} setTasks={setTasks} toggleUpdated={toggleUpdated} />
    </div>
  );
};

export default GetTasksByProject;

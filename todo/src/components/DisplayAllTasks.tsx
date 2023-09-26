import { ITaskOutput } from "../interfaces/ITaskOutput";
import { TaskColumn } from "./TaskColumn";

interface IProps {
  tasks: ITaskOutput[];
  setTasks: (newTasks: ITaskOutput[]) => void;
  toggleUpdated: () => void;
}

const DisplayAllTasks: React.FunctionComponent<IProps> = ({ tasks, setTasks, toggleUpdated }: IProps) => {
  return (
    <>
      <div className="GridContainer">
        <TaskColumn priority="Low" tasks={tasks} setTasks={setTasks} toggleUpdated={toggleUpdated} />
        <TaskColumn priority="Medium" tasks={tasks} setTasks={setTasks} toggleUpdated={toggleUpdated} />
        <TaskColumn priority="High" tasks={tasks} setTasks={setTasks} toggleUpdated={toggleUpdated} />
      </div>
    </>
  );
};

export default DisplayAllTasks;

import { useNavigate } from "react-router-dom";
import {
  Add,
  CancelList,
  Circle,
  CircleCheck,
  Clock,
  Complete,
  OnGoing,
  TaskImage,
} from "../../assets/Assets";
import EventCard, { TaskCard } from "../../components/Card/Card";

export default function Home(props) {
  const navigate = useNavigate();
  const status = [
    {
      icon: <OnGoing width="23px" height="23px" />,
      title: "On going",
      color: "bg-blue-400",
      colorI: "bg-blue-300",
      count: props.tasks.filter((data) => data.status === "onGoing").length,
    },
    {
      icon: <Clock width="23px" height="23px" />,
      title: "In process",
      color: "bg-amber-400",
      colorI: "bg-amber-300",
      count: props.tasks.filter((data) => data.status === "inProcess").length,
    },
    {
      icon: <Complete width="23px" height="23px" />,
      title: "Completed",
      color: "bg-teal-400",
      colorI: "bg-teal-300",
      count: props.tasks.filter((data) => data.status === "completed").length,
    },
    {
      icon: <CancelList width="23px" height="23px" />,
      title: "Canceled",
      color: "bg-red-400",
      colorI: "bg-red-300",
      count: props.tasks.filter((data) => data.status === "canceled").length,
    },
  ];
  const handleEdit = (data, i) => {
    navigate("/edit", { state: { data, i } });
  };
  console.log(props.tasks, "props.tasks");
  return (
    <div className="w-full h-full p-5 py-8">
      <div className="w-full">
        <div className="flex justify-between">
          <div>
            <div className="text-4xl font-serif">Hi,User👋</div>
            <div className="text-sm text-gray-500  font-serif">
              Your Daily Adventure Starts Now
            </div>
          </div>
          <div
            className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-lg"
            onClick={() => navigate("/add")}
          >
            <Add />
          </div>
        </div>
        <div className="w-full grid grid-flow-col grid-rows-2 gap-4 py-4 items-center ">
          {status.map((d, i) => (
            <EventCard
              key={i}
              icon={d.icon}
              title={d.title}
              color={d.color}
              colorI={d.colorI}
              count={d.count}
            />
          ))}
        </div>
        <div>
          <div className=" font-serif py-5">Recent Task</div>
          {props.tasks.length === 0 ? (
            <div className="flex justify-center items-center px-5">
              <TaskImage />
            </div>
          ) : (
            <div className="flex flex-col  gap-4">
              {props.tasks.map((data, i) => (
                <TaskCard
                  key={i}
                  data={data}
                  select={
                    data.status === "onGoing" ? <Circle /> : <CircleCheck />
                  }
                  onCompleteTask={() => props.onCompleteTask(i)}
                  onDeleteTask={() => props.onDeleteTask(i)}
                  onEditTask={() => handleEdit(data, i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

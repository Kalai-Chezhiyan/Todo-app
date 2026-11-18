import {
  Add,
  CancelList,
  Circle,
  CircleCheck,
  Clock,
  Complete,
  OnGoing,

} from "../../assets/Assets";
import { formatTimestampForInput } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

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
          <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-lg"
           onClick={() => navigate("/add")}>
            <Add />
          </div>
        </div>
        <div className="w-full grid grid-flow-col grid-rows-2 gap-4 py-4 items-center ">
          {status.map((d, i) => (
            <div
              key={i}
              className={`w-full h-18 rounded-2xl ${d.color} text-black font-bold text-[16px] flex items-center p-3 font-serif`}
            >
              <div
                className={`rounded-4xl bg-blend-darken ${d.colorI} w-10 h-10 top-4 left-3 flex items-center justify-center`}
              >
                {d.icon}
              </div>
              <div className="ml-3">
                <div>{d.title}</div>
                <div className="text-sm text-gray-600  ">{d.count}</div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className=" font-serif py-5">Recent Task</div>
          <div className="flex flex-col  gap-4">
            {props.tasks.map((data, i) => (
              <div
                key={i}
                className="border border-black border-b-8 border-b-black rounded-2xl w-full  p-3 flex justify-between items-center"
              >
                <div>
                  <div className="font-serif font-bold text-2xl ">
                    {data.title}
                  </div>
                  <div className="text-sm text-gray-500">{data.detail}</div>
                  <div className="font-bold">
                    {formatTimestampForInput(data.timestamp)}
                  </div>
                </div>
                <div className=" " onClick={() => props.onCompleteTask(i)}>
                  {data.status === "onGoing" ? <Circle /> : <CircleCheck />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

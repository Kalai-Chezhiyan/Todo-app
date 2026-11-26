import { Cancel } from "../../assets/Assets";
import { formatTimestampForInput } from "../../utils/constants";

export default function EventCard(props) {
  return (
    <div
      className={`w-full h-18 rounded-2xl ${props.color} text-black font-bold text-[16px] flex items-center p-3 font-serif`}
    >
      <div
        className={`rounded-4xl bg-blend-darken ${props.colorI} w-10 h-10 top-4 left-3 flex items-center justify-center`}
      >
        {props.icon}
      </div>
      <div className="ml-3">
        <div>{props.title}</div>
        <div className="text-sm text-gray-600  ">{props.count}</div>
      </div>
    </div>
  );
}

export const TaskCard = (props) => {
  return (
    <div className="border border-black border-b-8 border-b-black rounded-2xl w-full  p-3 flex justify-between items-center">
      <div>
        <div
          className="font-serif font-bold text-2xl capitalize"
          onClick={props.onEditTask}
        >
          {props.data.title}
        </div>
        <div className="text-sm text-gray-500">{props.data.detail}</div>
        <div className="font-bold">
          {formatTimestampForInput(props.data.timestamp)}
        </div>
      </div>
      <div className="flex gap-4 items-center ">
        <div
          className="flex justify-center items-center "
          onClick={props.onDeleteTask}
        >
          <Cancel />
        </div>
        <div onClick={props.onCompleteTask}>{props.select}</div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { Apps, Attach, Cancel, FontType, Search } from "../../assets/Assets";
import { useNavigate } from "react-router-dom";
import { formatTimestampForInput } from "../../utils/constants";

export default function Add(props) {
  const navigate = useNavigate();

  const [value, setValue] = useState({
    title: "",
    timestamp: +new Date(),
    detail: "",
    category: [],
    status: "onGoing",
  });
  const categoryData = [
    "Design",
    "Development",
    "Coding",
    "Meeting",
    "Office Time",
    "User Experiance",
  ];

  return (
    <form
      className="p-5 w-full h-full flex flex-col justify-between"
      onSubmit={(e) => {
        if (e) e.preventDefault();
        console.log(value, "value");

        props.setTasks((pre) => [...pre, value]);

        setValue({
          title: "",
          timestamp: +new Date(),
          detail: "",
          category: [],
          status: "onGoing",
        });
      }}
      onChange={(e) => {
        setValue((pre) => {
          if (e.target.name === "timestamp") {
            const dateString = e.target.value; // e.g., "2026-10-30"

            // Convert to milliseconds timestamp
            const msTimestamp = new Date(dateString).getTime();
            return { ...pre, [e.target.name]: msTimestamp };
          } else {
            return { ...pre, [e.target.name]: e.target.value };
          }
        });
      }}
    >
      <div className="">
        <div className="flex justify-between py-2 ">
          <div
            className="border border-white bg-gray-100 rounded-lg w-12 h-12  flex justify-center py-2 "
            onClick={() => navigate("/")}
          >
            <Cancel />
          </div>
          <div className="border border-white bg-gray-100 rounded-lg w-12 h-12 flex justify-center py-2 ">
            <Search />
          </div>
        </div>
        <div className=" text-2xl font-bold py-2.5">New Tasks</div>
        <div className="w-full py-2">
          <div>
            <input
              name="title"
              type="text"
              placeholder="Task Title"
              className="border border-black border-b-8 border-b-black rounded-2xl w-full h-15 px-3"
              value={value.title}
            />
          </div>
          <div className="pt-8">
            <input
              name="timestamp"
              type="Date"
              placeholder="timestamp"
              className="border border-black border-b-8 border-b-black rounded-2xl w-full h-15 px-3"
              value={formatTimestampForInput(value.timestamp)}
            />
          </div>
          <div className="flex pt-8  relative ">
            <input
              name="assignee"
              type="text"
              placeholder="Assignee"
              className="border border-black border-b-8 border-b-black rounded-2xl w-full h-15 px-3"
              value={value.assignee}
            />
            <div className="py-3 absolute right-3 top-[40%] ">
              <Search width="20px" height="20px" />
            </div>
          </div>
          <div className="pt-8">
            <input
              name="detail"
              type="text"
              placeholder="Task Detail"
              className="border border-black border-b-8 border-b-black rounded-2xl w-full h-30 px-3 focus:outline-none"
              value={value.detail}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-end">
            <Apps />
            <div className="px-5">
              <FontType />
            </div>
            <Attach />
          </div>
        </div>
        <div>
          <div>
            <div className="text-xl font-bold py-3">Catagory</div>
            <div className="flex justify-between w-full gap-1 gap-y-4 flex-wrap ">
              {console.log(value, "value")}
              {categoryData.map((category, index) => (
                <div
                  className={` rounded-lg h-10  px-3 py-2 ${value.category.includes(category) ? "border-red-50 border-2 bg-amber-400" : " bg-gray-100."}`}
                  key={index}
                  onClick={() => {
                    if (value.category.includes(category)) {
                      setValue((pre) => ({
                        ...pre,
                        category: pre.category.filter(
                          (data) => data !== category,
                        ),
                      }));
                    } else {
                      setValue((pre) => ({
                        ...pre,
                        category: [...pre.category, category],
                      }));
                    }
                  }}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
          <div className="py-2"></div>
        </div>
        <div className="flex justify-between py-2">
          <div>Get alert for this task </div>
          <div>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round w-12 h-6"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="">
        <div className="py-2">
          <button
            type="submit"
            className=" bg-red-400 text-white w-full h-13 rounded-2xl "
          >
            CREATE TASK
          </button>
        </div>
      </div>
    </form>
  );
}

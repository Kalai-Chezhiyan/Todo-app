import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cancel } from "../../assets/Assets";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { formatTimestampForInput } from "../../utils/constants";

export default function Add(props) {
  const navigate = useNavigate();

  const [value, setValue] = useState({
    title: "",
    timestamp: +new Date(),
    detail: "",
    assignee: "",
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
  const startOfToday = new Date().setHours(0, 0, 0, 0);
  const isAllFilled =
    value.title.trim() !== "" &&
    value.timestamp >= startOfToday &&
    value.detail.trim() !== "" &&
    value.assignee.trim() !== "";
  console.log(isAllFilled, "isAllFilled");
  const handleChange = (e) => {
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
  };
  return (
    <form
      className="p-5 w-full h-full flex flex-col justify-between"
      onSubmit={(e) => {
        if (e) e.preventDefault();
        console.log(value, "value");
        if (!isAllFilled) return;
        props.setTasks((pre) => [...pre, value]);

        setValue({
          title: "",
          timestamp: +new Date(),
          detail: "",
          assignee: "",
          category: [],
          status: "onGoing",
        });
        navigate("/");
      }}
    >
      <div className="">
        <div className="flex justify-between py-2 ">
          <div className=" text-2xl font-bold py-2.5">New Tasks</div>
          <div
            className="border border-white bg-gray-100 rounded-lg w-12 h-12  flex justify-center py-2 "
            onClick={() => navigate("/")}
          >
            <Cancel />
          </div>
        </div>
        <div className="w-full py-2">
          <div>
            <Input
              name="title"
              type="text"
              placeholder="Task Title"
              value={value.title}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="pt-8">
            <Input
              name="timestamp"
              type="date"
              placeholder="Date"
              value={formatTimestampForInput(value.timestamp)}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="flex pt-8  relative ">
            <Input
              name="assignee"
              type="text"
              placeholder="Assignee"
              value={value.assignee}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="pt-8">
            <Input
              name="detail"
              type="text"
              placeholder="Task Detail"
              height="h-30"
              value={value.detail}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <div>
            <div className="text-xl font-bold py-8">Catagory</div>
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
      </div>

      <div className="">
        <div className="py-2">
          <Button label="CREATE TASK" type="submit" disabled={!isAllFilled} />
        </div>
      </div>
    </form>
  );
}

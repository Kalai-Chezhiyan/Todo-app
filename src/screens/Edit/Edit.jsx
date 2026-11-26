import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Apps, Attach, Cancel, FontType, Search } from "../../assets/Assets";
import { formatTimestampForInput } from "../../utils/constants";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

export default function Edit(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const taskIndex = location.state?.i ?? Number(id);
  const exixtingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const selectedTasks = location.state?.data || exixtingTasks[taskIndex] || {};
  const [editTasks, setEditTasks] = useState({
    title: selectedTasks.title || "",
    timestamp: +new Date(),
    detail: selectedTasks.detail || "",
    assignee: selectedTasks.assignee,
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
    editTasks.title.trim() !== "" &&
    editTasks.timestamp >= startOfToday &&
    editTasks.detail.trim() !== "" &&
    editTasks.assignee.trim() !== "";
  console.log(isAllFilled, "isAllFilled");
  const handleSave = (e) => {
    e.preventDefault();
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    allTasks[taskIndex] = { ...allTasks[taskIndex], ...editTasks };
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    props.setTasks(allTasks);
    navigate("/");

    if (!isAllFilled) return;
  };
  const handleChange = (e) => {
    setEditTasks((pre) => {
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
      onSubmit={handleSave}
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
        <div className=" text-2xl font-bold py-2.5">Edit Tasks</div>
        <div className="w-full py-2">
          <div>
            <Input
              name="title"
              type="text"
              placeholder="Task Title"
              onChange={handleChange}
              value={editTasks.title}
              required
            />
          </div>
          <div className="pt-8">
            <Input
              name="timestamp"
              type="Date"
              placeholder="timestamp"
              onChange={handleChange}
              value={formatTimestampForInput(editTasks.timestamp)}
            />
          </div>
          <div className="flex pt-8  relative ">
            <Input
              name="assignee"
              type="text"
              placeholder="Assignee"
              onChange={handleChange}
              value={editTasks.assignee}
              required
            />
            <div className="py-3 absolute right-3 top-[40%] ">
              <Search width="20px" height="20px" />
            </div>
          </div>
          <div className="pt-8">
            <Input
              name="detail"
              type="text"
              placeholder="Task Detail"
              height=" h-30"
              onChange={handleChange}
              value={editTasks.detail}
              required
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
              {categoryData.map((category, index) => (
                <div
                  className={` rounded-lg h-10  px-3 py-2 ${editTasks.category.includes(category) ? "border-red-50 border-2 bg-amber-400" : " bg-gray-100."}`}
                  key={index}
                  onClick={() => {
                    if (editTasks.category.includes(category)) {
                      setEditTasks((pre) => ({
                        ...pre,
                        category: pre.category.filter(
                          (data) => data !== category,
                        ),
                      }));
                    } else {
                      setEditTasks((pre) => ({
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
          <Button type="submit" label="EDIT TASK" disabled={!isAllFilled} />
        </div>
      </div>
    </form>
  );
}

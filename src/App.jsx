import { useState } from "react";

function App() {
  const [value, setValue] = useState({ task: "", timestamp: null });
  const [task, setTask] = useState([]);
  const onAdd = (e) => {
    if (e) e.preventDefault();
    if (!value.task.trim()) return;
    setTask((pre) => [...pre, value]);
    setValue({ task: "", timestamp: null });
  };
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  const onDelete = (indexToDelete) => {
    setTask((pre) => pre.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className=" w-full min-h-screen bg-cyan-700">
      <div className="text-center p-8 text-2xl  border-2 bg-gray-800 flex justify-center">
        <div className="border-2 border-cyan-600 w-60 rounded-3xl bg-white">
          TO DO APP
        </div>
      </div>

      <div className="flex justify-center pt-30 w-full h-full">
        <div>
          <div>
            <form onSubmit={onAdd} className="flex">
              <input
                type="text"
                placeholder="ENTER TASK TO DO..."
                className="border-2 border-[black] w-105 h-9 text-center rounded-2xl bg-cyan-50"
                value={value.task}
                onChange={(e) =>
                  setValue({ task: e.target.value, timestamp: +new Date() })
                }
              />
              <div className="px-5 py-1">
                <button
                  type="submit"
                  className="border-2 border-green-500 bg-cyan-200 w-25"
                >
                  ADD
                </button>
              </div>
            </form>
          </div>
          <div className="text-center pr-12 pt-5">
            LISTS OF TASK TO DO!
            {task.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border border-gray-900 bg-cyan-950 w-130 text-white font-bold gap-y-1.5"
              >
                <div>{item.task}</div>
                <div>{formatDate(item.timestamp)}</div>
                <button>EDIT</button>
                <button onClick={() => onDelete(index)}>DELETE</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;

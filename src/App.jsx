import { Route, Routes } from "react-router-dom";
import Add from "./screens/Add/Add.jsx";
import Home from "./screens/Home/Home.jsx";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")).length>0?JSON.parse(localStorage.getItem("tasks")):[]);
  console.log(tasks, "tasks");

  const handleCompleteTask = (clickedIndex) => {
    setTasks((pre) =>
      pre.map((task, index) =>
        index === clickedIndex
          ? {
              ...task,
              status: task.status === "completed" ? "onGoing" : "completed",
            }
          : task,
      ),
    );
  };
useEffect(() => {
  console.log("started")
localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log("ended")
 
}, [tasks])

  return (
    <Routes>
      <Route
        path="/"
        element={<Home tasks={tasks} onCompleteTask={handleCompleteTask} />}
      />
      <Route path="/add" element={<Add tasks={tasks} setTasks={setTasks} />} />
    </Routes>
  );
}
export default App;

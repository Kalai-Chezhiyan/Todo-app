import { Route, Routes } from "react-router-dom";
import Add from "./screens/Add/Add.jsx";
import Home from "./screens/Home/Home.jsx";
import { useEffect, useState } from "react";
import Edit from "./screens/Edit/Edit.jsx";
import Login from "./screens/Login/Login.jsx";
import SIgnIn from "./screens/SignIn/SIgnIn.jsx";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")).length > 0
      ? JSON.parse(localStorage.getItem("tasks"))
      : [],
  );
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
  const handleDelete = (indexToDelete) => {
    setTasks((pre) => pre.filter((_, index) => index !== indexToDelete));
  };

  useEffect(() => {
    console.log("started");
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("ended");
  }, [tasks]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            tasks={tasks}
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDelete}
          />
        }
      />
      <Route path="/add" element={<Add tasks={tasks} setTasks={setTasks} />} />
      <Route
        path="/edit"
        element={<Edit tasks={tasks} setTasks={setTasks} />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signIn" element={<SIgnIn />} />
    </Routes>
  );
}
export default App;

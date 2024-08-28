import { useState, useEffect } from "react";
import Bucket from "./components/Bucket";
import Form from "./components/Form";

function App() {
  // {
  //   task:string,
  //   priority:string,
  //   complete:boolean,
  //   id:UUID
  // }

  const [tasks, setTasks] = useState([
    {
      id: crypto.randomUUID(),
      task: "take a nap",
      priority: "med",
      complete: false,
    },
    {
      id: crypto.randomUUID(),
      task: "eat lunch",
      priority: "high",
      complete: true,
    },
    {
      id: crypto.randomUUID(),
      task: "finish the lego cat",
      priority: "low",
      complete: true,
    },
  ]);
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2VAam9lLmpvZSIsImlhdCI6MTcyNDg2NTc2MiwiZXhwIjoxNzI0ODcyOTYyfQ.3EBGcXSCsHhZLWZnkBtlGIC5XkxDaRQuyaYbLImj8OM";
    fetch("http://localhost:3001/api/users/secret", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addTask = (taskObj) => {
    taskObj.id = crypto.randomUUID();
    setTasks([...tasks, taskObj]);
  };

  const toggleComplete = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.complete = !task.complete;
      }
      return task;
    });
    setTasks(newTasks);
  };
  const editTask = (taskObj) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskObj.id) {
        return taskObj;
      }
      return task;
    });
    setTasks(newTasks);
  };
  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  return (
    <>
      <h1>My app</h1>
      <Form submitHandler={addTask} mode={"create"} />
      {tasks.map((task) => (
        <Bucket
          key={task.id}
          id={task.id}
          task={task.task}
          priority={task.priority}
          complete={task.complete}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </>
  );
}

export default App;

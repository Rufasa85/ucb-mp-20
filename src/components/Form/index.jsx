import React, { useState } from "react";
import "./style.css";

const Form = (props) => {
  const [task, setTask] = useState(props.task || "");
  const [priority, setPriority] = useState(props.priority || "med");

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskObj = {
      task: task,
      priority: priority,
      complete: props.complete || false,
    };
    if (props.id) {
      taskObj.id = props.id;
    }
    props.submitHandler(taskObj);
    if (props.mode == "edit") {
      props.closeForm();
    } else {
      setTask("");
      setPriority("med");
    }
  };
  return (
    <form className="Form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="task"
        placeholder="task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <select
        name="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low"> Low</option>
        <option value="med"> Medium</option>
        <option value="high"> High</option>
      </select>
      {props.mode === "create" ? (
        <button>Add item</button>
      ) : (
        <>
          <button>Edit item</button>
          <button onClick={props.closeForm}>Cancel</button>
        </>
      )}
    </form>
  );
};

export default Form;

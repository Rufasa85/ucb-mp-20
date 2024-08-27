import React, { useState } from "react";
import "./style.css";
import Form from "../Form";
const Bucket = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div
      className={`Bucket ${props.priority} ${props.complete ? "complete" : ""}`}
    >
      {!isEditing ? (
        <>
          <h3>{props.task}</h3>
          <h3>Priority: {props.priority}</h3>
          <div className="button-spot">
            <button onClick={() => props.toggleComplete(props.id)}>
              {props.complete ? "mark as not complete" : "complete"}
            </button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => props.deleteTask(props.id)}>Delete</button>
          </div>
        </>
      ) : (
        <Form
          mode="edit"
          submitHandler={props.editTask}
          id={props.id}
          task={props.task}
          priority={props.priority}
          complete={props.complete}
          closeForm={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default Bucket;

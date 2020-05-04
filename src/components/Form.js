import React, { useState, useContext } from "react";
import { AlertContext } from "./../context/alert/alertContext";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Form = () => {
  const [value, setValue] = useState("");
  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

  const submitHandler = (event) => {
    event.preventDefault();

    if (value.trim()) {
      firebase
        .addNote(value.trim())
        .then(() => {
          alert.show("Your note was created", "success");
        })
        .catch(() => {
          alert.show("Something went wrong", "danger");
        });
      setValue("");
    } else {
      alert.show("Enter note name!");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          placeholder="Name of note"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
      </div>
    </form>
  );
};

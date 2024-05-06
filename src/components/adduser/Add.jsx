import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./add.css";
import toast from "react-hot-toast";

const Add = () => {
  const users = {
    title: "",
    author: "",
    genre: "",
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/api/create", user)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="addUser">
      <Link to={"/"}>
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <h3>Add New Book </h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="title">Book Name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="title"
            name="title"
            autoComplete="off"
            placeholder="Title name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="author">Author name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="author"
            name="author"
            autoComplete="off"
            placeholder="Author name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            onChange={inputHandler}
            id="genre"
            name="genre"
            autoComplete="off"
            placeholder="Genre"
          />
        </div>
        <div className="inputGroup">
          <button type="submit">ADD Book</button>
        </div>
      </form>
    </div>
  );
};

export default Add;

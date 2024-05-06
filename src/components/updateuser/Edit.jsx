import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../adduser/add.css";
import toast from "react-hot-toast";

const Edit = () => {
  const users = {
    title: "",
    author: "",
    genre: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(users);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/getone/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8000/api/update/${id}`, user)
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
      <h3>Update Book</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="title">First name</label>
          <input
            type="text"
            value={user.title}
            onChange={inputChangeHandler}
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
            value={user.author}
            onChange={inputChangeHandler}
            id="author"
            name="author"
            autoComplete="off"
            placeholder="author name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            value={user.genre}
            onChange={inputChangeHandler}
            id="genre"
            name="genre"
            autoComplete="off"
            placeholder="genre"
          />
        </div>
        <div className="inputGroup">
          <button type="submit">UPDATE Books</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./user.css";
import { Link } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/getall");
      setUsers(response.data);
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:8000/api/delete/${userId}`)
      .then((respones) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success(respones.data.msg, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="userTable">
      <Link to={"/add"} className="addButton">
        Add Book
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Title </th>
            <th>Author Name</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.title}</td>
                <td>{user.author}</td>
                <td>
                  <div className="tooltip">
                    <span className="tooltiptext">{user.genre}</span>
                    {user.genre.length > 20
                      ? user.genre.substring(0, 20) + "..."
                      : user.genre}
                  </div>
                </td>

                <td className="actionButtons">
                  <button onClick={() => deleteUser(user._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <Link to={`/edit/` + user._id}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
// const AddressTooltip = ({ genre }) => {
//   return (
//     <div className="tooltip">
//       <span className="tooltiptext">{genre}</span>
//       {genre.length > 20 ? genre.substring(0, 20) + "..." : genre}
//     </div>
//   );
// };
export default User;

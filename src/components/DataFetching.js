import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import UserDetails from "./UserDetails";

function DataFetching() {
  const [users, setUsers] = useState([]);
  const [userIdPostMap, setUserIdPostMap] = useState({});
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));

    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => updateUserPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const updateUserPosts = (posts) => {
    let userPostsMap = {};
    posts.forEach((post) => {
      if (userPostsMap[post.userId]) userPostsMap[post.userId]++;
      else userPostsMap[post.userId] = 1;
    });
    setUserIdPostMap(userPostsMap);
  };

  const updateUserDetails = (userId) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => setUserDetails(res.data))
      .catch((err) => console.log(err));
  };

  const getRows = () => {
    return users.map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{userIdPostMap[user.id] || "-"}</td>
          <td>
            <button onClick={() => updateUserDetails(user.id)}>
              Get Details
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <table id="primary">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Username</th>
          <th>No.of Posts</th>
          <th>Button</th>
        </tr>
        {getRows(users)}
      </table>

      {userDetails && <UserDetails data={userDetails} />}
    </div>
  );
}

export default DataFetching;

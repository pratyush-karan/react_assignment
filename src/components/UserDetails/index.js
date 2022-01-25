import React, { useState, useEffect } from "react";
import PostDetails from "./PostDetails";
import "./userDetails.css";
import axios from "axios";

function UserDetails({ data }) {
  const [posts, setPosts] = useState([]);
  const [commentsList, setCommentList] = useState([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${data.id}/posts`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const updateCommentsInPost = (postId) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((res) => setCommentList(res.data))
      .catch((err) => console.log(err));
  };

  const getRows = () => {
    return posts.map((post, index) => {
      return (
        <tr key={index}>
          <td>{post.title}</td>
          <td>{commentsList.length}</td>
          <td>
            <button onClick={() => updateCommentsInPost(post.id)}>
              Get Comments
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="user-details">
      <h1>User Details:</h1>
      {/* <div>{JSON.stringify(data)}</div> */}
      <div class="flex-container">
        <div>
          <b>Id-</b> {data.id}
        </div>
        <div>
          <b>Name-</b> {data.name}
        </div>
        <div>
          <b>Username-</b> {data.username}
        </div>
        <div>
          <b>Email-</b> {data.email}
        </div>
        <div>
          <b>Address- </b>
          {data.address.city}
        </div>
        <div>
          <b>Phone- </b>
          {data.phone}
        </div>
        <div>
          <b>Website-</b> {data.website}
        </div>
        <div>
          <b>Company-</b> {data.company.name}
        </div>
      </div>
      {/* {console.log(data.name)} */}
      <h1>Posts:</h1>
      <table id="primary">
        <tr>
          <th>Title</th>
          <th># of comments</th>
          <th>actions</th>
        </tr>
        {getRows()}
      </table>
      {commentsList.length && <PostDetails data={commentsList} />}
    </div>
  );
}

export default UserDetails;

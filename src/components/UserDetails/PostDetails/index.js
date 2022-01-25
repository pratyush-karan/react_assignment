import React from "react";

function PostDetails({ data }) {
  const getRows = () => {
    return data.map((comment, index) => {
      return (
        <tr key={index}>
          <td>{comment.id}</td>
          <td>{comment.name}</td>
          <td>{comment.email}</td>
          <td>{comment.body}</td>
        </tr>
      );
    });
  };

  return (
    <div className="user-details">
      <h1>Post Details:</h1>
      <table id="primary">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Body</th>
        </tr>
        {getRows()}
      </table>
    </div>
  );
}

export default PostDetails;

import React, { useState } from "react";
import { EditablePost } from "./EditablePost";

const EditablePostsList = (props) => {
  const { posts, onFormSubmit, onTrashClick } = props;
  const Posts = posts.map((post) => (
    <EditablePost
      key={post.id}
      id={post.id}
      title={post.title}
      onFormSubmit={onFormSubmit}
      onTrashClick={onTrashClick}
    />
  ));
  return <>{Posts}</>;
};

export default EditablePostsList;

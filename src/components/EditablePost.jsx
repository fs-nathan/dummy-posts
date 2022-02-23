import React, { useState } from "react";
import { Post } from "./Post";
import { PostForm } from "./PostForm";

export const EditablePost = (props) => {
  const { id, title, onFormSubmit, onTrashClick } = props;
  const [editFormOpen, setEditFormOpen] = useState(false);

  const closeForm = () => {
    setEditFormOpen(false);
  };

  const openForm = () => {
    setEditFormOpen(true);
  };

  const handleSubmit = (post) => {
    onFormSubmit(post);
    closeForm();
  };

  const handleFormClose = null;
  return (
    <>
      {editFormOpen && (
        <PostForm
          id={id}
          title={title}
          onFormSubmit={handleSubmit}
          onFormClose={closeForm}
        />
      )}
      {!editFormOpen && (
        <Post
          id={id}
          title={title}
          onEditClick={openForm}
          onTrashClick={onTrashClick}
        />
      )}
    </>
  );
};

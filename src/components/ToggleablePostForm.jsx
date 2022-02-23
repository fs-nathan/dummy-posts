import React, { useState } from "react";
import { PostForm } from "./PostForm";

export const ToggleablePostForm = (props) => {
  const { onFormSubmit } = props;
  const [open, setOpen] = useState(false);
  const handleFormSubmit = (post) => {
    onFormSubmit(post);
    setOpen(false);
  };
  return (
    <>
      {open && (
        <PostForm
          onFormSubmit={handleFormSubmit}
          onFormClose={() => setOpen(false)}
        />
      )}
      {!open && (
        <div className="ui basic content center aligned segment">
          <button
            className="ui basic button icon"
            onClick={() => {
              setOpen(true);
            }}
          >
            <i className="plus icon" />
          </button>
        </div>
      )}
    </>
  );
};

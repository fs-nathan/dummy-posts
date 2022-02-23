import React, { useState } from "react";

export const Post = (props) => {
  const { id, title, onEditClick, onTrashClick } = props;
  return (
    <div className="ui centered card">
      <div className="content">
        <div className="header">{title}</div>
        <div className="extra content">
          <span className="right floated edit icon" onClick={onEditClick}>
            <i className="edit icon" />
          </span>
          <span
            className="right floated trash icon"
            onClick={() => {
              onTrashClick(id);
            }}
          >
            <i className="trash icon" />
          </span>
        </div>
      </div>
    </div>
  );
};

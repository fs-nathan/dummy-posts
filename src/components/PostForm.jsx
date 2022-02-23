import React, { useState } from "react";
import _ from "lodash";
export const PostForm = (props) => {
  const { id, title, onFormClose, onFormSubmit } = props;
  const [fields, setFields] = useState({ title: title || "" });
  const handleFieldChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };
  const handleSubmit = () => {
    onFormSubmit({ id, title: fields.title });
  };
  return (
    <div className="ui centered card">
      <div className="content">
        <div className="ui form">
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              value={fields.title}
              onChange={handleFieldChange}
              name="title"
            />
          </div>
          <div className="ui two bottom attached buttons">
            <button className="ui basic blue button" onClick={handleSubmit}>
              {_.isEmpty(id) ? "Create" : "Update"}
            </button>
            <button className="ui basic red button" onClick={onFormClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

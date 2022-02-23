import React, { useState } from "react";
import ApiClient from "../utils/api-client";
import _ from "lodash";

export const LoginForm = (props) => {
  const { onLoginSucceeded } = props;
  const [fields, setFields] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onInputChange = (evt) => {
    const data = Object.assign({}, fields);
    data[evt.target.name] = evt.target.value;
    setFields(data);
  };

  const onFormSubmit = () => {
    setLoading(true);
    ApiClient.login(
      fields,
      (user) => {
        setLoading(false);
        onLoginSucceeded(user);
      },
      (err) => {
        setLoading(false);
      }
    );
  };

  return (
    <>
      {loading && (
        <div className="ui active dimmer">
          <div className="ui loader"></div>
        </div>
      )}

      {!loading && (
        <div className="ui centered card">
          <div className="content">
            <div className="ui form">
              <form autoComplete="off">
                <div className="field">
                  <label>Username</label>
                  <input
                    type="text"
                    value={fields.username}
                    onChange={onInputChange}
                    name="username"
                  />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input
                    type="password"
                    value={fields.password}
                    onChange={onInputChange}
                    name="password"
                  />
                </div>
              </form>
              <div className="ui two bottom attached buttons">
                <button className="ui basic blue button" onClick={onFormSubmit}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

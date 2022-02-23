import React, { useState } from "react";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { PostsPage } from "./components/PostsPage";
const App = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState({});
  return (
    <>
      {!_.isEmpty(authenticatedUser) ? (
        <PostsPage owner={authenticatedUser} />
      ) : (
        <LoginForm
          onLoginSucceeded={(user) => {
            setAuthenticatedUser(user);
          }}
        />
      )}
    </>
  );
};

export default App;

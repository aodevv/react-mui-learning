import React from "react";
import LoginForm from "../../Components/Forms/LoginForm/LoginForm";

const Login = ({ setIsLoggedIn }) => {
  return (
    <div>
      <LoginForm setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
};

export default Login;

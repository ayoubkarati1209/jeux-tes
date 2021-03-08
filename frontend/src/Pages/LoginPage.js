import React from 'react';
import makeToast from "../Toaster";
// Modules
import axios from 'axios';
// MUI Core
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import { Route , withRouter} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

const LoginPage= (props) => {
    const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const classes = useStyles();
  const loginUser = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    axios
      .post("http://localhost:8000/user/login", {
        email,
        password,
      })
      .then((response) => {
        makeToast("success", response.data.message);
        console.log(response.data);
        localStorage.setItem("CC_Token", response.data.token);
        props.history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        )
          makeToast("error", err.response.data.message);
      });
    };
  return (
    <div className="card">
    <div className="cardHeader">Login</div>
    <div className="cardBody">
      <div className="inputGroup">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="abc@example.com"
          ref={emailRef}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Your Password"
          ref={passwordRef}
        />
      </div>
      <button onClick={loginUser}>Login</button>
    </div>
  </div>
  );
};

export default withRouter(LoginPage);
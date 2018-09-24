import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import UserController from '../../controller/UserController.js';
import app from '../../firebase.js';
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory();

const userCtrl = new UserController();

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        username: '',
        password: '',
      },
      submitted: false
    }

    this.authWithEmailPAssword = this.authWithEmailPAssword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit() {
    console.log("Inside handle submit");

    // event.preventDefault();
    this.setState({
      submitted: true
    });
    const user = {
      username: this.state.username,
      password: this.state.password
    }

    if (this.state.submitted === true && (user.username === '' || user.password === '')) {
      console.log("null");
      // history.push('/login');
      // window.location.href = '/login';
    }

    else {
      console.log("else");
      userCtrl.login(user);
    }
  }

  authWithEmailPAssword() {
    console.log("Inside authentication");

    app.auth().fetchSignInMethodsForEmail(this.state.username).then((provider) => {
      console.log("Provider : " + provider);
      console.log(this.state.username);
      // app.auth().fetchProvidersForEmail(this.state.username).then((provider) => {
      if (provider.length === 0) {
        console.log("Inside if");

        this.handleSubmit();
        return app.auth().createUserWithEmailAndPassword(this.state.username, this.state.password);
      }
      else if (provider.indexOf("password") === -1) {
        console.log("Try alternate");
      }
      else {
        console.log("Inside else");
        this.handleSubmit();
        return app.auth().signInWithEmailAndPassword(this.state.username, this.state.password);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Card className="card">
          <header>
            <div className="title">
              <h1>Login</h1>
            </div>
          </header>

          <div className="container">
            <form>
              {/* <form onSubmit={this.handleSubmit}> */}
              <CardContent>
                <TextField
                  id="username"
                  label="Username"
                  type="text"
                  margin="normal"
                  required
                  onChange={this.handleChange} value={this.state.username}
                />
                <br />

                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  margin="normal"
                  required
                  onChange={this.handleChange} value={this.state.password}
                />
                <br />
              </CardContent>

              <CardActions className="cardAction">
                {/* onClick={this.authWithEmailPAssword} */}
                <Button className="actions" onClick={this.authWithEmailPAssword} variant="contained" color="primary">
                  Login
                </Button>

                <Button className="actions" variant="contained" href='/register'>
                  Register
                </Button>
              </CardActions>

              <div className="forgotPwd">
                <Button color="primary" className="forgotPwdBtn" href='/forgotPassword'>
                  Forgot Password?
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    );
  }
}

export default LoginPage;
import React, { Component } from "react";
import { default as session } from "../../services/authentication-service";
import "./login-component.css";
class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      hasLoginFailed: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  render() {
    return (
      <>
        <div className="row justify-content-center align-items-center p-5">
          <div className="col-md-4 col-sm-12">
            <form className="card p-5">
              <h1>Login</h1>
              {this.state.hasLoginFailed && (
                <div className="alert alert-danger">Invalid Credentials</div>
              )}
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  className="form-control"
                  aria-describedby="emailHelp"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onSubmit}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit() {
    session
      .executeJwtAuthentication(this.state.email, this.state.password)
      .then((response) => {
        session.registerSuccessfulLogin(response.data.token);
      })
      .catch(() => {
        this.setState({ hasLoginFailed: true });
      });
  }
}

export default LoginComponent;

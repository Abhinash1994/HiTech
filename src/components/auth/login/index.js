import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './logo-dark.png'
import './login.css'
import API from '../../api';

export default class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            emailerror: '',
            passworderror: '',
            redirectToReferrer: false,
        }
        this.handleUser = this.handleUser.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        // this.validate = this.validate.bind(this);
    }
    handleForgetPassword() {
        let path = `/auth/forget`;
        this.props.history.push(path);
    }
    handleUser(e) {
        this.setState({ email: e.target.value })
    }
    handlePassword(p) {
        this.setState({ password: p.target.value })
    }
    validate = () => {
        let emailerror = '';
        let passworderror = '';
        if (!this.state.password) {
            passworderror = "password cannot be blank"
        }
        if (!this.state.email.includes("@")) {
            emailerror = 'Enter valid email'
        }
        if (emailerror || passworderror) {
            this.setState({ emailerror: emailerror, passworderror: passworderror })
            return false
        }
        return true
    }
    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            new API().getHttpClient('http://visa.enverhq.com').post('/login', {
                email: this.state.email,
                password: this.state.password
            }).then((res) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', res.data.username);
                window.location = '/admin';
            })
                .catch(error => {
                    toast.error("Invalid Creditionals !!");
                })
        }
    }
    render() {
        if (this.state.redirectToReferrer || sessionStorage.getItem('token')) {
            return (<Redirect to={'/auth/login'} />)
        }
        return (
            <div className="d-flex align-items-center justify-content-center text-center h-100vh">
                <div className="form-wrapper m-auto" >
                    <div className="form-container my-4">

                        <div className="panel">
                            <div className="panel-header text-center mb-3">
                                <img src={logo} className="brand_logo" alt="Logo" />

                                <h3 className="fs-24">Sign into your account!</h3>
                                <p className="text-muted text-center mb-0">Nice to see you! Please log in with your account.</p>
                            </div>


                            <form className="register-form" >
                                <div className="form-group">
                                    <input type="email" className={this.state.emailerror ? "form-control is-invalid" : 'form-control'} value={this.state.email}
                                        onChange={this.handleUser} placeholder="Enter email" />
                                    {this.state.emailerror ? <div className="invalid-feedback text-left" style={{ color: 'red' }}>{this.state.emailerror}</div> : null}
                                </div>
                                <div className="form-group">
                                    <input type="password" className={this.state.passworderror ? "form-control is-invalid" : 'form-control'} value={this.state.password}
                                        onChange={this.handlePassword} placeholder="Password" />
                                    {this.state.passworderror ? <div className="invalid-feedback text-left">{this.state.passworderror}</div> : null}
                                </div>

                                <button type="submit" onClick={this.handleSubmit} className="btn btn-success btn-block">Sign in</button><ToastContainer autoClose={1500} />
                            </form>

                            <div className="forgetpass" onClick={(e) => this.handleForgetPassword(e)}><p>forget password ? </p></div>
                            <p className="text-muted text-center mt-4">Copyright © 2019 Hi-Tek Inc. All Rights Reserved</p>

                        </div>

                    </div>
                </div>
            </div>




        );
    }
}
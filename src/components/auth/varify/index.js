import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './logo-dark.png'
import API from '../../api';

export default class Otp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            otp:"",
            passworderror: '',
            otperror:'',
            redirectToReferrer: false,
        }
        this.handlePassword = this.handlePassword.bind(this);
    }
    handleOtp(e) {
        this.setState({ otp: e.target.value })
    }
    handlePassword(p) {
        this.setState({ password: p.target.value })
    }
    validate = () => {
        let passworderror = '';
        let otperror = '';
        if (!this.state.password) {
            passworderror = "password cannot be blank"
        }
        if (!this.state.otp) {
            otperror = "otp cannot be blank"
        }
        if ( passworderror || otperror) {
            this.setState({ passworderror: passworderror ,otperror: otperror})
            return false
        }
        return true
    }
    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            new API().getHttpClient('http://visa.enverhq.com').post('/updatePassword', {
                email: this.props.location.data,
                password: this.state.password,
                otp1: this.state.otp
            }).then((res) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', res.data.username);
                window.location = '/admin';   
            })
                .catch(error => {
                    toast.error("Wrong OTP !");
                })
        }
    }
    render() {
        return (
            <div className="d-flex align-items-center justify-content-center text-center h-100vh">
                <div className="form-wrapper m-auto" >
                    <div className="form-container my-4">

                        <div className="panel">
                            <div className="panel-header text-center mb-3">
                                <img src={logo} className="brand_logo" alt="Logo" />
                            </div>


                            <form className="register-form" >
                                <div className="form-group">
                                    <input type="email" className= "form-control" value={this.props.location.data} disabled/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className={this.state.passworderror ? "form-control is-invalid" : 'form-control'} value={this.state.password}
                                        onChange={this.handlePassword} placeholder="Password" />
                                    {this.state.passworderror ? <div className="invalid-feedback text-left">{this.state.passworderror}</div> : null}
                                </div>
                                <div className="form-group">
                                    <input type="otp" className={this.state.otperror ? "form-control is-invalid" : 'form-control'} value={this.state.otp}
                                        onChange={(e)=>this.handleOtp(e)} placeholder="otp" />
                                    {this.state.otperror ? <div className="invalid-feedback text-left">{this.state.otperror}</div> : null}
                                </div>
                                <button type="submit" onClick={this.handleSubmit} className="btn btn-success btn-block">Login</button><ToastContainer autoClose={1500} />
                            </form>
                            <p className="text-muted text-center mt-4">Copyright © 2019 Hi-Tek Inc. All Rights Reserved</p>

                        </div>

                    </div>
                </div>
            </div>




        );
    }
}
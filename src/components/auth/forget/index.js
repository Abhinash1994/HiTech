import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './logo-dark.png'
import './login.css'
import API from '../../api';

export default class Forgetpassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            redirectToReferrer: false,
        }
    }
    handleChange(e) {
        this.setState({ email: e.target.value })
    }
    validate = () => {
        let emailerror = '';
        if (!this.state.email.includes("@")) {
            emailerror = 'Enter valid email'
        }
        if (emailerror) {
            this.setState({ emailerror: emailerror })
            return false
        }
        return true
    }
    handleSubmit(e) {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            new API().getHttpClient('http://visa.enverhq.com').post(`/forgotPasword?mailId=${this.state.email}`).then((res) => {
                toast.success(res.data)
                if(res.data){
                    this.props.history.push({
                        pathname : '/auth/varify-otp',
                        data:this.state.email
                    })
                }
            })
            .catch(err => {
                toast.error("something is missing!" + err)
            })
        }
    }

    render() {
        return (
            <div>
                {/* forget form */}
                <div className="d-flex align-items-center justify-content-center text-center h-100vh">
                    <div className="form-wrapper m-auto">
                        <div className="form-container my-4">

                            <div className="panel">
                                <div className="panel-header text-center mb-3">
                                    <img src={logo} className="brand_logo" alt="Logo" />

                                    <h3 className="fs-24">Account recovery</h3>
                                    <p className="text-muted text-center mb-0">Nice to see you! Please log in with your account.</p>
                                </div>
                                <form className="register-form" >
                                    <div className="form-group">
                                        <input type="email" className={this.state.emailerror ? "form-control is-invalid" : 'form-control'} value={this.state.email} onChange={(e) => this.handleChange(e)} placeholder="Enter email" />
                                        {this.state.emailerror ? <div className="invalid-feedback text-left" style={{ color: 'red' }}>{this.state.emailerror}</div> : null}
                                    </div>
                                    <button type="submit" onClick={(e) => this.handleSubmit(e)} className="btn btn-success btn-block">Send</button><ToastContainer autoClose={1500} />
                                </form>
                                <p className="text-muted text-center mt-4">Copyright © 2019 Hi-Tek Inc. All Rights Reserved</p>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import API from '../../../api';
import { Typography } from '@material-ui/core';
import { withTranslation } from 'react-i18next';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, email: "", firstName: "", lastName: "", decentralization: 1, password: '', confirmPassword: '' ,passworderror:'',confirmPassworderror:''}
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    validate = () => {
        let confirmPassworderror = '';
        let passworderror = '';
        if (!this.state.password) {
            passworderror = "password cannot be blank"
        }
        if (!this.state.confirmPassword) {
            confirmPassworderror = 'password cannot be blank'
        }
        if (confirmPassworderror || passworderror) {
            this.setState({ confirmPassworderror: confirmPassworderror, passworderror: passworderror })
            return false
        }
        return true
    }
    handleBack(e){
        window.location = "/admin/user"
    }
    handleUpdate() {
        event.preventDefault(); 
        const { password, confirmPassword } = this.state;
        const isValid = this.validate();
        // console.log({email:this.state.email,firstName: this.state.firstName, lastName: this.state.lastName, decentrizationId: Number(this.state.decentralization), password: this.state.password})
        if(isValid){
            if(password === confirmPassword){
                new API().getHttpClient().post('/user/addUser', {
                    email:this.state.email,firstName: this.state.firstName, lastName: this.state.lastName, decentrizationId: this.state.decentralization, password: this.state.password
                }).then((res) => {
                    this.setState({ isLoaded: true, userdata: res.data });
                    window.location = "/admin/user"
                })
                .catch(error => {
                    toast.error("error !!"+error)
                })
            }
            else{
                toast.error("Password || confirmPassword is not matching")
            }
        }
        
    }
    render() {
        const {t} = this.props;
        return (

            <Paper >

                <div className="page-head">
                    <div className="row">
                        <div className="col-sm-6 text-head">
                            <h3>{t('account.editUser.accountInfo')}</h3>
                        </div>

                        <div className="col-sm-6 text-right">
                            <button className=" btn btn-light" onClick={(e)=>this.handleBack(e)}><span class="typcn typcn-arrow-left-thick"></span> {t('account.back')}</button>
                        </div>
                    </div>
                </div>


                <div className="row">



                    <div className="form-group col-md-6">
                        <Typography for="exampleInputEmail1">Email</Typography>
                        <input type="text" className="form-control " id="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>

                    <div className="col-md-6 form-group">

                        <Typography for="exampleInputEmail1">{t('account.editUser.role')}</Typography>
                        <select id="role" className="form-control" name="decentralization" defaultValue={this.state.decentralization} onChange={this.handleChange}>
                            <option value="1">Administrators</option>
                            <option value="2">Member</option>
                            <option value="3">Agency</option>
                        </select>
                    </div>



                    <div className="col-md-6 form-group">
                        <Typography for="exampleInputEmail1">{t('account.editUser.firstName')}</Typography>
                        <input type="text" className="form-control " name="firstName" value={this.state.firstName} onChange={this.handleChange} />
                    </div>


                    <div className="col-md-6 form-group">
                        <Typography for="exampleInputEmail1">{t('account.editUser.lastName')}</Typography>
                        <input type="text" className="form-control " name="lastName" value={this.state.lastName} onChange={this.handleChange} />
                    </div>





                    <div className="col-md-6 form-group">
                        <Typography for="exampleInputEmail1">{t('account.editUser.password')}</Typography>

                        <input type="password" className={this.state.passworderror?"form-control is-invalid":"form-control"} name="password" value={this.state.password} onChange={this.handleChange} />
                        {this.state.passworderror?<div className="invalid-feedback text-left" style={{color:'red'}}>{this.state.passworderror}</div>:null}
                    </div>

                    <div className="col-md-6 form-group">
                        <Typography for="exampleInputEmail1">{t('account.editUser.retype')}</Typography>
                        <input type="password" className={this.state.confirmPassworderror?"form-control is-invalid":"form-control"} name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} />
                        {this.state.confirmPassworderror?<div className="invalid-feedback text-left" style={{color:'red'}}>{this.state.confirmPassworderror}</div>:null}
                    </div> 


                </div>

                <button className=" btn btn-success col-sm-2 mt-3" onClick={this.handleUpdate}>{t('account.editUser.update')}</button><ToastContainer autoClose={1500} />

            </Paper>




        )
    }
}

export default withTranslation()(AddUser);

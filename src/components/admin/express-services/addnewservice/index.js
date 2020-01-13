import React, { Component } from 'react'
import { Paper, Typography, TextareaAutosize } from '@material-ui/core/';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../../api';
import { withTranslation } from 'react-i18next';
class AddNewService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceName: '', price: '', visatype: 'EVISA', selectLanguage: 'EN', status: 0, noticeMsg: ''
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleBack() {
        window.location = "/admin/express"
    }
    async handleUpdate() {
        await new API().getHttpClient().post(`/expressService/add`, {
            "language": this.state.selectLanguage,
            "serviceName": this.state.serviceName,
            "noticeMsg": this.state.noticeMsg,
            "price": this.state.price,
            "visaType": this.state.visatype,
            "status": this.state.status
        }).then((res) => {
            // window.location="/admin/express";
        })
            .catch(error => {
                toast.error("something error!" + error)
            })
    }
    render() {
        const { t } = this.props;
        return (
            <Paper>

                <div className="page-head">
                    <div className="row">
                        <div className="col-sm-6 text-head">
                            <h3>{t('expressServices.update.addService')}</h3>
                        </div>

                        <div className="col-sm-6 text-right">
                            <button onClick={this.handleBack} className=" btn btn-light"><span class="typcn typcn-arrow-left-thick"></span> {t('expressServices.back')}</button>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="form-group col-sm-6">
                        <Typography >{t('expressServices.update.language')}</Typography>
                        <select className="form-control" value={this.state.selectLanguage} onChange={(e) => this.handleChange(e)} name="selectLanguage">
                            <option value="EN">English</option>
                            <option value="VN">Vietnam</option>
                        </select>
                    </div>


                    <div className="form-group col-sm-6">
                        <Typography >{t('expressServices.update.serviceName')}</Typography>
                        <input type="text" className="form-control" value={this.state.servicename} onChange={(e) => this.handleChange(e)} name="serviceName" />
                    </div>
                    <div className="form-group col-sm-6">
                        <Typography >{t('expressServices.price')}</Typography>
                        <input type="text" className="form-control" value={this.state.price} onChange={(e) => this.handleChange(e)} name="price" />
                    </div>
                    <div className="form-group col-sm-6">
                        <Typography >{t('expressServices.visaType')}</Typography>
                        <select className="form-control" value={this.state.visatype} onChange={(e) => this.handleChange(e)} name="visatype">
                            <option value="EVISA">E-Visa</option>
                            <option value="LANDINGVISA">Landing Visa</option>
                            <option value="LEFTVISA">LeafLet Visa</option>
                        </select>
                    </div>
                    <div className="form-group col-sm-6">
                        <Typography >{t('expressServices.update.notice')}</Typography>
                        <TextareaAutosize aria-Typography="textarea" className="form-control" rows="3" value={this.state.noticemessage} onChange={(e) => this.handleChange(e)} name="noticeMsg" />
                    </div>
                    <div className="form-group col-sm-6">
                        <Typography >{t('expressServices.status')}</Typography>
                        <select className="form-control" value={this.state.status} onChange={(e) => this.handleChange(e)} name="status">
                            <option value="0">Inactive</option>
                            <option value="1">Active</option>
                        </select>
                    </div>
                </div>
                <button className=" btn btn-success col-sm-2 mt-3" onClick={(e) => this.handleUpdate(e)}>{t('expressServices.add')}</button>
                <ToastContainer autoClose={100} />
            </Paper>
        )
    }
}
export default withTranslation()(AddNewService);
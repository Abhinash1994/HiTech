import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Language from '../language'
import API from '../../../api';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { withTranslation } from 'react-i18next';
class AddService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            servicename: '',
            price: '',
            expressnotice: '',
            visatype: 'EVISA',
            expressServiceKeyNotice: '',
            serviceNameKey: '',
            status: '',
            languagevalue: '',
            message: '',

            langdata:'',
            messagedata:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleLanguage = this.handleLanguage.bind(this);
        this.handleNoticeMessage = this.handleNoticeMessage.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleLanguage(langValue) {
        this.setState({ languagevalue: langValue.languageValue , langdata:langValue});
    }
    handleNoticeMessage(langValue) {
        this.setState({ message: langValue.languageValue , messagedata:langValue})
    }
    handleBack() {
        window.location = "/admin/express"
    }

    async componentWillMount() {
        const { id } = this.props.match.params;
        await new API().getHttpClient().get(`/expressService/getExpressServiceById/?id=${id}`)
            .then(res => {
                localStorage.getItem('token');
                this.setState({
                    id: res.data.id,
                    price: res.data.price,
                    expressServiceKeyNotice: res.data.expressServiceKeyNotice,
                    visatype: res.data.visaType,
                    serviceNameKey: res.data.serviceNameKey,
                    status: res.data.status
                });
            })
            .catch(err => {
                console.log(err);
            })

    }

    async handleUpdate(e) {
        const { id } = this.props.match.params;
        // console.log(this.state.languagevalue)
        // console.log(this.state.message)
        // console.log(this.state.visatype)
        // console.log(this.state.price)
        // console.log(this.state.status)

        // console.log(this.state.langdata)
        // console.log(this.state.messagedata)

        await new API().getHttpClient().post(`language/notice/save`, {
            id: this.state.langdata.id, languageKey: this.state.langdata.languageKey, languageCode: this.state.langdata.langaugeCode, languageValue: this.state.languagevalue
        }).then((res) => {
            toast.success("successfull updated")
            // window.location="/admin/express";
        })

        await new API().getHttpClient().post(`language/notice/save`, {
            id: this.state.messagedata.id, languageKey: this.state.messagedata.languageKey, languageCode: this.state.messagedata.langaugeCode, languageValue: this.state.message
        }).then((res) => {
            toast.success("successfull updated")
            // window.location="/admin/express";
        })

        await new API().getHttpClient().post('/expressService/update', {
            id: id, visaType: this.state.visatype, status: this.state.status, price: this.state.price, intiatedDate: null, createdOn: null, deletedOn: null, updatedOn: null
        })
        .then((res) => {
            toast.success("successfull updated")
            window.location = "/admin/express";
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
                            <h3>{t('expressServices.update.updateService')}</h3>
                        </div>

                        <div className="col-sm-6 text-right">
                            <button className=" btn btn-light" onClick={(e) => this.handleBack(e)}><span className="typcn typcn-arrow-left-thick"></span>{t('expressServices.back')}</button>
                        </div>
                    </div>
                </div>


                <div className="row">


                    <div className="form-group col-sm-6">
                        {this.state.serviceNameKey && this.state.expressServiceKeyNotice && <Language serviceNameKey={this.state.serviceNameKey} expressServiceKeyNotice={this.state.expressServiceKeyNotice} onSelectLanguage={this.handleLanguage} onSelectNotice={this.handleNoticeMessage} />}
                    </div>



                    <div className="form-group col-sm-6">
                        <label >{t('expressServices.update.serviceName')}</label>
                        <input type="text" className="form-control" value={this.state.languagevalue ? this.state.languagevalue :''} onChange={this.handleChange} name="languagevalue" />
                    </div>

                    <div className="form-group col-sm-6">
                        <label for="exampleInputEmail1">{t('expressServices.price')}</label>
                        <input type="text" className="form-control" value={this.state.price} onChange={this.handleChange} name="price" />
                    </div>

                    <div className="form-group col-sm-6">
                        <label for="exampleInputEmail1">{t('expressServices.visaType')}</label>
                        <select className="form-control" value={this.state.visatype} onChange={this.handleChange} name="visatype">
                            <option value="EVISA">E-Visa</option>
                            <option value="LANDINGVISA">Landing visa</option>
                            <option value="LEFTVISA">LeafLet visa</option>
                        </select>
                    </div>

                    <div className="form-group col-sm-6">
                        <label for="exampleInputEmail1">{t('expressServices.update.notice')}</label>
                        <TextareaAutosize aria-label="textarea" className="form-control" rows="3" value={this.state.message ? this.state.message :''} onChange={this.handleChange} name="message" />
                    </div>
                    <div className="form-group col-sm-6">
                        <label >{t('expressServices.status')}</label>
                        <select className="form-control" value={this.state.status} onChange={this.handleChange} name="status">
                            <option value="0">inActive</option>
                            <option value="1">Active</option>
                        </select>
                    </div>
                </div>


                <button className=" btn btn-success col-sm-2 mt-3" onClick={this.handleUpdate}>{t('expressServices.updateBtn')}</button>
                <ToastContainer autoClose={100} />

            </Paper>
        )
    }
}

export default withTranslation()(AddService);
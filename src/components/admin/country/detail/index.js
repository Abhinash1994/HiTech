import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Visafee from '../detail/visafee';
import Notice from './notice';
import Loader from 'react-loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import API from '../../../api';
import { withTranslation } from 'react-i18next';


class Details extends Component {
    constructor(props) {
        super(props);
        const { countrydata } = this.props.location.state;
        this.state = {
            countryname: countrydata.name,
            countrycode: countrydata.code,
            serviceFee : countrydata.serviceFee,
            key: countrydata.key,
            listofcountry: [],
            message: '',
            isLoaded: true,
            messagechange: '',
            notice: '',
            noticeChange: '',
            selectLanguage: [{ id: 'EN', name: "English" }, { id: 'VN', name: "Vietnam" }],
            visatype: [{ id: 1, name: "EVisa" }, { id: 2, name: "Landing Visa" }, { id: 3, name: "Leaflet Visa" }],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLanguage = this.handleLanguage.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleNoticeUpdate = this.handleNoticeUpdate.bind(this);
        this.handleNoticeLanguage = this.handleNoticeLanguage.bind(this);
        this.handleNoticeChange = this.handleNoticeChange.bind(this);
        this.msgKey = '';
    }
    handleServiceFee(e){
        this.setState({ serviceFee:e.target.value })
    }
    handleChangeEvent = e => {
        this.setState({ messagechange: e.target.value })
    }
    componentDidMount() {
        new API().getHttpClient().get(`/language/notice/name?name=${this.state.key}&code=EN`, {
        }).then((res) => {
            this.setState({ isLoaded: true, message: res.data });
        })
        new API().getHttpClient().get(`/country/getCountryDetails?code=${this.state.countrycode}&visaType=1`).then((res) => {
            localStorage.getItem('token');
            this.setState({ isLoaded: true, listofcountry: res.data });
            this.msgKey = this.state.listofcountry.msgKey;
        })
            .catch(function (error) {
                console.log(error)
            });
    }
    handleChange = e => {
        this.setState({ isLoaded: false })
        const { value } = e.target;
        if (value) {
            new API().getHttpClient().get(`/country/getCountryDetails?code=${this.state.countrycode}&visaType=` + value).then((res) => {

                this.setState({ isLoaded: true, listofcountry: res.data });
            })
                .catch(function (error) {
                    console.log(error)
                });
        }
    };
    handleLanguage = e => {
        const { value } = e.target;
        // var msg_key = this.state.listofcountry.msgKey;
        console.log(value)
        new API().getHttpClient().get(`/language/notice/name?name=${this.state.key}&code=${value}`, {
        }).then((res) => {
            this.setState({ isLoaded: true, message: res.data });
        })
        .catch(err => {
            toast.error("error!")
        })
    };
    handleUpdate(e) {
        // console.log(this.state.listofcountry);
        new API().getHttpClient().post('/country/save', { countryCode: this.state.countrycode, serviceFee: Number(this.state.serviceFee) }).then((res) => {
        })
        new API().getHttpClient().post('/language/notice/save', {
            id: this.state.message.id, languageCode: this.state.message.langaugeCode, languageKey: this.state.message.languageKey, languageValue: this.state.messagechange
        }).then((res) => {
            // window.location="/admin/detail"
            toast.success("updated")
        })
        .catch(err => {
            toast.error("something is missing!" + err)
        })
    }

    handleNoticeUpdate() {
        new API().getHttpClient().post('/language/notice/save', {
            id: this.state.notice.id, languageCode: this.state.notice.langaugeCode, languageKey: this.state.notice.languageKey, languageValue: this.state.noticeChange
        }).then((res) => {
            // window.location="/admin/detail"
            toast.success("updated")
        })
        .catch(err => {
            toast.error("something is missing!" + err)
        })
    }

    handleNoticeLanguage = e => {
        const { value } = e.target;
        var msg_key = this.state.listofcountry.msgKey;
        new API().getHttpClient().get(`/language/notice/name?name=${msg_key}&code=${value}`, {
        }).then((res) => {
            this.setState({ isLoaded: true, notice: res.data });
        });
    };

    handleNoticeChange = e => {
        this.setState({ noticeChange: e.target.value })
    }

    render() {
        const {t} = this.props;
        const options = this.state.visatype.map(option =>
            <option key={option.id} value={option.id}>{option.name}</option>
        )
        return (
            <React.Fragment>
                <Paper style={{ margin: '20px' }}>
                    {/* Notification Box Starts */}
                    <div className="content-box">
                        <div className="row">
                            <div className="form-group col-sm-4">
                             <Typography className="font-weight-600">{t('countryDetail.name')}</Typography>
                                <input type="text" className="form-control" disabled value={this.state.countryname} />
                            </div>
                            <div className="form-group col-sm-4">
                             <Typography className="font-weight-600">service fee</Typography>
                                <input type="number" className="form-control"  value={this.state.serviceFee} onChange={(e)=>this.handleServiceFee(e)}/>
                            </div>
                            <div className="form-group col-sm-4">
                                <Typography className="font-weight-600">{t('countryDetail.code')}</Typography>
                                <input type="text" className="form-control" disabled value={this.state.countrycode} />
                            </div>
                            <Notice
                                title={t('countryDetail.countryNotice')}
                                selectLanguage={this.state.selectLanguage}
                                message={this.state.message}
                                handleMessageChange={e => this.handleChangeEvent(e)}
                                click={this.handleLanguage}
                                btnUpdate={this.handleUpdate}
                                defaultValue={this.state.message.languageValue? this.state.message.languageValue: ''} />
                        </div>
                    </div>
                </Paper>
                {/* Notification Box Ends */}
                {/* Visa Fee Box Starts */}
                <Paper style={{ margin: '20px' }}>
                    <div className="form-group col-sm-6">
                        <Typography className="font-weight-600">{t('countryDetail.visaType')}</Typography>
                        <select name={this.state.name} className="form-control" onChange={this.handleChange} >
                            {options}
                        </select>
                    </div>
                    <div className="content-box mt-4">
                        <h5 className="mb-3">{t('countryDetail.visaFee')}</h5>
                        {this.state.isLoaded ?
                            <Visafee
                                visafeedata={this.state.listofcountry.countryDetailsRepsponse}
                                code={this.props.location.state.countrydata.code}
                                msgkey={this.state.listofcountry.msgKey}
                                selectLanguage={this.state.selectLanguage} />
                            : <Loader />}

                    </div>
                    <ToastContainer autoClose={1500} />
                </Paper>
            </React.Fragment>
        )
    }
}
export default withTranslation()(Details)
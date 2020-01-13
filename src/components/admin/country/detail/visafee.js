import React, { PureComponent } from 'react'
import Button from '@material-ui/core/Button'
import { toast } from 'react-toastify';
import Loader from 'react-loader'
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@material-ui/core/Typography';
import API from '../../../api';
import { withTranslation } from 'react-i18next';
class Visafee extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            businessFee: 0, touristFee: 0, stampFee: 0, active: 0, noticemessge: '',
            selectLanguage: "EN", editNotice: '',
        }
    }
    handleMessage(e) {
        this.setState({ editNotice: e.target.value })
    }
    handleNoticeLanguage = e => {
        const { value } = e.target;
        var msg_key = this.props.msgkey;
        new API().getHttpClient().get(`/language/notice/name?name=${msg_key}&code=${value}`, {
        }).then((res) => {
            this.setState({ isLoaded: true, noticemessge: res.data });
        })
            .catch(error => {
                console.log(error)
            })
    }

    handleChange(index, value) {
        let newVisaFee = [...this.props.visafeedata];
        newVisaFee[index].fee.businessfee = value;

        this.setState({
            businessFee: newVisaFee
        });
    }

    handleTouristChange(index, value) {

        let newVisaFee = [...this.props.visafeedata];
        newVisaFee[index].fee.touristFee = value;

        this.setState({
            touristFee: newVisaFee
        });
    }

    handleStampChange(index, value) {

        let newVisaFee = [...this.props.visafeedata];
        newVisaFee[index].fee.stampFee = value;

        this.setState({
            stampFee: newVisaFee
        });
    }

    handleActive(index, value) {
        let newVisaFee = [...this.props.visafeedata];
        newVisaFee[index].fee.active = value;

        this.setState({
            active: newVisaFee
        });

    }

    componentWillReceiveProps(props) {
        var msg_key = props.msgkey;
        new API().getHttpClient().get(`/language/notice/name?name=${msg_key}&code=EN`, {
        }).then((res) => {
            this.setState({ isLoaded: true, noticemessge: res.data });
        })
            .catch(error => {
                console.log(error)
            })
    }

    handleUpdate() {
        let array = [];
        let o = this.props.visafeedata;
        Object.keys(o).forEach(function (key) {
            var value = o[key];
            let active = value.fee.active ? 1 : 0;
            let data = { id: value.id, serviceFee: Number(value.fee.serviceFee), businessFee: Number(value.fee.businessfee), touristFee: Number(value.fee.touristFee), stampFee: Number(value.fee.stampFee), active: active }
            array.push(data)
        })
        //save country 
        new API().getHttpClient().post('/country/save', { countryCode: this.props.code, visaFeeList: array }).then((res) => {
            // window.location.href="/admin/detail";
        })
            .catch(error => {
                toast.error("error!")
            })

        //select language by notice
        let getmessage = this.state.editNotice ? this.state.editNotice : this.state.noticemessge.languageValue

        new API().getHttpClient().post('/language/notice/save', {
            id: this.state.noticemessge.id, languageCode: this.props.msgkey, languageKey: this.state.selectLanguage, languageValue: getmessage
        }).then((res) => {
            // window.location="/admin/detail"
            toast.success("Successful updated")
        })
            .catch(err => {
                toast.error("something is missing!" + err)
            })
    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">{t('countryDetail.table1.name')}</th>
                            <th scope="col">{t('countryDetail.table1.businessFee')}</th>
                            <th scope="col">{t('countryDetail.table1.touristFee')}</th>
                            <th scope="col">{t('countryDetail.table1.stampFee')}</th>
                            <th scope="col">{t('countryDetail.table1.active')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* { visadata } */}
                        {this.props.visafeedata ? this.props.visafeedata.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{row.name}</td>
                                    <td>
                                        <input onChange={(e) => this.handleChange(index, e.target.value)}
                                            type='number'
                                            className='form-control'
                                            value={row.fee.businessfee} />
                                    </td>


                                    <td>
                                        <input onChange={(e) => this.handleTouristChange(index, e.target.value)}
                                            type='number'
                                            className='form-control'
                                            value={row.fee.touristFee} />
                                    </td>

                                    <td>
                                        <input onChange={(e) => this.handleStampChange(index, e.target.value)}
                                            type='number'
                                            className='form-control'
                                            value={row.fee.stampFee} />
                                    </td>

                                    <td><input type="checkbox" className="form-check-input" style={{ position: 'relative', left: '9px' }} checked={row.fee.active} onChange={(e) => this.handleActive(index, e.target.checked)} />
                                    </td>

                                </tr>
                            )
                        }) : <Loader />}
                    </tbody>
                </table><div className="row">
                    <div className="form-group col-sm-8">
                        <Typography className="font-weight-600">{t('countryDetail.visaNotice')}</Typography>
                        <textarea className="form-control" rows="3" defaultValue={this.state.noticemessge.languageValue ? this.state.noticemessge.languageValue : ''} onChange={(e) => this.handleMessage(e)} />
                    </div><div className="form-group col-sm-4">
                        <Typography className="font-weight-600">{t('countryDetail.language')}</Typography>
                        <select className="form-control" defaultValue={this.state.selectLanguage} onChange={this.handleNoticeLanguage} name="selectLanguage">
                            <option value="EN">English</option>
                            <option value="VN">vietnam</option>
                        </select>
                        <Button className="notice-button-style" variant="contained" color="secondary" onClick={(e) => this.handleUpdate(e)}>{t('countryDetail.update')}</Button>
                    </div>
                </div>
            </div>

        )
    }
}

export default withTranslation()(Visafee);
import React, { Component } from 'react'
import { Paper } from '@material-ui/core';

import { /* ToastContainer, */ toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Loader from 'react-loader';
import API from '../../../api';
import { withTranslation } from 'react-i18next';
class Visadetails extends Component {
    constructor(props) {
        super(props)
        this.state = { visadata: '', loading: false }
        this.formatDate = this.formatDate.bind(this);
    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }
    handleBack(e) {
        window.location = "/admin/order/list"
    }
    componentDidMount() {
        this.setState({ loading: true })
        new API().getHttpClient().get('/formSubmition/formSubmitionDetails?id=' + this.props.location.state.id).then((res) => {
            localStorage.getItem('token');
            this.setState({ loading: false, visadata: res.data })
        })
            .catch(error => {
                toast.error("something error!")
            })
    }
    render() {
        const { t } = this.props;
        let self = this.state.visadata;
        if (self.applicantDetail) {
            var personDetails = self.applicantDetail.map((prop, index) => {
                return (
                    <tr key={index}>
                        <td scope="row">{index + 1}</td>
                        <td>{prop.firstName + ' ' + prop.lastName}</td>
                        <td>{prop.gender}</td>
                        <td>{this.formatDate(prop.dob)}</td>
                        <td>{prop.nationality}</td>
                        <td>{prop.passportNo}</td>
                        <td>{this.formatDate(prop.expDate)}</td>
                        <td></td>
                    </tr>
                )
            });
        }
        return (
            <Paper>

                <div className="page-head">
                    <div className="row">
                        <div className="col-sm-6 text-head">
                            <h3>{t('visaDetail.visaAppDetails')}</h3>
                        </div>

                        <div className="col-sm-6 text-right">
                            <button className=" btn btn-light" onClick={(e) => this.handleBack(e)}><span class="typcn typcn-arrow-left-thick"></span> {t('visaDetail.back')}</button>
                        </div>
                    </div>
                </div>


                <h6 class="details-heads">{t('visaDetail.please')}</h6>

                <table className="table table-hover  table-bordered">
                    <thead>
                        <tr>
                            <th>{t('visaDetail.table1.visaType')}</th>
                            <th>{t('visaDetail.table1.duration')}</th>
                            <th>{t('visaDetail.table1.purpose')}</th>
                            <th>{t('visaDetail.table1.entry')}</th>
                            <th>{t('visaDetail.table1.exit')}</th>
                            <th>{t('visaDetail.table1.arrival')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{self.visaType}</td>
                            <td>{self.visaDuration}</td>
                            <td>{self.pourposeOfEntry}</td>
                            <td>{this.formatDate(self.entryDate)}</td>
                            <td>{this.formatDate(self.exitdate)}</td>
                            <td>{self.portOfArrival}</td>
                        </tr>
                    </tbody>
                </table>
                {/* --table 2--  */}
                <h6 class="details-heads">{t('visaDetail.passportDetails')}</h6>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{t('visaDetail.table2.fullName')}</th>
                            <th>{t('visaDetail.table2.gender')}</th>
                            <th>{t('visaDetail.table2.dob')}</th>
                            <th>{t('visaDetail.table2.nationality')}</th>
                            <th>{t('visaDetail.table2.passportNo')}</th>
                            <th>{t('visaDetail.table2.expiry')}</th>
                            <th>{t('visaDetail.table2.image')}</th>
                        </tr>
                    </thead>
                    <tbody>

                        {personDetails}

                    </tbody>
                </table>
                {/* --table 3-- */}
                <h6 class="details-heads">{t('visaDetail.serviceFees')}</h6>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>{t('visaDetail.table3.type')}</th>
                            <th>{t('visaDetail.table3.quantity')}</th>
                            <th>{t('visaDetail.table3.unitPrice')}</th>
                            <th>{t('visaDetail.table3.totalFee')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {self.serviceFee ?
                            <tr>
                                <td style={{ textAlign: 'center' }} >{self.serviceFee.value}</td>
                                <td>1</td>
                                <td style={{ textAlign: 'center' }}>{self.serviceFee.price}</td>
                                <td style={{ textAlign: 'center' }}>{self.serviceFee.price}</td>
                            </tr>
                            : null
                        }
                    </tbody>
                </table>
                {/* --table3--     */}
                <h6 class="details-heads">{t('visaDetail.contactInfo')}</h6>
                <table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>{t('visaDetail.table4.name')}</th>
                            <th>{t('visaDetail.table4.email')}</th>
                            <th>{t('visaDetail.table4.phone')}</th>
                            <th>{t('visaDetail.table4.note')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {self.user ?
                            <tr>
                                <td>{self.user.firstName + ' ' + self.user.lastName}</td>
                                <td>{self.user.email}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            : null
                        }
                    </tbody>
                </table>

            </Paper>
        )
    }
}

export default withTranslation()(Visadetails);
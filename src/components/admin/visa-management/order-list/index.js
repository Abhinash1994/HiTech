import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { /* ToastContainer, */ toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader';
import StatusModal from "../../visa-management/statusmodal";
import API from '../../../api';
import { withTranslation } from 'react-i18next';
import xmlbuilder from 'xmlbuilder';
import FileSaver, { saveAs } from 'file-saver';
import Excel from 'exceljs';

class Visalist extends Component {
    constructor(props) {
        super(props)
        this.state = { visadata: [], loading: true, searchtext: '', paymentstatus: "paid", status: 0 }
        this.formatDate = this.formatDate.bind(this);
    }
    async componentDidMount() {
        this.setState({ loading: true })
        await new API().getHttpClient().get('/formSubmition/getAllFormSubmition').then((res) => {
            this.setState({ loading: false, visadata: res.data })
        })
            .catch(error => {
                toast.error("something error!")
            })
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
    handlChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    exportExcel = (e) => {
        e.preventDefault();
        var workbook = new Excel.Workbook();
        var worksheet = workbook.addWorksheet('My Sheet');
        worksheet.columns = [
            { header: 'Code', key: 'id', width: 32 },
            { header: 'Loại VISA', key: 'visaType', width: 32 },
            { header: 'Ngày đăng ký', key: 'regDate', width: 16 },
            { header: 'Thanh toán', key: 'paymentStatus', width: 16 },
            { header: 'Trạng thái', key: 'status', width: 24 },
            { header: 'Họ Tên', key: 'name', width: 28 },
            { header: 'Email', key: 'email', width: 28 },
            { header: 'Số đt', key: 'number', width: 16 }
        ];
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'darkVertical',
            fgColor: { argb: 'FFFF0000' }
        };
        this.state.visadata.map(row => {
            worksheet.addRow({
                id: `${row.formSubmitionId}`,
                visaType: `${row.visaType}`,
                regDate: `${this.formatDate(row.createdDate)}`,
                paymentStatus: row.paymentStatus === '0' ? "Unpaid" : "Paid",
                status: row.status === 0 ? "New" :
                    row.status === 1 ? "Needs Adjustment" :
                        row.status === 2 ? "Pending Approval" :
                            row.status === 3 ? "Needs More Information"
                                : row.status === 4 ? "Approved"
                                    : row.status === 5 ? "Rejected" : "",
                name: `${row.firstname} ${row.lastName}`,
                email: `test@test.com`,
                number: `891274891274`
            });
        });

        workbook.xlsx.writeBuffer().then((buf) => {
            saveAs(new Blob([buf]), `BaoCao_VISA_${this.formatDate(new Date())}.xlsx`);
        });

        console.log(worksheet.getRow(5));
    }

    exportXml = (data) => {
        console.log(data);
        let obj = {
            EVISA: {
                THONG_TIN_NNN: {
                    ho_ten: {
                        '#text': `${data.firstname} ${data.lastName}`
                    },
                    ngay_sinh: {
                        '#text': ``             //dob
                    },
                    ngay_sinh_dung_den: {
                        '#text': ``
                    },
                    gioi_tinh: {
                        '#text': ``         //gender
                    },
                    ma_quoc_tich: {
                        '#text': `${data.countryCode}`
                    },
                    so_ho_chieu: {
                        '#text': ``         //passportNo.
                    },
                    nhap_canh_tu_ngay: {
                        '#text': `${this.formatDate(data.entrydate)}`
                    },
                    nhap_canh_den_ngay: {
                        '#text': `${this.formatDate(data.exitDate)}`
                    },
                    dien_thoai: {
                        '#text': ``          //Phone Number
                    },
                    email: {
                        '#text': ``
                    }
                }
            }
        }
        let xml = xmlbuilder.create(obj).end({ pretty: true });
        // console.log(xml);
        var blob = new Blob([xml], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, `${data.formSubmitionId}.xml`);
    }

    async handleSubmit() {
        this.setState({ loading: true })
        await new API().getHttpClient().post('/formSubmition/search', {
            "query": this.state.searchtext, "paymentStatus": this.state.paymentstatus, "status": this.state.status
        }).then((res) => {
            this.setState({ loading: false, visadata: res.data })
        })
            .catch(error => {
                toast.error("something error!")
            })
    }
    render() {
        const { t } = this.props;
        let self = this.state;
        let options = (t('visaList.status')).map((data, i) => (
            <option key={data.value} value={data.status}>{data.name}</option>
        ));
        return (
            <Paper>

                <div className="page-head">
                    <div className="row">
                        <div className="col-sm-6 text-head">
                            <h3>{t('visaList.visaManagement')}</h3>
                        </div>

                        <div className="col-sm-6 text-right">

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <section className="panel">
                            <header className="panel-heading"><p>{t('visaList.listOfVisas')}</p></header>
                            <div className="panel-body">
                                <div style={{ overflow: 'hidden', marginBottom: 10 }}>
                                    <form className="filter">
                                        <div className="row">
                                            <div className="form-group col-md-4">
                                                <input type="text" name="searchtext" className="form-control" placeholder="search..." value={this.state.searchtext} onChange={(e) => this.handlChange(e)} />
                                            </div>
                                            <div className="form-group col-md-2">
                                                <select name="paymentstatus" className="form-control" value={this.state.paymentstatus} onChange={(e) => this.handlChange(e)}>
                                                    {/* <option value>{t('visaList.payment.paymentStatus')}</option> */}
                                                    <option value="paid">{t('visaList.payment.paid')}</option>
                                                    <option value="unpaid">{t('visaList.payment.unpaid')}</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-md-2">
                                                <select name="status" className="form-control" value={this.state.status} onChange={(e) => this.handlChange(e)}>
                                                    {options}
                                                </select>
                                            </div>
                                            <div className="form-group col-md-2">
                                                <button type="button" className="btn btn-success w-100" onClick={(e) => this.handleSubmit(e)}>{t('visaList.search')}</button>
                                            </div>
                                            <div className="form-group col-md-2">
                                                <button onClick={(event) => this.exportExcel(event)} name="excel" value={2} className="btn btn-warning w-100"><font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>{t('visaList.exportExcel')}</font></font></button>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {this.state.loading ? <Loader /> :
                                    <section id="unseen">
                                        <form id="list-form" action="" method="post">
                                            <div id="ajax_form" />

                                            <div className="table-responsive">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th width="10px">#</th><th><font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>{t('visaList.row1.code')}</font></font></th><th><font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>{t('visaList.row1.customer')}</font></font></th><th><font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>{t('visaList.row1.fullName')}</font></font></th><th><font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>{t('visaList.row1.visaType')}</font></font></th><th><font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>{t('visaList.row1.regDate')}</font></font></th><th><font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>{t('visaList.row1.pay')}</font></font></th><th><font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>{t('visaList.row1.status')}</font></font></th><th><font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>{t('visaList.row1.manipulation')}</font></font></th></tr>
                                                    </thead>
                                                    <tbody>
                                                        {self.visadata.map((data, i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    <td>{++i}</td>
                                                                    <td><div className="success" /><Link to={{ pathname: "/admin/order-visa", state: data }}>{data.formSubmitionId}</Link></td>
                                                                    <td><font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>{data.userType === 1 ? <p>ADMINISTRATOR</p> : null}{data.userType === 2 ? <p>MEMBER</p> : null}{data.userType === 3 ? <p>AGENCY</p> : null}</font></font></td>
                                                                    <td><font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>{data.firstname ? data.firstname + ' ' + data.lastName : ''}</font></font></td>
                                                                    <td>{data.visaType}</td>
                                                                    <td>{this.formatDate(data.createdDate)}</td>
                                                                    <td>{data.paymentStatus ==="1" ? <span className="label label-xs label-success">paid</span>:<span className="label label-xs label-danger">not paid</span>}</td>
                                                                    <td><StatusModal id={data.id} code={data.formSubmitionId} status={data.status} /></td>
                                                                    <td>
                                                                        <button className="btn btn-warning btn-xs" onClick={() => this.exportXml(data)} tagert="_blank" style={{ marginLeft: '0.3rem' }} type="button" >
                                                                            <i className="icon-file-text-alt" /> Export XML
                                                                         </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}

                                                    </tbody>
                                                </table>
                                            </div>


                                        </form>
                                    </section>}
                            </div>
                        </section>
                    </div>
                </div>
            </Paper>

        )
    }
}

export default withTranslation()(Visalist);
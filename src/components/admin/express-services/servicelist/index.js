import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Loader from 'react-loader'
import API from '../../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withTranslation } from 'react-i18next';
class ExpressServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            setPage: 0,
            rowsPerPage: 10,
            setRowsPerPage: 10,
            expressService: [],
            servicedata: [],
            loading: true
        }
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.formatDate = this.formatDate.bind(this);
        // this.handleAddnew = this.handleAddnew.bind(this);
    }
    handleChangePage(event, newPage) {
        this.setState({ setPage: newPage });
    };
    handleChangeRowsPerPage(event) {
        this.setState({ setRowsPerPage: event.target.value });
        this.setState({ setPage: 0 });
    };
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
    handleDelete = id => e => {
        new API().getHttpClient().post('/expressService/deleteById?id=' + id).then((res) => {
            toast.success("successfull Deleted")
            window.location.reload();
        })
        .catch(error => {
            toast.error("error!")
        })
    }


    async componentDidMount() {
        await new API().getHttpClient().get('/expressService/all').then((res) => {
            this.setState({ loading: false, expressService: res.data });
        })
            .catch(err => {
                toast.error("error!");
            })
    }
    render() {
        const { t } = this.props;
        var list = this.state.expressService;
        var data = this.state;
        return (
            <Paper >

                {this.state.loading ? <Loader /> :
                    <div>
                        <div className="page-head">
                            <div className="row">
                                <div className="col-sm-6 text-head">
                                    <h3>{t('expressServices.express')}</h3>
                                </div>

                                <div className="col-sm-6 text-right">
                                    <Link to="/admin/addnew-service"><button className="btn btn-success" variant="contained">{t('expressServices.addNew')}</button></Link>
                                </div>
                            </div>
                        </div>



                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <th>{t('expressServices.name')}</th>
                                    <th>{t('expressServices.price')}</th>
                                    <th>{t('expressServices.visaType')} </th>
                                    <th>{t('expressServices.status')}</th>
                                    <th>{t('expressServices.initiateDate')}</th>
                                    <th>{t('expressServices.action')}</th>
                                </thead>
                                <tbody>
                                    {list.map((data, i) => (
                                        <tr key={i}>
                                            <td>{data.serviceName}</td>
                                            <td>{data.price}</td>
                                            <td>{data.visaType}</td>
                                            <td>{data.status ? <div className="active">Active</div> : <div>Inactive</div>}</td>
                                            <td>{this.formatDate(data.intiatedDate)}</td>
                                            <td>
                                                <Link to={`/admin/express-service/${data.id}`}>  <button className="actions-btn" variant="contained" ><span className="typcn typcn-edit"></span></button></Link>

                                                <button className="actions-btn" variant="contained" onClick={this.handleDelete(data.id)} style={{ marginLeft: '10px' }}><span className="typcn typcn-trash"></span></button><ToastContainer autoClose={1000} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }


                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={list.length}
                    rowsPerPage={data.rowsPerPage}
                    page={data.page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />

            </Paper>
        )
    }
}

export default withTranslation()(ExpressServices);
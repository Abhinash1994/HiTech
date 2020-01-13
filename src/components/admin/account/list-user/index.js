import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import API from '../../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader';
import { withTranslation } from 'react-i18next';

class Listuser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alluser: [],
            isLoaded: true
        }
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete = id => e => {
        new API().getHttpClient().get('/user/deleteById?id=' + id).then((res) => {
            toast.success("successfull Deleted")
            window.location.reload();
        })
            .catch(error => {
                toast.error("something error!" + error)
            })
    }
    async componentDidMount() {
        await new API().getHttpClient().get('/user/getAllUsers').then((res) => {
            this.setState({ isLoaded: false, alluser: res.data });
        })
            .catch(error => {
                toast.error("something error!" + error)
            })
    }
    render() {
        const { t } = this.props;
        var list = this.state.alluser;
        return (
            <Paper >

                <div className="page-head">
                    <div className="row">
                        <div className="col-sm-10 text-head">
                            <h3>{t('account.acc')}</h3>
                        </div>

                        <div className="col-sm-2">
                            <Link to="/admin/new-user"><button className="btn btn-success" variant="contained" style={{ float: 'center' }}>{t('account.addNew')}</button></Link>
                        </div>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>{t('account.decentralization')}</th>
                                {/* <th>{t('account.status')}</th> */}
                                <th>{t('account.manipulation')}</th>
                            </tr>
                        </thead>
                        {this.state.isLoaded ? <Loader /> :
                            <tbody>
                                {list.map((data, i) => (
                                    <tr key={i}>
                                        <td>
                                            {data.email}
                                        </td>
                                        <td>{data.decentrizationId === 1 ? <span>ADMINISTRATOR</span> : null}{data.decentrizationId === 2 ? <span>MEMBER</span> : null}{data.decentrizationId === 3 ? <span>AGENCY</span> : null}</td>
                                        {/* <td>{data.code}</td> */}
                                        <td>
                                            <Link to={{ pathname: '/admin/edit/user/', state: data }}>
                                                <button variant="contained" className="actions-btn"><span className="typcn typcn-edit"></span></button>
                                            </Link>
                                            <button variant="contained" className="actions-btn" onClick={this.handleDelete(data.userId)} style={{ marginLeft: '10px' }}><span className="typcn typcn-trash"></span></button><ToastContainer autoClose={100} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        }
                    </table>
                </div>
            </Paper>
        )
    }
}

export default withTranslation()(Listuser);
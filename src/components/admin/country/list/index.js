import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Loader from 'react-loader'
import API from '../../../api';
import { withTranslation } from 'react-i18next';

class CountryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            setPage: 0,
            rowsPerPage: 10,
            setRowsPerPage: 10,
            listofcountry: [],
            loading: true
        }
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }
    handleChangePage(event, newPage) {
        this.setState({ setPage: newPage });
    };
    handleChangeRowsPerPage(event) {
        this.setState({ setRowsPerPage: event.target.value });
        this.setState({ setPage: 0 });
    };

    async componentDidMount() {
        await new API().getHttpClient().get('/country/getAllCountries').then((res) => {
            localStorage.getItem('token');
            this.setState({ loading: false, listofcountry: res.data });
        })
            .catch(err =>
                console.log(err)
            )
    }
    render() {
        const { t } = this.props;
        var list = this.state.listofcountry;
        var data = this.state;
        return (
            <Paper>
                {this.state.loading ? <Loader /> :
                    <div>



                        <div className="page-head">
                            <div className="row">
                                <div className="col-sm-6 text-head">
                                    <h3>{t('countryList.countryPrice')}</h3>
                                </div>

                                <div className="col-sm-6">

                                </div>
                            </div>
                        </div>


                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">{t('countryList.name')}</th>
                                        <th scope="col">{t('countryList.flag')}</th>
                                        <th scope="col">{t('countryList.code')}</th>
                                        <th scope="col">{t('countryList.timezone')}</th>
                                        <th scope="col">{t('countryList.action')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.map((data, i) => (
                                        <tr key={i}>
                                            <td>{++i}</td>
                                            <td>{data.name}</td>
                                            <td>{data.code}</td>
                                            <td>{data.code}</td>
                                            <td>{data.timeZone}</td>
                                            <td>
                                                <Link to={{
                                                    pathname: `/admin/country/${i}`,
                                                    state: {
                                                        countrydata: {
                                                            name: data.name,
                                                            code: data.code,
                                                            key: data.key,
                                                            serviceFee : data.serviceFee
                                                        }
                                                    }
                                                }}>
                                                    <button className="actions-btn" variant="contained"><span className="typcn typcn-edit"></span></button>
                                                </Link>
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

export default withTranslation()(CountryList);


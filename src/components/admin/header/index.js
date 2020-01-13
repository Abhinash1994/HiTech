import React, { Component } from 'react';
import './header.css'
import logo from './logo-light.png'
import { Link } from 'react-router-dom';

import API from '../../api';
import { withTranslation } from 'react-i18next';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { userdata: '' }
    }
    componentDidMount() {
        let email = localStorage.getItem('username')
        new API().getHttpClient().get('/user/getUserByEmailId?email=' + email).then((res) => {
            this.setState({ userdata: res.data })
        })
        .catch(error => {
            console.log(error)
        })
    }
    render() {
        const { t } = this.props;
        let self = this.state.userdata;
        let username = self.firstName + ' ' + self.lastName;
        return (

            <nav className="sidebar sidebar-bunker">
                <div className="sidebar-header">
                    <img src={logo} className="" alt="Logo" />
                </div>
                <div className="profile-element d-flex align-items-center flex-shrink-0">

                    <div className="profile-text">
                        <h6 className="m-0">{username ? username : self.email}</h6>
                    </div>
                </div>
                <div className="sidebar-body">
                    <nav className="sidebar-nav">
                        <ul className="metismenu">
                            <li className="nav-label">{t('header.mainMenu')}</li>




                            <li className="mm-active">
        <Link to="/admin"> <i className="typcn typcn-messages mr-2"></i>{t('header.dashboard')}</Link>
                            </li>


                            <li>
                                <Link to="/admin/order/list"> <i className="typcn typcn-messages mr-2"></i>{t('header.visaManagement')}</Link>
                            </li>

                            <li>
                                <a className="has-arrow material-ripple" href="#">
                                    <i className="typcn typcn-home-outline mr-2"></i>
                                    {t('header.feeServices')}
                                </a>
                                <ul className="nav-second-level">
                                    <li><Link to="/admin/country">{t('header.countryPrice')}</Link></li>
                                    <li><Link to="/admin/express">{t('header.expressServices')}</Link></li>
                                    <li><Link to="/admin/add_on">{t('header.addOn')}</Link></li>
                                </ul>
                            </li>



                            <li>
                                <Link to="/admin/user"> <i className="typcn typcn-messages mr-2"></i>{t('header.account')}</Link>
                            </li>




                        </ul>
                    </nav>
                </div>
            </nav>




        );
    }
};

export default withTranslation()(Header);
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import './dashboard.css';



class Dashboard extends Component {

    render() {
        const { t } = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 breadcrumb breadcrumb-extra dashboard">
                        <i className="fas fa-home home-mr"></i>
        <span>{t('dashboard.dash')}</span>
                    </div>
                </div>
                <div className="row state-overview">
                    <div className='col-lg-3 col-sm-6'>
                        <section className="panel">
                            <div className='symbol turquoise'>
                                <i className="fas fa-user "></i>
                            </div>
                            <div className='value'>
                                <h1>28</h1>
                                <p>{t('dashboard.newUsers')}</p>
                            </div>
                        </section>
                    </div>

                    <div className='col-lg-3 col-sm-6'>
                        <section className="panel">
                            <div className='symbol red'>
                                <i className="fas fa-tags "></i>
                            </div>
                            <div className='value'>
                                <h1>2</h1>
                                <p>{t('dashboard.sales')}</p>
                            </div>
                        </section>
                    </div>

                    <div className='col-lg-3 col-sm-6'>
                        <section className="panel">
                            <div className='symbol yellow'>
                                <i className="fas fa-shopping-cart "></i>
                            </div>
                            <div className='value'>
                                <h1>2</h1>
                                <p>{t('dashboard.newOrders')}</p>
                            </div>
                        </section>
                    </div>

                    <div className='col-lg-3 col-sm-6'>
                        <section className="panel">
                            <div className='symbol blue'>
                                <i className="fas fa-chart-bar "></i>
                            </div>
                            <div className='value'>
                                <h1>2</h1>
                                <p>{t('dashboard.posts')}</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(Dashboard);
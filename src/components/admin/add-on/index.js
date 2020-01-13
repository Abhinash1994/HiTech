import React, { Component } from 'react'
import { Paper, /* Button, */ Typography } from '@material-ui/core/';
import { /* ToastContainer, */ toast } from 'react-toastify';
// import Loader from 'react-loader';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import API from '../../api';
import EditAddon from '../add-on/editAddon';
import { withTranslation } from 'react-i18next';

class Addon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addonData: [],
            selectVisa: '1',
            selectLanguage: 'EN',
            isLoaded: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLanguage = this.handleLanguage.bind(this);
        // this.handleClick = this.handleClick.bind(this);
    }
    handleBack(e) {
        window.location = "/admin/"
    }
    handleChange(e) {
        this.setState({ selectVisa: e.target.value })
        const { value } = e.target;
        new API().getHttpClient().get(`/addOns/getByVisaType?visaType=${value}&langKey=${this.state.selectLanguage}`).then((res) => {
            this.setState({ isLoaded: true, addonData: res.data });
        })
            .catch(err => {
                toast.error("Error!! " + err)
            })
    };
    handleLanguage(e) {
        this.setState({ selectLanguage: e.target.value })
    };


    componentDidMount() {
        new API().getHttpClient().get(`/addOns/getByVisaType?visaType=1&langKey=EN`).then((res) => {
            this.setState({ isLoaded: true, addonData: res.data });
        })
            .catch(err => {
                toast.error("Error!! " + err)
            })
    }
    render() {
        const { t } = this.props;
        let self = this.state.addonData;
        return (
            <Grid >
                <Paper>
                    <div className="page-head">
                        <div className="row">
                            <div className="col-sm-6 text-head">
                                <h3>{t('addOn.add')}</h3>
                            </div>

                            <div className="col-sm-6 text-right">
                                <button className=" btn btn-light" onClick={(e) => this.handleBack(e)}><span className="typcn typcn-arrow-left-thick"></span> {t('addOn.back')}</button>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-sm-6">
                            <Typography for="exampleInputEmail1">{t('addOn.language')}</Typography>
                            <select className="form-control" onChange={this.handleLanguage} value={this.state.selectLanguage}>
                                <option value="EN">English</option>
                                <option value="VN">Vietnam</option>
                            </select>
                        </div>
                        <div className="form-group col-sm-6">
                            <Typography for="exampleInputEmail1">{t('addOn.visaType')}</Typography>
                            <select className="form-control" onChange={(e) => this.handleChange(e)} defaultValue={this.state.selectVisa}>
                                <option value="1">Landing Visa</option>
                                <option value="2">E-visa</option>
                                <option value="3">Leaflet Visa</option>
                            </select>
                        </div>

                    </div>
                </Paper>



                <div>
                    <Grid className="landingvisa" >
                        <Paper>
                            <div class="page-head">
                                <div class="col-sm-6 text-head">
                                    {this.state.selectVisa === '1' ?
                                        <div><h3>Landing Visa</h3> <EditAddon state={self} /></div>
                                        : null}
                                    {this.state.selectVisa === '2' ?
                                        <div><h3>E-visa</h3> <EditAddon state={self} /></div>
                                        : null}
                                    {this.state.selectVisa === '3' ?
                                        <div><h3>Leaflet Visa</h3> <EditAddon state={self} /></div>
                                        : null}
                                </div>
                            </div>

                            {/* <ToastContainer autoClose={1500} /> */}


                        </Paper>

                    </Grid>
                    {/* /* --Evisa--             */}
                    {/* <Grid style={this.state.selectVisa === '2' ? { display: 'block' } : { display: 'none' }}>
                        <Paper style={{ margin: '20px' }}>

                            <div className="panel">
                                <div class="page-head"><div class="row"><div class="col-sm-6 text-head"><h3>E-visa</h3></div><div class="col-sm-6"></div></div></div>

                                <div className="panel-body">
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <Typography ><font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>Stamp fee </font></font></Typography>
                                            <select name="data[leafletvisa_stamp_free]" className="form-control" style={{ width: 120 }}>
                                                <option value="on" selected>Turn On</option>
                                                <option value="off">Turn Off</option>
                                            </select>
                                        </div>
                                    </div>

                                    {this.state.isLoaded ? self.map((data, i) => {
                                        return (
                                            <div className="row" key={i}>
                                                <div className="form-group col-md-6">
                                                    <Typography htmlFor="letter"><font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>{data.name}</font></font></Typography>
                                                    <input type="number" name="data[vip-airport-leaf]" className="form-control" defaultValue={data.price} />
                                                </div>
                                            </div>
                                        )
                                    }) : <Loader />}

                                </div>
                            </div>
                        </Paper>
                    </Grid> */}


                    {/* /* --End E-visa-- */
                        /* --Evisa--             */}
                    {/* <Grid style={this.state.selectVisa === '3' ? { display: 'block' } : { display: 'none' }}>
                        <Paper style={{ margin: '20px' }}>
                            <div className="panel">
                                <div class="page-head"><div class="row"><div class="col-sm-6 text-head"><h3>Leaflet Visa</h3></div><div class="col-sm-6"></div></div></div>

                                <div className="panel-body">
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <Typography htmlFor="letter"><font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>Stamp fee </font></font></Typography>
                                            <select name="data[leafletvisa_stamp_free]" className="form-control" style={{ width: 120 }}>
                                                <option value="on" selected>Turn On</option>
                                                <option value="off">Turn Off</option>
                                            </select>
                                        </div>
                                    </div>
                                    {this.state.isLoaded ? self.map((data, i) => {
                                        return (
                                            <div className="row" key={i}>
                                                <div className="form-group col-md-6">
                                                    <Typography htmlFor="letter"><font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>{data.name}</font></font></Typography>
                                                    <input type="number" name="data[vip-airport-leaf]" className="form-control" defaultValue={data.price} />
                                                </div>
                                            </div>
                                        )
                                    }) : <Loader />}
                                    
                                    <Button className="notice-button-style" variant="contained" color="secondary" onClick={(e) => this.handleUpdate(e)}>{t('countryDetail.update')}</Button>
                                </div>
                            </div>
                        </Paper>
                    </Grid> */}
                </div>


            </Grid>
        )
    }
}

export default withTranslation()(Addon)
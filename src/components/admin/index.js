import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Dashboard from './dashboard';
import Header from './header';
import Footer from './footer'
import SideBar from './sidebar';
import ExpressServices from './express-services/servicelist';
import CountryList from '../admin/country/list';
import CountryDetail from '../admin/country/detail';
import Addon from '../admin/add-on';
import Listuser from '../admin/account/list-user';
import Edituser from '../admin/account/edit-user';
import Visalist from '../admin/visa-management/order-list';
import Visadetail from '../admin/visa-management/visadetail';
import AddService from '../admin/express-services/expressService';
import AddNewService from '../admin/express-services/addnewservice';
import AddUser from '../admin/account/add-new-user';
export default class Main extends Component {
  render() {
    const { match } = this.props;
    return (
      <main>
        <div className="wrapper">
          <Header />
          <div className="content-wrapper">
            <div className="main-content">
              <SideBar />
              <Switch>
                <Route exact path={[`${match.path}/dashboard`, `${match.path}`]} component={Dashboard} />
                <Route exact path={`${match.path}/express`} component={ExpressServices} />
                <Route exact path={`${match.path}/country/:id`} component={CountryDetail} />
                <Route path={`${match.path}/country`} component={CountryList} />
                <Route path={`${match.path}/express`} component={ExpressServices} />
                <Route path={`${match.path}/express-service/:id`} component={AddService} />
                <Route path={`${match.path}/addnew-service`} component={AddNewService} />
                <Route path={`${match.path}/add_on`} component={Addon} />
                <Route path={`${match.path}/user`} component={Listuser} />
                <Route path={`${match.path}/edit/user/`} component={Edituser} />
                <Route path={`${match.path}/order/list`} component={Visalist} />
                <Route path={`${match.path}/order-visa`} component={Visadetail} />
                <Route path={`${match.path}/new-user`} component={AddUser} />
              </Switch>
              <Footer />
            </div>
          </div>

        </div>


      </main>
    );
  }
}
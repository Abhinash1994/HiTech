
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Language from '../language';

export default class Sidebar extends Component {
    state = {
        isLoggedIn: false
    };
    render() {
        return (
            <nav className="navbar-custom-menu navbar navbar-expand-lg m-0">
                <div className="sidebar-toggle-icon" id="sidebarCollapse">
                    sidebar toggle<span></span>
                </div>
                <div className="d-flex flex-grow-1">
                    <ul className="navbar-nav flex-row align-items-center ml-auto">

                        <li className="nav-item"><Language /></li>

                        {/* <li className="nav-item dropdown notification">
                                    <a className="nav-link dropdown-toggle badge-dot" href="#" data-toggle="dropdown">
                                        <i className="typcn typcn-bell"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <h6 className="notification-title">Notifications</h6>
                                        <p className="notification-text">You have 2 unread notification</p>
                                        <div className="notification-list">
                                            <div className="media new">
                                                <div className="img-user"><img src="assets/dist/img/avatar.png" alt="" /></div>
                                                <div className="media-body">
                                                    <h6>Congratulate <strong>Socrates Itumay</strong> for work anniversaries</h6>
                                                    <span>Mar 15 12:32pm</span>
                                                </div>
                                            </div>
                                            <div className="media new">
                                                <div className="img-user online"><img src="assets/dist/img/avatar2.png" alt="" /></div>
                                                <div className="media-body">
                                                    <h6><strong>Joyce Chua</strong> just created a new blog post</h6>
                                                    <span>Mar 13 04:16am</span>
                                                </div>
                                            </div>
                                            <div className="media">
                                                <div className="img-user"><img src="assets/dist/img/avatar3.png" alt="" /></div>
                                                <div className="media-body">
                                                    <h6><strong>Althea Cabardo</strong> just created a new blog post</h6>
                                                    <span>Mar 13 02:56am</span>
                                                </div>
                                            </div>
                                            <div className="media">
                                                <div className="img-user"><img src="assets/dist/img/avatar4.png" alt="" /></div>
                                                <div className="media-body">
                                                    <h6><strong>Adrian Monino</strong> added new comment on your photo</h6>
                                                    <span>Mar 12 10:40pm</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdown-footer"><Link href="/">View All Notifications</Link></div>
                                    </div>
                                </li> */}


                        <li className="nav-item dropdown user-menu">
                            <Link className="nav-link dropdown-toggle" href="/" data-toggle="dropdown">
                                <img src="assets/dist/img/user2-160x160.png" alt="" />
                                <i className="typcn typcn-user-add-outline"></i>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right" >
                                <div className="dropdown-header d-sm-none">
                                    <Link href="#" className="header-arrow"><i className="icon ion-md-arrow-back"></i></Link>
                                </div>

                                {/* <Link to="/" className="dropdown-item"><i className="typcn typcn-user-outline"></i> My Profile</Link>
                                        <Link to="/" className="dropdown-item"><i className="typcn typcn-edit"></i> Edit Profile</Link>
                                        <Link to="/" className="dropdown-item"><i className="typcn typcn-arrow-shuffle"></i> Activity Logs</Link>
                                        <Link to="/" className="dropdown-item"><i className="typcn typcn-cog-outline"></i> Account Settings</Link> */}
                                <Link to="/auth/logout" className="dropdown-item"><i className="typcn typcn-key-outline"></i> Sign Out</Link>
                            </div>
                        </li>
                    </ul>

                </div>
            </nav>
        );
    }
}

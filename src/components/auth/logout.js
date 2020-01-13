import { Component } from "react";
export default class Logout extends Component {
    render() {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        return (window.location.href="/auth/login")
    }
}
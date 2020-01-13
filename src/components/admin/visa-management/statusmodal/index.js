import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import API from '../../../api';
import { withTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
// import Loader from 'react-loader';

class StatusModal extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false, status: "0", loading: false }
    }

    handleOpen(e) {
        this.setState({ open: !this.state.open, loading: true })
    }

    handleClose(e) {
        this.setState({ open: !this.state.open })
    }

    handleChange(e) {
        this.setState({ status: e.target.value })
    }
    handleSubmit(e) {
        new API().getHttpClient().post('formSubmition/update', {
            id: this.props.id, status: this.state.status
        }).then((res) => {
            window.location.reload();
        })
            .catch(error => {
                // toast.error("something error!")
                console.log(error);
            })
    }
    render() {
        const { t } = this.props;
        let options = (t('visaList.status')).map((data, i) => (
            <option key={data.value} value={data.status}>{data.name}</option>
        ));
        return (
            <div>
                <select className="form-control" value={this.props.status} onClick={(e) => this.handleOpen(e)} onChange={(e) => this.handleChange(e)}>
                    {options}
                </select>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                >
                    <div style={{ top: '25%', left: '40%', borderRadius: '6px' }} className="modal-content">
                        <div id="modal-header">
                            <button type="button" className="close" onClick={(e) => this.handleClose(e)}>×</button>
                            <h4 className="modal-title"><font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>Change state</font></font></h4>
                        </div>

                        <div className="modal-body">
                            <Typography>
                                Are you sure you want to update status for Visa <span>{this.props.code}</span> from  {this.props.status === 0 ? <span>"New"</span> : this.props.status === 1 ? <span>"Needs Adjustment"</span> : this.props.status === 2 ? <span>"Pending Approval"</span> : this.props.status === 3 ? <span>"Needs More Information"</span> : this.props.status === 4 ? <span>"Approved"</span> : this.props.status === 5 ? <span>"Rejected"</span> : ""} to {this.state.status === "0" ? <span>"New"</span> : this.state.status === "1" ? <span>"Needs Adjustment"</span> : this.state.status === "2" ? <span>"Pending Approval"</span> : this.state.status === "3" ? <span>"Needs More Information"</span> : this.state.status === "4" ? <span>"Approved"</span> : this.state.status === "5" ? <span>"Rejected"</span> : ""}
                            </Typography>

                        </div>

                        {/* --Footer-- */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default close-btn" onClick={(e) => this.handleClose(e)}>Close</button>
                            <button type="button" id="order-change-status" className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>Submit</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default withTranslation()(StatusModal);

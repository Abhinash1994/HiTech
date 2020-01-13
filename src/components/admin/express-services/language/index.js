import React, { Component } from 'react'
import API from '../../../api';
import { withTranslation } from 'react-i18next';

class Language extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectLanguage: 'EN'
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { value } = e.target;
        new API().getHttpClient().get(`/language/notice/name?name=${this.props.serviceNameKey}&code=${value}`, {
        }).then((res) => {
            this.props.onSelectLanguage(res.data);
        })
        new API().getHttpClient().get(`/language/notice/name?name=${this.props.expressServiceKeyNotice}&code=${value}`, {
        }).then((res) => {
            this.props.onSelectNotice(res.data);
        })
            .catch(error => {
                console.log(error)
            })
    }
    async componentWillMount() {
        await new API().getHttpClient().get(`/language/notice/name?name=${this.props.serviceNameKey}&code=EN`, {
        }).then((res) => {
            this.props.onSelectLanguage(res.data);
        })
        await new API().getHttpClient().get(`/language/notice/name?name=${this.props.expressServiceKeyNotice}&code=EN`, {
        }).then((res) => {
            this.props.onSelectNotice(res.data);
        })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        const { t } = this.props;
        return (
            <div>
                <label for="exampleInputEmail1">{t('expressServices.update.language')}</label>
                <select className="form-control" defaultValue={this.state.selectLanguage} onChange={this.handleChange} name="selectLanguage">
                    {/* <option value="-1" selected>Select Language</option> */}
                    <option value="EN">English</option>
                    <option value="VN">Vietnam</option>
                </select>
            </div>
        )
    }
};

export default withTranslation()(Language);

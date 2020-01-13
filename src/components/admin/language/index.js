import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import i18n from '../../../i18n';

const switchLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
}

class Language extends Component {
    state = {
        selectLanguage: [{ id: 'en', name: "English" }, { id: 'vn', name: "Vietnam" }]
    }

    handleChange = () => {
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <select name='language' defaultValue={this.state.selectLanguage[0].name} className='form-control' onChange={(e) => switchLanguage(e)}>
                    {this.state.selectLanguage.map((lang) => (
                        <option key={lang.id} value={lang.id}>{lang.name}</option>
                    ))}
                </select>
            </div>
        )
    }
};

export default withTranslation()(Language);
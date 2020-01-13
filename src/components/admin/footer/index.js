import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

class Footer extends Component {
    render() {
        const {t}= this.props;
        return (
            <footer className="footer-content">
                <div className="footer-text d-flex align-items-center justify-content-between">
                    <div className="copy">© 2019 Hi-Tek. {t('footer')} </div>
                </div>
            </footer>
        );
    }
}

export default withTranslation()(Footer);
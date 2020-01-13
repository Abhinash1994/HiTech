import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
import './notice.css';

const notice = (props) => {
  const { t } = useTranslation();
    return (
        <React.Fragment>
            <div className="form-group col-sm-8">
                <Typography className="font-weight-600">{props.title}</Typography>
                <textarea
                    className="form-control"
                    rows="3"
                    defaultValue={props.defaultValue?props.defaultValue:""}
                    onChange={e => props.handleMessageChange(e)} />
            </div>
            <div className="form-group col-sm-4">
    <Typography className="font-weight-600">{t('countryDetail.language')}</Typography>
                <select className="form-control" onClick={props.click}>
                    {props.selectLanguage.map(lan => (
                        <option value={lan.id} key={lan.id}>
                            {lan.name}
                        </option>
                    ))}
                </select>
                <Button className="notice-button-style"
                    variant="contained"
                    color="secondary"
                    onClick={props.btnUpdate}> {t('countryDetail.save')} </Button>
            </div>
        </React.Fragment>
    )
};

export default notice;
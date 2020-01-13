import React, { Component } from 'react'
import { Button, Typography } from '@material-ui/core/';
export default class EditAddon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price:0
        }
    }
    handleChange(index, value) {
        let newVisaFee = [...this.props.state];
        newVisaFee[index].price = value;

        this.setState({
            price: newVisaFee
        });
    }
    handleUpdate(){
        let array = [];
        let o =this.props.state;
        Object.keys(o).forEach(function (key) {
            var value = o[key];
            // let active = value.fee.active ? 1 : 0;
            let data = { id: value.id ,name:value.name,price:Number(value.price),addOnsMsgKey:value.addOnsMsgKey,stampFee:value.stampFee,isStampFeeInclude:value.isStampFeeInclude,msg:value.msg,isEnable:value.isEnable}
            array.push(data)
        })
        console.log(array)
    }
    render() {
        let self = this.props.state;
        return (
            <div>
                {
                    self.map((data, index) => {
                        return (
                            <div className="row" key={index}>
                                <div className="form-group col-md-12">
                                    <Typography >Stamp Fee</Typography>
                                    <select name="data[landingvisa_stamp_free]" className="form-control" style={{ width: 120 }}>
                                        <option value="on">Turn On</option>
                                        <option value="off" selected>Turn Off</option>
                                    </select>
                                </div>

                                <div className="form-group col-md-6">
                                    <Typography><font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>{data.name}</font></font></Typography>
                                    <input type="number" name="data[vip-airport-leaf]" className="form-control" value={data.price} onChange={(e) => this.handleChange(index, e.target.value)}/>
                                </div>

                            </div>
                        )
                    })
                }
                 <Button className="notice-button-style" variant="contained" color="secondary" onClick={(e) => this.handleUpdate(e)}>update</Button>
            </div>

        )
    }
}

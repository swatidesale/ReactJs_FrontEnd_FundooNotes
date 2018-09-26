import React, { Component } from 'react';
import labelicon from '../../../assets/icons/labelicon.svg';
import LabelController from '../../../controller/LabelController.js';
import Button from '@material-ui/core/Button';

const labelCtrl = new LabelController();

class DisplayLabels extends Component {
    constructor() {
        super();

        this.state = {
            labels: []
        }
    }

    componentDidMount() {
        var self = this;
        labelCtrl.getLabel(function (labelDetails) {
            if (labelDetails !== null && labelDetails !== undefined) {
                self.setState({
                    labels: labelDetails
                });
            }
            else {
                self.setState({
                    labels: []
                });
            }
        });
    }

    render() {
        return (
            Object.keys(this.state.labels).map((label) => {
                var key = label;
                var data = this.state.labels[key];
                if (label !== null) {
                    return ( 
                        <div>
                            <Button id="drawerbuttons" color="inherit">
                                <img src={labelicon} alt="labelicon" id="imagecreatedlabel" />
                                <div style={{marginLeft: 40}}>{data.label}</div>
                            </Button>
                        </div>
                    );
                }
                else {
                    return ( 
                        <div>
                        </div>
                    );
                }
            })
        );
    }
}

export default DisplayLabels;
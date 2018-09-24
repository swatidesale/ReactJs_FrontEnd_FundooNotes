import React, { Component } from 'react';
import labelicon from '../../../assets/icons/labelicon.svg';
import editlabel from '../../../assets/icons/editlabel.svg';
import deleteimg from '../../../assets/icons/trash.svg';
import LabelController from '../../../controller/LabelController.js';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';

const labelCtrl = new LabelController();

class DisplayLabelsOnDialog extends Component {
    constructor() {
        super();

        this.state = {
            labels: [],
            label: null,
            img: labelicon,
            opacity: 0.5,
            opacity1: 0.5
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

    deleteLabel(key) {
        labelCtrl.deleteLabel(key);
    }

    editLabel(label,key,data) {
        console.log("onClickEdit");
        labelCtrl.editLabel(label,key,data);
    }

    render() {
        return (
            Object.keys(this.state.labels).map((label) => {
                var key = label;
                var data = this.state.labels[key];
                if (label !== null) {
                    return ( 
                        <div className="labelondialog" >
                            <IconButton color="inherit" aria-label="labels"  id="deletelabelbtn" onClick={() => this.deleteLabel(key)}>
                                <img id="deletelabelimg" alt="labelicon"  style={{opacity: this.state.opacity}}
                                src={this.state.img}
                                onMouseEnter={() => {
                                  this.setState({
                                    img: deleteimg,
                                    opacity: 1
                                  })
                                }}
                      
                                onMouseOut={() => {
                                  this.setState({
                                    img: labelicon,
                                    opacity: 0.5
                                  })
                                }}
                                />
                            </IconButton>
                            <Input 
                                        id="editlabeldata"
                                        disableUnderline={true} 
                                        type="text" 
                                        defaultValue={data.label} 
                                        onInput={e => this.setState({ label: e.target.value })}
                                    />
                            <IconButton color="inherit" aria-label="labels"  id="editlabelbtn" onClick={() => this.editLabel(this.state.label,key,data)}>
                                <img src={editlabel} alt="editlabel" id="editlabelimg" style={{opacity: this.state.opacity1}}
                                        onMouseEnter={() => {
                                            this.setState({
                                                opacity1: 1
                                            })
                                        }}
                                
                                        onMouseOut={() => {
                                            this.setState({
                                                opacity1: 0.5
                                            })
                                        }}
                                />
                            </IconButton>
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

export default DisplayLabelsOnDialog;
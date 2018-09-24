import React, { Component } from 'react';
// import { CirclePicker } from 'react-color';
import Card from '@material-ui/core/Card';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Input, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import ToggleDisplay from 'react-toggle-display';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
// import Snackbar from '@material-ui/core/Snackbar';
// import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import pinnote from '../../../assets/icons/pinnote.svg';
import pickdate from '../../../assets/icons/peakdate.svg';
import pickplace from '../../../assets/icons/peakplace.svg';
import newnotewithimage from '../../../assets/icons/newnotewithimage.svg';
import collaborator from '../../../assets/icons/collaborator.svg';
import changecolor from '../../../assets/icons/changecolor.svg';
import archive from '../../../assets/icons/archive.svg';
import more from '../../../assets/icons/more.svg';
import undo from '../../../assets/icons/undo.svg';
import remindme from '../../../assets/icons/reminder.svg';
import redo from '../../../assets/icons/redo.svg';
import NoteController from '../../../controller/NoteController.js';
import LabelController from '../../../controller/LabelController.js';
import * as cookie from 'react-cookies';
// import $ from 'jquery';
// import axios from 'axios';

const noteCtrl = new NoteController();
const labelCtrl = new LabelController();

class OtherNote extends Component {
    constructor() {
        super();

        this.state = {
            anchorEl: null,
            anchorElRemind: null,
            anchorElAddLabel: null,
            anchorElColor: null,
            notes: [],
            open: false,
            title: null,
            notedata: null,
            labels: [],
            image: null,
            imageUrl: '',
            archive: false,
            color: true,
        }
        this.handleClickLabel = this.handleClickLabel.bind(this);
        this.handleCloseLabel = this.handleCloseLabel.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.triggerInputFile = this.triggerInputFile.bind(this);
        this.handleClickColor = this.handleClickColor.bind(this);
        this.handleCloseColor = this.handleCloseColor.bind(this);
    }

    // handleClickSnackbar = () => {
    // this.setState({ archive: true });
    //   };

    //   handleCloseSnackbar = (event, reason) => {
    //     if (reason === 'clickaway') {
    //       return;
    //     }

    //     this.setState({ archive: false });
    //   };

    handleClickColor(event) {
        this.setState({ anchorElColor: event.currentTarget });
    }

    handleCloseColor = () => {
        this.setState({ anchorElColor: null });
    };

    handleClickLabel(event) {
        this.setState({
            anchorElAddLabel: event.currentTarget
        });
    }

    handleCloseLabel() {
        this.setState({ anchorElAddLabel: null });
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleClickReminder = event => {
        this.setState({ anchorElRemind: event.currentTarget });
    };

    handleCloseReminder = () => {
        this.setState({ anchorElRemind: null });
    };

    handleClickOpen = () => {
        console.log("handleClickOpen");
        this.setState({ open: true });
    };

    handleClickClose = () => {
        this.setState({ open: false });
    };

    handleDelete(key, data) {
        noteCtrl.removeReminder(key, data);
    }

    handleDeleteLabel(key, data) {
        labelCtrl.removeLabel(key, data);
    }

    componentDidMount() {
        // noteCtrl.loadData()
        // setInterval((noteCtrl.loadData), 180000); 
        var self = this;
        noteCtrl.getNote(function (noteDetails) {
            if (noteDetails !== null && noteDetails !== undefined) {
                self.setState({
                    notes: noteDetails
                });
            }
            else {
                self.setState({
                    notes: []
                });
            }

            
            // debugger;
            // $.get('/home/notes').done((loadedData) => {
            //     console.log("Inside getntes"+loadedData);
            // });

            // axios.get(' http://localhost:3000/home/notes')
            //     .then(function (response) {
            //         console.log(response);
            //     });

            // console.log("Color"+this.state.background);
            
        });

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

    // componentDidUpdate() {
    //     var self = this;
    //     noteCtrl.getNote(function (noteDetails) {
    //         if (noteDetails !== null && noteDetails !== undefined) {
    //             self.setState({
    //                 notes: noteDetails
    //             });
    //         }
    //         else {
    //             self.setState({
    //                 notes: []
    //             });
    //         }
    //     });
    // }

    isPinNote(key, data) {
        noteCtrl.isPinNote(key, data);
    }

    isArchiveNote(key, data) {
        noteCtrl.isArchiveNote(key, data);
    }

    isTrashNote(key, data) {
        noteCtrl.isTrashNote(key, data);
    }

    onClickEdit(title, notedata, key, data) {
        console.log("onClickEdit");
        if (title !== null || notedata !== null) {
            data = {
                title: title,
                notedata: notedata
            }
            noteCtrl.updateNote(key, data);
            window.location.href = '/home/notes';
        }
        else {
            alert("Enter data to update");
        }
    }

    getToday(key, data) {
        noteCtrl.getToday(key, data);
    }

    getTomorrow(key, data) {
        noteCtrl.getTomorrow(key, data);
    }

    getNextWeek(key, data) {
        noteCtrl.getNextWeek(key, data);
    }

    changeColor(key,data,btn) {
        noteCtrl.changeColor(key,data,btn);
    }

    getLabel(key, data, labelName) {
        labelCtrl.getLabelData(key, data, labelName);
    }

    triggerInputFile() {
        this.fileInput.click();
    }
    
    handleImageChange = (event, key) => {
        var image = '';
        console.log("Inside " + event.target.files[0]);

        if (event.target.files[0]) {
            image = event.target.files[0].name;
        }
        noteCtrl.handleUploadImage(image, key);
    }

    setCookie = () => {
        console.log("SetCookies");
        // const expires = new Date();
        // expires.setDate(now.getDate() + 14);
        // cookie.save('token','token');

        cookie.save('modify',
            {
                path: '/',
                domain: 'http://localhost:3000',
            });
    }

    render() {
        const { anchorEl } = this.state;
        const { anchorElRemind } = this.state;
        const { anchorElAddLabel } = this.state;
        const { anchorElColor } = this.state;
        var otherNotesCount = [];
        return (
            Object.keys(this.state.notes).map((note) => {
                var key = note;
                var data = this.state.notes[key];
                if (data.isPin === false && data.isArchive === false && data.isTrash === false) {
                    otherNotesCount.push(data);
                    // console.log(otherNotesCount.length);
                    localStorage.setItem("otherNotesCount", otherNotesCount.length);
                    return (
                        <div id="submit" className="display-notes-div">
                            <div id="div_element" className="displaynotes column ">
                                <Card style={{ width: '100%',backgroundColor:data.background,borderRadius:0 }} >
                                    <div style={{ width: '90%', marginTop: 10, marginLeft: 10, fontWeight: 'bolder', position: 'relative' }}>
                                        {/* {console.log(data.imageUrl)} */}
                                        {/* {data.imageUrl ?
                                    <img src={data.imageUrl} alt="data.imageUrl" width='230px'/>
                                    :
                                    null
                                    } */}

                                        <div style={{width:'80%', paddingBottom: 10, paddingTop: 10 }} onClick={this.handleClickOpen}>
                                            {data.title}
                                        </div>
                                        <div id="note-btns">
                                            <Tooltip title="Pin note">
                                                <IconButton style={{ height: 30, width: 30, position: 'absolute', display: 'inline-flex', top: -5, right: '-7%' }}
                                                    color="primary"
                                                    onClick={() => this.isPinNote(key, data)}
                                                >
                                                    <img src={pinnote} alt="pinnote" id="noteicons" />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </div>

                                    <div onClick={this.handleClickOpen} style={{ width: '100%', marginLeft: 10, marginBottom: 10,fontSize:15 }}>{data.notedata}</div>

                                    {data.reminder ?
                                        <Chip
                                            avatar={
                                                <img src={pickdate} alt="pickdate" id="avtarremindermenuicons" />
                                            }
                                            label={data.reminder}
                                            // onClick={handleClick}
                                            onDelete={() => this.handleDelete(key, data)}
                                            style={{ borderRadius: 1, height: 24, marginLeft: 10, fontSize: 11 }}
                                        />
                                        :
                                        null
                                    }

                                    {data.label ?
                                        <Chip
                                            label={data.label}
                                            onDelete={() => this.handleDeleteLabel(key, data)}
                                            style={{ borderRadius: 1, height: 24, marginLeft: 10, fontSize: 11 }}
                                        />
                                        :
                                        null
                                    }

                                    <div id="note-btns" style={{ width: 240, height: 40 }}>
                                        <Tooltip title="Reminde me">
                                            <IconButton color="primary" id="notebuttons"
                                                aria-owns={anchorElRemind ? 'simple-menu' : null}
                                                aria-haspopup="true"
                                                onClick={this.handleClickReminder}
                                            >
                                                <img src={remindme} alt="remindme" id="noteicons" />
                                            </IconButton>
                                        </Tooltip>

                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorElRemind}
                                            open={Boolean(anchorElRemind)}
                                            onClose={this.handleCloseReminder}
                                        >
                                            <div id="reminderdiv" >Reminder : </div>
                                            <MenuItem id="menuitems" onClick={() => { this.handleCloseReminder(); this.getToday(key, data) }}>Later Today<div id="remindermenu">8:00 PM</div></MenuItem>
                                            <MenuItem id="menuitems" onClick={() => { this.handleCloseReminder(); this.getTomorrow(key, data) }}>Tomorrow<div id="remindermenu">8:00 AM</div></MenuItem>
                                            <MenuItem id="menuitems" onClick={() => { this.handleCloseReminder(); this.getNextWeek(key, data) }}>Next Week<div id="remindermenu">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Mon, 8:00 AM</div></MenuItem>
                                            <MenuItem id="menuitems" onClick={this.handleCloseReminder}>
                                                <img src={pickdate} alt="pickdate" id="remindermenuicons" />
                                                Pick date & time
                                        </MenuItem>
                                            <MenuItem id="menuitems" onClick={this.handleCloseReminder}>
                                                <img src={pickplace} alt="pickplace" id="remindermenuicons" />
                                                Pick place
                                        </MenuItem>
                                        </Menu>


                                        <Tooltip title="Collaborator">
                                            <IconButton color="primary" id="notebuttons">
                                                <img src={collaborator} alt="collaborator" id="noteicons" />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Change color">
                                            <IconButton color="primary" id="notebuttons" className="change-color-btn"
                                                aria-owns={anchorElColor ? 'color-menu' : null}
                                                aria-haspopup="true"
                                                onClick={this.handleClickColor}
                                            // onMouseOver={this.handleClickColor}
                                            >
                                                <img src={changecolor} alt="changecolor" id="noteicons" />
                                            </IconButton>
                                        </Tooltip>

                                        {/* <div id="change-color-div"> */}
                                        <Menu
                                            id="color-menu"
                                            position="right top"
                                            anchorEl={anchorElColor}
                                            open={Boolean(anchorElColor)}
                                            onClose={this.handleCloseColor}
                                        >
                                            {/* <Tooltip title="White"> */}
                                                <IconButton id="color-btn" onClick={() => {this.handleCloseColor();this.changeColor(key,data,1)}}>
                                                    <div className="color-change-div" style={{ backgroundColor: "white" }}></div>
                                                </IconButton>
                                            {/* </Tooltip> */}
                                            <Tooltip title="Red">
                                                <IconButton id="color-btn" onClick={() => {this.handleCloseColor();this.changeColor(key,data,2)}}>
                                                    <div className="color-change-div" style={{ backgroundColor: "rgb(255, 138, 128)" }}></div>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Orange">
                                                <IconButton id="color-btn" onClick={() => {this.handleCloseColor();this.changeColor(key,data,3)}}>
                                                    <div className="color-change-div" style={{ backgroundColor: "rgb(255, 209, 128)" }}></div>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Yellow">
                                                <IconButton id="color-btn" onClick={() => {this.handleCloseColor();this.changeColor(key,data,4)}}>
                                                    <div className="color-change-div" style={{ backgroundColor: "rgb(255, 255, 141)" }}></div>
                                                </IconButton>
                                            </Tooltip>
                                            <br></br>
                                            <Tooltip title="Green">
                                                <IconButton id="color-btn" onClick={() => {this.handleCloseColor();this.changeColor(key,data,5)}}>
                                                    <div className="color-change-div" style={{ backgroundColor: "rgb(204, 255, 144)" }}></div>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Teal">
                                                <IconButton id="color-btn" onClick={() => {this.handleCloseColor();this.changeColor(key,data,6)}}>
                                                    <div className="color-change-div" style={{ backgroundColor: "rgb(167, 255, 235)" }}></div>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Blue">
                                                <IconButton id="color-btn" onClick={() => {this.handleCloseColor();this.changeColor(key,data,7)}}>
                                                    <div className="color-change-div" style={{ backgroundColor: "rgb(128, 216, 255)" }}></div>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Dark blue">
                                                <IconButton id="color-btn" onClick={() => {this.handleCloseColor();this.changeColor(key,data,8)}}>
                                                    <div className="color-change-div" style={{ backgroundColor: "rgb(130, 177, 255)" }}></div>
                                                </IconButton>
                                            </Tooltip>
                                            <br></br>
                                            <Tooltip title="Purple">
                                                <IconButton id="color-btn" onClick={() => {this.handleCloseColor();this.changeColor(key,data,9)}}>
                                                    <div className="color-change-div" style={{ backgroundColor: "rgb(179, 136, 255)" }}></div>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Pink">
                                                <IconButton id="color-btn" onClick={() => {this.handleCloseColor();this.changeColor(key,data,10)}}>
                                                    <div className="color-change-div" style={{ backgroundColor: "rgb(248, 187, 208)" }}></div>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Brown">
                                                <IconButton id="color-btn" onClick={() => {this.handleCloseColor();this.changeColor(key,data,11)}}>
                                                    <div className="color-change-div" style={{ backgroundColor: "rgb(215, 204, 200)" }}></div>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Gray">
                                                <IconButton id="color-btn" onClick={() => {this.handleCloseColor();this.changeColor(key,data,12)}}>
                                                    <div className="color-change-div" style={{ backgroundColor: "rgb(207, 216, 220)" }}></div>
                                                </IconButton>
                                            </Tooltip>
                                        </Menu>
                                        {/* </div> */}

                                        <input style={{ display: 'none' }}
                                            type="file"
                                            ref={fileInput => this.fileInput = fileInput}
                                            // onChange={(event) => {this.handleImageChange(event)}} 
                                            onChange={((e) => this.handleImageChange(e, key))}
                                        >
                                        </input>
                                        <Tooltip title="Add image">
                                            <IconButton color="primary" id="notebuttons" onClick={this.triggerInputFile}>
                                                <img src={newnotewithimage} alt="newnotewithimage" id="noteicons" />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Archive">
                                            <IconButton color="primary" id="notebuttons" onClick={() => { this.isArchiveNote(key, data)}}>
                                                <img src={archive} alt="archive" id="noteicons" />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="More">
                                            <IconButton name={note.key} color="primary" id="notebuttons"
                                                aria-owns={anchorEl ? 'simple-menu' : null}
                                                aria-haspopup="true"
                                                onClick={this.handleClick}
                                            >
                                                <img src={more} alt="more" id="noteicons" />
                                            </IconButton>
                                        </Tooltip>

                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={this.handleClose}
                                        >
                                            <Button id="note-menu-btn" onClick={() => { this.handleClose(); this.isTrashNote(key, data) }}>Delete note</Button>
                                            <br></br>
                                            <Button style={{ paddingLeft: 2 }}
                                                id="note-menu-btn"
                                                aria-owns={anchorElAddLabel ? 'simple-menu-add-label' : null}
                                                aria-haspopup="true"
                                                onClick={this.handleClickLabel}>
                                                Add label
                                        </Button>
                                        </Menu>
                                    </div>
                                </Card>
                            </div>
                            {/* ----------------------- Edit Note Implementation -------------------- */}
                            <div>
                                <Dialog
                                    open={this.state.open}
                                    onClose={this.handleClickClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        <Input style={{ width: 500, height: 43 }}
                                            id="edittitle"
                                            className="addnotetitleinput"
                                            disableUnderline={true}
                                            type="text"
                                            defaultValue={data.title}
                                            onInput={e => this.setState({ title: e.target.value })}
                                        />
                                    </DialogTitle>
                                    <DialogContent>
                                        <Input
                                            id="editnotedata"
                                            className="addnotetitleinput"
                                            disableUnderline={true}
                                            type="text"
                                            defaultValue={data.notedata}
                                            onInput={e => this.setState({ notedata: e.target.value })}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <div style={{ width: 600, height: 40, marginTop: -12 }}>
                                            <IconButton color="primary" >
                                                <img src={remindme} alt="remindme" id="noteicons" />
                                            </IconButton>
                                            <IconButton color="primary" >
                                                <img src={collaborator} alt="collaborator" id="noteicons" />
                                            </IconButton>

                                            <IconButton color="primary" >
                                                <img src={changecolor} alt="changecolor" id="noteicons" />
                                            </IconButton>

                                            <IconButton color="primary" >
                                                <img src={newnotewithimage} alt="newnotewithimage" id="noteicons" />
                                            </IconButton>

                                            <IconButton color="primary" >
                                                <img src={archive} alt="archive" id="noteicons" />
                                            </IconButton>

                                            <IconButton color="primary" id="notebuttons"
                                                aria-owns={anchorEl ? 'simple-menu-items' : null}
                                                aria-haspopup="true"
                                                onClick={this.handleClick}
                                            >
                                                <img src={more} alt="more" id="noteicons" />
                                            </IconButton>

                                            <Menu
                                                id="simple-menu-items"
                                            // anchorEl={anchorEl}
                                            // open={Boolean(anchorEl)}
                                            // onClose={this.handleClose}
                                            >
                                                <MenuItem>Delete note</MenuItem>
                                                <MenuItem>Add label</MenuItem>
                                            </Menu>

                                            <IconButton color="primary" >
                                                <img src={undo} alt="undo" id="noteicons" />
                                            </IconButton>
                                            <IconButton color="primary" >
                                                <img src={redo} alt="redo" id="noteicons" />
                                            </IconButton>

                                            <Button id="closebutton" onClick={() => { this.onClickEdit(this.state.title, this.state.notedata, key, data); this.setCookie() }}>Close</Button>
                                        </div>
                                    </DialogActions>
                                </Dialog>
                            </div>

                            {/* ----------------------- Add Label On Note -------------------- */}
                            <Menu
                                id="simple-menu-add-label"
                                anchorEl={anchorElAddLabel}
                                open={Boolean(anchorElAddLabel)}
                                onClose={this.handleCloseLabel}
                            >
                                <div id="label-note">Label note</div>
                                <Input
                                    id="label-search"
                                    disableUnderline={true}
                                    type="text"
                                    placeholder="Enter label name"
                                // onClick={() => this.handleClickShow()}
                                />
                                {Object.keys(this.state.labels).map((label) => {
                                    var labelKey = label;
                                    var labelName = this.state.labels[labelKey];
                                    return (
                                        <div>
                                            {/* <Checkbox color="default"/>
                                            <div>{labelName.label}</div> */}
                                            <FormControlLabel
                                                id="add-label-note"
                                                control={
                                                    <Checkbox
                                                        // id="add-label-checkbox"
                                                        style={{ width: 36, height: 36, padding: 5 }}
                                                        icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 20 }} />}
                                                        checkedIcon={<CheckBoxIcon style={{ fontSize: 20 }} />}
                                                        // checked={this.state.checkedB}
                                                        // onChange={this.handleChange('checkedB')}
                                                        // value="checkedB"
                                                        color="default"
                                                        onClick={() => {this.getLabel(key, data, labelName.label);this.handleClose()}}
                                                    />
                                                }
                                                label={labelName.label}
                                            />
                                        </div>
                                    );
                                })
                                }
                            </Menu>
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

export default OtherNote;
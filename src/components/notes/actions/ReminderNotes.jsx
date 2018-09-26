import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Input, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
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

const noteCtrl = new NoteController();

class OtherNote extends Component {
    constructor() {
        super();

        this.state = {
            anchorEl: null,
            anchorElRemind: null,
            anchorElColor: null,
            notes: [],
            open: false,
            title: null,
            notedata: null,
            color: true,
        }

        this.handleClickColor = this.handleClickColor.bind(this);
        this.handleCloseColor = this.handleCloseColor.bind(this);
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };


    handleClickColor(event) {
        this.setState({ anchorElColor: event.currentTarget });
    }

    handleCloseColor = () => {
        this.setState({ anchorElColor: null });
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

    componentDidMount() {
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
        });
    }

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

    render() {
        const { anchorEl } = this.state;
        const { anchorElRemind } = this.state;
        const { anchorElColor } = this.state;
        return (
            Object.keys(this.state.notes).map((note) => {
                var key = note;
                var data = this.state.notes[key];
                if (data.reminder) {
                    return (
                        <div  className="display-notes-div">
                        <div id="div_element" className="displaynotes column ">
                            <Card style={{ width: '100%',backgroundColor:data.background,borderRadius:0 }}>
                                <div style={{ height: 38, width: '90%', marginTop: 10, marginLeft: 10, fontWeight: 'bolder', position: 'relative' }}>
                                    <div style={{width:'80%', paddingBottom: 10, paddingTop: 10 }} onClick={this.handleClickOpen}>
                                        {data.title}
                                    </div>

                                    <div id="note-btns">
                                     <IconButton style={{ height: 30, width: 30, position: 'absolute', display: 'inline-flex', top: -5, right: '-7%' }}
                                        color="primary"
                                        onClick={() => this.isPinNote(key, data)}
                                    >
                                        <img src={pinnote} alt="pinnote" id="noteicons" />
                                    </IconButton>
                                    </div>
                                </div>

                                <div onClick={this.handleClickOpen} style={{ width: 240,marginLeft: 10,marginBottom:10 }}>{data.notedata}</div>

                                <Chip
                                    avatar={
                                        <img src={pickdate} alt="pickdate" id="avtarremindermenuicons" />
                                    }
                                    label={data.reminder}
                                    // onClick={handleClick}
                                    onDelete={() => this.handleDelete(key, data)}
                                    style={{ borderRadius: 1, height: 24, marginLeft: 10, fontSize: 11 }}
                                />

                                <div id="note-btns" style={{ width: 240, height: 40 }}>
                                    <IconButton color="primary" id="notebuttons"
                                        aria-owns={anchorElRemind ? 'simple-menu' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleClickReminder}
                                    >
                                        <img src={remindme} alt="remindme" id="noteicons" />
                                    </IconButton>

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

                                    <IconButton color="primary" id="notebuttons">
                                        <img src={collaborator} alt="collaborator" id="noteicons" />
                                    </IconButton>

                                    <IconButton color="primary" id="notebuttons"className="change-color-btn"
                                        aria-owns={anchorElColor ? 'color-menu' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleClickColor}
                                    >
                                        <img src={changecolor} alt="changecolor" id="noteicons" />
                                    </IconButton>

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

                                    <IconButton color="primary" id="notebuttons">
                                        <img src={newnotewithimage} alt="newnotewithimage" id="noteicons" />
                                    </IconButton>

                                    <IconButton color="primary" id="notebuttons" onClick={() => this.isArchiveNote(key, data)}>
                                        <img src={archive} alt="archive" id="noteicons" />
                                    </IconButton>

                                    <IconButton name={note.key} color="primary" id="notebuttons"
                                        aria-owns={anchorEl ? 'simple-menu' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleClick}
                                    >
                                        <img src={more} alt="more" id="noteicons" />
                                    </IconButton>

                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={this.handleClose}
                                    >
                                        <MenuItem id="menuitems" onClick={() => { this.handleClose(); this.isTrashNote(key, data) }}>Delete note</MenuItem>
                                        <MenuItem id="menuitems" onClick={this.handleClose}>Add label</MenuItem>
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

                                            <Button id="closebutton" onClick={() => this.onClickEdit(this.state.title, this.state.notedata, key, data)}>Close</Button>
                                        </div>
                                    </DialogActions>
                                </Dialog>
                            </div>
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
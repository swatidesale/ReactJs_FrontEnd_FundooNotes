import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import more from '../../../assets/icons/more.svg';
import NoteController from '../../../controller/NoteController.js';
import LabelController from '../../../controller/LabelController.js';

const noteCtrl = new NoteController();
const labelCtrl = new LabelController();

class TrashNotes extends Component {
    constructor() {
        super();

        this.state = {
            anchorEl: null,
            notes: [],
            isPin: false
        }
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    componentDidMount() {
        var self = this;
        console.log("inside displaynotes");
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
        console.log("Inside isPinNote");
        noteCtrl.isPinNote(key, data);
    }

    isArchiveNote(key, data) {
        console.log("Inside isArchive");
        noteCtrl.isArchiveNote(key, data);
    }

    isTrashNote(key, data) {
        console.log("Inside Trash");
        noteCtrl.isTrashNote(key, data);
    }

    deleteForever(key, data) {
        console.log("Inside delete");
        noteCtrl.removeNotes(key, data);
    }

    handleDeleteLabel(key, data) {
        labelCtrl.removeLabel(key, data);
    }

    render() {
        const { anchorEl } = this.state;
        var trashNotesCount = [];
        return (
            Object.keys(this.state.notes).map((note) => {
                var key = note;
                var data = this.state.notes[key];
                if (data.isTrash === true && data.isPin === false) {
                    trashNotesCount.push(data);
                    localStorage.setItem("trashNotesCount", trashNotesCount.length);
                    return (
                        <div className="display-notes-div">
                            {/* {localStorage.getItem("trashNotesCount")} */}
                            <div id="div_element" className="displaynotes column ">
                                <Card style={{ width: '100%', backgroundColor: data.background ,borderRadius:0}}>
                                    <div>
                                        <div style={{ height: 38, width: 210, marginTop: 10, marginLeft: 10, fontWeight: 'bolder', position: 'relative' }}>
                                            {data.title}
                                        </div>
                                    </div>

                                    <div style={{ width: 240, marginLeft: 10, marginBottom: 10 }}>{data.notedata}</div>

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
                                            <MenuItem id="menuitems" onClick={() => { this.handleClose(); this.deleteForever(key, data) }}>Delete forever</MenuItem>
                                            <MenuItem id="menuitems" onClick={() => { this.handleClose(); this.isTrashNote(key, data) }}>Restore</MenuItem>
                                        </Menu>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div>
                        </div>
                    )
                }
            })
        );
    }
}

export default TrashNotes;
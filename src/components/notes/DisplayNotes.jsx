import React, { Component } from 'react';
import PinNotes from './actions/PinNotePage';
import OtherNotes from './actions/OtherNotePage';
 
class DisplayNotes extends Component {
    render() {
        var otherCount = localStorage.getItem("otherNotesCount");
        var pinnedCount = localStorage.getItem("pinnedNotesCount");
        return(
            <div>
                <div style={{width: 240,marginLeft: 400,marginTop: 35,opacity:0.5,fontWeight:'bold',fontSize:15}}>
                    Pinned {pinnedCount}
                </div>
                {/* <div  style={{left : '400px'}}> */}
                <PinNotes />
                {/* </div> */}
                <div style={{width: 240,marginLeft: 400,marginTop: 160,opacity:0.5,fontWeight:'bold',fontSize:15}}>
                    Others {otherCount}
                </div>
                <div>
                    <OtherNotes />
                </div>
            </div>
        );
    }
}

export default DisplayNotes;
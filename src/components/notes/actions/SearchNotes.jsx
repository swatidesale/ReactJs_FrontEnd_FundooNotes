import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
// import image from '../../../assets/icons/searchimage.svg';
import reminder from '../../../assets/icons/searchreminder.svg';

class SearchNote extends Component {

    goToReminder() {
        window.location.href = '/home/reminder';
    }

    render() {
        return(
            <div>
                <div className="search-notes-main-div">
                    <Card id="search-note-card" >
                        <div id="types-div">Types</div>
                        <Button id="search-btn" onClick={this.goToReminder}>
                            <img src={reminder} alt="reminder" id="search-reminder"/>
                            <div id="reminder-div">Reminders</div>
                        </Button>
                        {/* <Button id="search-btn">
                            <img src={image} alt="image" id="search-image"/>
                            <div id="image-div">Images</div>
                        </Button> */}
                   </Card>
                   {/* <Card id="search-note-card-color">
                        <div id="types-div">Colors</div>
                   </Card> */}
                </div>
            </div>
        );
    }
}

export default SearchNote;
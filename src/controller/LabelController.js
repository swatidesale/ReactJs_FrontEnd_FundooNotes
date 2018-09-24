import firebase from '../firebase.js';
import NoteController from './NoteController.js';

var userId = localStorage.getItem('userKey');
const noteCtrl = new NoteController();

class LabelController {
    createLabel(label) {
        const labels =   {
            userId: userId,
            label: label
        }

        const labelRef = firebase.database().ref('labels');
        console.log(label);
        
        if(label !== null) {
            labelRef.push(labels);
            // window.location.href = '/home/notes';
        }
        else {
            alert("Enter label");
            // window.location.href = '/home/notes';
        }
    }

    getLabel(callback) {
        const labelRef = firebase.database().ref('labels');
        labelRef.orderByChild('userId').equalTo(userId).on('value',function(snapshot) {
            var value = snapshot.val();
            
            return callback(value);
        });
    }

    editLabel(label,key,data) {
        if(label !== null) {
            data = {
                label: label
            }
            const labelRef = firebase.database().ref('labels');
            labelRef.child(key).update(data);
        }
        else {
            alert("Enter data to update");
        }
    }

    deleteLabel(key) {
        const labelRef = firebase.database().ref('labels');
        labelRef.child(key).remove();
        // window.location.href = '/home/notes';
    }

    getLabelData(key,note,labelName) {
        note.label = [labelName];
        noteCtrl.updateNote(key,note);
    }

    removeLabel(key, data) {
        data.label = null;
        noteCtrl.updateNote(key,data) 
    }
}

export default LabelController;
import firebase from '../firebase.js';
import $ from 'jquery'; 
var dateFormat = require('dateformat');
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory();

var userId = localStorage.getItem('userKey');

// Get the elements with class="column"
var elements = document.getElementsByClassName("column");

// Declare a loop variable
var i;

class NoteController {
    constructor() {
        this.state = {
            url:'/home/notes'
        }

        this.loadData = this.loadData.bind(this);
    }

    loadData() {
        console.log("inside loadadat"+this.state.url);
        
        $.ajax({
            success: function() {
                window.location.reload();
            }
        });

        // $('#submit').click(function(event){ 
        //     $("#div_element").load('/home/notes');  
        //  }); 

        //  $('#submit').load(document.URL +  ' #submit');
        //  console.log(document.URL);

        // $.ajax({
        //     url: "/home/notes",
        //     type: "GET",
        //     dataType: "html",
        //     success: function (res) {
        //          $("#submit").html($(res).find("#div_element")
        //                                     .addClass('done'))
        //                        .fadeIn('slow');
        //     }
        //   });
    }

    addNotes() {
        console.log("inside addNote()");
        var title = document.getElementById('addtitleinput').value;
        var notedata = document.getElementById('addnoteinput').value;

        const note = {
            userId: userId,
            title: title,
            notedata: notedata,
            imageUrl: null,
            background: 'white',
            isPin: false,
            isArchive: false,
            isTrash: false,
            reminder: null,
            label: []
        }

        const noteRef = firebase.database().ref('notes');
        if(note.title !=="" || note.notedata !== "") {
            console.log("if");
            noteRef.push(note);
            // this.loadData();
            // setInterval((this.loadData), 180000); 
            // window.location.href = '/home/notes';
        }
        else {
            console.log("else");
            // history.push('/home');
            // window.location.href = '/home/notes';
        }
    }

    getNote(callback) {
        const noteRef = firebase.database().ref('notes');
        noteRef.orderByChild('userId').equalTo(userId).on('value',function(snapshot) {
            // snapshot.forEach(function(snapshot){
                var value = snapshot.val();
                return callback(value);
            // });
        });
    }

    isPinNote(key,note) {
        if(note.isPin === false) {
            note.isPin = true;
        }
        else {
            note.isPin = false;
        }

        this.updateNote(key,note);
        // window.location.href = '/home/notes';
    }

    isArchiveNote(key,note) {
        if(note.isArchive === false) {
            note.isArchive = true;
        }
        else {
            note.isArchive = false;
        }

        this.updateNote(key,note);
        // window.location.href = '/home/notes';
    }

    isTrashNote(key,note) {
        if(note.isTrash === false) {
            note.isTrash = true;
        }
        else {
            note.isTrash = false;
        }

        this.updateNote(key,note);
        // window.location.href = '/home/notes';
    }

    updateNote(key,note) {
        const noteRef = firebase.database().ref('notes');
        noteRef.child(key).update(note);
    }

    removeNotes(key,note) {
        const noteRef = firebase.database().ref('notes');
        noteRef.child(key).remove();
        // window.location.href = '/home/notes';
    }

    removeReminder(key,note) {
        note.reminder = null;
        this.updateNote(key,note) 
    }

    notesInGridView() {
        for (i = 0; i < elements.length; i++) {
            elements[i].style.width = "27%";
        }
    }

    notesInListView() {
        for (i = 0; i < elements.length; i++) {
            elements[i].style.width = "70%";
        }
    }

    getToday(key,note) {
        console.log(note.reminder);
        
        var day = new Date();   
        var today = dateFormat(day,"mmm d, h:MM TT"); 
        console.log("Date......");
        console.log(today); 
        note.reminder = today;
        console.log(note.reminder);
        
        this.updateNote(key,note);
        // window.location.href = '/home/notes';
    }

    getTomorrow(key,note) {
        var day = new Date();   
        day.setDate(day.getDate()+1);
        var tomorrow = dateFormat(day,"mmm d, h:MM TT");
        console.log(tomorrow); 
        note.reminder = tomorrow;
        this.updateNote(key,note);
        // window.location.href = '/home/notes';
    }

    getNextWeek(key,note) { 
        var day = new Date();
        day.setDate(day.getDate() + (1 + 7 - day.getDay()) % 7);
        var nextMonday = dateFormat(day,"mmm d, h:MM TT");
        console.log(nextMonday);
        note.reminder = nextMonday;
        this.updateNote(key,note);
        // window.location.href = '/home/notes';
    }

    changeColor(key,note,btn) {
        if(btn === 1) {
            note.background = 'white';
        }
        else if(btn === 2) {
            note.background = 'rgb(255, 138, 128)';
        }
        else if(btn === 3) {
            note.background = 'rgb(255, 209, 128)';
        }
        else if(btn === 4) {
            note.background = 'rgb(255, 255, 141)';
        }
        else if(btn === 5) {
            note.background = 'rgb(204, 255, 144)';
        }
        else if(btn === 6) {
            note.background = 'rgb(167, 255, 235)';
        }
        else if(btn === 7) {
            note.background = 'rgb(128, 216, 255)';
        }
        else if(btn === 8) {
            note.background = 'rgb(130, 177, 255)';
        }
        else if(btn === 9) {
            note.background = 'rgb(179, 136, 255)';
        }
        else if(btn === 10) {
            note.background = 'rgb(248, 187, 208)';
        }
        else if(btn === 11) {
            note.background = 'rgb(215, 204, 200)';
        }
        else if(btn === 12) {
            note.background = 'rgb(207, 216, 220)';
        }
        else {
            note.background = 'white';
        }
        
        this.updateNote(key,note);
    }

    handleUploadImage(image,key)  {
        // var selectedFile = FileList
        // var file = File
        
        console.log("Inside upload image");
        const uploadTask = firebase.storage().ref();
        // let file = selectedFile.file(0);
        console.log(image);
        console.log("upload : "+uploadTask);
        var store = uploadTask.child('noteImage/'+image);
        console.log("Store : "+store);
        
        store.put(image).then(function () {
            console.log("inside");
            
            store.getDownloadURL().then(function (imageUrl) {
                console.log(imageUrl);
                var updateNote = {
                    imageUrl: imageUrl
                }
                console.log("updatenote"+updateNote);
                const noteRef = firebase.database().ref('notes');
                noteRef.child(key).update(updateNote);
            })
        }, function(error) {
            console.log(error);
        });
    }
}

export default NoteController;
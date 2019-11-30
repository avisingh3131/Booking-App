import { Component, OnInit} from '@angular/core';
import { Note} from '../../models/Note';
import { CommonService } from '../../services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  currentNote: Note = { // current Note tuple
    title: '',
    description: '',
    isEdit: false,
    isView: false,
    _id: ''
  };
  index;


  constructor(public commonService: CommonService ,  private toaster: MatSnackBar) {  }


  ngOnInit() {

  }

  addNote() { // to add the currentNote in allNote array
    try {
      this.commonService.postNote(this.currentNote).subscribe(response => {
        if (!response['error'] && response['data']) {
          this.commonService.allNoteList.unshift(response['data']);
          this.toaster.open('Note added', 'Note', {
            duration: 2000,
            verticalPosition: 'top'
        });
        }
      });
      this.currentNote = {
        title: '',
        description: '',
        isEdit: false,
        isView: false,
        _id: ''
      };
    } catch (error) {
      console.log('error in addNote()' , error);
    }
  }

  editNote(currentNote: Note) {// to edit the currentNote
    try {
      this.currentNote = currentNote;
    this.index = this.commonService.allNoteList.indexOf(currentNote);
    } catch (error) {
      console.log('error in editNote()' , error);
    }
  }
  updateNote() {// to update the currentNote in allNote array at same index
    try {
      this.currentNote['isEdit'] = false;
    this.commonService.updateNote(this.currentNote).subscribe(response => {
      if (!response['error'] && response['data']) {
        this.commonService.allNoteList[this.index] = response['data'];
        this.toaster.open('Note updated', 'Note', {
          duration: 2000,
          verticalPosition: 'top'
      });
      }
    });
    this.currentNote = {
      title: '',
      description: '',
      isEdit: false,
      isView: false,
      _id: ''
    };
    } catch (error) {
      console.log('error in updateNote()' , error);
    }
  }

}







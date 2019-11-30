import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Note } from '../../models/Note';
import { ExampleTab } from '../../models/ExampleTab';
import { CommonService } from '../../services/common.service';
import { Observable, Observer } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  @Output() edit: EventEmitter<Note> = new EventEmitter();

  asyncTabs: Observable<ExampleTab[]>;


  constructor(public commonService: CommonService, private toaster: MatSnackBar) {
    this.asyncTabs = Observable.create((observer: Observer<ExampleTab[]>) => { // to pass the tab content dynamicaly in angular material tab
      observer.next([
        { label: 'Notes', content: this.commonService.allNoteList }
      ]);

    });

  }

  ngOnInit() { }

  editNote(currentNote: Note) { // edit the Note by calling the editNote() function of NoteComponent using Output and event emmiter.
    try {
      this.commonService.showNoteList = false;
      currentNote['isEdit'] = true;
      this.edit.emit(currentNote);
    } catch (error) {
      console.log('error in editNote()', error);
    }
  }

  removeNote(currentNote: Note) {// to edit the qualification in currentNote
    try {
      const index = this.commonService.allNoteList.indexOf(currentNote);
      this.commonService.allNoteList.splice(index, 1);
      this.commonService.deleteNote(currentNote._id).subscribe(response => {
        if (!response['error']) {
          this.toaster.open('Note deleted', 'Note', {
            duration: 2000,
            verticalPosition: 'top'
          });
        }
      });
    } catch (error) {
      console.log('error in removeNote()', error);
    }
  }
}

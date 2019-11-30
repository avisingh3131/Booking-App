import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private commonService: CommonService , private router: Router) { }

  ngOnInit() {
    this.commonService.getAll().subscribe((data) => {
      if (data.length > 0) {
        const reverseData = data.reverse();
        reverseData.forEach(note => {
          note['isEdit'] = false;
          note['isView'] = false;
        });
        this.commonService.allNoteList = reverseData;
      }
    });

  }
  viewNotes() {
    try {
      this.commonService.showNoteList = true;
    } catch (error) {
      console.log('error in viewNotes()',  error);
    }
  }
  viewHome() {
    try {
      this.commonService.showNoteList = false;
    } catch (error) {
      console.log('error in viewHome()',  error);
    }
  }
  logOut() {
    try {
      this.router.navigate(['/']);
    } catch (error) {
      console.log('error in logOut()',  error);
    }
  }
}

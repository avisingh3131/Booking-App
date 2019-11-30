import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { LogIn } from '../../models/LogIn';
import { CommonService } from '../../services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
})

export class LoginComponent implements OnInit {
    public isLoading: boolean;
    public userDetails = {
        userNameOrEmail: '',
        password: ''
    };
    public isLogin: Boolean = false;
    public errorConfig: Boolean = false;
    data: LogIn = {
        userName: '',
        userEmail: '',
        password: ''
    };
    spinner;

    constructor(public dialog: MatDialog, public commonService: CommonService, private toaster: MatSnackBar, private router: Router) { }

    ngOnInit() {
    }

    login() {
        this.spinner = true;
        try {
            this.commonService.login(this.userDetails).subscribe(response => {
                if (!response['error']) {
                    this.toaster.open(response.description, 'Login', {
                        duration: 2000,
                        verticalPosition: 'top'
                    });
                    this.router.navigate(['/home']);
                    this.spinner = false;
                    this.userDetails = {
                        userNameOrEmail: '',
                        password: ''
                    };
                } else {
                    this.toaster.open(response.description, 'Login', {
                        duration: 2000,
                        verticalPosition: 'top'
                    });
                    this.spinner = false;
                }
            });
        } catch (error) {
            console.log('error in login()', error);
        }
    }
    openDialog(): void {
        try {
            const dialogRef = this.dialog.open(PopupComponent, {
                width: '250px',
                data: this.data
            });
            dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed', result);
                if (result) {
                    this.commonService.createNewUser(result).subscribe(resp => {
                        console.log('resp', resp);
                        if (!resp['error']) {
                            this.toaster.open(resp.description, 'Login', {
                                duration: 2000,
                                verticalPosition: 'top'
                            });
                        } else {
                            this.toaster.open('Internal server erroe', 'Login', {
                                duration: 2000,
                                verticalPosition: 'top'
                            });
                        }

                    });
                }
                this.data = {
                    userName: '',
                    userEmail: '',
                    password: ''
                };
            });
        } catch (error) {
            console.log('error in openDialog()', error);
        }

    }
}

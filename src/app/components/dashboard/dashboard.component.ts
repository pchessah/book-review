import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AddReviewComponent } from '../add-review/add-review.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private _user!: firebase.User;

  constructor(public authService: AuthService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.userData = this._user;
  }

  openAddReviewDialog() {
    const dialogRef = this.dialog.open(AddReviewComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

}

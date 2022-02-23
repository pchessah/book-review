import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AddReviewComponent } from '../add-review/add-review.component';
import { ReviewsService } from 'src/app/shared/services/reviews.service';
import { Review } from 'src/app/shared/models/review.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public authService: AuthService,
              public dialog: MatDialog,
              private _reviewService: ReviewsService) { }

  ngOnInit(): void {  }

  openAddReviewDialog() {
    const dialogRef = this.dialog.open(AddReviewComponent, {width: '1000px'});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const resultObj = {
          title: result.title,
          review: result.review,
          rating: result.rating,
          author: result.author,
          userId:   this.authService.userData.uid,
          userEmail:   this.authService.userData.email
        } as Review;

        this._reviewService.addReview(resultObj);
      }
    });

  }

}

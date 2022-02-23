import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Review } from 'src/app/shared/models/review.model';
import { ReviewsService } from 'src/app/shared/services/reviews.service';
import { AddReviewComponent } from '../add-review/add-review.component';


@Component({
  selector: 'app-reviews-table',
  templateUrl: './reviews-table.component.html',
  styleUrls: ['./reviews-table.component.scss']
})
export class ReviewsTableComponent implements OnInit {

  displayedColumns: string[] = ['bookAvatar', 'title', 'author', 'review', 'rating', 'actions'];

  dataSource: Review[] = [];

  constructor(private _reviewService: ReviewsService,
    private _dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getAllReviews();
  }

  getAllReviews() {
    return this._reviewService.getAllReviews().subscribe((reviews) => this.dataSource = reviews);
  }

  editReview(review: Review) {
    const dialogRef = this._dialog.open(AddReviewComponent, { width: '500px', data: { review: review, mode: 'edit' } });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.mode == 'edit') {
        this._reviewService.editReview(result.review);
      }
    });
  }

  deleteReview(review: Review) {
    confirm('Are you sure you want to delete this review?') ? this._reviewService.deleteReview(review) : null;    
  }

}

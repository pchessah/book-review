import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/shared/models/review.model';
import { ReviewsService } from 'src/app/shared/services/reviews.service';



@Component({
  selector: 'app-reviews-table',
  templateUrl: './reviews-table.component.html',
  styleUrls: ['./reviews-table.component.scss']
})
export class ReviewsTableComponent implements OnInit { 
  
  displayedColumns: string[] = ['bookAvatar', 'title', 'author', 'review', 'rating'];

  dataSource:Review[] = [];

  constructor(private _reviewService: ReviewsService) { }

  ngOnInit(): void {
    this.getAllReviews();
   }

  getAllReviews() {
    return this._reviewService.getAllReviews().subscribe((reviews) => this.dataSource = reviews);
  }

}

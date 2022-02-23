import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';
import { Review } from 'src/app/shared/models/review.model';
 

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {

  reviewForm!: FormGroup;
  ratingValues = [1, 2, 3, 4, 5];

  constructor(private _fb: FormBuilder,
              private _dialogRef: MatDialogRef<AddReviewComponent>) { }

  ngOnInit(): void {
    this.reviewForm = this._fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      review: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
    });     
  }

  onSubmit(review: Review) {
    this._dialogRef.close(review);
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Review } from 'src/app/shared/models/review.model';
import { v4 as uuidv4 } from 'uuid';
 

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {

  reviewForm!: FormGroup;
  ratingValues = [1, 2, 3, 4, 5];
  basePath!: string;

  constructor(private _fb: FormBuilder,
              private _dialogRef: MatDialogRef<AddReviewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {review: Review, mode: 'create' | 'edit'},) { }

  ngOnInit(): void {
    const id  = this.data.review ? this.data.review.id : uuidv4();
    this.reviewForm = this._fb.group({
      title:  [ this.data.review ? this.data.review.title : '', Validators.required],
      author: [ this.data.review ? this.data.review.author : '', Validators.required],
      review: [this.data.review ? this.data.review.review : '', Validators.required],
      rating: [this.data.review ? this.data.review.rating : '', [Validators.required, Validators.min(1), Validators.max(5)]],
      id:     [id, Validators.required],
      uploads: [this.data.review ? this.data.review.uploads : [], Validators.required],
    }); 
    
    this.basePath = `/uploads/${id}`
  }

  updateFiles(_event: any) {
    //this.reviewForm.patchValue({ uploads: files });
    debugger
  }

  onSubmit(review: Review) {
    const data = {review: review, mode: this.data.mode}
    this._dialogRef.close(data);
  }

}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  reviewsRef!: AngularFirestoreCollection<Review>;

  constructor(private _firestore: AngularFirestore) {

    this.reviewsRef = this._firestore.collection('reviews');
  
   }

   addReview(review: Review) {
     return this.reviewsRef.doc(review.id).set(review);
   }

   editReview(review: Review) {
      return this.reviewsRef.doc(review.id).update(review);
   }

   getAllReviews() {
     return this.reviewsRef.valueChanges();
   }

   deleteReview(review: Review) {
      return this.reviewsRef.doc(review.id).delete();
    }
}

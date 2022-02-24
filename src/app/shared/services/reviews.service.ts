import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Review } from '../models/review.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  reviewsRef!: AngularFirestoreCollection<Review>;

  constructor(private _firestore: AngularFirestore,  private _notificationService: NotificationService,) {
    this.reviewsRef = this._firestore.collection('reviews');
  }

  addReview(review: Review) {
    return this.reviewsRef.doc(review.id).set(review).then(()=>{
      this._notificationService.openNotification('Review added successfully 🎉!');
    });
  }

  editReview(review: Review) {
    return this.reviewsRef.doc(review.id).update(review).then(()=>{
      this._notificationService.openNotification('Review updated successfully 🎉!');
    });
  }

  getAllReviews() {
    return this.reviewsRef.valueChanges();
  }

  deleteReview(review: Review) {
    return this.reviewsRef.doc(review.id).delete().then(()=>{
      this._notificationService.openNotification('Review deleted successfully 🔥!');
    });
  }
}

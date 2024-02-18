import { Observable, Subject } from 'rxjs';
import { DataService } from '../services/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private hasRental = new Subject<boolean>();
  hasRental$ = this.hasRental.asObservable();
  // Regex
  public fullNameRe = /^[A-Z][a-zA-Z]{2,}(?: [A-Z][a-zA-Z]{1,})+$/;
  public passwordRe = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  constructor(private dataService: DataService) {}

  setHasRental(value: boolean) {
    this.hasRental.next(value);
  }

  sendMessage(messageUser: any): Observable<any> {
    return this.dataService.postDataJson(messageUser, 'user/sendMessage.php');
  }

  subscribeToNews(email: any): Observable<any> {
    return this.dataService.postDataJson(email, 'user/subscribeToNews.php');
  }

  userRegister(user: any): Observable<any> {
    return this.dataService.postDataForm(user, 'user/register.php');
  }

  userLogin(user: any): Observable<any> {
    return this.dataService.postDataJson(user, 'user/login.php');
  }

  getHomePageReviews(): Observable<any> {
    return this.dataService.getData('home/reviews.php');
  }

  postReview(review: any): Observable<any> {
    return this.dataService.postDataJson(review, 'user/postReview.php');
  }

  rentACar(info: any): Observable<any> {
    return this.dataService.postDataJson(info, 'user/rentACar.php');
  }

  userProfile(user: any): Observable<any> {
    return this.dataService.postDataJson(user, 'user/userProfile.php');
  }

  getLatestUserRental(user: any): Observable<any> {
    return this.dataService.postDataJson(user, 'user/getLatestUserRental.php');
  }

  getUserReviews(user: any): Observable<any> {
    return this.dataService.postDataJson(user, 'user/getUserReviews.php');
  }

  getUserRentals(user: any): Observable<any> {
    return this.dataService.postDataJson(user, 'user/getUserRentals.php');
  }
}

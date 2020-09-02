import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../domains/user';
import { USERS_URL } from '../constants/users-url.constant';

@Injectable({
  providedIn: 'root',
})
export class UsersRepository {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(USERS_URL);
  }

  getUser(id: number): Observable<User> {
    let params: HttpParams = new HttpParams();
    params = params.append('id', id.toString());

    return this.http.get<User[]>(USERS_URL, { params })
      .pipe(map((userArray) => userArray[0]));
  }
}

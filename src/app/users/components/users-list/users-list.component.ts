import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as actions from '../../store/users.actions';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { User } from '../../domains/user';
import { USERS_LIST_COLUMNS } from '../../constants/columns.constant';
import { selectUsers } from '../../store';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  columns: string[] = USERS_LIST_COLUMNS;
  users$: Observable<User[]>;

  private unsubscribe: Subject<void> = new Subject();

  constructor(private readonly store: Store, private readonly router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(actions.loadUsers());
    this.users$ = this.store.pipe(select(selectUsers), filter((user) => !!user), takeUntil(this.unsubscribe));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  goToUserDetails(id: number): void {
    this.router.navigate(['/user', id]);
  }
}

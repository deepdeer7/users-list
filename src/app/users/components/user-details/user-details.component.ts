import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as actions from '../../store/users.actions';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { selectUserDetails } from '../../store';
import { USER_DETAILS_COLUMNS } from '../../constants/columns.constant';
import { UserDetails } from '../../domains/user-details';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  columns: string[] = USER_DETAILS_COLUMNS;
  userDetails$: Observable<UserDetails>;

  private unsubscribe: Subject<void> = new Subject();

  constructor(private readonly store: Store, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userDetails$ = this.store.pipe(select(selectUserDetails), filter((user) => !!user), takeUntil(this.unsubscribe));

    this.route.paramMap.subscribe(params => {
      this.store.dispatch(actions.loadCurrentUser({id: Number(params.get('id'))}));
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

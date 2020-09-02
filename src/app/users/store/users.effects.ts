import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import * as actions from './users.actions';
import { UsersRepository } from '../repository/users.repository';
import { selectUserById } from './index';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadUsers),
    mergeMap(() => this.usersRepository.getUsers()
      .pipe(
        map(users => actions.setUsers({users})),
        catchError(() => EMPTY)
      ))
    )
  );

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadCurrentUser),
    mergeMap((action) => {
      return this.store$.pipe(
        select(selectUserById, {id: action.id}),
          switchMap((user) => {
            if (user) {
              return of(actions.setUserDetails({user}));
            } else {
               return this.usersRepository.getUser(action.id).pipe(
                map((u) => actions.setUserDetails({user: u}))
               );
            }
          }));
      }),
        catchError(() => EMPTY)
      )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store$: Store,
    private readonly usersRepository: UsersRepository
  ) {}
}

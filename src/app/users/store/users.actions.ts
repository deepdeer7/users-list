import { createAction, props } from '@ngrx/store';
import { User } from '../domains/user';

export const loadUsers = createAction('[Load Users] Load');
export const setUsers = createAction('[Set Users] Set', props<{ users: User[] }>());
export const loadCurrentUser = createAction('[Load Current User] Load', props<{ id: number }>());
export const setUserDetails = createAction('[Set User Details] Set', props<{ user: User }>());


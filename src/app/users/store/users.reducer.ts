import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { User } from '../domains/user';
import { UserDetailsTableHelper } from '../helpers/user-details-table.helper';
import { UserDetails } from '../domains/user-details';

export const usersFeatureKey = 'usersInfo';

export interface State {
  users: User[];
  userDetails: [UserDetails];
}

export const initialState: State = {
  users: null,
  userDetails: null,
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.setUsers, (state, { users }) => ({ ...state, users })),
  on(UsersActions.setUserDetails, (state, { user }) => ({ ...state, userDetails: UserDetailsTableHelper.getTableData(user)})),
);

import { createSelector } from '@ngrx/store';
import { User } from '../domains/user';
import * as R from 'ramda';
import { UserDetails } from '../domains/user-details';

export interface UsersInfoState {
  users: User[];
  userDetails: UserDetails;
}

export interface AppState {
  usersInfo: UsersInfoState;
}

export const selectUserInfo = (state: AppState) => state.usersInfo;

export const selectUsers = createSelector(
  selectUserInfo,
  (state: UsersInfoState) => state.users
);

export const selectUserDetails = createSelector(
  selectUserInfo,
  (state: UsersInfoState) => state.userDetails
);


export const selectUserById = createSelector(
  selectUserInfo,
  (state: UsersInfoState, props: {id: number}) => {
    return state.users ? R.find(R.propEq('id', props.id))(state.users) : null;
  }
);

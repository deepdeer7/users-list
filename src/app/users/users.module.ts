import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users.effects';
import * as fromUsers from './store/users.reducer';
import { MatTableModule } from '@angular/material/table';
import { UserDetailsComponent } from './components/user-details/user-details.component';

@NgModule({
  declarations: [UsersListComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromUsers.usersFeatureKey, fromUsers.usersReducer),
    EffectsModule.forFeature([UsersEffects]),
    UsersRoutingModule,
    MatTableModule
  ]
})
export class UsersModule { }

import { User } from '../domains/user';
import { UserDetails } from '../domains/user-details';
import { USER_DETAILS_COLUMNS } from '../constants/columns.constant';

export class UserDetailsTableHelper {

  static getTableData(user: User): [UserDetails] {
    const data = {};
    USER_DETAILS_COLUMNS.forEach((column) => {
      const columnValue = user[column];
      if (typeof columnValue === 'string') {
        data[column] = columnValue;
      } else {
        data[column] = UserDetailsTableHelper.getRowValueFromObject(columnValue);
      }
    });

    return [data as UserDetails];
  }

  static getRowValueFromObject(object: {}, listNames: string[] = []): string {
    Object.values(object).forEach((column) => {
      if (typeof column === 'string') {
        listNames.push(column);
      } else {
        UserDetailsTableHelper.getRowValueFromObject(column, listNames);
        }
    });

    return listNames.join(', ');
  }
}

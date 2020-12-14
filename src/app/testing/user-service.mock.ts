import { User } from '../user/user.model';

export class UserServiceMock {
  getVideo = () => { return {} };
}

export const targetUser = {
  "userAccountId": "04399079-0aee-4448-adf7-0ca6ebf0f6a2",
  "firstName": "Louis",
  "lastName": "Foster",
  "emailAddress": "louis.foster@baz.com",
  "password": "qwerty",
  "isAdmin": false,
  "dateOfBirth": new Date("1998-03-27"),
} as User;
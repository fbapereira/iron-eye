/**
 * User
 */
export interface User {
  /**
   * user identifier
   */
  userAccountId: string;

  /**
   * user first name
   */
  firstName: string;

  /**
   * user last name
   */
  lastName: string;

  /**
   * user birth day
   */
  dateOfBirth: Date;

  /**
   * user email
   */
  emailAddress: string;

  /**
   * user password
   */
  password: string;

  /**
   * defines user as admin
   */
  isAdmin: boolean;
}

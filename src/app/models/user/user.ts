import {UserRole} from "../user-role";

export interface User {
  id: string;
  firstName: string;
  profileUrl: string;
  lastName: string;
  username: string;
  email: string;

  isLocked: boolean; // is suspended or not
  isEnabled: boolean; //is verified or not
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  passwordUpdatedAt: Date;
  roles: Set<UserRole>;
}

import { v4 as uuidv4 } from "uuid";

import { BASE_LIMIT, INITIAL_INMEMORY_USER_DATA } from "../constants";
import { TUser } from "../schemas/user.schema";

export interface IUserService {
  getUser: (id: TUser["id"]) => TUser | undefined;
  getUsers(limit?: number, loginSubscring?: string): TUser[] | undefined;
  createUser: (
    login: TUser["login"],
    password: TUser["password"],
    age: TUser["age"],
    isDeleted: TUser["isDeleted"]
  ) => boolean;
  deleteUser: (id: TUser["id"]) => TUser | undefined;
  updateUser: (
    id: TUser["id"],
    login: TUser["login"],
    password: TUser["password"],
    age: TUser["age"],
    isDeleted: TUser["isDeleted"]
  ) => boolean;
}

export class InmemoryUserService implements IUserService {
  private users: TUser[] = INITIAL_INMEMORY_USER_DATA;

  getUser(id: TUser["id"]): TUser | undefined {
    return this.users.find((user) => user.id === id);
  }

  getUsers(limit: number, loginSubscring?: string): TUser[] | undefined {
    let users: TUser[];
    if (loginSubscring) {
      users = this.users
        .filter((user) => !user.isDeleted)
        .filter((user) => user.login.includes(loginSubscring))
        .slice(0, limit || BASE_LIMIT);
    } else {
      users = this.users
        .filter((user) => !user.isDeleted)
        .slice(0, limit || BASE_LIMIT);
    }

    return users;
  }

  createUser(
    login: TUser["login"],
    password: TUser["password"],
    age: TUser["age"],
    isDeleted: TUser["isDeleted"]
  ): boolean {
    if (!this.users.find((user) => user.login === login)) {
      this.users.push({
        id: uuidv4(),
        login: login,
        password: password,
        age: age,
        isDeleted: isDeleted,
      });

      return true;
    }
    return false;
  }

  deleteUser(id: TUser["id"]): TUser | undefined {
    const user = this.users.find((user) => user.id === id);
    if (!user || user.isDeleted) return undefined;
    user.isDeleted = true;
    return user;
  }

  updateUser(
    id: TUser["id"],
    login: TUser["login"],
    password: TUser["password"],
    age: TUser["age"],
    isDeleted: TUser["isDeleted"]
  ): boolean {
    const userToUpdate = this.users.find((user) => user.id === id);
    if (userToUpdate) {
      this.users = this.users.filter((user) => user.id !== id);
      this.users.push({
        id: id,
        login: login,
        password: password,
        age: age,
        isDeleted: isDeleted,
      });
      return true;
    }
    return false;
  }
}
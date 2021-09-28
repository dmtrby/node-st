import { v4 as uuidv4 } from "uuid";

export const INITIAL_INMEMORY_USER_DATA = [
  {
    id: uuidv4(),
    login: "login1",
    password: "12345",
    age: 25,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: "login2",
    password: "12345",
    age: 26,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: "login3",
    password: "12345",
    age: 27,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: "login4",
    password: "12345",
    age: 28,
    isDeleted: false,
  },
];

export const USER_PAGE_PATTERN = "/users";
export const BASE_LIMIT = 10;

export const PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

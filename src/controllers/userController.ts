import { Request, Response } from "express";
import { IUserService } from "../services/in-memory.service";

export class UserController {
  constructor(private userService: IUserService) {
    this.userService = userService;
  }

  getUser(req: Request, res: Response): void {
    const {
      params: { id },
    } = req;

    const user = this.userService.getUser(id);

    if (user) {
      res.status(200);
      res.send(user);
    } else {
      res.status(404);
      res.send("No user found");
    }
  }
  getUsers(req: Request, res: Response): void {
    const {
      query: { limit, loginSubscring },
    } = req;

    const userList = this.userService.getUsers(
      limit ? parseInt(limit as string) : null,
      loginSubscring as string
    );

    if (userList && userList.length) {
      res.status(200);
      res.send(userList);
    } else {
      res.status(404);
      res.send("no users, try another range");
    }
  }
  createUser(req: Request, res: Response): void {
    const {
      body: { login, password, age, isDeleted },
    } = req;

    if (login && password && age) {
      const addFlag = this.userService.createUser(
        login,
        password,
        parseInt(age),
        isDeleted
      );
      res.status(200);
      res.send(addFlag);
    } else {
      res.status(400);
      res.send("bad properties");
    }
  }
  deleteUser(req: Request, res: Response): void {
    const {
      params: { id },
    } = req;

    const user = this.userService.deleteUser(id);

    if (user) {
      res.status(200);
      res.send(`user is deleted ${user}`);
    } else {
      res.status(404);
      res.send("No user found or user is already deleted");
    }
  }
  updateUser(req: Request, res: Response): void {
    const {
      params: { id },
      body: { login, password, age, isDeleted },
    } = req;

    const updateFlag = this.userService.updateUser(
      id,
      login,
      password,
      age,
      isDeleted
    );

    if (updateFlag) {
      res.status(200);
      res.send(`user ${id} has been updated`);
    } else {
      res.status(400);
      res.send("No user found or data is invalid");
    }
  }
}

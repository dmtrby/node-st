import { Router } from "express";
import { validateUser } from "../middlewares/validation";

import { InmemoryUserService } from "../services/in-memory.service";
import { UserController } from "../controllers/userController";

const userRouter = (): Router => {
  const router = Router();
  const userService = new InmemoryUserService();
  const userController = new UserController(userService);

  router.get("/users", (req, res) => {
    userController.getUsers(req, res);
  });

  router.post("/users", validateUser, (req, res) => {
    userController.createUser(req, res);
  });

  router.get("/user/:id", (req, res) => {
    userController.getUser(req, res);
  });

  router.put("/user/:id", validateUser, (req, res) => {
    userController.updateUser(req, res);
  });

  router.delete("/user/:id", (req, res) => {
    userController.deleteUser(req, res);
  });

  return router;
};

export default userRouter;

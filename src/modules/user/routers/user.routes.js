import { Router } from "express";
import { authenticate, authorize } from "../../auth/auth.middlewares.js";
import { ROLES } from "../../../utils/enums.js";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  updateUserById,
} from "../controllers/user.controller.js";
import { validate } from "../../../middlewares/validation.middleware.js";
import { deleteUserSchema, updateUserByIdSchema, updateUserSchema } from "../validations/user.validations.js";

const router = Router();

router
  .route("/")
  .get(authenticate, authorize(ROLES.USER), getUser).put(authenticate,authorize(ROLES.USER),validate(updateUserSchema),updateUser)

  router.route("/:id").put(authenticate,authorize(ROLES.ADMIN),validate(updateUserByIdSchema),updateUserById).delete(authenticate,authorize(ROLES.ADMIN),validate(deleteUserSchema),deleteUser)

router.route("/all").get(authenticate, authorize(ROLES.ADMIN), getAllUsers);

export default router;

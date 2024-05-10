import { Router } from "express";
import {  assertParentExist, assertUniqueEmailchild, authenticate, authorize } from "../../auth/auth.middlewares.js";
import { ROLES } from "../../../utils/enums.js";

import { validate } from "../../../middlewares/validation.middleware.js";
import {
  addchild,
  deleteChild,
  getAllChildWithParent,
  getchild,
  updateChild,
} from "../controllers/child.controller.js";
import { upload } from "../../../middlewares/upload.middleware.js";
import { attachImage } from "../../image/middlewares/image.middleware.js";
import { addChildSchema, deleteChildSchema, updateChildSchema } from "../validations/child.validations.js";

const router = Router();

router
  .route("/")
  .get(authenticate, authorize(ROLES.USER), getchild)
  .post(
    authenticate,
    authorize(ROLES.ADMIN),
    upload.single("cover_image"),
    validate(addChildSchema),
    attachImage("cover_image"),
    assertUniqueEmailchild,
    assertParentExist,
    addchild
  );
  router.route("/:id").put(
    authenticate,
    authorize(ROLES.ADMIN),
    upload.single("cover_image"),
    validate(updateChildSchema),
    attachImage("cover_image"),
    assertParentExist,
    updateChild
  )
  .delete(authenticate, authorize(ROLES.ADMIN),validate(deleteChildSchema), deleteChild)

router
  .route("/all")
  .get(authenticate, authorize(ROLES.ADMIN), getAllChildWithParent);

export default router;

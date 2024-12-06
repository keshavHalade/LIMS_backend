import { Router } from "express";
import registerSample from "./registerSample.js";
import assignTest from "./assignTest.js";
import registerUser from "./registerUser.js";

const router = Router();

router.use(registerSample);
router.use(registerUser);
router.use(assignTest);

export default router;

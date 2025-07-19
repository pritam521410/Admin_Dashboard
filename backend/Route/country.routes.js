import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addCountry,
  getAllCountries,
} from "../controllers/country.controller.js";

const router = express.Router();

router.post(
  "/add-country",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "flag", maxCount: 1 },
  ]),
  addCountry
);

router.get("/all-countries", getAllCountries);

export default router;

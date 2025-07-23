import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addCountry,
  getAllCountries,
  editCountry,
  deleteCountry,
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

router.put(
  "/edit-country/:id",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "flag", maxCount: 1 },
  ]),
  editCountry
);

router.delete("/delete-country/:id", deleteCountry);

export default router;

import express from "express";
import { getCustomers, getProduct } from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProduct);
router.get("/customers", getCustomers);

export default router;

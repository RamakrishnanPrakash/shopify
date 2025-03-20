import express from "express";
import dotenv from "dotenv";
import dbConnection from "./db.js";
import adminRouter from "./Routes/adminRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import productRoute from "./Routes/productRoutes.js";
import userRouter from "./Routes/userRoute.js";
import cookieParser from "cookie-parser";
import OrderRouter from "./Routes/OrderRoute.js";

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
console.log(express.static(path.join(__dirname, "uploads")));
app.use("/home", (req, res) => {
  res.json({ success: true, msg: "API is working" });
});
app.use("/api/v0/", productRoute);
app.use("/api/v0/admin", adminRouter);
app.use("/api/v0/user", userRouter);
app.use("/api/v0/order", OrderRouter);

dbConnection();

export default app;
// app.listen(PORT, () =>
//   console.log(`server running on http://localhost:${PORT}`)
// );

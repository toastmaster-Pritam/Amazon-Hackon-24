require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsOptions = {
  origin: "http://localhost:3000",
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));

//routes
const adminRouter = require("./routers/admin.routes.js");
const productRouter = require("./routers/product.routes.js");
const brandRouter = require("./routers/brand.routes.js");
const userRouter = require("./routers/user.routes.js");
app.use("/api/admin", adminRouter);
app.use("/api/product", productRouter);
app.use("/api/brand", brandRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

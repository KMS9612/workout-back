const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("debug", true);
const usersRouter = require("./routes/userRoutes");
const tokenRouter = require("./routes/tokenRoutes");
const exerciseRouter = require("./routes/exerciseRoutes");
const routineRouter = require("./routes/routineRoutes");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger");
const cookieParser = require("cookie-parser");
// mongoDB연동
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// cors 허용 도메인
app.use(
  cors({
    origin: ["http://localhost:3000", "https://workout-react.vercel.app"], // 허용할 도메인
    credentials: true, // 요청 헤더에 쿠키를 실어 보낼 수 있도록 함
  })
);
// body-parser 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie-parser
app.use(cookieParser());

// swagger api docs 사용명시,path
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// logs
app.use((req, res, next) => {
  // console.log("Request headers:", req.headers);
  // console.log("Request body:", req.body);
  next();
});

// 라우터 설정
app.use(usersRouter);
app.use("/token", tokenRouter);
app.use("/exercise", exerciseRouter);
app.use("/routine", routineRouter);

// 서버 가동
app.listen(port, () => {
  console.log(`Server is working in http://localhost:${port}`);
});

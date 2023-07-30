const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const usersRouter = require("./routes/userRoutes");
require("dotenv").config();
const app = express();
const port = 8080;

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

// body-parser 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors 허용 도메인
app.use(
  cors({
    origin: "http://localhost:3000", // 허용할 도메인
    credentials: true, // 요청 헤더에 쿠키를 실어 보낼 수 있도록 함
  })
);

// 라우터 설정
app.use(usersRouter);

// 서버 가동
app.listen(port, () => {
  console.log(`Server is working in http://localhost:${port}`);
});

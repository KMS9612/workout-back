const { UserExercise } = require("../models/routine");

const CREATE_EXERCISE = async (req, res) => {
  // username: 유저이름, exercise = [{exercise_name, exercise_type}]
  const { username, exercise } = req.body;

  try {
    let haveTable = await UserExercise.findOne({ username });

    if (!haveTable) {
      // 테이블이 없다면 새로운 userExercise테이블 생성
      haveTable = new UserExercise({ username, exercise });
    } else {
      // 테이블이 있다면 exercise 배열에 값 추가
      haveTable.exercise.push(exercise[0]);
    }

    await haveTable.save();
    res.status(200).json({
      message: "운동 테이블을 생성했습니다.",
      username: haveTable.username,
      exercise: haveTable.exercise,
    });
  } catch (err) {
    res.status(401).json({ message: "운동 테이블 생성에 실패했습니다." + err });
  }
};

module.exports = { CREATE_EXERCISE };

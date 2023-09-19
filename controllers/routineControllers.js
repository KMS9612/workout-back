const { UserRoutine } = require("../models/routine");

const CREATE_ROUTINE = async (req, res) => {
  // username: 유저이름, exercise = [{exercise_name, exercise_type}]
  const { username, routine } = req.body;

  try {
    let haveTable = await UserRoutine.findOne({ username });

    if (!haveTable) {
      // 테이블이 없다면 새로운 UserRoutine테이블 생성
      haveTable = new UserRoutine({ username, routine });
    } else {
      // 테이블이 있다면 routine 배열에 값 추가
      haveTable.routine.push(routine[0]);
    }

    await haveTable.save();
    res.status(200).json({
      message: "운동 테이블을 생성했습니다.",
      username: haveTable.username,
      routine: haveTable.routine,
    });
  } catch (err) {
    res.status(400).json({ message: "운동 테이블 생성에 실패했습니다." + err });
  }
};

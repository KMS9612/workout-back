const { UserExercise } = require("../models/routine");

const CREATE_EXERCISE = async (req, res) => {
  // username: 유저이름, exercise = [{exercise_name, exercise_type}]
  const { username, exercise } = req.body;
  const uid = req.cookies.uid;

  try {
    let haveTable = await UserExercise.findOne({ uid });

    // 테이블이 없다면 새로운 userExercise테이블 생성
    if (!haveTable) {
      haveTable = new UserExercise({ username, exercise, uid });
      return res.status(200).json({ message: "운동 테이블을 생성했습니다.", exercise: haveTable.exercise, uid: uid });
    }
    // DB에 이미 있는 exercise_name인지 파악
    const isDuplicate = haveTable.exercise.some((el) => el.exercise_name === exercise[0].exercise_name);
    if (isDuplicate) {
      return res.status(400).json({ message: "중복되는 이름의 운동이 있습니다." });
    }

    haveTable.exercise.push(exercise[0]);
    await haveTable.save();
    return res.status(200).json({
      message: "운동 테이블을 생성했습니다.",
      username: haveTable.username,
      exercise: haveTable.exercise,
      uid: haveTable.uid,
    });
  } catch (err) {
    res.status(400).json({ message: "운동 테이블 생성에 실패했습니다." + err });
  }
};

const FETCH_EXERCISE = async (req, res) => {
  const { username } = req.query;
  const uid = req.cookies.uid;
  console.log("FETCH_EXERCISE Params", req.query, uid);
  try {
    let EXERCISE_DATA = await UserExercise.findOne({ uid });
    console.log(EXERCISE_DATA, username);
    res.status(200).json({
      exercise: EXERCISE_DATA,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};

const DELETE_EXERCISE_BY_NAME = async (req, res) => {
  const { exercise_name } = req.query;
  const uid = req.cookies.uid;

  try {
    const exerciseTarget = await UserExercise.findOne({ uid });
    if (!exerciseTarget) {
      return res.status(404).json({ message: "유저 데이터가 없습니다." });
    }
    // exercise 배열을 가공해서 저장.
    const target_index = exerciseTarget.exercise.findIndex((item) => item.exercise_name == exercise_name);
    if (target_index === -1) {
      return res.status(404).json({ message: "삭제할 데이터가 없습니다." });
    }

    exerciseTarget.exercise.splice(target_index, 1);

    await exerciseTarget.save();
    return res.status(200).json({ message: exercise_name + "을 성공적으로 삭제했습니다." });
  } catch (err) {
    return res.status(400).json({ message: "데이터 삭제에 실패했습니다." });
  }
};

const DELETE_EXERCISE_ALL = async () => {
  const { username } = req.body;
  const uid = req.cookies.uid;

  try {
    const deletedExercises = await UserExercise.deleteMany({ uid });

    if (deletedExercises.deletedCount === 0) {
      return res.status(404).json({ message: "유저 데이터가 없습니다." });
    }

    res.status(200).json({
      message: `${username}님의 모든 운동 데이터를 성공적으로 삭제했습니다.`,
      deleted_count: deletedExercises.deletedCount,
    });
  } catch (err) {
    res.status(400).json({ message: "운동 데이터 삭제에 실패했습니다." + err });
  }
};
module.exports = { CREATE_EXERCISE, FETCH_EXERCISE, DELETE_EXERCISE_BY_NAME, DELETE_EXERCISE_ALL };

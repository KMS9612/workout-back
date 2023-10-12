const { UserRoutine } = require("../models/routine");

const CREATE_ROUTINE = async (req, res) => {
  // username: 유저이름, exercise = [{exercise_name, exercise_type}]
  const { username, routine } = req.body;
  const { uid } = req.cookies;

  try {
    let haveTable = await UserRoutine.findOne({ uid });

    if (!haveTable) {
      // 문서가 없다면 새로운 UserRoutine문서를 생성
      haveTable = new UserRoutine({ uid, username, routine });
      await haveTable.save();

      return res.status(200).json({ message: "루틴생성에 성공했습니다." });
    } else {
      // 테이블이 있다면 routine 배열에 값 추가
      // 동일한 루틴이름이 있는지 확인
      const check_dup = haveTable.routine.filter((el) => el.routine_title == routine[0].routine_title);
      console.log(check_dup);
      if (check_dup.length > 0) {
        return res.status(400).json({ message: "동일한 이름의 루틴이 있습니다." });
      }
      haveTable.routine.push(routine[0]);
      await haveTable.save();

      return res.status(200).json({ message: "루틴생성에 성공했습니다.", uid: haveTable.uid, username: haveTable.username, routine: haveTable.routine });
    }
  } catch (err) {
    res.status(400).json({ message: "운동 테이블 생성에 실패했습니다." + err });
  }
};

const UPDATE_ROUTINE = async (req, res) => {
  const { routine_uid, routine_exercise } = req.body;
  const { uid } = req.cookies;

  try {
    let origin = await UserRoutine.findOne({ uid });
    // 요청이 들어온 루틴의 인덱스를 찾아서 해당 인덱스의 루틴만 수정하기.
    const routine_index = origin.routine.findIndex((el) => el._id == routine_uid);
    origin.routine[routine_index].routine_exercise = routine_exercise;

    await origin.save();
    return res.status(200).json({ message: "루틴 업데이트에 성공했습니다.", data: origin });
  } catch (err) {
    return res.status(400).json({ message: "루틴 업데이트에 실패했습니다.", error: err });
  }
};

const FETCH_ROUTINES = async (req, res) => {
  const { uid } = req.cookies;

  try {
    let user_routine = await UserRoutine.findOne({ uid });
    if (user_routine) {
      return res.status(200).json({ message: "루틴을 불러왔습니다.", user_routine });
    } else {
      return res.status(400).json({ message: "루틴을 불러오는데 실패했습니다." });
    }
  } catch (err) {
    return res.status(400).json({ message: "루틴을 불러오는데 실패했습니다." });
  }
};

const FETCH_ROUTINE_INFO = async (req, res) => {
  const { routine_title } = req.query;
  const { uid } = req.cookies;

  try {
    let user_routine = await UserRoutine.findOne({ uid });
    if (user_routine) {
      let searched_routine = user_routine.routine.filter((el) => el.routine_title == routine_title);

      return res.status(200).json({ message: "루틴을 불러왔습니다.", searched_routine });
    } else {
      return res.status(400).json({ message: "루틴을 불러오는데 실패했습니다." });
    }
  } catch (err) {
    return res.status(400).json({ message: "루틴을 불러오는데 실패했습니다." });
  }
};

const DELETE_ROUTINE_BY_NAME = async (req, res) => {
  const { routine_title } = req.query;
  const uid = req.cookies.uid;

  try {
    const routineTarget = await UserRoutine.findOne({ uid });
    if (!routineTarget) {
      return res.status(404).json({ message: "유저 데이터가 없습니다." });
    }
    // routine 배열을 가공해서 저장.
    const target_index = routineTarget.routine.findIndex((item) => item.routine_title == routine_title);
    // index를 찾지못하면 음수 1 반환됨
    if (target_index === -1) {
      return res.status(404).json({ message: "삭제할 데이터가 없습니다." });
    }

    routineTarget.routine.splice(target_index, 1);

    await routineTarget.save();
    return res.status(200).json({ message: routine_title + "을 성공적으로 삭제했습니다." });
  } catch (err) {
    return res.status(400).json({ message: "데이터 삭제에 실패했습니다." });
  }
};

const DELETE_ROUTINE_ALL = async (req, res) => {
  const uid = req.cookies.uid;

  try {
    const del_routine = await UserRoutine.deleteOne({ uid });

    return res.status(200).json({
      message: `모든 운동 데이터를 성공적으로 삭제했습니다.`,
    });
  } catch (err) {
    res.status(400).json({ message: "운동 데이터 삭제에 실패했습니다." + err });
  }
};

module.exports = { CREATE_ROUTINE, FETCH_ROUTINES, FETCH_ROUTINE_INFO, DELETE_ROUTINE_BY_NAME, DELETE_ROUTINE_ALL, UPDATE_ROUTINE };

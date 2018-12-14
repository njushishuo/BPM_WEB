const recruit_type_map = new Map();
recruit_type_map.set("WEB","WEB 开发");
recruit_type_map.set("APP","APP 开发");
recruit_type_map.set("WE_CHAT_APPLET","微信小程序");


const question_type_map = new Map();
question_type_map.set("ESSAY","论述题");
question_type_map.set("MULTIPLE_CHOICE","选择题");

const charCodeOfA =65;

const limit = 5;

export default {
  recruit_type_map,
  question_type_map,
  charCodeOfA,
  limit
}

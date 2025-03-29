import { RegisterReqProps } from "@/app/(home)/register/page";
import { containsChinese } from "@/fn";

export const check = (
  req: RegisterReqProps
): { [key: string]: string } | boolean => {
  const _errors: { [key: string]: string } = {};

  if (!req.username?.trim()) {
    _errors.username = "帳號不能為空";
  } else if (containsChinese(req.username)) {
    _errors.username = "帳號不能包含中文";
  }

  if (!req.password?.trim()) {
    _errors.password = "密碼不能為空";
  }

  if (!req.email?.trim()) {
    _errors.email = "Email不能為空";
  } else if (!req.email.includes("@")) {
    _errors.email = "Email格式錯誤";
  } else if (containsChinese(req.email)) {
    _errors.email = "Email不能包含中文";
  }


  return Object.keys(_errors).length ? _errors : false;
};

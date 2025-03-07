"use client";
import { useState } from "react";
import styled from "styled-components";
import { Button } from "@/components/ui/button";
import { InputBox } from "@/components/ui/InputBox";
import { containsChinese } from "@/fn/Fns";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const Login = () => {
  const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);

  const [req, setReq] = useState({
    username: "",
    password: "",
  });

  const checkError = (): boolean => {
    let _errors: { [key: string]: string } = {};

    const check = Object.keys(req);
    check.forEach((key) => {
      switch (key) {
        case "username":
          if (!req[key].trim()) {
            _errors[key] = "帳號不能為空";
          } else if (containsChinese(req[key])) {
            _errors[key] = "帳號不能包含中文";
          }
          break;
        case "password":
          if (!req[key].trim()) {
            _errors[key] = "密碼不能為空";
          }
          break;
        default:
          break;
      }
    });
    if (Object.keys(_errors).length) {
      setErrors(_errors);
      return true;
    }
    return false;
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReq({
      ...req,
      [e.target.id]: e.target.value,
    });
  };
  const onClick = () => {
    if (checkError()) return;
    setErrors(null);
    console.log("輸入成功！！", req);
  };
  return (
    <Root>
      <InputBox
        id="username"
        label="帳號"
        onChange={onChange}
        value={req.username}
        error={errors}
      />
      <InputBox
        id="password"
        label="密碼"
        onChange={onChange}
        type="password"
        error={errors}
      />
      <Button className="cursor-pointer" onClick={onClick}>
        登入
      </Button>
    </Root>
  );
};

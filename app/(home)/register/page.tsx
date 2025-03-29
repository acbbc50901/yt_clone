"use client";
import { useState } from "react";
import { InputBox } from "@/components/ui/InputBox";
import styled from "styled-components";
import { Button } from "@/components/ui/button";
import { containsChinese } from "@/fn/Fns";
import { callApi } from "@/fn";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface RegisterReqProps {
  email: string;
  username: string;
  password: string;
  check_password: string;
}

const Root = styled.div`
  display: flex;
  jaustify-content: center;
  align-items: center;
  padding-top: 40px;
`;

const Form = styled.form`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 兩欄排列 */
  gap: 16px; /* 設定欄位間距 */

  & > button {
    grid-column: span 2; /* 讓按鈕獨占一整行 */
    justify-self: center;
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

export default function Register() {
  const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);
  const [req, setReq] = useState<RegisterReqProps>({
    email: "",
    username: "",
    password: "",
    check_password: "",
  });
  const router = useRouter();

  // 驗證表單
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
        case "email":
          if (!req[key].trim()) {
            _errors[key] = "Email不能為空";
          } else if (!req[key].includes("@")) {
            _errors[key] = "Email格式錯誤";
          } else if (containsChinese(req[key])) {
            _errors[key] = "Email不能包含中文";
          }
          break;
        case "check_password":
          if (req[key] !== req.password) {
            _errors[key] = "密碼不一致";
          } else if (!req[key].trim()) {
            _errors[key] = "確認密碼不能為空";
          }
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

  // 更改數值
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setReq({
      ...req,
      [e.target.id]: e.target.value,
    });
  };
  // 送出表單
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkError()) return;
    setErrors(null);
    let _req: Omit<RegisterReqProps, "check_password"> & {
      check_password?: string;
    } = { ...req };
    delete _req.check_password;
    const res = await callApi("/api/auth/register", "POST", _req);
    if (res.status === 201) {
      toast.success("註冊成功");
      router.push("/");
    } else if (res.status === 400) {
      toast.error(res.msg);
    }
  };

  return (
    <Root>
      <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
        <Title>註冊</Title>
        <Form onSubmit={onSubmit}>
          <InputBox
            id="email"
            label="Email"
            error={errors}
            onChange={onChange}
          />
          <InputBox
            id="username"
            label="帳號"
            error={errors}
            onChange={onChange}
          />
          <InputBox
            id="password"
            label="密碼"
            onChange={onChange}
            type="password"
            error={errors}
          />
          <InputBox
            id="check_password"
            label="確認密碼"
            error={errors}
            onChange={onChange}
            type="password"
          />
          <Button type="submit">註冊</Button>
        </Form>
      </div>
    </Root>
  );
}

"use client";
import { FormEvent, useState } from "react";
import styled from "styled-components";
import { Button } from "@/components/ui/button";
import { InputBox } from "@/components/ui/InputBox";
import { containsChinese } from "@/fn/Fns";
import { callApi } from "@/fn";
import { toast } from "sonner";
import { useAppDispath } from "@/redex/store";
import { setUser } from "@/redex/user";
const Root = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const Login = ({ onClose }: { onClose?: () => void }) => {
  const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const disoatch = useAppDispath();
  const [req, setReq] = useState({
    email: "",
    password: "",
  });

  const checkError = (): boolean => {
    let _errors: { [key: string]: string } = {};

    const check = Object.keys(req);
    check.forEach((key) => {
      switch (key) {
        case "email":
          if (!req[key].trim()) {
            _errors[key] = "電子信箱不能為空";
          } else if (containsChinese(req[key])) {
            _errors[key] = "電子信箱不能包含中文";
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
  const onClick = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (checkError()) return;
    setLoading(true);
    setErrors(null);
    const res = await callApi("api/auth/login", "POST", req);
    console.log("輸入成功！！", res);
    if (res.status === 400) {
      switch (res.msg) {
        case "無此使用者":
          setErrors({ email: "無此使用者" });
          break;
        case "密碼錯誤":
          setErrors({ password: "密碼錯誤" });
          break;
        default:
          setErrors({ erros: "伺服器錯誤" });
          break;
      }
    } else if (res.status === 201) {
      console.log("登入成功！！", res);
      toast.success("登入成功");
      localStorage.setItem("user", JSON.stringify(res.data));
      onClose && onClose();
    }
    setLoading(false);
  };
  return loading ? (
    <div className="flex justify-center items-center w-full h-full">
      <div className="loader">載入中</div>
    </div>
  ) : (
    <Root onSubmit={(e) => onClick(e)}>
      <InputBox
        id="email"
        label="電子信箱"
        onChange={onChange}
        value={req.email}
        error={errors}
      />
      <InputBox
        id="password"
        label="密碼"
        onChange={onChange}
        type="password"
        error={errors}
      />
      {errors?.erros && <div className=" text-red-500">{errors.erros}</div>}
      <Button className="cursor-pointer" onClick={() => onClick()}>
        登入
      </Button>
    </Root>
  );
};

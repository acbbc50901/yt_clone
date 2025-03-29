"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { CustomDialog } from "@/modules/home/ui/components/dialog";
import styled from "styled-components";
import { UserCircleIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Login } from "./login";
import { OtherButton } from "./other-button";
import { useRouter } from "next/navigation";
import { useAppDispath, useAppSelector } from "@/redex/store";
import { MemberButton } from "./member-button";
import { setUser as setStoreUser } from "@/redex/user";

const Roots = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  // flex-shrink: 0;
  gap: 10px;
`;

const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Note = styled.p`
  font-size: 0.75rem;
  color: #a0aec0;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Content = ({
  toRegister,
  onClose,
}: {
  toRegister: () => void;
  onClose: () => void;
}) => {
  return (
    <Roots>
      <Login onClose={onClose} />
      <Note onClick={toRegister}>還沒註冊過帳號？</Note>
      <Separator />
      <ButtonList>
        <OtherButton type="Google" onClick={() => {}} Icon={FaGoogle} />
      </ButtonList>
    </Roots>
  );
};

export default function AuthButton() {
  // 新增不同狀態
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const UserStore = useAppSelector((state) => state.user);
  const dispatch = useAppDispath();
  const storedUser =
    typeof window !== "undefined" ? localStorage?.getItem("user") : null;
  const localUser = storedUser ? JSON.parse(storedUser) : null;
  console.log("user", user);
  useEffect(() => {
    if (!!localUser && !user) {
      setUser(localUser);
      dispatch(setStoreUser(localUser));
    }
    console.log("localUser", localUser, user);
  }, [localUser]);
  const router = useRouter();
  const toRegister = () => {
    setOpen(false);
    router.push("/register");
  };
  return !!user ? (
    <MemberButton user={user} setUser={setUser} />
  ) : (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="px-4 py-2 cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none "
      >
        <UserCircleIcon />
        登入
      </Button>
      <CustomDialog
        title="登入"
        description="可以使用以下方式進行登入"
        open={open}
        onClose={() => setOpen(false)}
        content={
          <Content onClose={() => setOpen(false)} toRegister={toRegister} />
        }
      />
    </>
  );
}

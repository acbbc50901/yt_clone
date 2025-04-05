import React, { SetStateAction, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import styled from "styled-components";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { callApi } from "@/fn";
import { useRouter } from "next/navigation";
const Content = styled.div`
  display: flex;
  flex-direction: column;
  .name_box {
    padding: 0 10px;
    padding-bottom: 10px;
  }

  .name_box h5 {
    font-size: 1rem;
    font-weight: bold;
  }

  .name_box p {
    font-size: 0.75rem;
    color: gray;
  }

  .list {
    display: flex;
    flex-direction: column;

    .nav {
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      cursor: pointer;
      transition: 0.3s;
      font-size: 0.875rem;
      &:hover {
        background-color: #f0f0f0;
        // border-radius: 4px;
      }
    }
  }
`;

interface User {
  username: string;
  email: string;
  accessToken: string;
}

interface MemberButtonProps {
  user: User;
  setUser: React.Dispatch<SetStateAction<null>>;
}

export const MemberButton: React.FC<MemberButtonProps> = ({
  user,
  setUser,
}) => {
  console.log(user);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const logout = async () => {
    const res = await callApi("api/auth/logout", "POST");
    if (res.status !== 200) {
      console.log("登出失敗", res);
      return;
    } else {
      // 清除 localStorage
      localStorage.removeItem("user");
      setUser(null);
      router.refresh();
    }
    console.log("登出成功", res);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Avatar
          onClick={() => setOpen(!open)}
          className="h-8 w-8 cursor-pointer select-none"
        >
          <AvatarFallback className=" bg-black text-white">
            {user.username.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-0 pt-3">
        <Content>
          <div className="name_box">
            <h5>@{user.username}</h5>
            <p className="text-xs">{user.email}</p>
          </div>
          <Separator />
          <div className="list">
            <div className="nav" onClick={logout}>
              登出
            </div>
          </div>
        </Content>
      </PopoverContent>
    </Popover>
  );
};

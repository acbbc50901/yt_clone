"use client";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HomeIcon, PlaySquareIcon, FlameIcon } from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "首頁",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "訂閱",
    url: "/feed/subscribe",
    icon: PlaySquareIcon,
    auth: true,
  },
  {
    title: "熱門",
    url: "/feed/trending",
    icon: FlameIcon,
  },
];

export const MainSection = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={false} // TODO: 對應路遊
                onClick={() => {}} // TODO: 執行什麼
              >
                <Link href={item.url} className="flex items-center gap-4">
                  <item.icon />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

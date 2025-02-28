import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import SearchInput from "./search-input";
import AuthButton from "@/modules/auth/ui/components/auth-button";

export default function HomeNavbar() {
  return (
    <nav className="fixed top-0 left-0 h-16 w-full bg-white flex items-center px-2 pr-5 z-50">
      <div className=" flex items-center gap-4 w-full">
        <div className="flex items-center flex-shrink-0 gap-4 w-full">
          <SidebarTrigger />
          {/* logo */}
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image
                src="/yt.svg"
                width={32}
                height={32}
                priority
                style={{
                  width: "32px",
                  height: "32px",
                }}
                alt="yt"
              />
              <p className=" text-xl font-semibold tracking-tight">假ＹＴ</p>
            </div>
          </Link>
          {/* Search bar */}
          <div className="flex-1 flex justify-center max-w-[720px] mx-auto">
            <SearchInput />
          </div>
          {/* 登入按鈕 */}
          <div className="flex-shrink-0 items-center flex gap-4">
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

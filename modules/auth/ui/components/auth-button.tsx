import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";

export default function AuthButton() {
  // 新增不同狀態

  return (
    <Button
      variant="outline"
      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none "
    >
      <UserCircleIcon />
      登入
    </Button>
  );
}

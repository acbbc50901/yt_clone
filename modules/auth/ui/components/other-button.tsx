import { Button } from "@/components/ui/button";
import { IconType } from "react-icons/lib";

interface OtherButtonProps {
  type: string;
  onClick: () => void;
  Icon: IconType;
  css?: string;
}
export const OtherButton = ({ type, onClick, Icon, css }: OtherButtonProps) => (
  <Button
    variant="outline"
    className={`px-4 py-2 text-sm font-medium rounded-full shadow-none cursor-pointer ${css}`}
    onClick={onClick}
  >
    <Icon />
    使用 {type} 登入
  </Button>
);

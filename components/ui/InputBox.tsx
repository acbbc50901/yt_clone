import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
interface InputBoxProps {
  id: string;
  label: string;
  type?: string;
  error?: {
    [key: string]: string;
  } | null;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputBox = ({
  label,
  type = "text",
  id,
  error,
  onChange,
}: InputBoxProps) => {
  return (
    <Root>
      <Label
        className={`text-sm
          ${error && error[id] ? "text-red-700" : ""}
        `}
      >
        {label}
      </Label>
      <Input
        className={
          error && error[id] ? "border-red-700 placeholder:text-red-700" : ""
        }
        id={id}
        placeholder={label}
        type={type}
        onChange={onChange}
        style={{}}
      />
      {error && error[id] && (
        <p className="text-red-700 text-xs px-1">{error[id]}</p>
      )}
    </Root>
  );
};

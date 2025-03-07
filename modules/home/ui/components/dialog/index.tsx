"use client";
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface DialogProps {
  open: boolean;
  content: React.ReactNode;
  onClose: () => void;
  title?: string;
  description?: string;
}

export const CustomDialog = ({
  onClose,
  open,
  content,
  title,
  description,
}: DialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className=" fixed inset-0 bg-black opacity-25" />
      <DialogPortal>
        <DialogContent>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          {content}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

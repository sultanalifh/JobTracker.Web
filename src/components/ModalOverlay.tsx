import type { ReactNode } from "react";

type ModalOverlayProps = {
  children: ReactNode;
  onClose: () => void;
};

export function ModalOverlay({ children, onClose }: ModalOverlayProps) {
  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

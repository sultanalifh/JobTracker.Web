import { useState } from "react";
import type { JobApplicationResponse } from "../types/application";

type ApplicationActionButtonProps = {
  obj: JobApplicationResponse;
  onEdit: (application: JobApplicationResponse) => void;
  onDelete: (application: JobApplicationResponse) => void;
};

export function ApplicationActionButton({
  obj,
  onEdit,
  onDelete,
}: ApplicationActionButtonProps) {
  const [showAction, setShowAction] = useState(false);
  return (
    <div>
      <button onClick={() => setShowAction(!showAction)}>...</button>
      {showAction && (
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: "150",
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              zIndex: "100",
            }}
          >
            <button onClick={() => onEdit(obj)}>Edit</button>
            <button onClick={() => onDelete(obj)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

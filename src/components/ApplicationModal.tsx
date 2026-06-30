import { useState } from "react";
import {
  patchMyApplication,
  postMyApplication,
} from "../services/applicationService";
import type { JobApplicationResponse } from "../types/application";
import { ModalOverlay } from "./ModalOverlay";

type ApplicationModalProps = {
  action: string;
  initialApplication?: JobApplicationResponse;
  onClose: () => void;
  onCreate: () => void;
};

const statusValue = ["", "Applied", "Viewed", "Interview", "Offer", "Rejected"];
const statusLabel = [
  "All",
  "Applied",
  "Viewed",
  "Interviewed",
  "Offered",
  "Rejected",
];

export function ApplicationModal({
  action,
  initialApplication,
  onClose,
  onCreate,
}: ApplicationModalProps) {
  const isEdit = action == "EDIT";

  const [company, setCompany] = useState(
    isEdit ? initialApplication!.company : "",
  );
  const [position, setPosition] = useState(
    isEdit ? initialApplication!.position : "",
  );
  const [location, setLocation] = useState(
    isEdit ? initialApplication!.siteLocation : "",
  );
  const [status, setStatus] = useState(
    isEdit ? initialApplication!.status : "",
  );

  return (
    <ModalOverlay onClose={onClose}>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const response = isEdit
              ? await patchMyApplication(initialApplication!.id, {
                  company,
                  position,
                  siteLocation: location,
                  status,
                })
              : await postMyApplication({
                  company,
                  position,
                  siteLocation: location,
                });

            if (response) {
              onCreate();
              onClose();
            }
          }}
        >
          <div>
            <label>Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div>
            <label>Position</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div>
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <select onChange={(e) => setStatus(e.target.value)}>
              {statusValue.map((value, i) => {
                return (
                  <option value={value} selected={value == status}>
                    {statusLabel[i]}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </ModalOverlay>
  );
}

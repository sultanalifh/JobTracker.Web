import type { JobApplicationResponse } from "../types/application";
import { ApplicationActionButton } from "./ApplicationActionButton";

type ApplicationsTableProps = {
  applications: JobApplicationResponse[];
  onEdit: (application: JobApplicationResponse) => void;
  onDelete: (application: JobApplicationResponse) => void;
};

function ApplicationsTable({
  applications,
  onEdit,
  onDelete,
}: ApplicationsTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Position</th>
          <th>Site location</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {applications ? (
          applications.map((application) => {
            return (
              <tr key={application.id}>
                <td>{application.company}</td>
                <td>{application.position}</td>
                <td>{application.siteLocation}</td>
                <td>{application.status}</td>
                <td>{application.createdAt}</td>
                <td>{application.updatedAt}</td>
                <td>
                  <ApplicationActionButton
                    obj={application}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={6}>No Items Yet</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default ApplicationsTable;

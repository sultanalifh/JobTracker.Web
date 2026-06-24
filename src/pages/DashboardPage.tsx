import { useEffect } from "react";
import { getMyApplications } from "../services/applicationService";
import { Navigate } from "react-router";

function DashboardPage() {
  useEffect(() => {
    const response = getMyApplications({ page: 1, pageSize: 10 });

    if (!response) {
      localStorage.removeItem("token");
    }
  });
  return (
    <div>
      <div>
        <div>
          <div>
            <label>Dashboard</label>
          </div>
        </div>
      </div>
      <main>
        <label>Main</label>
      </main>
    </div>
  );
}

export default DashboardPage;

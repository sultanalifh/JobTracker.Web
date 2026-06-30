import { useEffect, useState } from "react";
import type {
  GetApplicationRequest,
  JobApplicationPaginationResponse,
} from "../types/application";
import { getMyApplications } from "../services/applicationService";

export function useApplication({
  page,
  pageSize,
  status,
  keyword,
}: GetApplicationRequest): [
  JobApplicationPaginationResponse | null,
  boolean,
  boolean,
  () => void,
] {
  const [applicationsPage, setApplicationsPage] =
    useState<JobApplicationPaginationResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const refetch: () => void = () => setRefreshKey((key) => key + 1);

  useEffect(() => {
    async function fetch() {
      try {
        setError(false);
        setLoading(true);
        const response = await getMyApplications({
          page,
          pageSize,
          status,
          keyword,
        });
        setApplicationsPage(response);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [page, pageSize, status, keyword, refreshKey]);

  return [applicationsPage, loading, error, refetch];
}

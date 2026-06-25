import { useEffect, useState } from "react";
import { getMyApplications } from "../services/applicationService";
import type { JobApplicationPaginationResponse } from "../types/application";
import PageIndicators from "../components/PageIndicators";
import { useDebounce } from "../hooks/useDebounce";

function DashboardPage() {
  const [applicationsPage, setApplicationsPage] =
    useState<JobApplicationPaginationResponse | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [finalKeyword, setFinalKeyword] = useState("");
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");

  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await getMyApplications({
        page: page,
        pageSize: pageSize,
        keyword: finalKeyword,
        status: status,
      });

      setApplicationsPage(response);
    }
    fetchData();
  }, [page, pageSize, finalKeyword, status]);

  useEffect(() => setPage(1), [pageSize, finalKeyword, status])

  useDebounce(
    () => {
      setFinalKeyword(keyword);
    },
    [keyword],
    250,
  );

  return (
    <div>
      <div> Header </div>
      <div>
        <div>
          <div>
            <label htmlFor="">Dashboard</label>
          </div>
        </div>
        <div>
          Main
          <div>
            <input
              type="text"
              onChange={(key) => setKeyword(key.target.value)}
            />
            <div>
              <button onClick={() => setShowFilter(!showFilter)}>Filter</button>
              <div style={{ display: showFilter ? "block" : "none" }}>
                <select onChange={(select) => setStatus(select.target.value)}>
                  <option value="">All</option>
                  <option value="Applied">Applied</option>
                  <option value="Viewed">Viewed</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offered</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <select onChange={(select) => setPageSize(Number.parseInt(select.target.value))}>
                  <option value="1">1</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {applicationsPage && applicationsPage.items.length > 0 ? (
                  applicationsPage.items.map((application) => {
                    return (
                      <tr key={application.id}>
                        <td>{application.company}</td>
                        <td>{application.position}</td>
                        <td>{application.siteLocation}</td>
                        <td>{application.status}</td>
                        <td>
                          <button>...</button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr key="null">
                    <td colSpan={5}>No items yet</td>
                  </tr>
                )}
              </tbody>
            </table>
            <PageIndicators 
              page={page}
              totalPages={applicationsPage ? applicationsPage.totalPages : 1}
              setPage={setPage}
            />
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

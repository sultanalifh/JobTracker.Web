import { useEffect, useState } from "react";
import PageIndicators from "../components/PageIndicators";
import { useDebounce } from "../hooks/useDebounce";
import ApplicationsTable from "../components/ApplicationsTable";
import { useApplication } from "../hooks/useApplications";
import { ApplicationModal } from "../components/ApplicationModal";
import { FilterPanel } from "../components/FilterPanel";
import type { JobApplicationResponse } from "../types/application";
import { deleteMyApplication } from "../services/applicationService";

function DashboardPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [finalKeyword, setFinalKeyword] = useState("");
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<
    JobApplicationResponse | undefined
  >();

  const [applicationsPage, loading, error, refetch] = useApplication({
    page,
    pageSize,
    status,
    keyword: finalKeyword,
  });

  useEffect(() => {
    async function reset() {
      setPage(1);
    }

    reset();
  }, [pageSize, finalKeyword, status]);

  useDebounce(
    () => {
      setFinalKeyword(keyword);
    },
    [keyword],
    250,
  );

  return (
    <div>
      {showModal && (
        <ApplicationModal
          action={action}
          initialApplication={selectedApplication}
          onClose={() => setShowModal(false)}
          onCreate={() => refetch()}
        />
      )}

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
            <FilterPanel
              status={status}
              pageSize={pageSize}
              setStatus={setStatus}
              setPageSize={setPageSize}
            />
            {loading ? (
              <label>Loading...</label>
            ) : error ? (
              <label>Error !</label>
            ) : (
              <ApplicationsTable
                applications={applicationsPage!.items}
                onEdit={(application) => {
                  setSelectedApplication(application);
                  setAction("EDIT");
                  setShowModal(true);
                }}
                onDelete={async (application) => {
                  if (window.confirm("Are you sure want to delete?")) {
                    await deleteMyApplication(application.id);
                    refetch();
                  }
                }}
              />
            )}
            <button
              onClick={() => {
                setAction("ADD");
                setShowModal(true);
              }}
            >
              Add
            </button>
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

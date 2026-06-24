import axios, { HttpStatusCode } from "axios";
import type {
  GetApplicationRequest,
  JobApplicationPaginationResponse,
} from "../types/application";

const API_BASE_URL = "http://localhost:8080";

export async function getMyApplications({
  page,
  pageSize,
  status,
  keyword,
}: GetApplicationRequest): Promise<JobApplicationPaginationResponse | null> {
  const token = localStorage.getItem("token");
  const response = await axios.get(API_BASE_URL + "/user/applications", {
    params: { page, pageSize, status, keyword },
    headers: { Authorization: "Bearer " + token },
  });

  if (response.status == HttpStatusCode.Unauthorized) {
    return null;
  }

  return response.data;
}

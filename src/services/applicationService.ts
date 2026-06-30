import axios, { HttpStatusCode } from "axios";
import type {
  CreateApplicationRequest,
  GetApplicationRequest,
  JobApplicationPaginationResponse,
  JobApplicationResponse,
  UpdateJobApplicationRequest,
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

export async function postMyApplication({
  company,
  position,
  siteLocation,
}: CreateApplicationRequest): Promise<JobApplicationResponse | null> {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    API_BASE_URL + "/user/applications",
    {
      company,
      position,
      siteLocation,
    },
    { headers: { Authorization: "Bearer " + token } },
  );

  if (response.status == HttpStatusCode.Unauthorized) {
    return null;
  }

  return response.data;
}

export async function patchMyApplication(
  id: number,
  { company, position, siteLocation, status }: UpdateJobApplicationRequest,
): Promise<JobApplicationResponse | null> {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    API_BASE_URL + "/user/applications/" + id,
    {
      company,
      position,
      siteLocation,
      status,
    },
    { headers: { Authorization: "Bearer " + token } },
  );

  if (response.status == HttpStatusCode.Unauthorized) {
    return null;
  }

  return response.data;
}

export async function deleteMyApplication(id: number) {
  const token = localStorage.getItem("token");

  await axios.delete(
    API_BASE_URL + "/user/applications/" + id,
    {
      headers: { Authorization: "Bearer " + token },
    },
  );
}

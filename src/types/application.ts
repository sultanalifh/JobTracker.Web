export interface JobApplicationResponse {
  id: number;
  company: string;
  position: string;
  siteLocation: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetApplicationRequest {
  page: number,
  pageSize: number,
  status?: string,
  keyword?: string
}

export interface JobApplicationPaginationResponse {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  items: JobApplicationResponse[];
}

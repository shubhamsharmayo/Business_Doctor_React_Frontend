import { NODE_API_BASE_URL } from "@/lib/api_base_url";

//create project api
export const createProjectApiUrl = `${NODE_API_BASE_URL}/projects/create`;

//api to fetch project data
export const fetchUserAllProjects = `${NODE_API_BASE_URL}/projects`;

//update progress status api
export const updateProgressStatus = `${NODE_API_BASE_URL}/projects/:projectId/updateProgress`;

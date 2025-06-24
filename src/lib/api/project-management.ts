import { API_BASE_URL } from "../api_base_url";

//create project api
export const createProjectApiUrl = `${API_BASE_URL}/projects/create`;

//api to fetch project data
export const fetchUserAllProjects = `${API_BASE_URL}/projects`;

//update progress status api
export const updateProgressStatus = `${API_BASE_URL}/projects/:projectId/updateProgress`;

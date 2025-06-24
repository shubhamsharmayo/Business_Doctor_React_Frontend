// src/store/projectStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProgressStatus = "Not Started" | "In Progress" | "Completed";

interface Progress {
  market_analysis: ProgressStatus;
  competitive_analysis: ProgressStatus;
  marketing_strategy: ProgressStatus;
  financial_projection: ProgressStatus;
  business_plan_generation: ProgressStatus;
  implementation_timeline?: ProgressStatus;
  executive_summary?: ProgressStatus;
}

interface ProjectData {
  _id: string;
  project_name: string;
  clerk_id: string;
  progress: Progress;
  business_plan_generated: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ProjectStore {
  projects: ProjectData[];
  setProjects: (projects: ProjectData[]) => void;
  selectedProject: ProjectData | null;
  setSelectedProject: (project: ProjectData) => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [],
      selectedProject: null,
      setProjects: (projects) => set({ projects }),
      setSelectedProject: (project) => set({ selectedProject: project }),
    }),
    {
      name: "project-storage", // key in localStorage
    }
  )
);

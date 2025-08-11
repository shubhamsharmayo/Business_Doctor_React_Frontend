// src/store/projectStore.ts
import type { ProjectData } from "@/types/project.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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

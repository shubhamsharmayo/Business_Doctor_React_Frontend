export interface ProjectData {
    progress:                Progress;
    _id:                     string;
    project_name:            string;
    clerk_id:                string;
    business_plan_generated: boolean;
    createdAt:               Date;
    updatedAt:               Date;
    __v:                     number;
}

export interface Progress {
  market_analysis: ProgressStatus;
  competitive_analysis: ProgressStatus;
  marketing_strategy: ProgressStatus;
  financial_projection: ProgressStatus;
  business_plan_generation?: ProgressStatus; // ✅ optional now
  implementation_timeline?: ProgressStatus;
  executive_summary?: ProgressStatus;
}




export type ProgressStatus = "Not Started" | "In Progress" | "Completed";

export interface ProgressControlProps {
  projectName: string;
  progressItem: string;
  projectId: string;
};

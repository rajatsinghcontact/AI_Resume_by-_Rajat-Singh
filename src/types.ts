export interface ResumeAnalysis {
  summary: string;
  skills: {
    technical: string[];
    soft: string[];
  };
  experience: {
    summary: string;
    rating: number;
  };
  education: {
    summary: string;
    rating: number;
  };
  projects: {
    summary: string;
    rating: number;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  suggestedJobTitles: string[];
  overallRating: number;
}

export interface LinkedInJob {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  postedDate: string;
  matchScore: number;
}
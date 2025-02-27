import axios from 'axios';
import { ResumeAnalysis, LinkedInJob } from '../types';

// Mock API service for demo purposes
// In a real application, these would connect to actual backend endpoints

// Simulated delay to mimic API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const analyzeResume = async (file: File): Promise<ResumeAnalysis> => {
  // In a real app, you would upload the file to a server
  // For demo purposes, we'll return mock data after a delay
  await delay(3000); // Simulate API processing time
  
  // Mock response data
  return {
    summary: "Experienced software engineer with 5+ years in full-stack development. Strong background in React, Node.js, and cloud technologies. Proven track record of delivering scalable web applications and leading development teams.",
    skills: {
      technical: ["JavaScript", "TypeScript", "React", "Node.js", "AWS", "Docker", "GraphQL", "MongoDB", "SQL", "Git"],
      soft: ["Communication", "Team Leadership", "Problem Solving", "Agile Methodology", "Project Management"]
    },
    experience: {
      summary: "Strong professional experience with progressive responsibilities. Has worked at both startups and enterprise companies, showing adaptability across different environments.",
      rating: 4
    },
    education: {
      summary: "Bachelor's degree in Computer Science from a reputable university. Has supplemented formal education with relevant certifications.",
      rating: 4
    },
    projects: {
      summary: "Impressive portfolio of projects demonstrating technical versatility. Projects show both individual contribution and team leadership capabilities.",
      rating: 5
    },
    strengths: [
      "Extensive experience with modern JavaScript frameworks",
      "Strong problem-solving abilities demonstrated through complex projects",
      "Good balance of technical and soft skills",
      "Clear progression of responsibilities in career history",
      "Quantifiable achievements with metrics"
    ],
    weaknesses: [
      "Could benefit from more cloud certification credentials",
      "Limited experience with mobile development frameworks",
      "Resume could highlight leadership experience more prominently"
    ],
    recommendations: [
      "Add specific metrics and outcomes for each project or role",
      "Consider obtaining AWS or Azure certification to strengthen cloud credentials",
      "Reorganize skills section to prioritize most relevant technologies for target roles",
      "Add a brief professional summary at the top of the resume"
    ],
    suggestedJobTitles: [
      "Senior Full Stack Developer",
      "Lead Software Engineer",
      "Frontend Architect",
      "DevOps Engineer",
      "Technical Project Manager"
    ],
    overallRating: 4
  };
};

export const scrapeLinkedInJobs = async (jobTitle: string, location: string): Promise<LinkedInJob[]> => {
  // In a real app, this would connect to a backend service that handles LinkedIn scraping
  // For demo purposes, we'll return mock data after a delay
  await delay(2500); // Simulate API processing time
  
  // Generate some mock job listings based on the search criteria
  const mockJobs: LinkedInJob[] = [];
  
  const companies = ["TechCorp", "InnovateSoft", "DataSystems", "CloudNine", "DevWorks", "FutureTech"];
  const descriptions = [
    "We are looking for an experienced developer to join our team. You will be responsible for developing and maintaining web applications, collaborating with cross-functional teams, and contributing to technical architecture decisions.",
    "Join our growing team to help build scalable, robust applications. The ideal candidate has experience with modern frameworks and a passion for clean, maintainable code.",
    "This role involves designing and implementing new features, optimizing application performance, and ensuring high code quality through testing and code reviews.",
    "We need a talented developer to help us build the next generation of our platform. You'll work in an agile environment with opportunities to learn and grow your skills."
  ];
  
  for (let i = 1; i <= 5; i++) {
    const randomCompany = companies[Math.floor(Math.random() * companies.length)];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
    const matchScore = Math.floor(Math.random() * 31) + 70; // Random score between 70-100
    
    mockJobs.push({
      id: `job-${i}`,
      title: jobTitle.includes("Developer") ? jobTitle : `${jobTitle} Developer`,
      company: randomCompany,
      location: location,
      description: randomDescription,
      url: "https://www.linkedin.com/jobs/",
      postedDate: `${Math.floor(Math.random() * 14) + 1} days ago`,
      matchScore: matchScore
    });
  }
  
  // Sort by match score (highest first)
  return mockJobs.sort((a, b) => b.matchScore - a.matchScore);
};
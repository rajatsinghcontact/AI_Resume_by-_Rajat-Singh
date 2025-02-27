import React from 'react';
import { LinkedInJob } from '../types';
import { ExternalLink, Star, Calendar } from 'lucide-react';

interface LinkedInJobResultsProps {
  jobs: LinkedInJob[];
}

const LinkedInJobResults: React.FC<LinkedInJobResultsProps> = ({ jobs }) => {
  if (jobs.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">LinkedIn Job Matches</h2>
      <p className="text-gray-600 mb-6">
        We found {jobs.length} job listings that match your criteria.
      </p>
      
      <div className="space-y-6">
        {jobs.map((job) => (
          <div key={job.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
              <div className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                <Star className="h-4 w-4 mr-1 fill-indigo-500 text-indigo-500" />
                <span className="text-sm font-medium">{job.matchScore}% Match</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-y-2 mb-4">
              <div className="text-gray-600 mr-4">
                <span className="font-medium">Company:</span> {job.company}
              </div>
              <div className="text-gray-600 mr-4">
                <span className="font-medium">Location:</span> {job.location}
              </div>
              <div className="text-gray-600 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Posted: {job.postedDate}</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
            
            <a 
              href={job.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View on LinkedIn
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkedInJobResults;
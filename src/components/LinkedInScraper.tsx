import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface LinkedInScraperProps {
  onSearch: (jobTitle: string, location: string) => void;
  isLoading: boolean;
}

const LinkedInScraper: React.FC<LinkedInScraperProps> = ({ onSearch, isLoading }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobTitle.trim() && location.trim()) {
      onSearch(jobTitle.trim(), location.trim());
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">LinkedIn Job Scraper</h2>
      <p className="text-gray-600 mb-6">
        Enter a job title and location to find relevant job listings from LinkedIn.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Software Engineer"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 py-3 px-4"
                disabled={isLoading}
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. New York, Remote"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 py-3 px-4"
                disabled={isLoading}
                required
              />
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
          } transition`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              <span>Searching...</span>
            </div>
          ) : (
            'Find LinkedIn Jobs'
          )}
        </button>
      </form>
    </div>
  );
};

export default LinkedInScraper;
import React from 'react';
import { ResumeAnalysis } from '../types';
import { Star, Award, AlertTriangle, Lightbulb, Briefcase } from 'lucide-react';

interface ResumeAnalysisResultProps {
  analysis: ResumeAnalysis;
}

const ResumeAnalysisResult: React.FC<ResumeAnalysisResultProps> = ({ analysis }) => {
  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`h-5 w-5 ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
        />
      );
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Resume Analysis Results</h2>
      
      {/* Summary */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Summary</h3>
        <p className="text-gray-600">{analysis.summary}</p>
      </div>
      
      {/* Overall Rating */}
      <div className="mb-8 flex items-center">
        <h3 className="text-lg font-semibold text-gray-700 mr-4">Overall Rating:</h3>
        <div className="flex items-center">
          {renderRating(analysis.overallRating)}
          <span className="ml-2 text-lg font-medium text-gray-700">{analysis.overallRating}/5</span>
        </div>
      </div>
      
      {/* Sections with Ratings */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Experience</h4>
          <div className="flex items-center mb-2">
            {renderRating(analysis.experience.rating)}
          </div>
          <p className="text-sm text-gray-600">{analysis.experience.summary}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Education</h4>
          <div className="flex items-center mb-2">
            {renderRating(analysis.education.rating)}
          </div>
          <p className="text-sm text-gray-600">{analysis.education.summary}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Projects</h4>
          <div className="flex items-center mb-2">
            {renderRating(analysis.projects.rating)}
          </div>
          <p className="text-sm text-gray-600">{analysis.projects.summary}</p>
        </div>
      </div>
      
      {/* Skills */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Skills</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Technical Skills</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.skills.technical.map((skill, index) => (
                <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Soft Skills</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.skills.soft.map((skill, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Strengths & Weaknesses */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="flex items-center mb-3">
            <Award className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-700">Strengths</h3>
          </div>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {analysis.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <div className="flex items-center mb-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-700">Areas for Improvement</h3>
          </div>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {analysis.weaknesses.map((weakness, index) => (
              <li key={index}>{weakness}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Recommendations */}
      <div className="mb-8">
        <div className="flex items-center mb-3">
          <Lightbulb className="h-5 w-5 text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-700">Recommendations</h3>
        </div>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          {analysis.recommendations.map((recommendation, index) => (
            <li key={index}>{recommendation}</li>
          ))}
        </ul>
      </div>
      
      {/* Suggested Job Titles */}
      <div>
        <div className="flex items-center mb-3">
          <Briefcase className="h-5 w-5 text-purple-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-700">Suggested Job Titles</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {analysis.suggestedJobTitles.map((title, index) => (
            <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              {title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysisResult;
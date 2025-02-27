import React, { useState } from 'react';
import { Briefcase, FileText, Linkedin, Brain, Award, Search, CheckCircle, ArrowLeft } from 'lucide-react';
import ResumeUploader from './components/ResumeUploader';
import ResumeAnalysisResult from './components/ResumeAnalysisResult';
import LinkedInScraper from './components/LinkedInScraper';
import LinkedInJobResults from './components/LinkedInJobResults';
import { analyzeResume, scrapeLinkedInJobs } from './services/api';
import { ResumeAnalysis, LinkedInJob } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'analyze' | 'scrape'>('home');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isScrapingJobs, setIsScrapingJobs] = useState(false);
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysis | null>(null);
  const [linkedInJobs, setLinkedInJobs] = useState<LinkedInJob[]>([]);

  const handleResumeUpload = async (file: File) => {
    setIsAnalyzing(true);
    try {
      const analysis = await analyzeResume(file);
      setResumeAnalysis(analysis);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      // Handle error (show error message to user)
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLinkedInSearch = async (jobTitle: string, location: string) => {
    setIsScrapingJobs(true);
    try {
      const jobs = await scrapeLinkedInJobs(jobTitle, location);
      setLinkedInJobs(jobs);
    } catch (error) {
      console.error('Error scraping LinkedIn jobs:', error);
      // Handle error (show error message to user)
    } finally {
      setIsScrapingJobs(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'analyze':
        return (
          <div className="container mx-auto max-w-4xl py-10 px-4">
            <button 
              onClick={() => setActiveTab('home')}
              className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </button>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Resume Analysis</h1>
            <p className="text-gray-600 mb-8">
              Upload your resume to get AI-powered insights, ratings, and personalized recommendations.
            </p>
            
            <ResumeUploader onResumeUpload={handleResumeUpload} isLoading={isAnalyzing} />
            
            {resumeAnalysis && !isAnalyzing && (
              <ResumeAnalysisResult analysis={resumeAnalysis} />
            )}
          </div>
        );
        
      case 'scrape':
        return (
          <div className="container mx-auto max-w-4xl py-10 px-4">
            <button 
              onClick={() => setActiveTab('home')}
              className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </button>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-6">LinkedIn Job Scraper</h1>
            <p className="text-gray-600 mb-8">
              Find relevant job listings from LinkedIn based on your preferred job title and location.
            </p>
            
            <LinkedInScraper onSearch={handleLinkedInSearch} isLoading={isScrapingJobs} />
            
            {linkedInJobs.length > 0 && !isScrapingJobs && (
              <LinkedInJobResults jobs={linkedInJobs} />
            )}
          </div>
        );
        
      default:
        return (
          <>
            {/* Hero Section */}
            <section className="py-20 px-4">
              <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                      AI-Powered Resume Analyzer & LinkedIn Scraper
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                      Leverage the power of LLM and OpenAI for advanced resume analysis. Get personalized insights, recommendations, and automate LinkedIn data extraction.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <button 
                        className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition font-medium"
                        onClick={() => setActiveTab('analyze')}
                      >
                        Analyze My Resume
                      </button>
                      <button 
                        className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md hover:bg-indigo-50 transition font-medium"
                        onClick={() => setActiveTab('scrape')}
                      >
                        Scrape LinkedIn Data
                      </button>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-10">
                    <img 
                      src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="AI Resume Analysis" 
                      className="rounded-lg shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white px-4">
              <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Our project is not your ordinary job-seeking tool. It's a true game-changer, meticulously crafted with the potent capabilities of AI.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Feature 1 */}
                  <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition">
                    <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                      <Brain className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Text Analysis</h3>
                    <p className="text-gray-600">
                      We employ the Langchain library to break down lengthy text sections in resumes into smaller, more meaningful chunks, resulting in more accurate analysis.
                    </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition">
                    <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                      <FileText className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Enhanced OpenAI Integration</h3>
                    <p className="text-gray-600">
                      Seamlessly connect to OpenAI services via your API key. We use the FAISS library to convert text chunks into numerical vectors for simplified analysis.
                    </p>
                  </div>

                  {/* Feature 3 */}
                  <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition">
                    <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                      <Search className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Intelligent Chunk Selection</h3>
                    <p className="text-gray-600">
                      Our application intelligently selects the most relevant text chunks for analysis, leveraging ChatGPT 3.5 Turbo for advanced language processing.
                    </p>
                  </div>

                  {/* Feature 4 */}
                  <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition">
                    <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                      <CheckCircle className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Q&A Pipeline</h3>
                    <p className="text-gray-600">
                      We've implemented a comprehensive question-answering pipeline that efficiently handles input documents and questions, providing in-depth insights.
                    </p>
                  </div>

                  {/* Feature 5 */}
                  <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition">
                    <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                      <Award className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Resume Analysis</h3>
                    <p className="text-gray-600">
                      Get detailed resume summaries with qualifications, experience, skills, projects, and achievements with AI-identified strengths and weaknesses.
                    </p>
                  </div>

                  {/* Feature 6 */}
                  <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition">
                    <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                      <Linkedin className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">LinkedIn Data Scraping</h3>
                    <p className="text-gray-600">
                      Our Selenium integration automates the extraction of valuable LinkedIn data, including company names, job titles, locations, and descriptions.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 bg-indigo-50 px-4">
              <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Our AI-powered platform simplifies the job search process with advanced resume analysis and LinkedIn data extraction.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Step 1 */}
                  <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                    <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">1</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Upload Your Resume</h3>
                    <p className="text-gray-600">
                      Simply upload your resume in PDF format to our secure platform for AI-powered analysis.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                    <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">2</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">AI Analysis</h3>
                    <p className="text-gray-600">
                      Our advanced AI analyzes your resume, identifying strengths, weaknesses, and opportunities for improvement.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                    <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">3</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Get Personalized Insights</h3>
                    <p className="text-gray-600">
                      Receive detailed feedback, job title recommendations, and LinkedIn job matches tailored to your profile.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section id="get-started" className="py-20 bg-indigo-600 px-4">
              <div className="container mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-bold text-white mb-6">Ready to Elevate Your Career Journey?</h2>
                <p className="text-xl text-indigo-100 mb-10 max-w-3xl mx-auto">
                  Join thousands of job seekers who have optimized their resumes and found their dream jobs using our AI-powered platform.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <button 
                    className="bg-white text-indigo-600 px-8 py-4 rounded-md hover:bg-indigo-50 transition font-medium text-lg"
                    onClick={() => setActiveTab('analyze')}
                  >
                    Analyze My Resume
                  </button>
                  <button 
                    className="bg-indigo-500 text-white px-8 py-4 rounded-md hover:bg-indigo-400 transition font-medium text-lg"
                    onClick={() => setActiveTab('scrape')}
                  >
                    Find LinkedIn Jobs
                  </button>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-4">
              <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-8 md:mb-0">
                    <div className="flex items-center space-x-2 mb-4">
                      <Brain className="h-8 w-8 text-indigo-400" />
                      <span className="text-xl font-bold">ResumeAI</span>
                    </div>
                    <p className="text-gray-400 max-w-xs">
                      Leveraging the power of AI to transform your job search experience.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Features</h3>
                      <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Resume Analysis</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">LinkedIn Scraping</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Job Recommendations</a></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Resources</h3>
                      <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">API</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Company</h3>
                      <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
                  <p>&copy; {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setActiveTab('home')}
          >
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">ResumeAI</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#features" className="text-gray-600 hover:text-indigo-600 transition">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition">How It Works</a></li>
              <li>
                <button 
                  onClick={() => setActiveTab('analyze')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Get Started
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {renderContent()}
    </div>
  );
}

export default App;
import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
// import './App.css';

function App() {
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    description: '',
    tone: '',
    contentType: ''
  });
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const generateContent = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.businessName || !formData.industry || !formData.description || !formData.tone || !formData.contentType) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Initialize the Google Generative AI
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Create a prompt based on form data
      const prompt = `Create a ${formData.contentType} for a business called ${formData.businessName} in the ${formData.industry} industry. 
      Business description: ${formData.description}
      Use a ${formData.tone} tone.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setGeneratedContent(text);

      setFormData({
        businessName: '',
        industry: '',
        description: '',
        tone: '',
        contentType: ''
      });
      
    } catch (err) {
      console.error('Error generating content:', err);
      setError('Failed to generate content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container w-full min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-4 rounded-lg mb-4">
        <h1 className="text-3xl font-bold text-center">
          Biz<span className="text-indigo-600">Boost</span>
        </h1>
        <p className="text-center text-gray-600 mt-2">
          AI-powered content generation for your business
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 bg-white border border-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-indigo-700">Content Generator</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={generateContent}>
            <div className="mb-4">
              <label htmlFor="businessName" className="block text-gray-700 mb-2">
                Business Name:
              </label>
              <input
                type="text"
                id="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                placeholder="Enter your business name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="industry" className="block text-gray-700 mb-2">
                Industry:
              </label>
              <select
                name="industry"
                id="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              >
                <option value="">--Select Industry--</option>
                <option value="tech">Technology</option>
                <option value="finance">Finance</option>
                <option value="health">Health & Wellness</option>
                <option value="education">Education</option>
                <option value="retail">Retail</option>
                <option value="hospitality">Hospitality</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 mb-2">
                Description:
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                rows="3"
                placeholder="Describe your business, products, or services"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="tone" className="block text-gray-700 mb-2">
                Tone:
              </label>
              <select
                name="tone"
                id="tone"
                value={formData.tone}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              >
                <option value="">--Select Tone--</option>
                <option value="formal">Formal</option>
                <option value="informal">Informal</option>
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="enthusiastic">Enthusiastic</option>
                <option value="conversational">Conversational</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="contentType" className="block text-gray-700 mb-2">
                Content Type:
              </label>
              <select
                name="contentType"
                id="contentType"
                value={formData.contentType}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              >
                <option value="">--Select Content Type--</option>
                <option value="blog">Blog Post</option>
                <option value="social">Social Media Post</option>
                <option value="ad">Advertisement</option>
                <option value="email">Email Campaign</option>
                <option value="product">Product Description</option>
                <option value="tagline">Tagline/Slogan</option>
              </select>
            </div>

            <div className="mb-2">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-indigo-600 text-white p-3 rounded-lg w-full hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : 'Generate Content'}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="w-full lg:w-1/2 bg-white border border-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-indigo-700">Generated Content</h2>
          
          {generatedContent ? (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="whitespace-pre-wrap">{generatedContent}</div>
              <button
                onClick={() => navigator.clipboard.writeText(generatedContent)}
                className="mt-4 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy to Clipboard
              </button>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>Your generated content will appear here</p>
              <p className="text-sm mt-2">Fill out the form and click "Generate Content"</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="footer mt-6 p-4 bg-white border border-gray-300 rounded-lg">
        <p className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} BizBoost. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default App;
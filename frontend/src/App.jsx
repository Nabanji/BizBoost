function App() {
  return (
    <div className="container w-full h-screen bg-gray-100 p-4">

      {/* Navbar */}
      {/* <div className="navbar flex justify-between bg-white border border-gray-300 p-4 rounded-lg">
        <a href="#" className="navbar-brand text-xl font-bold">Biz<span className="text-indigo-600">Boost</span></a>
        <div className="nav-links flex gap-10 px-4">
          <a href="#" className="text-lg font-normal">Generate</a>
          <a href="#" className="text-lg font-normal">History</a>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="main-content mt-4 p-2 text-center bg-white border border-gray-300 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Welcome to <span className="text-indigo-600">BizBoost</span></h2>
        <p className="text-lg font-medium">Your one-stop solution for business growth.</p>
      </div>

      {/* Form content */}
      <div className="form p-2 w-full bg-white border border-gray-300 rounded-lg mt-4">
        <form>

          <div className="mb-4">
            <label htmlFor="businessName">Business Name:</label>
            <input type="text" id="businessName" className="border border-gray-300 p-2 rounded-lg w-full" />
          </div>

          <div className="mb-4">
            <label htmlFor="industry">Industry:</label>
            <select name="industry" id="industry" className="border border-gray-300 p-2 rounded-lg w-full">
              <option value="">--Select Industry--</option>
              <option value="tech">Technology</option>
              <option value="finance">Finance</option>
              <option value="health">Health</option>
              <option value="education">Education</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="description">Description:</label>
            <textarea id="description" className="border border-gray-300 p-2 rounded-lg w-full" rows="3"></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="tone">Tone:</label>
            <select name="tone" id="tone" className="border border-gray-300 p-2 rounded-lg w-full">
              <option value="" disabled>--Select Tone--</option>
              <option value="formal">Formal</option>
              <option value="informal">Informal</option>
              <option value="friendly">Friendly</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="contentType">Content Type:</label>
            <select name="contentType" id="contentType" className="border border-gray-300 p-2 rounded-lg w-full">
              <option value="">--Select Content Type--</option>
              <option value="blog">Blog Post</option>
              <option value="social">Social Media Post</option>
              <option value="ad">Advertisement</option>
              <option value="email">Email</option>
            </select>
          </div>

          <div className="mb-2">
            <button type="submit" className="bg-indigo-600 text-white p-2 rounded-lg mt-4 w-full hover:bg-indigo-700">Generate</button>
          </div>
        </form>

      </div>

      {/* Footer */}
      <div className="footer mt-4 p-4 bg-white border border-gray-300 rounded-lg">
        <p className="text-center text-sm text-gray-600">© {new Date().getFullYear()} BizBoost. All rights reserved.</p>
      </div>

    </div>
  )
}

export default App
    
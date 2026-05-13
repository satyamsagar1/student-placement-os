import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Path to Success Starts Here
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Master your placement journey with our comprehensive platform. Track
            applications, manage resumes, and never miss an opportunity.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-200"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => navigate("/applications")}
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg transition duration-200"
                >
                  View Applications
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-200"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg transition duration-200"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Why Choose PlacementOS?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Track Applications
              </h3>
              <p className="text-gray-600">
                Keep track of all your job applications in one centralized
                dashboard. Know the status of each application at a glance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Manage Resumes
              </h3>
              <p className="text-gray-600">
                Store and organize multiple versions of your resume. Upload,
                edit, and download them anytime you need.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Smart Reminders
              </h3>
              <p className="text-gray-600">
                Never miss an interview or deadline. Get timely reminders for
                important dates and follow-ups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Sign Up</h3>
              <p className="text-gray-600">
                Create your free account in seconds.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Upload Resume
              </h3>
              <p className="text-gray-600">
                Add your resume and create profiles.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Apply</h3>
              <p className="text-gray-600">
                Start applying to your dream jobs.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Track & Succeed
              </h3>
              <p className="text-gray-600">
                Monitor progress and land your job.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Key Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-3xl">✅</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Never Lose Track
                </h3>
                <p className="text-gray-600">
                  All your applications in one place. Never forget where you
                  applied.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">✅</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Stay Organized
                </h3>
                <p className="text-gray-600">
                  Organize your resumes and manage multiple applications
                  effortlessly.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">✅</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Smart Reminders
                </h3>
                <p className="text-gray-600">
                  Get notified about interviews, deadlines, and follow-ups
                  automatically.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">✅</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  100% Free
                </h3>
                <p className="text-gray-600">
                  No hidden fees. Use all features completely free forever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Placement Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of students who are successfully managing their
            placement process.
          </p>
          {!isLoggedIn && (
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/register"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-200"
              >
                Start Free Today
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg transition duration-200"
              >
                Already a Member?
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2 text-blue-400">10K+</div>
              <p className="text-lg text-gray-300">Active Students</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 text-blue-400">50K+</div>
              <p className="text-lg text-gray-300">Applications Tracked</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 text-blue-400">95%</div>
              <p className="text-lg text-gray-300">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">About</h4>
              <p className="text-sm">
                PlacementOS helps students manage their placement journey with
                ease.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2024 PlacementOS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

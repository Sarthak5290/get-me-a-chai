export default function Information() {
    return (
      <>
        {/* Hero Section Container */}
        <div className="relative flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-gray-900 via-slate-950 to-black text-white px-6 sm:px-12">
          {/* Hero Section */}
          <div className="text-center text-3xl sm:text-4xl mb-8 font-bold">
            Your fans can buy you a chai
          </div>
  
          {/* Functionalities Section Container */}
          <div className="flex flex-col sm:flex-row sm:space-x-12 space-y-8 sm:space-y-0 justify-center items-center w-full">
            {/* Functionality One */}
            <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-1/3 min-h-[350px] hover:scale-105 transition duration-500 ease-in-out">
              <h2 className="text-2xl font-semibold mb-4 text-gray-200">
                Crowdfunding Platform
              </h2>
              <p className="text-gray-400 text-center">
                Connect with your fans and followers. Share your creative journey,
                and they can support you by funding your projects.
              </p>
            </div>
  
            {/* Functionality Two */}
            <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-1/3 min-h-[350px] hover:scale-105 transition duration-500 ease-in-out">
              <h2 className="text-2xl font-semibold mb-4 text-gray-200">
                Easy Payment Integration
              </h2>
              <p className="text-gray-400 text-center">
                Get paid quickly and securely with integrated payment methods.
                Fans can donate directly with ease.
              </p>
            </div>
  
            {/* Functionality Three */}
            <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-1/3 min-h-[350px] hover:scale-105 transition duration-500 ease-in-out">
              <h2 className="text-2xl font-semibold mb-4 text-gray-200">
                Project Visibility and Vision
              </h2>
              <p className="text-gray-400 text-center">
                Showcase your projects and receive support from those who believe
                in your work. Gain visibility and grow your fanbase.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
  
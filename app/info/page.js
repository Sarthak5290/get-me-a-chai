import Footer from "../componenets/Footer";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-950 to-black text-white">
      {/* Hero Section Container */}
      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col justify-center">
        {/* Hero Heading with Improved Typography */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500 leading-tight">
          Your Fans Can Buy You a Chai
        </h1>

        {/* Functionalities Section Container */}
        <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
          
          {/* Functionality One */}
          <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-primary/30 group">
            <div className="mb-6 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary group-hover:scale-110 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-100 group-hover:text-primary transition">
              Crowdfunding Platform
            </h2>
            <p className="text-gray-400 text-center leading-relaxed">
              Connect with your fans and followers. Share your creative journey,
              and they can support you by funding your projects through an intuitive platform.
            </p>
          </div>

          {/* Functionality Two */}
          <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-secondary/30 group">
            <div className="mb-6 w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary group-hover:scale-110 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-100 group-hover:text-secondary transition">
              Easy Payment Integration
            </h2>
            <p className="text-gray-400 text-center leading-relaxed">
              Get paid quickly and securely with integrated payment methods.
              Fans can donate directly with seamless and hassle-free transactions.
            </p>
          </div>

          {/* Functionality Three */}
          <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-accent/30 group">
            <div className="mb-6 w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent group-hover:scale-110 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-100 group-hover:text-accent transition">
              Project Visibility and Vision
            </h2>
            <p className="text-gray-400 text-center leading-relaxed">
              Showcase your projects and receive support from those who believe
              in your work. Gain visibility, connect with your audience, and grow your fanbase.
            </p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
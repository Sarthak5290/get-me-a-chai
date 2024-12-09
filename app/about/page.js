// pages/about.js

import Footer from "../componenets/Footer";

export default function About() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-950 to-black text-white px-6 sm:px-12 py-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-600 mb-4">
            Learn More About Us
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            At Get Me A Chai, we are dedicated to supporting developers,
            creators, and influencers by connecting them with their supporters.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="max-w-4xl mx-auto space-y-8 text-gray-400 text-lg leading-relaxed px-4 sm:px-8">
          <p className="text-center">
            Our platform enables individuals to fund their projects and ideas,
            providing a space where creativity and innovation can thrive.
          </p>
          <p>
            Our mission is to empower talented individuals by facilitating
            financial support, allowing them to focus on what they do best –
            creating. Whether you are a developer coding the next big app, a
            content creator making engaging videos, or an influencer sharing
            your passion, Get Me A Chai is here to help you achieve your goals.
          </p>
          <p>
            We believe in the power of community and the impact of collective
            support. By providing a platform for patrons to contribute, we aim
            to transform dreams into reality and foster a culture of creativity
            and innovation.
          </p>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-16">
          <p className="text-gray-500">
            Ready to support or get supported? Join us and be a part of
            something creative!
          </p>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

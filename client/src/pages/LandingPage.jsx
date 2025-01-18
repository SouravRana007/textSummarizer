import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold mb-4">Text Summarizer</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Upload PDFs and images to get instant, AI-powered summaries of your
          documents
        </p>
        <button
          onClick={() => navigate("/login")}
          className="btn btn-neutral btn-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

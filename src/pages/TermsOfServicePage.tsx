import React from "react";
import { useNavigate } from "react-router-dom";

export function TermsOfServicePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-gray-600 mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          {/* all your <section> content here... */}
        </div>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-500">
            <button
              onClick={() => navigate("/privacy-policy")}
              className="hover:text-gray-700 transition-colors underline bg-transparent border-none cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="hidden sm:inline">•</span>
            <button
              onClick={() => navigate("/terms-of-service")}
              className="hover:text-gray-700 transition-colors underline bg-transparent border-none cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

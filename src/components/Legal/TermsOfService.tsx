import React from 'react';
import { ArrowLeft } from 'lucide-react';

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using Innoverse, you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Platform Purpose</h2>
            <p className="text-gray-700">
              Innoverse is a college coding community platform designed to facilitate learning, collaboration, 
              and skill development among students and coding enthusiasts. The platform provides coding tracks, 
              challenges, team collaboration tools, and educational resources.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Conduct</h2>
            <p className="text-gray-700 mb-4">Users agree to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Use the platform for educational and collaborative purposes only</li>
              <li>Respect other community members and maintain a positive environment</li>
              <li>Not share inappropriate, offensive, or harmful content</li>
              <li>Not attempt to hack, exploit, or damage the platform</li>
              <li>Follow academic integrity guidelines in all activities</li>
              <li>Use your real identity when creating your profile</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Account Responsibilities</h2>
            <p className="text-gray-700 mb-4">You are responsible for:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Maintaining the security of your Google account used for authentication</li>
              <li>All activities that occur under your account</li>
              <li>Ensuring your profile information is accurate and up-to-date</li>
              <li>Notifying us of any unauthorized access to your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Intellectual Property</h2>
            <p className="text-gray-700">
              Users retain ownership of the code and content they create. By sharing content on the platform, 
              you grant other community members the right to learn from and provide feedback on your work 
              for educational purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Platform Availability</h2>
            <p className="text-gray-700">
              We strive to maintain platform availability but do not guarantee uninterrupted service. 
              We may temporarily suspend the service for maintenance, updates, or other operational reasons.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Termination</h2>
            <p className="text-gray-700">
              We reserve the right to suspend or terminate accounts that violate these terms or engage in 
              behavior that is harmful to the community. Users may delete their accounts at any time through 
              their profile settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Limitation of Liability</h2>
            <p className="text-gray-700">
              Innoverse is provided "as is" for educational purposes. We are not liable for any damages, 
              losses, or issues that may arise from using the platform. Users participate at their own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to Terms</h2>
            <p className="text-gray-700">
              We may update these Terms of Service from time to time. Continued use of the platform after 
              changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact Information</h2>
            <p className="text-gray-700">
              For questions about these Terms of Service, please contact us through the platform or 
              reach out to your college's computer science department.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

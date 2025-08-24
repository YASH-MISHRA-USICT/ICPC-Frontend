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
          <p className="text-gray-600 mt-2">
            These Terms of Service (“Terms”) govern your access to and use of
            the Innoverse coding community platform, websites, and related
            services (collectively, the “Services”). By accessing or using the
            Services, you agree to be bound by these Terms.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          {/* 1. Eligibility */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Eligibility</h2>
            <p className="text-gray-700">
              You must be at least 13 years old (or the age of digital consent
              in your region) to use the Services. If you are using the Services
              on behalf of an organization, you represent that you have
              authority to bind that organization to these Terms.
            </p>
          </section>

          {/* 2. Account & Security */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Account & Security</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>You are responsible for the accuracy of the information you provide.</li>
              <li>Keep your login credentials confidential and secure.</li>
              <li>
                You are responsible for all activities that occur under your
                account. Notify us immediately of any unauthorized use.
              </li>
            </ul>
          </section>

          {/* 3. Acceptable Use & Community Guidelines */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. Acceptable Use & Community Guidelines
            </h2>
            <p className="text-gray-700 mb-2">
              Innoverse is a collaborative learning community. By using the
              Services, you agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Violate any applicable laws or regulations.</li>
              <li>
                Post or share content that is unlawful, harassing, hateful,
                discriminatory, defamatory, pornographic, or otherwise harmful.
              </li>
              <li>
                Infringe or misappropriate intellectual property, privacy, or
                other rights of others.
              </li>
              <li>
                Attempt to gain unauthorized access to any systems, data, or
                accounts; probe, scan, or test vulnerabilities; or disrupt or
                overburden the Services.
              </li>
              <li>
                Engage in cheating, plagiarism, or unfair practices in
                assignments, challenges, hackathons, or leaderboards.
              </li>
              <li>Spam, engage in commercial solicitation, or run bots that degrade the Service.</li>
            </ul>
            <p className="text-gray-700 mt-2">
              We may moderate content and take appropriate action (including
              removal or account suspension) if we believe these Terms or our
              community guidelines have been violated.
            </p>
          </section>

          {/* 4. User Content & License */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. User Content & License</h2>
            <p className="text-gray-700">
              You retain ownership of content you submit, post, or upload
              (“User Content”). By providing User Content, you grant Innoverse a
              worldwide, non-exclusive, royalty-free license to host, store,
              reproduce, modify, adapt, publish, display, and distribute such
              content solely for operating, improving, and promoting the
              Services. You represent and warrant that you have all rights
              necessary to grant this license and that your User Content
              complies with these Terms and applicable law.
            </p>
          </section>

          {/* 5. Code Submissions, Challenges & Hackathons */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Code Submissions, Challenges & Hackathons
            </h2>
            <p className="text-gray-700">
              For challenges, events, or hackathons hosted on Innoverse or in
              partnership with others, additional rules may apply. You agree to
              follow those rules. Unless otherwise stated in event rules, you
              retain ownership of your code. By submitting, you grant Innoverse
              the right to display your submissions within the platform,
              generate scoreboards, and showcase top entries for community
              learning. You are responsible for ensuring your submissions do not
              infringe third-party rights and comply with any open-source
              licenses used.
            </p>
          </section>

          {/* 6. Intellectual Property (Innoverse IP) */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              6. Intellectual Property (Innoverse IP)
            </h2>
            <p className="text-gray-700">
              The Services, including their design, features, look-and-feel,
              and underlying software, are owned by or licensed to Innoverse
              and are protected by intellectual property laws. Except for the
              limited rights expressly granted to you in these Terms, no rights
              are transferred to you. You may not copy, modify, distribute,
              reverse engineer, or create derivative works of the Services.
            </p>
          </section>

          {/* 7. Third-Party Services */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Third-Party Services</h2>
            <p className="text-gray-700">
              The Services may integrate with or link to third-party services
              (e.g., sign-in providers, analytics, code hosting, payment
              processors). We are not responsible for third-party content,
              policies, or practices. Your use of third-party services is
              subject to their terms and policies.
            </p>
          </section>

          {/* 8. Payments (If/When Applicable) */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              8. Payments (If/When Applicable)
            </h2>
            <p className="text-gray-700">
              Some features may be paid. Prices, taxes, and billing terms will
              be presented at purchase. Unless required by law, payments are
              non-refundable. Payment processing is handled by third-party
              processors; we do not store full payment card details.
            </p>
          </section>

          {/* 9. AI/Automation Features */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. AI/Automation Features</h2>
            <p className="text-gray-700">
              If AI-powered features are available (e.g., code suggestions,
              moderation assistance), you acknowledge outputs may be generated
              automatically and may not be error-free. You are responsible for
              reviewing and validating outputs before use. Do not input
              confidential or personal data you are not authorized to share.
            </p>
          </section>

          {/* 10. Privacy */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Privacy</h2>
            <p className="text-gray-700">
              Your use of the Services is also governed by our{" "}
              <button
                type="button"
                onClick={() => navigate("/privacy-policy")}
                className="underline text-indigo-600 hover:text-indigo-700"
              >
                Privacy Policy
              </button>
              , which explains how we collect and use your information.
            </p>
          </section>

          {/* 11. Termination */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Termination</h2>
            <p className="text-gray-700">
              You may stop using the Services at any time. We may suspend or
              terminate your access (with or without notice) if we believe
              you’ve violated these Terms, created risk or possible legal
              exposure for us or others, or if we discontinue the Services.
              Upon termination, sections that by their nature should survive
              (e.g., IP, disclaimers, limitations of liability, indemnity,
              governing law) will remain in effect.
            </p>
          </section>

          {/* 12. Disclaimers */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Disclaimers</h2>
            <p className="text-gray-700">
              The Services are provided on an “AS IS” and “AS AVAILABLE” basis,
              without warranties of any kind, whether express, implied, or
              statutory, including implied warranties of merchantability, fitness
              for a particular purpose, title, and non-infringement. We do not
              warrant that the Services will be uninterrupted, secure, or
              error-free, or that content will be accurate or reliable.
            </p>
          </section>

          {/* 13. Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              13. Limitation of Liability
            </h2>
            <p className="text-gray-700">
              To the maximum extent permitted by law, Innoverse and its
              affiliates will not be liable for any indirect, incidental,
              special, consequential, or punitive damages, or any loss of profits,
              revenues, data, or goodwill, arising from or related to your use of
              the Services. In no event will our total liability exceed the
              amount you paid (if any) to use the Services in the 12 months
              preceding the claim, or ₹10,000 (ten thousand INR), whichever is
              greater.
            </p>
          </section>

          {/* 14. Indemnification */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              14. Indemnification
            </h2>
            <p className="text-gray-700">
              You agree to indemnify and hold harmless Innoverse and its
              affiliates, officers, directors, employees, and agents from any
              claims, losses, liabilities, damages, costs, and expenses
              (including reasonable attorneys’ fees) arising out of or relating
              to your User Content, your use of the Services, or your violation
              of these Terms or applicable law.
            </p>
          </section>

          {/* 15. Governing Law & Dispute Resolution */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              15. Governing Law & Dispute Resolution
            </h2>
            <p className="text-gray-700">
              These Terms are governed by the laws of India, without regard to
              conflict of laws principles. You agree to the exclusive
              jurisdiction of the courts in New Delhi, India, for any dispute
              arising from or relating to these Terms or the Services.
            </p>
          </section>

          {/* 16. Changes to These Terms */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              16. Changes to These Terms
            </h2>
            <p className="text-gray-700">
              We may update these Terms from time to time. If we make material
              changes, we will notify you by posting the updated Terms and
              updating the “Last updated” date. Your continued use of the
              Services after the changes become effective constitutes your
              acceptance of the updated Terms.
            </p>
          </section>

          {/* 17. Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">17. Contact</h2>
            <p className="text-gray-700">
              Questions about these Terms? Contact us at{" "}
              <a className="underline" href="mailto:innoverseusict@gmail.com">
                innoverseusict@gmail.com
              </a>.
            </p>
          </section>
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
          <p className="text-xs text-center text-gray-400 mt-4">
            Note: This document is provided for general information and does not constitute legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}

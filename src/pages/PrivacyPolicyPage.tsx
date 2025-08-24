import React from "react";
import { useNavigate } from "react-router-dom";

export function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-600 mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-gray-600 mt-2">
            This Privacy Policy explains how <span className="font-semibold">Innoverse</span> (“we,” “our,” or “us”) collects, uses, discloses, and protects your information when you use our coding community platform, websites, and related services (collectively, the “Services”).
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          {/* Quick Summary */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">At a Glance</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>We collect account details, community content, and technical data to run and improve Innoverse.</li>
              <li>We never sell your personal data. We share data with trusted vendors to provide our Services.</li>
              <li>You control your data: access, correct, download, or delete it (subject to legal/legitimate interests).</li>
              <li>We use cookies/analytics to keep the site reliable, secure, and helpful.</li>
            </ul>
          </section>

          {/* What we collect */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h2>
            <div className="space-y-3 text-gray-700">
              <div>
                <h3 className="font-medium text-gray-900">1) Account & Profile</h3>
                <p>When you create or update an account, we collect your name/username, email, password (hashed), profile photo, bio, skills, links, institution/company, and role (e.g., student, mentor, admin).</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">2) Community & User-Generated Content</h3>
                <p>Posts, comments, code snippets, projects, submissions, messages (if applicable), reactions, badges, and participation metadata (events, hackathons, tracks) you create or upload.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">3) Usage & Device Data</h3>
                <p>Log data (IP address, timestamps, pages viewed, referrers), device info (browser, OS), and interaction events for reliability, security, and analytics.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">4) Cookies & Similar Technologies</h3>
                <p>Session cookies for login, preference cookies, and analytics/performance cookies. See “Cookies” below for controls.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">5) Communications</h3>
                <p>Emails you send us (support/feedback), notification preferences, and delivery/engagement metadata (e.g., opens, bounces).</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">6) Third-Party Sign-In</h3>
                <p>If you sign in via a provider (e.g., Google), we receive basic profile data per your consent with that provider.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">7) Optional Payments</h3>
                <p>If Innoverse later offers paid features, payment processors will collect billing info. We don’t store raw card details.</p>
              </div>
            </div>
          </section>

          {/* How we use it */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Provide, maintain, and secure the Services (including authentication and account management).</li>
              <li>Enable community features (profiles, posts, comments, messaging, leaderboards, submissions, projects).</li>
              <li>Moderate content, enforce community guidelines, and prevent fraud/abuse.</li>
              <li>Improve product performance and user experience through analytics and research.</li>
              <li>Send service updates, security alerts, event reminders, and marketing (where permitted). You can opt out of non-essential emails.</li>
              <li>Comply with legal obligations and protect our legal rights and users.</li>
            </ul>
          </section>

          {/* Legal bases */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Legal Bases (EEA/UK/Similar Jurisdictions)</h2>
            <p className="text-gray-700">
              We process personal data under one or more of these bases: performance of a contract (providing the Services), legitimate interests (e.g., security, improvements), consent (e.g., certain cookies/marketing), and legal obligations.
            </p>
          </section>

          {/* Sharing */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">How We Share Information</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li><span className="font-medium">Service Providers:</span> Hosting, analytics, email delivery, error monitoring, customer support tools—bound by contracts and limited to necessary processing.</li>
              <li><span className="font-medium">Community Visibility:</span> Your username, profile, and public posts are visible to others by design.</li>
              <li><span className="font-medium">Legal & Safety:</span> To comply with law, enforce terms, or protect users, the public, or Innoverse.</li>
              <li><span className="font-medium">Business Transfers:</span> In a merger, acquisition, or asset sale, data may transfer subject to this Policy’s protections.</li>
              <li>We do <span className="font-semibold">not</span> sell your personal data.</li>
            </ul>
          </section>

          {/* Retention */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Retention</h2>
            <p className="text-gray-700">
              We keep personal data only as long as necessary for the purposes described here or as required by law. Community content may remain visible (e.g., forum history) even if you deactivate your account, unless you delete it or request removal where applicable.
            </p>
          </section>

          {/* International transfers */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">International Data Transfers</h2>
            <p className="text-gray-700">
              If we transfer data across borders, we use appropriate safeguards (e.g., standard contractual clauses) to protect your information consistent with applicable laws.
            </p>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Security</h2>
            <p className="text-gray-700">
              We implement technical and organizational measures (encryption in transit, access controls, monitoring). No method is 100% secure—please use a strong, unique password and keep your account credentials confidential.
            </p>
          </section>

          {/* Your rights */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Your Privacy Rights</h2>
            <p className="text-gray-700">
              Depending on your location, you may have rights to access, correct, update, delete, restrict, or object to processing; to data portability; and to withdraw consent where processing is based on consent. You may also opt out of marketing communications at any time.
            </p>
            <p className="text-gray-700 mt-2">
              To exercise rights, contact us at <a className="underline" href="mailto:innoverseusict@gmail.com">innoverseusict@gmail.com</a>. We may need to verify your identity. If we rely on legitimate interests, you can object where your rights override our interests.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Cookies & Analytics</h2>
            <p className="text-gray-700">
              We use cookies and similar technologies for login sessions, preferences, performance, and analytics. You can manage cookies in your browser settings. Disabling some cookies may affect functionality.
            </p>
          </section>

          {/* AI features (optional if relevant) */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">AI/Automations</h2>
            <p className="text-gray-700">
              If Innoverse offers AI-powered features (e.g., code suggestions, moderation assistance), inputs you provide (such as prompts or code snippets) may be processed to generate outputs and to improve safety, reliability, and quality. We take steps to limit exposure of personal data in such workflows.
            </p>
          </section>

          {/* Children */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Children’s Privacy</h2>
            <p className="text-gray-700">
              Our Services are intended for users aged 13+ (or the applicable age of digital consent in your region). We do not knowingly collect personal data from children under that age. If you believe a child has provided us personal data, contact us to request deletion.
            </p>
          </section>

          {/* Third-party links */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Links & Services</h2>
            <p className="text-gray-700">
              Our Services may link to third-party sites or integrate third-party services. Their privacy practices are governed by their policies, not ours. Please review their terms and privacy statements.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Policy from time to time. We’ll post the updated date above, and when required, notify you through the Services or via email.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h2>
            <p className="text-gray-700">
              Questions or requests? Email <a className="underline" href="mailto:innoverseusict@gmail.com">innoverseusict@gmail.com</a>             </p>
          </section>
        </div>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-500">
            <button
              type="button"
              onClick={() => navigate("/privacy-policy")}
              className="hover:text-gray-700 transition-colors underline bg-transparent border-none cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="hidden sm:inline">•</span>
            <button
              type="button"
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

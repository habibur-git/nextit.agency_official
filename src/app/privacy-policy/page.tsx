import LegalPage from "@/components/legal/LegalPage";

export const metadata = {
  title: "Privacy Policy | DevioNex",
  description:
    "How DevioNex collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal information when you visit devionex.com or engage our services."
      lastUpdated="April 11, 2026"
      relatedLinks={[
        { label: "Terms of Service →", href: "/terms-of-service" },
        { label: "Refund Policy →", href: "/refund-policy" },
      ]}
      sections={[
        {
          heading: "Information we collect",
          content: [
            "Name, email address, and WhatsApp number when you submit an inquiry or contact form.",
            "Project details, goals, and files you share with us during the discovery or project process.",
            "Payment and billing information when you engage our services.",
            "Browser type, IP address, device information, and pages visited — collected automatically.",
            "Cookies and similar tracking technologies (see Section 5).",
          ],
        },
        {
          heading: "How we use your information",
          content: [
            "To respond to your inquiries and deliver our services.",
            "To communicate project updates, timelines, and deliverables.",
            "To process payments and manage billing.",
            "To improve our website and service quality.",
            "To send occasional service-related communications. We do not send unsolicited marketing emails.",
          ],
        },
        {
          heading: "How we share your information",
          content:
            "We do not sell, rent, or trade your personal information to third parties. We may share your information with service providers we use to operate our business (e.g. email platforms, project management tools, payment processors) under strict confidentiality. We may also disclose information if required by law or to protect our legal rights.",
        },
        {
          heading: "Data retention",
          content:
            "We retain your personal information for as long as necessary to provide our services and comply with legal obligations. If you would like your data deleted, contact us at info@nextit.agency and we will action your request within 30 days.",
        },
        {
          heading: "Cookies",
          content:
            "Our website uses cookies to improve your browsing experience and analyse traffic. You can control cookie settings through your browser. Disabling cookies may affect some website functionality.",
        },
        {
          heading: "Data security",
          content:
            "We take reasonable technical and organisational measures to protect your personal information from unauthorised access, loss, or misuse. However, no method of transmission over the internet is 100% secure.",
        },
        {
          heading: "Your rights",
          content: [
            "Access the personal information we hold about you.",
            "Request correction of inaccurate data.",
            "Request deletion of your data.",
            "Withdraw consent at any time.",
          ],
        },
        {
          heading: "Third-party links",
          content:
            "Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their policies independently.",
        },
        {
          heading: "Changes to this policy",
          content:
            "We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the date at the top of this page. Continued use of our website constitutes acceptance of the updated policy.",
        },
        {
          heading: "Contact",
          content:
            "If you have any questions about this Privacy Policy, contact us at info@nextit.agency or visit devionex.com.",
        },
      ]}
    />
  );
}

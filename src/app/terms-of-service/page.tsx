import LegalPage from "@/components/legal/LegalPage";

export const metadata = {
  title: "Terms of Service | NextIT",
  description:
    "Terms and conditions governing your use of NextIT services and website.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle="These terms govern your use of NextIT.com and any services provided by NextIT. By engaging our services, you agree to these terms."
      lastUpdated="April 11, 2026"
      relatedLinks={[
        { label: "Privacy Policy →", href: "/privacy-policy" },
        { label: "Refund Policy →", href: "/refund-policy" },
      ]}
      sections={[
        {
          heading: "Services",
          content:
            "NextIT provides UI/UX design, full-stack web development, mobile app design, and related digital product services. The specific scope, deliverables, timeline, and pricing for each project are agreed upon during the discovery process and confirmed in a separate project agreement or proposal.",
        },
        {
          heading: "Project engagement",
          content: [
            "All projects begin with a discovery call to define scope, timeline, and requirements. No work begins until scope is agreed upon in writing.",
            "A written proposal or contract will be shared before work commences, outlining deliverables, milestones, timelines, and payment terms.",
            "You are responsible for providing timely feedback, content, assets, and approvals. Delays caused by late client responses may affect project timelines.",
          ],
        },
        {
          heading: "Payment terms",
          content: [
            "Accepted payment methods: bank transfer, Payoneer, cryptocurrency, and other methods agreed upon in writing.",
            "Projects are structured with an upfront deposit before work begins, with remaining payments tied to milestones or project completion.",
            "Work may be paused if payments are not received by the agreed due date. Final deliverables will be withheld until full payment is received.",
            "Monthly retainer agreements are billed at the start of each month and may be cancelled with 30 days written notice.",
          ],
        },
        {
          heading: "Intellectual property",
          content: [
            "Upon full payment, all final deliverables — including design files, source code, and related assets — become the sole property of the client.",
            "Before full payment, all work remains the intellectual property of NextIT. Partial deliverables may not be used, published, or shared without written consent.",
            "NextIT reserves the right to display completed work in our portfolio and marketing materials unless explicitly agreed otherwise in writing.",
          ],
        },
        {
          heading: "Revisions",
          content:
            "Revisions are included as outlined in your project agreement. We work until you are satisfied with the final product. Requests that fall significantly outside the agreed scope may be quoted separately as additional work.",
        },
        {
          heading: "Confidentiality",
          content:
            "Both parties agree to keep confidential any proprietary information, business data, or trade secrets shared during the project. This obligation continues after the project is complete.",
        },
        {
          heading: "Limitation of liability",
          content:
            "NextIT's total liability for any claim arising from our services shall not exceed the total amount paid by the client for the specific project in question. We are not liable for indirect, incidental, or consequential damages including lost profits or business interruption.",
        },
        {
          heading: "Warranties",
          content:
            "We warrant that our work will be completed with reasonable skill and care, and will conform to the agreed specifications. We do not guarantee specific business outcomes such as revenue growth, search rankings, or conversion rates.",
        },
        {
          heading: "Termination",
          content:
            "Either party may terminate a project with written notice. In the event of termination, the client is liable for payment for all work completed up to the termination date. Refunds are subject to our Refund Policy.",
        },
        {
          heading: "Governing law",
          content:
            "These Terms of Service are governed by the laws of Bangladesh. Any disputes will be resolved through good-faith negotiation. If resolution cannot be reached, disputes will be subject to the jurisdiction of the courts of Bangladesh.",
        },
        {
          heading: "Changes to these terms",
          content:
            "We may update these Terms of Service at any time. Continued use of our services after changes are posted constitutes acceptance of the updated terms.",
        },
      ]}
    />
  );
}

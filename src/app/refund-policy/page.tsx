import LegalPage from "@/components/legal/LegalPage";

export const metadata = {
  title: "Refund Policy | DevioNex",
  description:
    "DevioNex refund conditions based on project stage and work completed.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      subtitle="Our refund policy is based on the stage of work completed at the time of the request. We always prefer to resolve issues through communication first."
      lastUpdated="April 11, 2026"
      relatedLinks={[
        { label: "Privacy Policy →", href: "/privacy-policy" },
        { label: "Terms of Service →", href: "/terms-of-service" },
      ]}
      sections={[
        {
          heading: "General policy",
          content:
            "Because our services involve significant time, skill, and resources, all refund requests are evaluated based on the stage of work completed at the time of the request. We do not offer blanket full refunds once work has commenced.",
        },
        {
          heading: "Before work begins — 100% refund",
          content:
            "If you cancel your project before the kickoff call or before any design or development work has started, you are eligible for a full refund of any deposit paid.",
        },
        {
          heading: "During discovery / early design — 50–75% refund",
          content:
            "If you cancel after the discovery call but before significant design or development work has been delivered, you may be eligible for a partial refund of 50–75% of the amount paid, depending on the work completed.",
        },
        {
          heading: "During active development — 25–50% refund",
          content:
            "If you cancel after deliverables have been shared — including wireframes, designs, or code — you may be eligible for a partial refund of 25–50% of the amount paid for that milestone. The exact amount is assessed based on the volume and quality of work delivered.",
        },
        {
          heading: "After final delivery — no refund",
          content:
            "Once final deliverables have been approved and delivered, no refunds are issued. If you are unsatisfied with the final output, please raise concerns before approving the final delivery so we can address them.",
        },
        {
          heading: "Monthly retainers",
          content:
            "Monthly retainer fees are non-refundable once the billing period has commenced. Retainers may be cancelled with 30 days written notice to prevent the next billing cycle.",
        },
        {
          heading: "Dispute resolution",
          content:
            "If you believe the work delivered does not meet the agreed specifications, please contact us at info@nextit.agency within 7 days of delivery. We will review your concerns and work in good faith to find a fair resolution — which may include additional revisions, partial credit, or a negotiated refund.",
        },
        {
          heading: "How refunds are processed",
          content:
            "Approved refunds are processed via the same payment method used for the original transaction — bank transfer, Payoneer, cryptocurrency, or other agreed method. Refunds are typically processed within 7–14 business days of approval.",
        },
        {
          heading: "Non-refundable items",
          content: [
            "Discovery call fees (if applicable).",
            "Third-party costs paid on your behalf — e.g. domain registration, software licences, hosting.",
            "Rush fees or expedited delivery charges.",
          ],
        },
        {
          heading: "How to request a refund",
          content:
            "Email info@nextit.agency with the subject line: Refund Request — [Your Project Name]. Include your name, project details, payment reference, and the reason for your request. We will respond within 3 business days.",
        },
      ]}
    />
  );
}

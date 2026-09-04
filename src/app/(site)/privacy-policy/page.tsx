import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={`How ${site.name} collects, uses and protects your information.`}
      blocks={[
        {
          h: "1. Information we collect",
          p: [
            `When you enquire through our website, WhatsApp, phone or email, we collect the details you share — typically your name, mobile number, email address, travel preferences, and information needed to provide visa or travel assistance (such as passport and document details where applicable).`,
          ],
        },
        {
          h: "2. How we use your information",
          list: [
            "To respond to enquiries and provide visa application, documentation and travel assistance.",
            "To prepare quotations, invoices, applications and travel bookings you request.",
            "To keep you informed about the status of your applications and bookings.",
            "To improve our services. We do not sell your personal data to third parties.",
          ],
        },
        {
          h: "3. Sharing with authorities & third parties",
          p: [
            "Documents and information you provide for visa applications are shared only with the relevant government/consular authorities, airlines, hotels or service providers strictly as required for your application or booking.",
            "Government visa fees and embassy/consulate payments are processed directly with the applicable authorities; your documents are never used for any purpose beyond your own travel arrangements.",
          ],
        },
        {
          h: "4. Data retention & security",
          p: [
            "We retain records only as long as needed to serve you and meet legal requirements. Access to customer and lead records is limited to authorised staff. Sensitive documents are stored in protected storage with access controls.",
          ],
        },
        {
          h: "5. Your rights",
          p: [
            `You may request a copy of the data we hold about you, ask us to correct it, or request deletion where applicable, by writing to ${site.email}.`,
          ],
        },
        {
          h: "6. Cookies",
          p: [
            "This website uses essential cookies (for example, for admin login sessions). We do not currently use advertising or third-party tracking cookies.",
          ],
        },
      ]}
    />
  );
}

import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function Page() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro={`Terms for using the services of ${site.name}.`}
      blocks={[
        {
          h: "1. Our role",
          p: [
            `${site.name} ("we", "us") is a travel and visa assistance service provider. We assist with visa applications, travel documentation, flight and hotel arrangements and holiday planning. We are not an embassy, consulate, government authority or visa-issuing agency, and we do not represent one unless expressly stated in writing.`,
          ],
        },
        {
          h: "2. Visa & appointment outcomes",
          p: [
            "Visa approval, visa fee amounts, appointment availability and processing timelines are determined solely by the relevant authorities. We cannot and do not guarantee approvals, appointments or timelines. Where we assist with appointment or expedited-request processes, eligibility and availability always remain with the relevant authority.",
          ],
        },
        {
          h: "3. Fees & payments",
          list: [
            "Our service fees are separate from government visa fees, embassy fees and other third-party charges.",
            "Quotations are valid for the period stated and are subject to travel-date and rate availability.",
            "Payments are to be made through the methods we confirm with you; we will always confirm amounts before you pay.",
          ],
        },
        {
          h: "4. Information you provide",
          p: [
            "You are responsible for providing accurate and genuine information and documents. Incorrect or incomplete details can lead to delays or rejections by the authorities, for which we are not responsible.",
          ],
        },
        {
          h: "5. Bookings & cancellations",
          p: [
            "Flight, hotel and package bookings are subject to the cancellation and refund policies of the airline, hotel or supplier, alongside our own policies (see Refund Policy and Cancellation Policy).",
          ],
        },
        {
          h: "6. Limitation of liability",
          p: [
            "To the maximum extent permitted by law, our liability is limited to the service fees you paid us. We are not liable for decisions, delays or changes made by governments, airlines, hotels or other third parties.",
          ],
        },
        {
          h: "7. Contact",
          p: [`Questions about these terms: ${site.email} or ${site.phoneDisplay}.`],
        },
      ]}
    />
  );
}

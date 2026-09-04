import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Refund Policy" };

export default function Page() {
  return (
    <LegalPage
      title="Refund Policy"
      intro={`Refund terms for service fees paid to ${site.name}.`}
      blocks={[
        {
          h: "1. Service fees",
          p: [
            "Refunds of our service fees are considered as follows:",
          ],
          list: [
            "Before work begins: full refund of service fees, unless a third-party payment (government fee, embassy fee, ticket, etc.) has already been made on your behalf.",
            "After assistance has started but before submission of your application: refund of the unearned portion of service fees at our discretion, less costs already incurred.",
            "After your application is submitted or booked: service fees are not refundable, since the assistance work has been performed.",
          ],
        },
        {
          h: "2. Third-party payments",
          p: [
            "Government visa fees, embassy/consulate fees, airline tickets, hotel bookings and other third-party charges are governed by the refund policies of those authorities and suppliers. We do not control and cannot guarantee their refunds.",
            "Visa fees paid to a government are typically not refunded when an application is refused or withdrawn — this is set by the relevant authority.",
          ],
        },
        {
          h: "3. How to request a refund",
          p: [
            `Write to ${site.email} with your name, enquiry/application number and reason. We respond within 5–7 working days. Approved refunds are processed to the original payment method within 7–10 working days.`,
          ],
        },
      ]}
    />
  );
}

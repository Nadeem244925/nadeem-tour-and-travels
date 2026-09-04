import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Cancellation Policy" };

export default function Page() {
  return (
    <LegalPage
      title="Cancellation Policy"
      intro={`How cancellations are handled for services booked through ${site.name}.`}
      blocks={[
        {
          h: "1. Visa assistance",
          p: [
            "You may cancel visa assistance before your application is submitted and request a refund of unearned service fees (see Refund Policy). Once an application has been submitted, cancellation does not guarantee any refund from the government, whose fee policies are outside our control.",
          ],
        },
        {
          h: "2. Flights",
          p: [
            "Flight cancellations and changes follow the fare rules of the airline and the booking terms at the time of purchase. Low-cost and promotional fares are often non-refundable or carry change fees. We will always tell you the applicable rules before you pay.",
          ],
        },
        {
          h: "3. Hotels",
          p: [
            "Hotel cancellation terms depend on the property and rate type (free-cancellation vs non-refundable). We confirm these terms with you before booking.",
          ],
        },
        {
          h: "4. Holiday packages",
          p: [
            "Package cancellations are governed by the combined rules of the hotels, transport providers and tour components, which we share with you before payment. A cancellation timeline and applicable charges will be confirmed in writing.",
          ],
        },
        {
          h: "5. How to cancel",
          p: [
            `Notify us by WhatsApp or email (${site.email}) with your name and booking/enquiry number. Cancellation charges are calculated from the date we receive your request, subject to the supplier rules above.`,
          ],
        },
      ]}
    />
  );
}

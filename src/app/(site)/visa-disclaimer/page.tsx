import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Visa Disclaimer" };

export default function Page() {
  return (
    <LegalPage
      title="Visa Disclaimer"
      intro="Please read this carefully before engaging our visa assistance services."
      blocks={[
        {
          h: "Important disclaimer",
          p: [
            `${site.name} is a travel and visa assistance service provider. We do not represent any embassy, consulate, government authority or visa-issuing agency unless expressly stated.`,
            "Visa approval, appointment availability and processing timelines are determined solely by the relevant authorities. No travel agent, consultant or agency can guarantee a visa approval, a visa slot or faster processing.",
            "Service fees charged by Nadeem Tour & Travels are separate from government visa fees and other third-party charges.",
          ],
        },
        {
          h: "What we do",
          list: [
            "Explain visa categories, requirements and processes.",
            "Assist with forms (such as the U.S. DS-160), document checklists and application preparation.",
            "Provide appointment-related and interview preparation assistance.",
            "Guide you on officially available expedited-appointment or emergency-appointment processes where they exist.",
          ],
        },
        {
          h: "What we do not do",
          list: [
            "We do not guarantee visa approval or appointment availability.",
            "We do not sell or guarantee appointment slots, and we have no special relationship with any embassy or consulate.",
            "We do not influence or expedite decisions — those rest with the authorities.",
          ],
        },
        {
          h: "Official information",
          p: [
            "Visa rules and appointment wait times change frequently. Always verify current requirements on the official website of the relevant embassy, consulate or immigration authority before travel.",
          ],
        },
      ]}
    />
  );
}

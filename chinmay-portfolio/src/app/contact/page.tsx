// app/contact/page.tsx
import ContactQuick from "../../../components/ContactQuick";

export const metadata = {
  title: "Contact — Chinmay Kunhare",
  description: "Contact Chinmay on Instagram or phone",
};

export default function ContactPage() {
  return (
    <section>
            <ContactQuick
              phone="+919111838314"        
              insta="chinmayx"     
              showWhatsApp={true}
            />
    </section>
  );
}

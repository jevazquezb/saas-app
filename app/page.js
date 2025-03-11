import ButtonLogin from "@/components/button-login";
import PriceBenefitsItem from "@/components/price-benefits-item";
import FAQListItem from "@/components/faq-list-item";
import Image from "next/image";
import productDemo from "./product-demo.jpeg";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log(session);

  const priceBenefits = [
    "Collect customer feedback",
    "Unlimited boards",
    "Admin boards",
    "24/7 support",
  ];

  const faq = [
    { question: "What do I get exactly?", answer: "Loreum Ipseum" },
    { question: "Can I get a refund?", answer: "Loreum Ipseum" },
    { question: "I have another question", answer: "Loreum Ipseum" },
  ];

  return (
    <main>
      {/* HEADER SECTION */}
      <header className="bg-base-200">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-8 py-2">
          <div className="font-bold">Saas JAVB</div>
          <div className="space-x-4 max-md:hidden">
            <a className="link link-hover" href="#pricing">
              Pricing
            </a>
            <a className="link link-hover" href="#faq">
              FAQ
            </a>
          </div>
          <div>
            <ButtonLogin session={session} />
          </div>
        </div>
      </header>
      {/* HERO SECTION */}
      <section className="px-8 py-32 max-w-5xl mx-auto flex flex-col lg:flex-row gap-14 items-center lg:items-start">
        <Image
          src={productDemo}
          alt="Product demo"
          className="w-96 rounded-xl"
        ></Image>
        <div className="text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">
            Collect customer feedback to build better products
          </h1>
          <div className="opacity-90 mb-10">
            Create a feedback board in minutes, prioritize features, and build
            products your customers will love.
          </div>
          <ButtonLogin session={session} />
        </div>
      </section>
      {/* PRICING SECTION */}
      <section id="pricing" className="bg-base-200">
        <div className="max-w-3xl mx-auto py-32 px-8">
          <p className="text-sm uppercase font-medium text-primary mb-4 text-center">
            Pricing
          </p>
          <h1 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
            A pricing that adapts to your needs
          </h1>
          {/* card */}
          <div className="p-8 bg-base-100 max-w-sm rounded-3xl mx-auto space-y-6">
            <div className="flex gap-2 items-baseline">
              <span className="text-4xl font-black">$19</span>
              <span className="uppercase text-sm font-medium opacity-60">
                /month
              </span>
            </div>
            <ul className="space-y-2">
              {priceBenefits.map((benefit) => (
                <PriceBenefitsItem key={benefit}>{benefit}</PriceBenefitsItem>
              ))}
            </ul>
            <ButtonLogin session={session} extraStyles="w-full" />
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section id="faq" className="bg-base-200">
        <div className="max-w-3xl mx-auto py-32 px-8">
          <p className="text-sm uppercase font-medium text-primary mb-4 text-center">
            FAQ
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <ul className="max-w-lg mx-auto">
            {faq.map((qa) => (
              <FAQListItem key={`${qa.question}`} qa={qa} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

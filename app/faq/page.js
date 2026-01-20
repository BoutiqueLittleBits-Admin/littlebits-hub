"use client";
import { useState } from 'react';

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How long until my order ships?",
        a: "Most orders ship within 1-3 business days. Personalized items require up to 10 business days for customization. Some holiday and seasonal items have specific ship dates noted in their listings."
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! Orders over $50 qualify for FREE standard shipping within the US. 🎉"
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship worldwide! International orders typically take 2-4 weeks depending on destination and customs processing. The buyer is responsible for any customs duties or import fees."
      },
      {
        q: "How do I track my order?",
        a: "Once your order ships, you'll receive an email with tracking information. You can use that link to follow your package's journey!"
      },
      {
        q: "Can I request expedited shipping?",
        a: "Expedited shipping requests are handled on a case-by-case basis. Please contact us before placing your order if you need rush delivery, and we'll do our best to accommodate you."
      }
    ]
  },
  {
    category: "Products & Customization",
    questions: [
      {
        q: "Are your products handmade?",
        a: "Our gift bags, kits, and holiday advent collections are hand-curated with intention and thoughtfulness — each one is put together with care to create a meaningful experience. Personalized items are handmade just for you!"
      },
      {
        q: "Do you offer personalized or custom items?",
        a: "Yes! Many of our products offer personalization options, which are noted in the individual listings. For special custom requests beyond what's listed, please contact us and we'll see what we can do!"
      },
      {
        q: "Can I add a gift note to my order?",
        a: "Absolutely! You can add a personalized gift message at checkout. It's perfect for sending gifts directly to loved ones."
      },
      {
        q: "Do you offer gift wrapping?",
        a: "Yes! Gift wrapping is available as an add-on at checkout. Your item will arrive beautifully wrapped and ready to give."
      }
    ]
  },
  {
    category: "Changes & Cancellations",
    questions: [
      {
        q: "Can I change or cancel my order?",
        a: "Non-personalized orders can be changed or cancelled any time before they ship — just contact us ASAP! Personalized and custom orders cannot be cancelled once production begins, as they're made specifically for you."
      },
      {
        q: "What if I entered the wrong shipping address?",
        a: "Contact us immediately! If your order hasn't shipped yet, we can update the address. Once shipped, we cannot change the destination."
      }
    ]
  },
  {
    category: "Returns & Issues",
    questions: [
      {
        q: "What is your return policy?",
        a: "Due to the hand-curated nature of our products, all sales are final. We do not accept returns or exchanges. Please review product descriptions carefully before ordering."
      },
      {
        q: "What if my item arrives damaged?",
        a: "Oh no! Please take photos of the damage (item and packaging) and contact us within 48 hours of delivery. Photos help us file a claim with USPS, and we'll work with you on a resolution."
      },
      {
        q: "What if I received the wrong item?",
        a: "We're so sorry! Contact us right away and we'll send the correct item at no extra cost. You're welcome to keep the wrong item — consider it a little bonus gift! 💝"
      },
      {
        q: "My package says delivered but I don't have it. What do I do?",
        a: "First, check with neighbors and your local post office. If still missing, contact us and we'll file a claim with USPS and work with you on next steps."
      }
    ]
  },
  {
    category: "Payment & Security",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) through our secure Stripe checkout. Apple Pay and Google Pay are also available."
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely! All payments are processed through Stripe, a PCI-compliant payment processor. We never see or store your full credit card information."
      }
    ]
  },
  {
    category: "Business Info",
    questions: [
      {
        q: "Do you have a physical store?",
        a: "We're an online-only boutique! This allows us to offer unique, curated items to customers everywhere. You can find us at local markets and pop-up events too — follow us on social media for announcements!"
      },
      {
        q: "Do you offer wholesale pricing?",
        a: "We don't currently offer wholesale pricing. All items are sold at retail prices through our website."
      },
      {
        q: "How can I contact you?",
        a: "Visit our Contact page to send us a message! We typically respond within 24-48 hours."
      }
    ]
  }
];

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:text-brand-coral transition-colors"
      >
        <span className="font-medium text-brand-sage pr-4">{question}</span>
        <span className="text-2xl text-brand-coral flex-shrink-0">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="pb-4 pr-8">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold text-brand-sage mb-4 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center">
          Got questions? We've got answers! ✨
        </p>
        
        <div className="space-y-8">
          {faqs.map((section, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-brand-mint/10 px-6 py-4">
                <h2 className="text-xl font-semibold text-brand-sage">{section.category}</h2>
              </div>
              <div className="px-6">
                {section.questions.map((item, qIdx) => (
                  <FAQItem key={qIdx} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-brand-coral/10 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-brand-sage mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            We're here to help! Reach out and we'll get back to you within 24-48 hours.
          </p>
          <a 
            href="/contact"
            className="inline-block bg-brand-coral text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-sage transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}

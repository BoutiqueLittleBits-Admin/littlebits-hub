"use client";
import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    
    await fetch('https://formspree.io/f/xykkeqpe', {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    setSubmitted(true);
    form.reset();
  };

  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-5xl font-bold text-brand-sage mb-4 text-center">
          Get in Touch
        </h1>
        <p className="text-xl text-brand-mint mb-12 text-center">
          We would love to hear from you! ✨
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-brand-sage mb-6">Contact Info</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">💌</div>
                <div>
                  <h3 className="font-semibold text-brand-sage">Email Us</h3>
                  <a href="mailto:holleeann@boutiquelittlebits.com" className="text-brand-coral hover:underline">
                    holleeann@boutiquelittlebits.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-3xl">🛒</div>
                <div>
                  <h3 className="font-semibold text-brand-sage">eBay Store</h3>
                  <a href="https://www.ebay.com/usr/littlebitsboutique" target="_blank" rel="noopener noreferrer" className="text-brand-coral hover:underline">
                    ebay.com/usr/littlebitsboutique
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-3xl">🧡</div>
                <div>
                  <h3 className="font-semibold text-brand-sage">Etsy Shop</h3>
                  <a href="https://www.etsy.com/shop/BoutiqueLittleBits" target="_blank" rel="noopener noreferrer" className="text-brand-coral hover:underline">
                    etsy.com/shop/BoutiqueLittleBits
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-brand-mint/20 rounded-2xl">
              <h3 className="font-semibold text-brand-sage mb-2">Response Time</h3>
              <p className="text-gray-600">
                We typically respond within 24-48 hours. For urgent order inquiries, please include your order number.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-brand-sage mb-6">Send a Message</h2>
            
            {submitted ? (
              <div className="bg-brand-mint/20 p-8 rounded-2xl text-center">
                <div className="text-5xl mb-4">💝</div>
                <h3 className="text-2xl font-bold text-brand-sage mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thank you for reaching out. We will get back to you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brand-sage mb-2">Your Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-2 focus:ring-brand-mint/50 outline-none transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-sage mb-2">Your Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-2 focus:ring-brand-mint/50 outline-none transition-all"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-sage mb-2">Subject</label>
                  <select 
                    name="subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-2 focus:ring-brand-mint/50 outline-none transition-all"
                  >
                    <option>General Inquiry</option>
                    <option>Order Question</option>
                    <option>Custom Order Request</option>
                    <option>Wholesale Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-sage mb-2">Message</label>
                  <textarea 
                    name="message" 
                    rows="5" 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-2 focus:ring-brand-mint/50 outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-brand-sage text-white py-4 rounded-full font-bold text-lg hover:bg-brand-coral transition-colors shadow-lg"
                >
                  Send Message ✨
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

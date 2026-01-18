"use client";
import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.target;
    const data = new FormData(form);
    
    try {
      await fetch('https://formspree.io/f/xykkeqpe', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      setSubmitted(true);
    } catch (error) {
      alert('Oops! Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <section className="max-w-2xl mx-auto py-20 px-6">
        <h1 className="text-5xl font-bold text-brand-sage mb-4 text-center">
          Get in Touch
        </h1>
        <p className="text-xl text-brand-mint mb-12 text-center">
          Questions, custom orders, or just want to say hi? We would love to hear from you!
        </p>

        {submitted ? (
          <div className="bg-brand-mint/20 border border-brand-mint rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">💌</div>
            <h2 className="text-2xl font-bold text-brand-sage mb-2">Message Sent!</h2>
            <p className="text-brand-sage">We will get back to you soon with lots of joy.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-2 focus:ring-brand-mint/50 outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-2 focus:ring-brand-mint/50 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea 
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-2 focus:ring-brand-mint/50 outline-none transition-all resize-none"
                  placeholder="What is on your mind?"
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-brand-coral text-white py-4 rounded-full font-bold text-lg hover:bg-brand-sage transition-all shadow-lg disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message 💝'}
              </button>
            </form>
          </div>
        )}

        <div className="mt-12 text-center text-gray-500">
          <p>Or email us directly at</p>
          <a href="mailto:hello@boutiquelittlebits.com" className="text-brand-sage font-medium hover:text-brand-coral transition-colors">
            hello@boutiquelittlebits.com
          </a>
        </div>
      </section>
    </div>
  );
}

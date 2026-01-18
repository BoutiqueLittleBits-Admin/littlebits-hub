"use client";
import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <section className="max-w-2xl mx-auto py-20 px-6">
        <h1 className="text-5xl font-bold text-emerald-700 mb-4 text-center">
          Get in Touch
        </h1>
        <p className="text-xl text-emerald-600 mb-12 text-center">
          Questions, custom orders, or just want to say hi? We'd love to hear from you!
        </p>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">💌</div>
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Message Sent!</h2>
            <p className="text-emerald-600">We'll get back to you soon with lots of joy.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea 
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none"
                  placeholder="What's on your mind?"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-rose-500 text-white py-4 rounded-full font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg"
              >
                Send Message 💝
              </button>
            </form>
          </div>
        )}

        <div className="mt-12 text-center text-gray-500">
          <p>Or email us directly at</p>
          <a href="mailto:hello@boutiquelittlebits.com" className="text-emerald-600 font-medium hover:text-rose-500 transition-colors">
            hello@boutiquelittlebits.com
          </a>
        </div>
      </section>
    </div>
  );
}

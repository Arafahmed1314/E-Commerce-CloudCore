import React from "react";

export default function Newsletter() {
  return (
    <section className="py-16 md:py-24 bg-[#0c4a6e] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-display font-medium mb-4">
            Stay Updated
          </h2>
          <p className="text-[#bae6fd] mb-8">
            Subscribe to our newsletter to receive updates on new products,
            exclusive offers, and more.
          </p>

          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow bg-white rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
              required
            />
            <button
              type="submit"
              className="btn bg-white text-[#0c4a6e] rounded-lg hover:bg-gray-100 px-6 py-3"
            >
              Subscribe
            </button>
          </form>

          <p className="text-xs text-[#7dd3fc] mt-4">
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <div className="text-8xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold text-brand-sage mb-4">Thank You!</h1>
        <p className="text-xl text-brand-mint mb-8">
          Your order has been placed successfully. We are preparing your joyful goodies!
        </p>
        <p className="text-gray-500 mb-8">
          A confirmation email will be sent shortly.
        </p>
        <a 
          href="/shop"
          className="inline-block bg-brand-coral text-white px-8 py-3 rounded-full font-bold hover:bg-brand-sage transition-all"
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
}

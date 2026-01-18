export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl font-bold text-brand-sage mb-4">Page Not Found</h1>
        <p className="text-xl text-brand-mint mb-8">
          Oops! This page seems to have wandered off.
        </p>
        <a 
          href="/"
          className="inline-block bg-brand-coral text-white px-8 py-3 rounded-full font-bold hover:bg-brand-sage transition-all"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

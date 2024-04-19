export default function Card({ children = null, className = "p-5" } = {}) {
  return (
    <section className={`w-full bg-white rounded ${className}`}>
      {children}
    </section>
  );
}

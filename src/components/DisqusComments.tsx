export function DisqusComments() {
  return (
    <section
      className="p-6 rounded-2xl bg-white text-neutral-900 border border-neutral-200"
      style={{ colorScheme: 'light' }}
    >
      <p className="text-sm text-neutral-600 mb-4">
        Tried the dashboard? Tell us what worked for you and what didn't.
      </p>
      <iframe
        src="/disqus-test.html"
        title="Comments"
        className="w-full rounded-lg"
        style={{ height: '700px', border: 'none' }}
      />
    </section>
  );
}

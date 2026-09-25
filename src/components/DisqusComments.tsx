import { useEffect } from 'react';

const DISQUS_SHORTNAME = 'jojo-cpi';
const PAGE_URL = 'https://mgmt6110-week02-aais-build-with-gem-brown.vercel.app';
const PAGE_IDENTIFIER = 'home';

declare global {
  interface Window {
    DISQUS?: unknown;
    disqus_config?: () => void;
  }
}

let disqusLoaded = false;

export function DisqusComments() {
  useEffect(() => {
    if (disqusLoaded || window.DISQUS || document.getElementById('dsq-embed-scr')) return;
    disqusLoaded = true;

    window.disqus_config = function (this: any) {
      this.page.url = PAGE_URL;
      this.page.identifier = PAGE_IDENTIFIER;
    };

    const s = document.createElement('script');
    s.id = 'dsq-embed-scr';
    s.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`;
    s.setAttribute('data-timestamp', String(+new Date()));
    (document.head || document.body).appendChild(s);
  }, []);

  return (
    <section
      className="p-6 rounded-2xl bg-white text-neutral-900 border border-neutral-200"
      style={{ colorScheme: 'light' }}
    >
      <p className="text-sm text-neutral-600 mb-4">
        Tried the dashboard? Tell us what worked for you and what didn't.
      </p>
      <div id="disqus_thread" />
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </section>
  );
}

(function () {
  // Public form address only. Never put an account password or API key here.
  const endpoint = 'https://formspree.io/f/xzednooa';
  const configured = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint);

  async function save(request, send = fetch, timeoutMs = 10000) {
    if (!configured) return { status: 'disabled' };
    if (typeof request !== 'string' || !request.trim() || request.trim().length > 600) return { status: 'invalid' };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await send(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        signal: controller.signal,
        body: JSON.stringify({ request: request.trim() })
      });
      if (!response.ok) return { status: 'unconfirmed' };
      const result = await response.json();
      return { status: result.ok === true ? 'saved' : 'unconfirmed' };
    } catch {
      // No automatic retry: the server may have saved it before the connection failed.
      return { status: 'unconfirmed' };
    } finally {
      clearTimeout(timeout);
    }
  }
  window.PrayerInbox = Object.freeze({ configured, save });
})();

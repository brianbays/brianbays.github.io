# brianbays.com domain configuration

Connected September 20, 2026. Registrar and DNS provider: Porkbun. Website hosting: GitHub Pages, repository `brianbays/brianbays.github.io`. Canonical domain: `brianbays.com`.

GitHub account Settings → Pages shows domain ownership as **Verified**. Keep the `_github-pages-challenge-brianbays` TXT record at Porkbun to retain ownership verification. Its value is available in the DNS editor.

Repository Settings → Pages has `brianbays.com` saved as the custom domain. For this GitHub Actions deployment, that setting controls the domain; a CNAME file is not required.

Saved website DNS records (TTL 600 seconds):

| Type | Host | Value |
| --- | --- | --- |
| ALIAS | root / blank | brianbays.github.io |
| CNAME | www | brianbays.github.io |

Porkbun flattens the root ALIAS to GitHub's address records. This is an alternative to maintaining four A records manually. The original root parking destination was replaced, and the parking wildcard was changed to the explicit `www` record. Existing `_acme-challenge` TXT records were preserved. No email hosting is in use.

GitHub manages the HTTPS certificate. Keep **Enforce HTTPS** enabled in repository Pages settings once certificate provisioning is complete. After any future DNS change, verify both `https://brianbays.com` and `https://www.brianbays.com`, navigation, the PDF, and video links. GitHub redirects the alternate hostname to the selected custom domain.

PowerShell checks:

```powershell
Resolve-DnsName brianbays.com -Type A
Resolve-DnsName www.brianbays.com -Type CNAME
```

If HTTPS remains unavailable, check for conflicting A/AAAA records or restrictive CAA records using GitHub's troubleshooting documentation. Don't disable browser security warnings.

Official references (checked September 20, 2026):
- [Manage a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Verify domain ownership](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [HTTPS setup](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

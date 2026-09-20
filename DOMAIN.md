# Connect brianbays.com after purchase

The domain is not yet registered by Brian. These are instructions, not completed DNS changes. The initial site can use https://brianbays.github.io.

1. Purchase brianbays.com through your chosen registrar. Domain registration is separate from GitHub hosting.
2. Verify domain ownership in your GitHub account's Settings → Pages → Add a domain. Enter brianbays.com. GitHub will supply a TXT record name and value. Add that exact TXT record at the registrar, return to GitHub, and verify. Keep the TXT record.
3. In the website repository, Settings → Pages → Custom domain, enter `brianbays.com` and save. For this GitHub Actions deployment, the repository setting controls the domain; a CNAME file is not required.
4. At your registrar's DNS editor, set these records:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | brianbays.github.io |

Use the registrar's default TTL. Replace conflicting web/parking records for @ and www. Preserve unrelated email (MX), verification (TXT), and other service records. Avoid wildcard records. Some registrars use a blank host rather than @.

5. Allow DNS propagation, potentially up to 24 hours. GitHub will provision a certificate. Once available, enable **Enforce HTTPS** in Pages settings.
6. Check both `https://brianbays.com` and `https://www.brianbays.com`, navigation, the PDF, and the video links. With both DNS names configured, GitHub redirects the alternate hostname to the selected custom domain.

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

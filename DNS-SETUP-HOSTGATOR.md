# DNS Configuration for assampackersandmovers.com

## ⚠️ IMPORTANT: Add Domain in Netlify First!

Before configuring DNS, you MUST add the domain in Netlify Dashboard:
**https://app.netlify.com/projects/assamshipping/configuration/domains**

---

## Option 1: Use Netlify Nameservers (Recommended - Easiest)

1. **Add domain in Netlify** (link above)
2. **Get Netlify nameservers** from the domain configuration page
3. **In HostGator DNS panel**, update nameservers:
   - Replace all 4 current nameservers with Netlify's provided nameservers
   - Typical Netlify nameservers look like:
     - `dns1.p01.nsone.net`
     - `dns2.p01.nsone.net`
     - `dns3.p01.nsone.net`
     - `dns4.p01.nsone.net`
   - **Wait 24-48 hours** for propagation

### Advantages:
- ✅ Netlify manages all DNS records automatically
- ✅ SSL certificate auto-provisions faster
- ✅ No manual DNS record management needed

---

## Option 2: Keep HostGator Nameservers (Manual DNS Records)

If you want to keep HostGator nameservers, add these DNS records:

### Record 1: Root Domain (A Record)
```
Type: A
Name: @ (or leave blank/empty)
Value: 75.2.60.5
TTL: 3600 (or default)
```

### Record 2: WWW Subdomain (CNAME Record)
```
Type: CNAME
Name: www
Value: assamshipping.netlify.app
TTL: 3600 (or default)
```

### Important Notes:
- After adding domain in Netlify, you may get a **different IP address** - use the one Netlify provides!
- Netlify's load balancer IP can change, but they'll notify you
- Always use the IP provided by Netlify in the domain configuration page

---

## Verification Steps

1. **Add domain in Netlify dashboard**
2. **Wait for DNS check** - Netlify will verify DNS records
3. **Check DNS propagation:**
   - Visit: https://dnschecker.org/
   - Check both `assampackersandmovers.com` and `www.assampackersandmovers.com`
   - Look for green checkmarks globally
4. **SSL Certificate:**
   - Netlify automatically provisions SSL after DNS verification
   - This usually takes 1-2 hours after DNS is verified
   - You'll see "SSL certificate issued" in the domain settings

---

## Current Netlify Site Info

- **Site Name:** assamshipping
- **Netlify URL:** https://assamshipping.netlify.app
- **Site ID:** 07ba8a16-7268-49b5-a823-663af3bccc98
- **Team:** ASSAM PACKER SAND MOVERS

---

## Troubleshooting

### DNS not propagating?
- Wait 24-48 hours (normal propagation time)
- Check TTL values - lower TTL (300-600) speeds up changes
- Verify records are entered correctly (no typos)
- Clear DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

### SSL certificate not issuing?
- Ensure DNS records are correct and propagated
- Check Netlify domain settings for any error messages
- Wait up to 24 hours for automatic SSL provisioning
- Contact Netlify support if issues persist beyond 48 hours

---

## Need Help?

- **Netlify Dashboard:** https://app.netlify.com/projects/assamshipping
- **Netlify Docs:** https://docs.netlify.com/domains-https/custom-domains/
- **Netlify Support:** https://app.netlify.com/support



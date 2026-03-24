# Google Ranking & SEO – Step-by-Step Guide  
## For Decerto Supports (Disability Services, Australia)

**Purpose:** Improve your website’s visibility in Google search (organic ranking) so more people find you when they search for disability support, Perth, WA, etc.  
**Audience:** Website owner and developer.  
**Last updated:** March 2025  

**Placeholders:** Replace `yourdomain.com` in `public/sitemap.xml`, `public/robots.txt`, and `index.html` (canonical link and Organisation schema `url`) with your live domain. Update the `telephone` in the Organisation schema in `index.html` if your number is different.

---

## Table of contents

1. [How Google Ranks Websites](#1-how-google-ranks-websites)
2. [On-Page SEO (Title, Meta, Content)](#2-on-page-seo-title-meta-content)
3. [Technical SEO (Speed, Mobile, Sitemap)](#3-technical-seo-speed-mobile-sitemap)
4. [Local SEO & Google Business Profile](#4-local-seo--google-business-profile)
5. [Content Strategy for Rankings](#5-content-strategy-for-rankings)
6. [Structured Data (Schema)](#6-structured-data-schema)
7. [Google Search Console & Analytics](#7-google-search-console--analytics)
8. [Off-Page SEO (Links & Trust)](#8-off-page-seo-links--trust)
9. [Decerto Supports – Action Checklist](#9-decerto-supports--action-checklist)
10. [Ongoing Maintenance](#10-ongoing-maintenance)

**→ [What to do outside your code (no deployment)](#what-to-do-outside-your-code-no-deployment)** (checklist with no code/deploy steps)

---

## What to do outside your code (no deployment)

These steps are done in Google’s tools, other websites, or in the real world. **No code changes or redeploy needed** for the actions below (your site must already be live with sitemap/canonical in place).

| # | What to do | Where | Why |
|---|------------|--------|-----|
| 1 | **Add your site in Google Search Console** | [search.google.com/search-console](https://search.google.com/search-console) | So you can see how Google crawls and indexes your site. |
| 2 | **Verify ownership** (HTML file, meta tag, or DNS) | Same place, after adding property | Proves you own the site; required to use GSC. |
| 3 | **Submit your sitemap** | GSC → Sitemaps → add `https://yourdomain.com/sitemap.xml` | Tells Google which URLs to crawl. |
| 4 | **Request indexing** (optional, for key URLs) | GSC → URL Inspection → enter URL → Request indexing | Asks Google to crawl that URL sooner. |
| 5 | **Create and verify Google Business Profile** | [business.google.com](https://business.google.com) | Needed for local search (“disability support Perth”, “near me”). |
| 6 | **Complete Business Profile** (description, services, photos, hours, NAP) | Same place | Better local ranking and trust. |
| 7 | **Create Google Analytics 4 property** (optional) | [analytics.google.com](https://analytics.google.com) | See traffic and behaviour; you still need to add the script in code once. |
| 8 | **Link GA4 to Search Console** | GA4 → Admin → Product links → Search Console | See search queries and landing pages in GA4. |
| 9 | **Encourage Google reviews** (with consent) | Ask clients to leave a review on your Business Profile | Builds trust and can help local ranking. |
| 10 | **List your site in directories** (disability, local business, care) | Each directory’s website | Builds backlinks and citations; use the same NAP everywhere. |
| 11 | **Check GSC regularly** (coverage, performance, errors) | Search Console | Fix indexing issues and see what’s working. |
| 12 | **Remove site from Google later (if you want)** | GSC → Removals; or add `noindex` in code and redeploy | Lets you “get out of Google” when you choose. |

**Summary:** After deployment, the main things **outside your code** are: **Search Console** (add property, verify, submit sitemap), **Google Business Profile** (create, verify, complete), optional **Analytics** setup and link to GSC, **reviews** and **directory listings**, and **ongoing checks** in GSC.

---

## 1. How Google Ranks Websites

Google uses many signals. The main ones you can control:

| Signal | What it means | Where you act |
|--------|----------------|----------------|
| **Relevance** | Does your page match the search query? | Titles, headings, body text, keywords. |
| **Quality** | Is content helpful, original, and trustworthy? | Content depth, clarity, expertise. |
| **User experience** | Is the site fast, mobile-friendly, easy to use? | Speed, responsive design, Core Web Vitals. |
| **Technical** | Can Google crawl and index your pages? | Sitemap, robots.txt, correct URLs. |
| **Local** | For “near me” and local queries. | Google Business Profile, NAP, local content. |
| **Authority** | Do other sites link to you? | Backlinks, mentions, citations. |

**Goal:** Make your site relevant, technically sound, and trustworthy so Google can rank it highly for terms like “disability support Perth”, “disability services WA”, “Decerto Supports”, etc.

---

## 2. On-Page SEO (Title, Meta, Content)

### 2.1 Page title (`<title>`)

- **What:** The blue clickable line in Google results.
- **Best practice:** Primary keyword + brand + (optional) location. 50–60 characters.
- **Current (homepage):** “Decerto Supports – Disability Services Provider” ✅
- **Improvement:** Add location for local searches, e.g.  
  **“Decerto Supports – Disability Services Provider | Perth & WA”**

**Action:** Update `index.html` (and, if you add per-page titles later, each page’s title).

### 2.2 Meta description

- **What:** The short text under the title in search results. Doesn’t directly affect ranking but affects click-through rate (CTR).
- **Best practice:** 150–160 characters, include main keyword and a clear call to action.
- **Example:**  
  “Person-centred disability support in Perth & WA. Personal care, community participation & support coordination. Built on lived experience. Get in touch.”

**Action:** Set one strong meta description in `index.html`; if you have separate URLs per section (Services, Careers, Contact), add unique meta descriptions for each.

### 2.3 Headings (H1, H2, H3)

- **H1:** One per page; main topic (e.g. “Disability support built on trust and dignity”).
- **H2/H3:** Structure the page; use natural keywords (e.g. “Our services”, “Why choose us”, “Contact Decerto Supports”).
- **Rule:** Don’t stuff keywords; keep headings clear and useful for readers.

**Action:** In your app, ensure each “page” (Home, Services, Careers, Contact) has one clear H1 and logical H2/H3. Check in browser DevTools or “View source” / inspect content.

### 2.4 Body content and keywords

- **Target phrases** (examples):  
  - “disability support Perth”, “disability services WA”, “disability support worker Perth”, “person-centred support”, “support coordination”, “community participation”, “Decerto Supports”.
- **Where:** In headings, first paragraph, and naturally in body text. Avoid repeating the same phrase too often.
- **Length:** Homepage 300–600+ words; Services/Careers/Contact each 200–400+ words of unique text. More quality content often helps.

**Action:** Review each section in your app; add or adjust text so target keywords appear naturally and the content clearly explains your services and area.

### 2.5 URLs

- **Ideal:** Short, readable URLs with keywords, e.g. `/services`, `/careers`, `/contact`.
- **Your setup:** Single-page app (SPA) with client-side routing. If your URLs are like `yoursite.com/#services` or `yoursite.com/services` (History API), ensure the main URL is in the sitemap and that key content is reachable and crawlable (see Technical SEO).

**Action:** Prefer real paths (e.g. `/services`) over hash-only (`#services`) so Google can index each section. If you use hash routes, consider switching to History API and adding those URLs to the sitemap.

---

## 3. Technical SEO (Speed, Mobile, Sitemap)

### 3.1 Site speed (Core Web Vitals)

Google uses:

- **LCP (Largest Contentful Paint):** Load time of the main content. Aim &lt; 2.5 s.
- **FID / INP (Interactivity):** How quickly the page responds. Aim &lt; 100 ms.
- **CLS (Cumulative Layout Shift):** Visual stability. Aim &lt; 0.1.

**Actions:**

1. **Images:** Use modern formats (e.g. WebP), compress, and use appropriate width/height so layout doesn’t shift.
2. **Fonts:** You use `preconnect` for Google Fonts ✅; keep only the weights you need.
3. **JavaScript:** Your app is Vite/React; keep bundles small (code-split if the app grows).
4. **Hosting:** Use a fast host (e.g. Vercel, Netlify) and a CDN.
5. **Measure:** Use [PageSpeed Insights](https://pagespeed.web.dev/) and fix “Opportunities” and “Diagnostics”.

### 3.2 Mobile-friendly

- Your site is responsive ✅.
- **Check:** [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly). Ensure text is readable without zoom and tap targets are large enough.

### 3.3 Sitemap (`sitemap.xml`)

A sitemap lists your important URLs so Google can discover and crawl them.

**For a single main URL (e.g. one-page site):**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://YOUR-DOMAIN.com/</loc>
    <lastmod>2025-03-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**If you have real paths** (e.g. `/services`, `/careers`, `/contact`), add one `<url>` per path with the full URL, lastmod, and priority (e.g. 0.9 for Services, 0.8 for Careers/Contact).

**Action:**

1. Replace `YOUR-DOMAIN.com` with your live domain.
2. Save as `public/sitemap.xml` (so it’s served at `https://yourdomain.com/sitemap.xml`).
3. Submit the sitemap in Google Search Console (see Section 7).

### 3.4 Robots.txt

Tells crawlers which paths they can or cannot crawl.

**Example (allow all, point to sitemap):**

```text
User-agent: *
Allow: /

Sitemap: https://YOUR-DOMAIN.com/sitemap.xml
```

**Action:** Create `public/robots.txt` with the above (replace `YOUR-DOMAIN.com`). Ensure it’s reachable at `https://yourdomain.com/robots.txt`.

### 3.5 Canonical URL

- **What:** Tells Google which URL is the “main” one for this content (avoids duplicate-content issues).
- **Action:** In `index.html` `<head>`, add:  
  `<link rel="canonical" href="https://YOUR-DOMAIN.com/" />`  
  (Use your real domain and the URL you want to rank.)

### 3.6 HTTPS

- **Required** for trust and SEO. Ensure your live site is served over HTTPS (Vercel/hosts usually provide this).

---

## 4. Local SEO & Google Business Profile

For “disability support Perth”, “disability services near me”, and “Decerto Supports”, local SEO is critical.

### 4.1 Create or claim Google Business Profile

1. Go to [Google Business Profile](https://business.google.com) and sign in.
2. **Add your business** (or claim existing listing): business name, category, address (or service area if you don’t show an address).
3. **Category:** e.g. “Disability services and support organisation” or “Social services organisation”. Choose the closest match.
4. **Service area:** Add Perth, WA (and other areas you serve).
5. **Contact:** Phone, website URL (your live site).
6. **Verify:** By postcard, phone, or email as Google offers. Complete verification.

### 4.2 Complete and optimise the profile

- **Name:** Decerto Supports (exact business name).
- **Description:** 2–3 sentences with keywords: disability support, Perth, WA, person-centred, personal care, community participation, support coordination.
- **Services:** Add your main services (e.g. Personal care, Community participation, Support coordination).
- **Photos:** Logo, team (if appropriate), office or outreach images. Add regularly.
- **Hours:** If applicable; otherwise “By appointment” or similar.
- **Attributes:** Add any that apply (e.g. “Wheelchair accessible” if true).
- **Posts:** Short updates (e.g. “New blog: Understanding your support plan”) with a link to your site. Post regularly.

### 4.3 NAP consistency (Name, Address, Phone)

- Use the **exact same** business name, address (or “Service area: Perth, WA”), and phone number on:
  - Your website (e.g. footer, contact page),
  - Google Business Profile,
  - Any directories or social profiles.
- Inconsistency can hurt local ranking.

### 4.4 Local keywords on the website

- Use “Perth”, “Western Australia”, “WA” in titles, meta description, and body (e.g. “Disability support in Perth and across WA”).
- Consider a short “Areas we serve” or “Location” section listing suburbs/regions.

---

## 5. Content Strategy for Rankings

### 5.1 What to create

- **Service pages:** One clear section or page per main service (you already have Services; ensure each service has a good chunk of unique text).
- **Blog / resources:** Articles that answer common questions, e.g.:
  - “How to choose a disability support provider in Perth”
  - “What is person-centred support?”
  - “Understanding your support plan”
- **FAQ:** A short FAQ on the site (or on Contact) with questions people search for. Use clear headings (H2/H3) and natural language.

### 5.2 Keywords in content

- **Primary:** disability support Perth, disability services WA, Decerto Supports.
- **Secondary:** support coordination, community participation, personal care, disability support worker, lived experience.
- Use them in titles, first paragraph, and subheadings; keep the tone natural.

### 5.3 Freshness

- Updating the site (new blog posts, service updates, news) can help. Add a “Last updated” or publish date where it makes sense.

---

## 6. Structured Data (Schema)

Schema helps Google understand your business and can enable rich results (e.g. organisation info, local business).

### 6.1 Organisation (recommended)

Add JSON-LD in your main HTML (e.g. in `index.html` before `</head>` or inject from the app):

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Decerto Supports",
  "url": "https://YOUR-DOMAIN.com",
  "description": "Person-centred disability support in Perth and WA. Personal care, community participation, support coordination.",
  "areaServed": { "@type": "State", "name": "Western Australia" },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+61-4XX-XXX-XXX",
    "contactType": "customer service",
    "email": "hello@decertosupports.com.au",
    "areaServed": "AU"
  }
}
```

Replace placeholders with real data. This can show in search with contact info.

### 6.2 LocalBusiness (if you have a physical location)

If you show an address, you can use `LocalBusiness` with address, opening hours, etc. If you’re service-area only, `Organization` + `areaServed` is enough.

### 6.3 Validate

- Use [Google’s Rich Results Test](https://search.google.com/test/rich-results) or [Schema Markup Validator](https://validator.schema.org/) to check for errors.

---

## 7. Google Search Console & Analytics

### 7.1 Google Search Console (GSC)

**Purpose:** See how Google crawls and indexes your site and how it performs in search.

**Steps:**

1. Go to [Search Console](https://search.google.com/search-console).
2. **Add property:** Choose “URL prefix” and enter `https://yourdomain.com`.
3. **Verify ownership:**  
   - **HTML file:** Download the file Google gives you, put it in `public/`, deploy, then click Verify.  
   - **HTML tag:** Add the meta tag to `index.html` `<head>`, deploy, then Verify.  
   - **DNS:** Add the TXT record Google provides at your domain registrar, then Verify.
4. **Submit sitemap:** In GSC → Sitemaps → add `https://yourdomain.com/sitemap.xml` → Submit.
5. **Monitor:** Check “Performance” (queries, pages, CTR, position) and “Coverage” (indexed pages, errors). Fix any critical errors.

### 7.2 Google Analytics 4 (GA4)

**Purpose:** Understand traffic, behaviour, and conversions (e.g. contact page visits).

**Steps:**

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com).
2. Get the **Measurement ID** (e.g. `G-XXXXXXXXXX`) and the gtag script.
3. Add the script to your site (e.g. in `index.html` `<head>` or via Google Tag Manager).
4. Set up **events** if needed (e.g. “Contact form submit”).
5. Link GA4 to Search Console (in GA4: Admin → Product links → Search Console links).

Use GA4 to see which channels (Organic, Facebook, etc.) bring traffic and how users behave (pages per session, bounce rate, contact page visits).

---

## 8. Off-Page SEO (Links & Trust)

### 8.1 Backlinks

- **What:** Other websites linking to yours. Quality and relevance matter more than quantity.
- **Ways to get links:**  
  - Listings in trusted directories (disability, care, local business).  
  - Partner or provider listings (e.g. if you’re listed on government or sector sites).  
  - Local news or community sites (e.g. “New disability support provider in Perth”).  
  - Guest posts or quotes on relevant blogs (with a link back).  
- **Don’t:** Buy links or use link farms; that can lead to penalties.

### 8.2 Reviews and mentions

- Encourage satisfied clients (where appropriate and with consent) to leave a **Google review** on your Business Profile. Positive reviews support local ranking and trust.
- Mentions of “Decerto Supports” with location (e.g. in articles or directories) help reinforce relevance.

---

## 9. Decerto Supports – Action Checklist

Use this as a step-by-step list. Replace `YOUR-DOMAIN.com` with your real domain.

### Phase 1 – Foundation (do first)

| # | Task | Where / How |
|---|------|-------------|
| 1 | Refine `<title>` (add Perth/WA if desired) | `index.html` |
| 2 | Refine meta description (150–160 chars, CTA) | `index.html` |
| 3 | Add canonical link | `index.html`: `<link rel="canonical" href="https://YOUR-DOMAIN.com/" />` |
| 4 | Create `public/sitemap.xml` | See Section 3.3; add your domain and any paths |
| 5 | Create `public/robots.txt` | See Section 3.4; add sitemap URL |
| 6 | Add Organisation JSON-LD | `index.html` or app; see Section 6.1 |
| 7 | Check one H1 per “page” and logical H2/H3 | In your app (Home, Services, Careers, Contact) |
| 8 | Add local keywords (Perth, WA) in key text | Throughout content |

### Phase 2 – Technical & verification

| # | Task | Where / How |
|---|------|-------------|
| 9 | Run PageSpeed Insights; fix major issues | [pagespeed.web.dev](https://pagespeed.web.dev/) |
| 10 | Run Mobile-Friendly Test; fix issues | [search.google.com/test/mobile-friendly](https://search.google.com/test/mobile-friendly) |
| 11 | Ensure live site uses HTTPS | Hosting (e.g. Vercel) |
| 12 | Add Google Search Console property; verify | [search.google.com/search-console](https://search.google.com/search-console) |
| 13 | Submit sitemap in GSC | GSC → Sitemaps |
| 14 | Add GA4 and link to GSC | analytics.google.com; link in GA4 Admin |

### Phase 3 – Local & content

| # | Task | Where / How |
|---|------|-------------|
| 15 | Create or claim and verify Google Business Profile | business.google.com |
| 16 | Complete profile (description, services, photos, NAP) | Google Business Profile |
| 17 | Ensure NAP on website matches GBP exactly | Footer, Contact page |
| 18 | Plan 2–3 blog or resource articles with target keywords | Content plan; add to site when ready |
| 19 | Optional: Add FAQ section with schema | Contact or dedicated FAQ; validate with Rich Results Test |

### Phase 4 – Ongoing

| # | Task | Where / How |
|---|------|-------------|
| 20 | Check GSC weekly (coverage, performance); fix errors | Search Console |
| 21 | Publish and share new content periodically | Blog/resources |
| 22 | Encourage Google reviews (where appropriate) | Google Business Profile |
| 23 | Build quality backlinks (directories, partners, local) | Outreach, listings |

---

## 10. Ongoing Maintenance

- **Weekly:** Glance at GSC (errors, top queries, CTR).
- **Monthly:** Review GA4 (traffic, behaviour, conversions); plan one piece of new or updated content.
- **Quarterly:** Re-run PageSpeed and Mobile-Friendly tests; update sitemap lastmod; review and update meta descriptions and key pages.
- **When you change structure:** Update sitemap and robots.txt if you add or remove important URLs.

---

**Related docs:**  
- [FACEBOOK_ADS_STEP_BY_STEP.md](./FACEBOOK_ADS_STEP_BY_STEP.md) – Paid reach via Facebook/Instagram.  
- [VENDOR_DELIVERABLES_AND_SCOPE.md](./VENDOR_DELIVERABLES_AND_SCOPE.md) – Project scope and deliverables.

# Facebook Ads – Step-by-Step Guide  
## For Decerto Supports (Disability Services, Australia)

**Purpose:** Run paid Facebook (and Instagram) ads to advertise your **website to the public** — driving traffic, enquiries, and awareness. The audience for these ads should be **public** (broad), not restricted.  
**Audience:** Website owner or marketing lead.  
**Last updated:** March 2025  

---

## Table of contents

1. [Prerequisites](#1-prerequisites)
2. [Meta Business Suite & Ads Manager](#2-meta-business-suite--ads-manager)
3. [Facebook Pixel & Website Connection](#3-facebook-pixel--website-connection)
4. [Creating Your First Ad Campaign](#4-creating-your-first-ad-campaign)
5. [Targeting (Who Sees Your Ads)](#5-targeting-who-sees-your-ads)
6. [Ad Creative (Images, Video, Text)](#6-ad-creative-images-video-text)
7. [Budget, Schedule & Bidding](#7-budget-schedule--bidding)
8. [Tracking & Measuring Results](#8-tracking--measuring-results)
9. [Compliance & Best Practices](#9-compliance--best-practices)
10. [Checklist & Next Steps](#10-checklist--next-steps)

---

## 1. Prerequisites

Before you can run Facebook ads, you need:

| Step | What you need | Why |
|------|----------------|-----|
| 1.1 | **Facebook account** (personal) | Required to use Meta’s ad tools. |
| 1.2 | **Facebook Page** for Decerto Supports | Ads run from a Page; create one at [facebook.com/pages/create](https://www.facebook.com/pages/create). |
| 1.3 | **Meta Business Account** (optional but recommended) | Central place for Pages, ad accounts, and team access. Create at [business.facebook.com](https://business.facebook.com). |
| 1.4 | **Ad account** | Created inside Meta Business Suite or automatically when you first create an ad. |
| 1.5 | **Payment method** | Credit/debit card or PayPal added in Ads Manager → Billing. |

**For “highest” impact:** Use a **Meta Business Account**, attach your Decerto Supports Page and one **Ad account**, and (later) connect your **website domain** and **Facebook Pixel**.

---

## 2. Meta Business Suite & Ads Manager

### 2.1 Create or open Meta Business Suite

1. Go to [business.facebook.com](https://business.facebook.com) and log in with your Facebook account.
2. If you don’t have a Business Account:
   - Click **Create account** and follow the steps.
   - Enter business name (e.g. **Decerto Supports**), your name, and business email.
3. If you already have one, select your business and go to the **Business Suite** home.

### 2.2 Add your Facebook Page

1. In Business Suite, go to **Settings** (gear icon) → **Accounts** → **Pages**.
2. Click **Add** → **Add a Page**.
3. Choose **Create a new Facebook Page** or **Connect an existing Page**.
4. Complete the Page setup (profile picture, cover, short description, location if applicable).

### 2.3 Create or confirm your Ad account

1. Go to **Settings** → **Accounts** → **Ad accounts**.
2. Click **Add** → **Create a new ad account**.
3. Name it (e.g. **Decerto Supports – Main**).
4. Select **Time zone** (e.g. **Australia – Perth (GMT+8)**) and **Currency** (**AUD**).
5. Finish; the new ad account will appear under **Ad accounts**.

### 2.4 Open Ads Manager

- From Business Suite: **All tools** → **Ads Manager**,  
  or go directly to [facebook.com/adsmanager](https://www.facebook.com/adsmanager).

You’ll use **Ads Manager** for creating campaigns, ad sets, and ads.

---

## 3. Facebook Pixel & Website Connection

The **Facebook Pixel** is a piece of code on your website that lets Meta track visits, clicks, and (optionally) conversions. This is required for effective Facebook ads and better targeting.

### 3.1 Create a Pixel

1. In **Ads Manager**, open the **menu** (☰) → **All tools** → **Events Manager**.
2. Under **Data sources**, click **Add new data source** → **Web** → **Get started**.
3. Choose **Meta Pixel** → **Connect**.
4. Name the Pixel (e.g. **Decerto Supports Website**).
5. Enter your **website URL** (e.g. `https://your-decerto-domain.com`).
6. Click **Continue**.

### 3.2 Install the Pixel on your website

Meta will show you a **base Pixel code** (a script with a unique ID).

**Option A – You have a developer:**  
Send the developer:
- Your **Pixel ID** (from Events Manager → your Pixel → Settings).
- Request: “Add the Meta (Facebook) Pixel base code to the `<head>` of every page, and fire the standard `PageView` event on load.”

**Option B – You use a tag manager (e.g. Google Tag Manager):**  
- Create a new **Custom HTML** tag that contains the full Pixel script.
- Set the trigger to **All Pages**.
- Publish the container and add the GTM snippet to your site if not already there.

**Option C – Manual (simple site):**  
- Copy the entire script Meta gives you.
- Paste it in the `<head>` section of your site (e.g. in `index.html` for a single-page app), so it loads on every page.

### 3.3 Verify the Pixel works

1. In **Events Manager**, select your Pixel.
2. Open your website in another tab (ideally in a private/incognito window).
3. In Events Manager, check **Test events** or the **Overview** tab; you should see a **PageView** event within a few minutes.
4. Optional: install the **Meta Pixel Helper** Chrome extension to confirm the Pixel fires when you browse your site.

### 3.4 (Optional) Add conversion events

For “contact” or “enquiry” goals:
- In Events Manager → your Pixel → **Settings** → **Conversions API** or **Set up manually**.
- You can define custom events (e.g. “Contact form submitted”) and add the corresponding code or use Meta’s event setup tool.

For a first phase, **PageView** is enough; you can add conversions later.

---

## 4. Creating Your First Ad Campaign

### 4.1 Choose campaign objective

1. In **Ads Manager**, click **Create**.
2. Select a **campaign objective**:
   - **Awareness** – Brand awareness (reach, impressions).
   - **Traffic** – Send people to your website (good for “visit our site”).
   - **Leads** – Collect leads (forms, messenger, etc.).
   - **Engagement** – Post engagement, messages, etc.

**For Decerto Supports:** Start with **Traffic** (to your website) or **Leads** (if you add a lead form). You can duplicate the campaign later and switch to **Leads** when ready.

### 4.2 Campaign settings

1. **Campaign name:** e.g. `Decerto – Website traffic – Perth`.
2. **Special ad categories:** If Meta prompts, select **None** or the category that fits (e.g. housing/employment if applicable). For disability *support services* (not housing/employment ads), “None” is often correct; follow Meta’s on-screen guidance.
3. **Budget:** Choose **Campaign budget** (one budget for the whole campaign) or **Ad set budget** (budget per ad set). For small budgets, **Ad set budget** is simpler.
4. **Turn campaign on** → **Continue**.

### 4.3 Ad set (audience, placement, budget)

- **Ad set name:** e.g. `Perth & WA – 25–65 – Disability support interest`.
- **Conversion goal:** For Traffic, choose **Link clicks** or **Landing page views** (Landing page views requires Pixel).
- **Budget and schedule:**
  - **Daily budget** (e.g. AUD 10–20/day) or **Lifetime budget** with start/end dates.
  - **Schedule:** Run always or set hours/dates.
- **Audience:** See [Section 5](#5-targeting-who-sees-your-ads).
- **Placements:** **Automatic (Advantage+)** is fine to start; Meta will show on Facebook and Instagram. You can later switch to **Manual** and narrow to Feed, Stories, etc.
- **Optimization:** e.g. **Landing page views** or **Link clicks**.
- Click **Next** to go to the ad level.

### 4.4 Ad (creative and copy)

- **Ad name:** e.g. `Hero image – Decerto – Perth`.
- **Identity:** Select your **Decerto Supports** Page (and Instagram account if connected).
- **Format:** Single image, carousel, or video.
- **Creative:** Upload image(s) or video; see [Section 6](#6-ad-creative-images-video-text).
- **Primary text:** Main message (headline + short description + call to action).
- **Headline:** Short line (e.g. “Disability support in Perth”).
- **Description:** Optional extra line below headline.
- **Call to action (CTA):** e.g. **Learn more**, **Contact us**, **Sign up**.
- **Destination:** Your website URL (e.g. homepage or contact page).
- **Tracking:** Use the Pixel you connected; optional UTM parameters for Google Analytics (e.g. `?utm_source=facebook&utm_medium=paid&utm_campaign=decerto_traffic`).

Review → **Publish** (or **Schedule**).

---

## 5. Targeting (Who Sees Your Ads)

**Audience for website advertising:** These ads are meant to advertise your **website** to the **public**. So the audience should be **public** — i.e. broad: everyone in your chosen location and age range who could be interested in disability support. Do **not** restrict the audience to a small or private group. Use **location** and **age** to define who can see the ad, and leave **Detailed targeting** empty or very broad so the ad reaches the general public. This gives your website maximum visibility.

Good targeting improves results without excluding the public: set location and age, then keep the rest broad.

### 5.1 Location

1. In the **Audience** section of the ad set, under **Locations**, click **Add**.
2. Enter **Perth, Western Australia** (or **Australia** if you serve nationwide).
3. Choose **People who live in this location** (recommended for local services) or **People recently in this location**.
4. Optionally add a radius (e.g. 40 km from Perth CBD).

### 5.2 Age and gender

- **Age:** e.g. **25–65** (people who may need support for themselves or family).
- **Gender:** **All** unless you have a specific reason to narrow.

### 5.3 Detailed targeting (interests and behaviours)

- **For public website ads:** Leave **Detailed targeting** **empty** so your ad is shown to the **public** in your chosen location and age. That way anyone in that area can see the website ad.
- **Optional (still broad):** If you want a little focus without excluding the public, you can add one or two broad interests, e.g. **Disability awareness**, **Health**, **Family** — but avoid narrowing too much so the audience stays effectively public.
- Avoid sensitive categories (health conditions, etc.) if Meta restricts them.
- Do **not** use **Narrow audience** for website-advertising campaigns; keep the audience public/broad.

### 5.4 Custom audiences (later)

- **Website:** People who visited your site (requires Pixel).
- **Customer list:** Upload hashed email/phone (if you have consent and a list).
- **Engagement:** People who engaged with your Page or Instagram.

Use these for **retargeting** (show ads to people who already visited your site or engaged).

---

## 6. Ad Creative (Images, Video, Text)

### 6.1 Image specs (Facebook/Instagram)

- **Feed:** 1,080 × 1,080 px (square) or 1,200 × 628 px (landscape).
- **Stories:** 1,080 × 1,920 px (9:16).
- **Format:** JPG or PNG; keep file size reasonable (< 1 MB).

### 6.2 What to show

- **Decerto Supports** branding (logo, colours).
- Real, respectful imagery (e.g. support, community, independence) that reflects disability support.
- Short text on image is OK (e.g. “Person-centred support in Perth”) but don’t overcrowd; Meta may limit text coverage.

### 6.3 Ad copy (primary text)

- **Headline in text:** e.g. “Disability support built on trust and dignity.”
- **What you offer:** Personal care, community participation, support coordination, etc.
- **Who it’s for:** “For participants and families in Perth and WA.”
- **CTA in copy:** “Visit our website” / “Get in touch” / “Learn more.”

Keep the tone professional, warm, and clear. Avoid medical or NDIS-specific claims unless you’re compliant (e.g. registered).

### 6.4 Video (optional)

- Short (15–30 s) works well: intro, key message, CTA.
- Add captions; many users watch without sound.
- Upload in square or vertical for flexibility.

---

## 7. Budget, Schedule & Bidding

### 7.1 Budget

- **Starter:** AUD 10–20/day for one campaign.
- **Test phase:** Run for at least 7–14 days before judging performance.
- **Scale:** If cost per result is acceptable, increase by ~20% at a time.

### 7.2 Bidding

- **Lowest cost** (default): Meta optimizes for your goal at the lowest cost.
- **Cost cap:** Set a max cost per result (e.g. per link click or per lead).
- **Bid cap:** Set a max bid; use only if you know what you’re doing.

For most small budgets, **Lowest cost** with a **daily budget** is sufficient.

### 7.3 Schedule

- **Always on:** Ads run every day until you pause or hit budget.
- **Scheduled:** Set start and end date (e.g. for a specific promotion).

---

## 8. Tracking & Measuring Results

### 8.1 In Ads Manager

- **Campaigns** tab: Spend, results (e.g. link clicks, landing page views), cost per result, reach.
- **Ad sets** and **Ads** tabs: Compare which audiences and creatives perform best.
- **Breakdowns:** By age, gender, placement, device, etc.

### 8.2 Key metrics

| Metric | What it means |
|--------|----------------|
| **Reach** | Unique people who saw the ad. |
| **Impressions** | Total number of times the ad was shown. |
| **Link clicks** | Clicks to your website. |
| **Landing page views** | Page loads on your site (Pixel). |
| **CPC (cost per click)** | Spend ÷ link clicks. |
| **CTR (click-through rate)** | Clicks ÷ impressions. |

### 8.3 Website analytics

- Add **Google Analytics 4** (or similar) to your site with UTM parameters on ad links.
- Compare Facebook traffic (e.g. `utm_source=facebook`) to other channels and see behaviour (pages viewed, time on site, contact page visits).

### 8.4 Improving over time

- Pause ad sets or ads with high cost and low results.
- Scale budget on ad sets that have good cost per click or cost per lead.
- Test new images, headlines, and audiences (one change at a time when possible).

---

## 9. Compliance & Best Practices

### 9.1 Meta policies

- Follow [Meta’s Advertising Standards](https://www.facebook.com/policies/ads) and [Community Standards](https://www.facebook.com/standards).
- No misleading claims; no discrimination; respect special ad categories if they apply.
- For disability/care services: be accurate, avoid guaranteed outcomes, and don’t imply official endorsement (e.g. NDIS) unless true.

### 9.2 Privacy and consent

- Have a clear **Privacy Policy** on your website (including how you use data for advertising and Meta Pixel).
- Where applicable, comply with Australian Privacy Principles and any consent requirements for marketing.

### 9.3 Decerto-specific

- Don’t claim NDIS registration if you’re not registered; focus on “disability support” and “person-centred care.”
- Use inclusive, dignified language and imagery.

---

## 10. Checklist & Next Steps

### Before your first ad

- [ ] Facebook Page for Decerto Supports created and filled out.
- [ ] Meta Business Account set up (recommended).
- [ ] Ad account created, time zone = Perth (or your region), currency = AUD.
- [ ] Payment method added in Ads Manager → Billing.
- [ ] Facebook Pixel created and installed on your website; PageView verified in Events Manager.
- [ ] Campaign objective chosen (e.g. Traffic).
- [ ] Audience set to **public** (location + age; leave Detailed targeting empty or very broad for website ads).
- [ ] At least one ad creative (image + copy + CTA + website URL) ready.
- [ ] Budget and schedule set (e.g. AUD 10–20/day, 2 weeks).

### After launch

- [ ] Check Events Manager for Pixel events (PageView, optional conversions).
- [ ] Review Ads Manager daily for the first week (spend, clicks, CTR).
- [ ] After 7–14 days: pause underperformers, increase budget on winners, test one new creative or audience.
- [ ] Add UTM parameters and Google Analytics to measure website behaviour from Facebook.

### Optional later steps

- Connect **Instagram** account to the same Business account and use it in the same campaign (placements).
- Set up **conversion events** (e.g. contact form submit) and optimize for conversions.
- Create **custom audiences** (website visitors, Page engagers) for retargeting.
- Try **Leads** objective with Meta Lead Forms or link to your contact page.

---

**Related docs:**  
- [GOOGLE_RANKING_SEO_GUIDE.md](./GOOGLE_RANKING_SEO_GUIDE.md) – Improve organic (non-paid) Google ranking.  
- [VENDOR_DELIVERABLES_AND_SCOPE.md](./VENDOR_DELIVERABLES_AND_SCOPE.md) – Contract and scope including Facebook/Instagram advertising.

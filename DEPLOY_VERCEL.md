# Deploy to Vercel (testing)

## Option 1: Vercel CLI (quick)

1. **Install Vercel CLI** (one-time):
   ```bash
   npm i -g vercel
   ```

2. **From the project folder**, run:
   ```bash
   vercel
   ```
   - Log in or sign up when prompted (browser).
   - Confirm project settings (build: `npm run build`, output: `dist`).
   - You’ll get a URL like `https://your-project-xxx.vercel.app`.

3. **Production deploy**:
   ```bash
   vercel --prod
   ```

## Option 2: GitHub + Vercel (recommended)

1. Push this repo to **GitHub** (create a repo and push).
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project**.
3. **Import** your GitHub repo.
4. Vercel will detect **Vite** and use:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**. Each push to the main branch will redeploy.

## Notes

- `vercel.json` is already set (build command, output directory, framework: vite).
- The app uses in-memory “pages” (no URL routes), so no extra redirects are needed.
- For custom domain or env vars, use the Vercel dashboard after the first deploy.

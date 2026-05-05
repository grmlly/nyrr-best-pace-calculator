# NYRR Best Pace Calculator

Interactive tools to calculate your NYRR best pace and plan race strategy.

## How It Works

NYRR assigns corrals based on your "best pace," calculated from your most recent NYRR race (≥3 miles, within 2 years):

**Best Pace = Equivalent 10K time ÷ 6.214 miles**

Where: `Equivalent 10K time = Race time × Distance factor`

Each distance has a conversion factor that accounts for how pace changes with distance:
- 5K: ×2.09 (fastest relative to marathon pace)
- Marathon: ×0.22 (slowest—heavily rewards endurance)
- 10K: ×1.00 (baseline)

## Two Tools

### 1. Race → Best Pace
Input any NYRR race result and see:
- Your calculated best pace
- What times you'd need at other distances to match this pace

### 2. Best Pace → All Races
Input a target best pace and see:
- Times/paces needed at every NYRR distance to achieve that pace
- Use this to plan which race to target

## Key Insight

**Longer distances are better for corral placement.** A strong marathon result converts to a faster best pace than a fast 5K—the 0.22 multiplier heavily rewards endurance.

Example: To beat 8:00/mile best pace:
- **5K**: Need sub-23:55 (brutal)
- **Half-Marathon**: Need sub-1:51 (achievable)
- **Marathon**: Need sub-3:45 (your natural pace zone)

---

## Deploy to Vercel (Step-by-Step)

### Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `nyrr-best-pace-calculator`
3. Description: "NYRR Best Pace Calculator Tools"
4. Make it **Public** (required for free Vercel deployment)
5. Click **Create repository**

### Step 2: Upload Files to GitHub

You have two options:

#### Option A: Command Line (Recommended)
```bash
# Install Git if you haven't: https://git-scm.com/download

# Navigate to your project folder
cd /path/to/nyrr-best-pace-calculator

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/nyrr-best-pace-calculator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Option B: GitHub Web Interface
1. On your new GitHub repo page, click **Add file** → **Upload files**
2. Drag and drop all files from this folder
3. Click **Commit changes**

### Step 3: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** (or log in if you have an account)
3. Choose **Continue with GitHub** and authorize Vercel
4. Click **Import Project**
5. Paste your repo URL: `https://github.com/YOUR_USERNAME/nyrr-best-pace-calculator`
6. Click **Continue**

### Step 4: Configure & Deploy

1. **Project Name**: `nyrr-best-pace-calculator` (auto-filled)
2. **Framework Preset**: Select **Create React App**
3. Click **Deploy**

**That's it!** Vercel will build and deploy automatically. You'll get a URL like:
```
https://nyrr-best-pace-calculator.vercel.app
```

### Step 5: Auto-Deployments (Optional but Recommended)

Vercel automatically redeploys whenever you push to GitHub:

```bash
# Make changes locally
# Then push to GitHub
git add .
git commit -m "Update description"
git push
```

Your site updates automatically in ~2-3 minutes!

## Local Development

To run locally during development:

```bash
# Install dependencies
npm install

# Start development server
npm start

# Opens at http://localhost:3000
```

## File Structure

```
nyrr-best-pace-calculator/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx                           (Main app with navigation)
│   ├── BestPaceCalculator.jsx            (Race time → best pace)
│   ├── TargetBestPaceCalculator.jsx      (Best pace → all races)
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

## Formula Reference

The NYRR best pace formula uses distance conversion factors to calculate an equivalent 10K time:

```
Equivalent 10K time = Race time × Distance factor
Best pace = Equivalent 10K time ÷ 6.214 miles
```

**Eligible races**: NYRR only, 3+ miles, within rolling 2-year window

## Troubleshooting

**Build fails on Vercel?**
- Check that all files are uploaded to GitHub
- Ensure `package.json` exists in root
- Verify Tailwind/PostCSS configs are present

**Local npm install fails?**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Make sure Node.js v16+ is installed

**Need to update?**
- Edit files locally
- Run `git add .` and `git commit -m "description"`
- Push with `git push`
- Vercel redeploys automatically

## Questions?

Refer to:
- [Vercel Docs](https://vercel.com/docs)
- [Create React App](https://create-react-app.dev)
- [Tailwind CSS](https://tailwindcss.com)

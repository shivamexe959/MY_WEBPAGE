# ADA Algorithm Lab — Project Structure

> Version 2.1.0 · Updated June 2026  
> Every file explained. Stars (★) = files you will actually edit.

---

## Full Directory Tree

```
ADA-Algorithm-Lab/
│
├── index.html                    ★ THE ENTIRE APP — one HTML file
│                                   Contains all 35+ algorithm tool panels,
│                                   mobile glassmorphism UI, Code Lab HTML,
│                                   all inline <style> overrides, and
│                                   3 inline <script> blocks at the bottom
│
├── app.js                          Old entry point (ignore — superseded by scripts/app.js)
│
├── README.md                       Public-facing project overview + quick-start
├── PROJECT_GUIDE.md              ★ Full developer guide (read this first)
├── PROJECT_STRUCTURE.md            This file
├── CHANGELOG.md                    Version history
├── INSTALL.md                      Setup instructions for new developers
├── FIREBASE_SETUP.md               Step-by-step Firebase project setup
├── .gitignore                      Ignores node_modules, .env, etc.
├── robots.txt                      SEO — allows all crawlers
├── sitemap.xml                     SEO — sitemap for Google
│
│
├── ── STYLES ──────────────────────────────────────────────────────
│
├── styles/
│   ├── main.css                  ⛔ DO NOT EDIT — core design tokens, global layout
│   │                               Variables: --bg-primary, --accent-blue, --card-bg, etc.
│   │                               Editing this breaks the entire visual system
│   │
│   ├── layout.css                  Page-level layout — sidebar, content area, grid
│   ├── navbar.css                  v2 top navbar (XP bar, streak, coins, avatar)
│   ├── dashboard.css               Student dashboard modal styles
│   ├── admin.css                   Admin panel modal styles
│   ├── teacher.css                 Teacher console styles (added v2.0.0)
│   ├── components.css              Shared UI — cards, buttons, badges, chips, tabs
│   ├── animations.css              Keyframes, toast animations, XP float effects
│   ├── notifications.css           Notification bell panel
│   ├── analytics.css               Analytics charts and heatmap styles
│   │
│   └── responsive.css            ★ MOBILE LAYOUT (completely rewritten v2.1.0)
│                                   ├── @media (max-width: 1024px)  — tablet
│                                   ├── @media (max-width: 768px)   — mobile
│                                   │     ├── Aurora blobs (body::before/after)
│                                   │     ├── Glass cards (.card backdrop-filter)
│                                   │     ├── Glass navbar (#v2-navbar)
│                                   │     ├── Hide desktop tab bar (.tabs)
│                                   │     └── Show #mobile-bottom-nav
│                                   ├── @media (max-width: 480px)   — small phones
│                                   ├── @media landscape            — phone landscape
│                                   ├── #mobile-bottom-nav          — glow-pill bottom nav
│                                   ├── #mob-more-sheet             — slide-up "More" sheet
│                                   └── #mob-hero-banner, #mob-quick-stats, #mob-categories
│
│
├── ── SCRIPTS ─────────────────────────────────────────────────────
│
├── scripts/
│   │
│   ├── app.js                    ★ MAIN ENTRY POINT
│   │                               Called after Firebase auth resolves.
│   │                               Orchestrates: navbar, dashboard, teacher console,
│   │                               announcements, notifications, preferences, streaks.
│   │
│   ├── algorithms.js             ⛔ DO NOT EDIT (5,300+ lines)
│   │                               Contains showTool(idx) — the tab switching function.
│   │                               Contains all 35+ algorithm tool logic:
│   │                               sorting steps, DP tables, graph traversal, etc.
│   │
│   ├── visualizers.js            ⛔ DO NOT EDIT (4,000+ lines)
│   │                               All canvas-based animation renderers.
│   │                               Sorting bars, graph nodes, MST edges, etc.
│   │
│   ├── constants.js                App-wide constants (XP values, level thresholds, etc.)
│   ├── helpers.js                  Utility functions: debounce, formatNumber, truncate
│   ├── storage.js                  localStorage wrapper with JSON parse/stringify
│   ├── events.js                   Custom event bus (publish/subscribe pattern)
│   │
│   ├── firebase/
│   │   ├── firebase.js           ★ Firebase app initialization
│   │   │                           Reads config from config/appConfig.js
│   │   │                           Exports: app, db, auth
│   │   │
│   │   ├── auth.js               ★ Google authentication + role detection
│   │   │                           onAuthStateChanged handler.
│   │   │                           Checks adminEmails, adminUIDs.
│   │   │                           Calls createOrUpdateUser() on every login.
│   │   │
│   │   ├── database.js             UserService — all user CRUD operations
│   │   │                           getUser(), updateProfile(), addXP(),
│   │   │                           updateStreak(), addBookmark(), etc.
│   │   │
│   │   └── firestore.js            All other Firestore services:
│   │                               SessionService, NotificationService,
│   │                               AnnouncementService, FeedbackService,
│   │                               BugReportService, QuizService, TeacherService
│   │
│   ├── dashboard/
│   │   ├── studentDashboard.js     Student dashboard modal orchestrator
│   │   │                           Renders: profile hero, XP bar, streak calendar,
│   │   │                           achievements grid, stats cards, history, leaderboard
│   │   │
│   │   ├── adminDashboard.js       Admin panel modal orchestrator
│   │   │                           Renders: user table, analytics, feedback,
│   │   │                           bug reports, announcements, CSV export
│   │   │
│   │   └── analyticsDashboard.js   Analytics charts (device, browser, college breakdowns)
│   │
│   ├── teacher/
│   │   ├── teacherDashboard.js     Teacher console orchestrator (tab system)
│   │   ├── teacherRole.js          Role permission helpers
│   │   ├── classRoster.js          Class list, live feed, seating groups
│   │   ├── classAnnouncements.js   Teacher → division announcements
│   │   ├── classQuizControl.js     Quiz creation, results, practical marking
│   │   ├── classReports.js         CSV export, heatmap, syllabus coverage
│   │   ├── classModeration.js      Bonus XP grants, mute/unmute
│   │   └── classLiveSession.js     Lab session start/stop, countdown timer
│   │
│   ├── features/
│   │   ├── xp.js                   XP bar rendering + level calculation
│   │   ├── achievements.js         20 achievement definitions + unlock logic
│   │   ├── leaderboard.js          Global and college XP leaderboard
│   │   ├── notes.js                Cloud notes CRUD (Firestore-synced)
│   │   ├── statistics.js           Usage statistics rendering
│   │   ├── notifications.js        Real-time Firestore notification listener
│   │   ├── feedback.js             Feedback form + bug report form
│   │   ├── preferences.js          User preferences (theme, animation speed)
│   │   ├── cloudBackup.js          Backup/restore user data to Firestore
│   │   ├── searchHistory.js        Algorithm search tracking
│   │   ├── recent.js               Recently viewed algorithm tracker
│   │   ├── bookmarks.js            Bookmark/unbookmark algorithms
│   │   ├── pdf.js                  PDF export history tracking
│   │   ├── share.js                Native Web Share API for algorithm links
│   │   ├── quiz.js                 Quiz engine (student side — rendering + scoring)
│   │   ├── donations.js            Donation panel (UPI + Buy Me a Coffee)
│   │   └── announcements.js        Global announcement bar listener
│   │
│   └── ui/
│       ├── toast.js                Toast notification queue + animations
│       ├── modal.js                openModal() / closeModal() + ESC key handler
│       ├── navbar.js               v2 navbar renderer (XP, coins, streak, avatar, buttons)
│       ├── theme.js                Dark/light theme toggle + localStorage persistence
│       ├── loader.js               Global loading spinner show/hide
│       └── animations.js           fade(), slideIn(), countUp() animation helpers
│
│
├── ── CONFIG ──────────────────────────────────────────────────────
│
├── config/
│   ├── appConfig.js              ★ Firebase project credentials + feature flags
│   │                               MUST be configured before first deploy
│   │
│   ├── adminConfig.js            ★ Admin emails, UIDs, maintenance mode, announcements
│   │                               Edit this to: add admins, enable maintenance,
│   │                               add global announcement bars
│   │
│   └── donationConfig.js         ★ UPI ID, QR code image path, donation goals,
│                                   Buy Me a Coffee link, supporter wall config
│
│
├── ── DATABASE ────────────────────────────────────────────────────
│
├── database/
│   ├── firestoreStructure.md       Complete Firestore schema — all collections,
│   │                               all fields, all data types
│   └── firestoreRules.txt        ★ Production security rules
│                                   PASTE INTO: Firebase Console → Firestore → Rules
│
│
├── ── ASSETS ──────────────────────────────────────────────────────
│
├── assets/
│   ├── icons/
│   │   └── avatar.svg              Default profile picture (shown before photo loads)
│   ├── images/                     App screenshots, social preview images
│   └── qr/
│       └── donation-qr.png       ★ Replace with your UPI QR code image
│
│
├── ── DOCUMENTATION ───────────────────────────────────────────────
│
└── docs/
    ├── API.md                      Internal API / function reference
    ├── CONTRIBUTING.md             How to contribute (for open-source forks)
    ├── SECURITY.md                 Security policy and responsible disclosure
    ├── DATABASE.md                 Firestore schema reference (mirrors firestoreStructure.md)
    └── DEPLOYMENT.md               Detailed GitHub Pages deployment walkthrough
```

---

## ★ Files You Will Edit

| File | When to edit |
|------|-------------|
| `config/appConfig.js` | First setup — paste your Firebase credentials |
| `config/adminConfig.js` | Add admins, enable maintenance mode, set announcement |
| `config/donationConfig.js` | Update UPI ID, QR image, donation goals |
| `styles/responsive.css` | Mobile layout changes — glassmorphism styles |
| `index.html` | Add new tool panels, tab buttons, mobile sections |
| `database/firestoreRules.txt` | When adding new Firestore collections |
| `assets/qr/donation-qr.png` | Replace with your UPI QR |
| `scripts/features/xp.js` | Change XP rewards |
| `scripts/features/achievements.js` | Add new achievements |

---

## ⛔ Files You Must NOT Edit

| File | Why |
|------|-----|
| `scripts/algorithms.js` | 5,300 lines — all 35 tool logic. Any edit risks breaking visualizers |
| `scripts/visualizers.js` | All canvas animations. Edit breaks every graph/sort animation |
| `styles/main.css` | Global design system — color tokens, typography, layout grid |
| Firebase SDK URLs in `config/appConfig.js` | Keep at version `10.12.2` — don't auto-upgrade |

---

## index.html — Internal Map

Because the entire app lives in one HTML file, here's a map:

```
index.html
│
├── <head>
│   ├── Meta tags, Open Graph
│   ├── <link> all CSS files (main, layout, navbar, dashboard, etc.)
│   └── Inline <style> — small overrides and Code Lab editor styles
│
├── <body>
│   ├── #firebase-login-overlay      Login screen (shown before auth)
│   │
│   ├── #v2-navbar                   Top navigation bar
│   │   └── XP bar, streak, coins, notification bell, avatar, buttons
│   │
│   ├── <header>                     Desktop tab bar
│   │   ├── .header-top              App title + subtitle
│   │   └── .tabs                    35+ tab buttons (hidden on mobile)
│   │
│   ├── MOBILE HERO SECTION          ← Added v2.1.0
│   │   ├── #mob-aurora-bottom       Green aurora glow (fixed, behind nav)
│   │   ├── #mob-hero-banner         Welcome card with streak + CTA button
│   │   ├── #mob-quick-stats         3 glass stat chips (XP/Level/Rank)
│   │   └── #mob-categories          4 category cards (horizontal scroll)
│   │
│   ├── <main>                       Algorithm tool content
│   │   ├── #tool-0  Sorting         (display: none unless active)
│   │   ├── #tool-1  Knapsack
│   │   ├── ...      (tools 2–33)
│   │   └── (tool-34 Resources is OUTSIDE main — see note below)
│   │
│   ├── <footer>
│   │   └── Copyright, links
│   │
│   ├── <div class="tool">           Tool 34: Resources (outside <main>)
│   │                                This is a quirk of the original code.
│   │                                showTool() uses querySelectorAll('.tool')
│   │                                across the full document, not just <main>.
│   │
│   ├── #tool-codelab                Tool 35: Code Lab ← Added v2.1.0
│   │   ├── Monaco Editor mount      (#codelab-editor-mount)
│   │   ├── Stdin textarea           (#codelab-stdin)
│   │   ├── Output panel             (#codelab-output)
│   │   └── Snippets list            (#codelab-snippets-list)
│   │
│   ├── MODALS
│   │   ├── #dashboard-modal         Student dashboard
│   │   ├── #admin-modal             Admin panel
│   │   ├── #teacher-modal           Teacher console
│   │   ├── #settings-modal          User preferences
│   │   └── ... (other modals)
│   │
│   ├── #mobile-bottom-nav           Fixed bottom nav (mobile only)
│   │   ├── Home, Sort, Graph, DP, ··· buttons
│   │   └── Each button has .mob-nav-icon + .mob-nav-label + .mob-nav-dot
│   │
│   ├── #mob-more-overlay            Tap-to-close overlay behind More sheet
│   ├── #mob-more-sheet              Slide-up sheet with all tool shortcuts
│   │
│   └── INLINE SCRIPTS (3 blocks at bottom of body)
│       ├── Firebase error catcher   Suppresses known Firebase config errors
│       ├── Footer year setter        fyEl.textContent = new Date().getFullYear()
│       └── Mobile UI + Code Lab     mobileNav(), codelabInit(), codelabRun(),
│                                    codelabSaveSnippet(), _mobSetHomeView(), etc.
```

---

## Key Relationships Between Files

```
config/appConfig.js
    └── read by → scripts/firebase/firebase.js
                      └── exports db, auth
                              ├── used by → scripts/firebase/auth.js
                              ├── used by → scripts/firebase/database.js
                              └── used by → scripts/firebase/firestore.js

config/adminConfig.js
    └── read by → scripts/firebase/auth.js (adminEmails, adminUIDs)
    └── read by → scripts/app.js (maintenanceMode, announcement)

scripts/app.js  (called after auth resolves)
    ├── imports → scripts/firebase/auth.js
    ├── imports → scripts/firebase/database.js
    ├── imports → scripts/dashboard/studentDashboard.js
    ├── imports → scripts/dashboard/adminDashboard.js
    ├── imports → scripts/teacher/teacherDashboard.js
    └── imports → scripts/features/* (xp, notifications, etc.)

index.html
    ├── loads scripts/* via <script type="module">
    ├── defines showTool() via scripts/algorithms.js
    └── defines codelabInit(), mobileNav(), etc. via inline <script>
```

---

## Deployment Architecture

```
Developer (Replit)
    │
    ├── Edits files in Replit IDE
    ├── Replit auto-commits at end of session
    │
    └── git push origin main
            │
            ↓
    GitHub Repository
    (shivamexe959/MY_WEBPAGE)
            │
            ↓ (1–2 min rebuild)
    GitHub Pages CDN
            │
            ↓
    https://shivamexe959.github.io/MY_WEBPAGE/
            │
            ↓
    User's Browser
    ├── Loads HTML/CSS/JS (static files)
    ├── Loads Firebase SDK from Google CDN
    ├── Loads Monaco Editor from cdnjs (on Code Lab tab only)
    └── API calls → wandbox.org (code execution)
               └── Firebase (auth + Firestore)
```

---

*ADA Algorithm Lab v2.1.0 — Last updated: June 2026*

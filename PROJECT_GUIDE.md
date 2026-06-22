# ADA Algorithm Lab — Complete Developer Guide

> **Version:** 2.1.0 — Updated June 2026  
> **Written for:** Any developer joining this project with zero prior context.  
> **Read this first.** It covers what the app does, how everything is wired together, what was recently added, and how to extend it without breaking anything.

---

## Table of Contents

1. [What Is This App?](#1-what-is-this-app)
2. [Tech Stack](#2-tech-stack)
3. [User Roles](#3-user-roles)
4. [Authentication Flow](#4-authentication-flow)
5. [Config File](#5-config-file)
6. [Firestore Database Structure](#6-firestore-database-structure)
7. [Mobile Layout — Glassmorphism Edition](#7-mobile-layout--glassmorphism-edition)
8. [Code Lab — In-Browser Compiler](#8-code-lab--in-browser-compiler)
9. [Algorithm Tool System](#9-algorithm-tool-system)
10. [XP and Level System](#10-xp-and-level-system)
11. [Achievements System](#11-achievements-system)
12. [How to Deploy / Update](#12-how-to-deploy--update)
13. [Firestore Security Rules](#13-firestore-security-rules)
14. [Adding New Features](#14-adding-new-features)
15. [Common Tasks — Quick Reference](#15-common-tasks--quick-reference)
16. [Bug History](#16-bug-history)
17. [Contact / Credits](#17-contact--credits)

---

## 1. What Is This App?

**ADA Algorithm Lab** is a free, browser-based interactive learning platform for students of VVP Engineering College (CSE Department, GTU) studying **Analysis and Design of Algorithms — subject code 3150703**.

### What students can do:
- **Visualize** 35+ sorting, searching, graph, DP, backtracking, and string algorithms with step-by-step animations
- **Write and run Python 3 / C code** in a full VS Code-style editor (Monaco + Wandbox API)
- **Earn XP** for using algorithms, completing quizzes, running code, and logging streaks
- **Track progress** via a personal dashboard (streaks, achievements, leaderboard, statistics)
- **Take quizzes** set by their teacher
- **Export PDFs** of algorithm notes
- **Save code snippets** locally (up to 20 named snippets per device)

### What teachers can do:
- See class rosters by division (GX / GY / GZ)
- Send announcements to their division
- Start lab sessions with countdown timers
- Check quiz results and mark practicals
- Grant bonus XP and mute misbehaving students

### What admins can do:
- See all users, ban, delete, or promote them
- Send global announcements
- View analytics (devices, colleges, sessions)
- Export all users to CSV

---

## 2. Tech Stack

This is **pure HTML + CSS + JavaScript**. There is NO React, Vue, Webpack, or Node.js server. Everything runs in the browser.

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML5 / CSS3 / ES Modules (no bundler) |
| Code Editor | Monaco Editor v0.45.0 — loaded from CDN on demand |
| Code Execution | Wandbox API (free, no auth) — `wandbox.org/api/compile.json` |
| Database | Firebase Firestore (NoSQL, real-time) |
| Auth | Firebase Authentication — Google Sign-In only |
| Hosting | GitHub Pages (static, free) |
| Firebase SDK | v10.12.2 — loaded from CDN (no npm install needed) |
| Dev Server | `python3 -m http.server 5000` (Replit workflow) |

### Important CDN dependencies used (no npm):
```
Firebase SDK        — https://www.gstatic.com/firebasejs/10.12.2/...
Monaco Editor       — https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/...
jsPDF               — loaded when PDF export is used
Wandbox API         — https://wandbox.org/api/compile.json (REST, no key)
```

---

## 3. User Roles

### 3A. Student (default — everyone starts here)
- **Detected by:** Any Google account not in `adminEmails`/`adminUIDs` and not promoted to teacher
- **Firestore field:** `role: "student"`
- **Sees:** Visualizers, dashboard, XP bar, achievements, leaderboard, quiz, Code Lab
- **Cannot see:** Admin Panel (🛡️), Teacher Console (📋)

**Firestore fields stored in `users/{uid}`:**
```
xp, coins, badges[], achievements[], bookmarks[], quizHistory[]
currentStreak, longestStreak, lastStreakDate
totalAlgorithmsUsed, recentlyViewed[], searchHistory[]
name, email, college, branch, semester, division (GX/GY/GZ)
role: "student"
```

### 3B. Teacher
- **How to create:** Admin Panel → Users → find them → click "Admin" button → type `teacher` → enter divisions (`GX,GY`)
- **Firestore fields added:** `role: "teacher"`, `teacherDivisions: ["GX","GY"]`, `teacherSince: "<ISO timestamp>"`
- **Sees:** 📋 Teacher Console button in the navbar

**Teacher Console tabs:**

| Tab | What it does |
|-----|-------------|
| Overview | Division stats, cross-division XP comparison chart |
| Roster | Full class list with XP/streak/last-seen, live activity feed |
| Quiz | Create quiz sets, add questions, see results, mark practicals |
| Reports | Export CSV, difficulty heatmap, syllabus coverage |
| Announcements | Send to one division or all, spotlight top students |
| Lab Session | Start/stop lab with countdown timer |
| Moderation | Grant bonus XP (with reason log), mute/unmute |
| Syllabus | GTU 3150703 syllabus coverage map |

### 3C. Admin (Shivam — the developer)
- **Detected by:** Email in `ADMIN_CONFIG.adminEmails[]` OR UID in `ADMIN_CONFIG.adminUIDs[]`
- **Sees:** 🛡️ Admin Panel button in the navbar

**Admin Panel tabs:**

| Tab | What it does |
|-----|-------------|
| Overview | Total users, sessions, device/browser/OS/college breakdown |
| Users | Full user table — search, ban, delete, promote, export CSV |
| Feedback | All user feedback with star ratings |
| Bug Reports | All bug reports with priority levels |
| Announcements | Send global announcement to all users |

---

## 4. Authentication Flow

File: `scripts/firebase/auth.js`

```
User clicks "Sign In with Google"
    ↓
Firebase Google popup opens
    ↓
onAuthStateChanged fires
    ↓
Check: is email in adminEmails OR UID in adminUIDs?
    → YES → isAdmin = true
    → NO  → check Firestore role field
    ↓
createOrUpdateUser(user) — creates Firestore doc if first login
    ↓
SessionService.startSession(uid) — records session start time
    ↓
callback(user, isAdmin, userData) fires
    ↓
app.js → renderNavbar(), initStudentDashboard(), etc.
```

**Critical rule:** Every `await` in the auth flow is wrapped in `try-catch`. If ANY Firestore call fails, the user still sees the app — login never causes a blank screen.

**Guest mode:** Users can click "Continue as Guest" — all 35+ visualizers and the Code Lab work. XP/streaks/leaderboard require sign-in.

---

## 5. Config File

File: `config/adminConfig.js`

```js
export const ADMIN_CONFIG = {
  appName: 'ADA Algorithm Lab',
  appVersion: '2.1.0',

  // Admin Google accounts
  adminEmails: ['joshi.shivam12507@gmail.com'],
  adminUIDs:   ['YOUR_FIREBASE_UID_HERE'],  // get from Firebase Console → Auth → Users

  // Teacher emails (or promote via Admin Panel UI instead)
  teacherEmails: [],

  // Maintenance mode
  maintenanceMode: false,
  maintenanceMessage: 'ADA Lab is under maintenance. Back shortly!',

  // Global announcement bar (shown to all users on every load)
  announcement: '',
  announcementType: 'info',  // 'info' | 'warning' | 'success' | 'danger'
};
```

---

## 6. Firestore Database Structure

Firebase Project ID: `ada-coffiee` (intentional typo — set at creation, cannot change)

| Collection | Purpose |
|-----------|---------|
| `users/{uid}` | Every user's full profile, XP, achievements, history |
| `sessions/{uid}/data/{sessionId}` | Login session records |
| `notifications/{uid}/items/{notifId}` | Per-user notifications |
| `announcements/{annId}` | Global/division announcements |
| `feedback/{feedId}` | User feedback submissions |
| `bugReports/{bugId}` | Bug report submissions |
| `quizSets/{setId}` | Teacher-created quiz sets |
| `quizSets/{setId}/questions/{qId}` | Questions inside a quiz set |
| `quizResults/{uid}_{setId}` | Student quiz attempt results |
| `teacherGroups/{groupId}` | Lab seating groups |
| `teacherLabSessions/{sessionId}` | Lab session records |
| `teacherPracticals/{docId}` | Marked practical exercises |
| `teacherBonusXp/{docId}` | Bonus XP grant log |
| `teacherCountdowns/{divId}` | Live countdown timers per division |

See `database/firestoreStructure.md` for full field-level schema.

---

## 7. Mobile Layout — Glassmorphism Edition

Added in v2.1.0. All mobile-specific code is in `styles/responsive.css` and at the bottom of `index.html`.

### How it works

On screens ≤ 768px, a completely different UI layer activates:

```
┌──────────────────────────────┐
│  Glass navbar (blur 24px)    │  ← header gets backdrop-filter
├──────────────────────────────┤
│  🔥 5 day streak   [aurora]  │
│  Welcome back, Shivam!       │  ← #mob-hero-banner
│  ⚡ Start Visualizing [btn]  │
├──────────────────────────────┤
│  ⚡XP  🎖️Level  🏆Rank       │  ← #mob-quick-stats (3 glass chips)
├──────────────────────────────┤
│  Algorithm Categories         │
│  [📊Sorting] [🌐Graph] [🎒DP]│  ← #mob-categories (horizontal scroll)
├──────────────────────────────┤
│  <main> ← hidden on Home     │  ← algorithm tool content
│  visible when tool tab tapped │
├──────────────────────────────┤
│  🏠   📊   🌐   🎒   ···     │  ← #mobile-bottom-nav (glow-pill active)
└──────────────────────────────┘
```

### Key HTML elements (all in `index.html`, after `</header>`):

| Element ID | What it is |
|-----------|-----------|
| `#mob-aurora-bottom` | Fixed green glow blob behind bottom nav |
| `#mob-hero-banner` | Frosted glass welcome card with CTA button |
| `#mob-quick-stats` | 3 pill chips (XP / Level / Rank) |
| `#mob-categories` | Horizontal scroll row of 4 category cards |
| `#mobile-bottom-nav` | Fixed bottom navigation bar |
| `#mob-more-overlay` | Dark overlay behind "More" sheet |
| `#mob-more-sheet` | Slide-up sheet with all tools |

### Key JavaScript functions (inline `<script>` at bottom of `index.html`):

```js
_mobSetHomeView(isHome)
// Shows hero/stats/cats + HIDES <main> when true.
// Hides hero/stats/cats + SHOWS <main> when false.
// Called by mobileNav() and DOMContentLoaded.

_mobSyncStats()
// Reads XP, level, username, streak from the existing app DOM
// and writes them into the mobile chips/hero banner.
// Called after login (1.5s and 4s delay via setTimeout).

mobileNav(btn, tab)
// Called by bottom nav buttons.
// Sets active state on the tapped button,
// calls _mobSetHomeView(tab === 'home'),
// and calls showTool(index) for algorithm tabs.

closeMobMore()
// Closes the slide-up "More" sheet.
```

### CSS architecture (all in `styles/responsive.css`):

```css
/* Default: mobile-only elements hidden on desktop */
#mob-hero-banner, #mob-quick-stats,
#mob-categories, #mob-aurora-bottom { display: none; }

/* On mobile (≤768px): activate everything */
@media (max-width: 768px) {
  .tabs { display: none !important; }       /* hide desktop tab bar */
  #mobile-bottom-nav { display: flex !important; }
  #mob-hero-banner { display: block; }
  body::before, body::after { /* aurora blobs */ }
  .card { backdrop-filter: blur(20px); }    /* glass cards */
  /* ...etc */
}

/* Bottom nav lives outside the media query so it renders correctly */
#mobile-bottom-nav { display: none; position: fixed; bottom: 0; ... }
.mob-nav-btn.active::before { /* glow pill behind active icon */ }
.mob-nav-btn.active .mob-nav-dot { opacity: 1; /* blue dot indicator */ }
```

### Aurora design tokens:
```
bg:            rgba(255,255,255,0.03)
border:        rgba(255,255,255,0.07)
blur:          backdrop-filter: blur(20px)
accent blue:   #3b82f6
accent purple: #8b5cf6
accent green:  #10b981
aurora blue:   rgba(59,130,246,0.18) — body::before
aurora purple: rgba(139,92,246,0.15) — body::after
aurora green:  rgba(16,185,129,0.08) — #mob-aurora-bottom
```

### Extending the mobile layout:
- To add a new home screen section: add HTML after `#mob-categories`, add its CSS inside `@media (max-width: 768px)`, and add its ID to `_mobSetHomeView()` so it toggles with the home/tool switch.
- To add a new bottom nav tab: add a `<button class="mob-nav-btn">` and extend the `tabMap` in `mobileNav()`.

---

## 8. Code Lab — In-Browser Compiler

Added in v2.1.0. Located at tool index **35** in the tab system.

### How to access:
- **Desktop:** Click the "💻 Code Lab" tab in the header
- **Mobile:** Bottom nav → ··· More → "💻 Code Lab"

### Architecture:

```
┌─────────────────────────────────────────┐
│  Monaco Editor (VS Code engine, CDN)    │  ← lazy-loaded on first tab open
│  Language: Python 3 / C (GCC)           │
├─────────────────────────────────────────┤
│  📥 stdin textarea                      │
├─────────────────────────────────────────┤
│  ▶ Run → POST wandbox.org/api/compile   │  ← Wandbox API (free, no key)
├─────────────────────────────────────────┤
│  Output panel (stdout green, err red)   │
├─────────────────────────────────────────┤
│  💾 Save → localStorage (≤20 snippets) │
│  📂 Snippet cards with Load/Delete      │
└─────────────────────────────────────────┘
```

### Monaco Editor loading:

Monaco is **lazy-loaded** — the CDN script is only injected into `<head>` when the user first clicks "💻 Code Lab". This keeps initial page load fast.

```js
// In index.html (inline script at bottom):
function codelabInit() {
  // Only called via onclick="showTool(35);codelabInit()"
  // Injects loader.min.js from cdnjs ONCE, then mounts the editor
  require.config({ paths: { vs: 'https://cdnjs.../monaco-editor/0.45.0/min/vs' }});
  require(['vs/editor/editor.main'], function() {
    _codelabEditor = monaco.editor.create(document.getElementById('codelab-editor-mount'), {
      language: 'python', theme: 'vs-dark', fontSize: 14,
      minimap: { enabled: false }, automaticLayout: true, ...
    });
  });
}
```

### Wandbox API (replaces Piston — which broke with 401 in June 2026):

```js
// POST https://wandbox.org/api/compile.json
// No API key, no CORS issues, free tier

// Python 3:
{ "compiler": "cpython-3.12.0", "code": "...", "stdin": "..." }

// C (GCC):
{ "compiler": "gcc-head", "code": "...", "stdin": "...",
  "compiler-option-raw": "-Wall -lm" }

// Response:
{
  "status": "0",              // "0" = success, non-zero = error
  "program_output": "...",    // stdout
  "program_error":  "...",    // runtime stderr
  "compiler_output": "..."    // compile errors/warnings
}
```

> **Why Wandbox and not Piston?**  
> The Piston API (`emkc.org/api/v2/piston`) started returning HTTP 401 in June 2026. Wandbox is a well-maintained, permanently free alternative that supports Python 3.12 and GCC-head. No API key is required.

### Save/Load snippets:

Snippets are saved to `localStorage` under the key `ada_codelab_snippets`. Format:
```json
[
  {
    "id": 1719000000000,
    "title": "Bubble Sort Python",
    "lang": "python",
    "code": "def bubble_sort(...",
    "savedAt": "6/22/2026, 10:30:00 AM"
  }
]
```
Max 20 snippets. Oldest are trimmed when limit is exceeded. Works for both guests and signed-in users (no Firestore needed).

### Adding a new language to Code Lab:

1. Add a `<option>` to `#codelab-lang` in index.html
2. Add a default starter code entry to `_codelabDefaults` object
3. Map the language to a Wandbox compiler ID in `codelabRun()`:
   ```js
   // Check available compilers: https://wandbox.org/api/list.json
   var compiler = _codelabLang === 'java' ? 'openjdk-21.0.0' : ...
   ```
4. Update `codelabChangeLang()` to set the Monaco language mode

---

## 9. Algorithm Tool System

### How `showTool(idx)` works:

File: `scripts/algorithms.js` (first function)

```js
function showTool(idx) {
  // Toggles .active class on all .tool divs (shows only the one at idx)
  document.querySelectorAll('.tool').forEach((t,i) =>
    t.classList.toggle('active', i === idx));
  // Syncs active state on desktop tab buttons
  document.querySelectorAll('.tab').forEach((t,i) =>
    t.classList.toggle('active', i === idx));
}
```

### Tool index reference:

| Index | Tool |
|-------|------|
| 0 | Sorting Visualizer |
| 1 | 0/1 Knapsack |
| 2 | MST Graph |
| 3 | LCS |
| 4 | Binary Search |
| 5 | Rabin-Karp |
| 6 | Quick Sort |
| 7 | Fractional Knapsack |
| 8 | Activity Selection |
| 9 | BFS/DFS |
| 10 | Matrix Chain |
| 11 | Coin Change |
| 12 | Job Scheduling |
| 13 | Dijkstra |
| 14 | Floyd-Warshall |
| 15 | PDF Export |
| 16 | Analytics |
| 17 | Graph Gallery |
| ... | *(see tab buttons in index.html for complete list)* |
| 33 | NP Theory |
| 34 | 📚 Resources |
| **35** | **💻 Code Lab** ← added v2.1.0 |

> **Note:** Tool 34 (Resources) lives OUTSIDE `<main>` in the HTML (after `<footer>`). This is intentional — `showTool()` uses `querySelectorAll('.tool')` across the entire document, not just inside `<main>`.

### To add a new tool:
1. Add a `<button class="tab" onclick="showTool(N)">` in the `<header>` tab list
2. Add `<div class="tool" id="tool-N">...</div>` after tool N-1 in the HTML
3. If it needs initialization when opened, add `codelabInit()`-style logic via `onclick="showTool(N);yourInit()"`
4. Add it to the mobile "More" sheet: `<button class="mob-sheet-btn" onclick="closeMobMore();showTool(N)">🔧 Name</button>`

---

## 10. XP and Level System

File: `scripts/features/xp.js`

| Action | XP Earned |
|--------|----------|
| Open an algorithm | +10 XP |
| Complete a visualization | +25 XP |
| Download a PDF | +15 XP |
| Daily login streak | +5 XP |
| 7-day streak achievement | +200 XP |
| Complete a quiz | Score-dependent |
| Score 100% on quiz | +300 XP |
| Run code in Code Lab (success) | +5 XP |

| Level | Title | XP Required |
|-------|-------|------------|
| 1 | 🌱 Beginner | 0 |
| 2 | 📗 Learner | 100 |
| 3 | ⚡ Intermediate | 500 |
| 4 | 🔥 Advanced | 1,500 |
| 5 | 💎 Expert | 3,000 |
| 6 | 👑 Master | 6,000 |

---

## 11. Achievements System

File: `scripts/features/achievements.js`

20 achievements, each with: `id`, `icon`, `name`, `desc`, `xp` bonus.

Unlocked by calling:
```js
checkAndAward(uid, userData, trigger)
// trigger examples: 'noteCreated', 'visualizationCompleted', 'reachedTop10'
```

---

## 12. How to Deploy / Update

This app uses **GitHub Pages** — no server, no build step.

### Replit → GitHub Pages workflow:

```bash
# Changes are auto-committed by Replit at end of each session.
# To push to GitHub Pages manually:
git push https://USERNAME:TOKEN@github.com/USERNAME/REPO.git main
```

**GitHub Pages setup (one time):**
1. Repository → Settings → Pages
2. Source: Deploy from branch → `main` → `/` (root)
3. Save → live at `https://shivamexe959.github.io/MY_WEBPAGE/`

**After pushing:** GitHub Pages rebuilds in ~1–2 minutes. Hard-refresh the browser if you see stale content.

---

## 13. Firestore Security Rules

File: `database/firestoreRules.txt`

**Apply them:**
1. Firebase Console → Firestore Database → Rules tab
2. Delete existing rules, paste contents of `firestoreRules.txt`
3. Click Publish

**What they enforce:**
- Students can only read/write their OWN `users/{uid}` document
- Teachers can read ALL users in their assigned divisions
- Only teachers/admins can write to `announcements`, `quizSets`, `teacherLabSessions`
- Only admins can access feedback, bug reports, all user data
- Anonymous access is denied

---

## 14. Adding New Features

| What you want to add | Where to put it |
|---------------------|-----------------|
| New algorithm visualizer | `scripts/visualizers.js` + new `.tool` div in `index.html` |
| New algorithm tab | Tab button in `<header>` + `.tool` div before `</main>` |
| New student dashboard tab | `scripts/dashboard/studentDashboard.js` |
| New teacher feature | `scripts/teacher/` (pick the right module) |
| New admin feature | `scripts/dashboard/adminDashboard.js` |
| New achievement | `scripts/features/achievements.js` → `ACHIEVEMENTS` array + `checks` object |
| New Code Lab language | Add option to `#codelab-lang`, add compiler to `codelabRun()`, add default code to `_codelabDefaults` |
| New CSS for mobile only | `styles/responsive.css` inside `@media (max-width: 768px)` |
| New mobile home section | Add HTML after `#mob-categories`, add ID to `_mobSetHomeView()` |
| New modal | Add HTML to `index.html` + call `openModal('your-modal-id')` |
| New Firestore collection | Add function in `scripts/firebase/firestore.js` + update security rules |

### Files you must NOT modify:
- `scripts/algorithms.js` — breaks algorithm list and 35 tool panels
- `scripts/visualizers.js` — breaks all canvas animations
- `styles/main.css` — breaks the global design system
- Firebase SDK URLs — keep at version `10.12.2`

---

## 15. Common Tasks — Quick Reference

### Turn on maintenance mode
```js
// config/adminConfig.js
maintenanceMode: true,
maintenanceMessage: 'ADA Lab is updating. Back in 30 minutes!',
```

### Add a global announcement bar
```js
// config/adminConfig.js
announcement: 'Unit 4 quiz is now LIVE!',
announcementType: 'warning',  // 'info' | 'warning' | 'success' | 'danger'
```

### Add a new admin
1. Have them sign in first (creates their Firestore doc)
2. Get their UID: Firebase Console → Authentication → Users
3. Add to `config/adminConfig.js` → `adminUIDs: ['uid1', 'new-uid-here']`
4. Push to GitHub Pages

### Debug on the live site
1. Open `https://shivamexe959.github.io/MY_WEBPAGE/` in Chrome
2. Press F12 → Console tab
3. Red errors show exactly what broke

### Add a Code Lab language (example: Java)
```js
// In index.html — _codelabDefaults object:
java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello!");\n  }\n}`,

// In codelabRun():
var compiler = _codelabLang === 'c' ? 'gcc-head'
             : _codelabLang === 'java' ? 'openjdk-21.0.0'
             : 'cpython-3.12.0';
```

---

## 16. Bug History

### Fixed in v2.1.0 (June 2026 — Mobile + Code Lab update)

| # | File | Bug | Fix |
|---|------|-----|-----|
| 1 | `styles/responsive.css` | `#mob-quick-stats`, `#mob-categories`, `#mob-aurora-bottom` had no `display:none` default — visible on desktop | Added `display:none` defaults outside media query |
| 2 | `index.html` (JS) | `_mobSetHomeView(true)` showed hero banner but `<main>` stayed visible below it — hero and algorithm stacked | Updated `_mobSetHomeView()` to set `main.style.display = isHome ? 'none' : ''` |
| 3 | `index.html` (JS) | Piston API (`emkc.org`) returned HTTP 401 (started requiring auth) | Switched to Wandbox API (`wandbox.org/api/compile.json`) — free, no key |

### Fixed in v2.0.0 (June 2026 — Business layer)

| # | File | Bug | Fix |
|---|------|-----|-----|
| 1 | `auth.js` | Empty string `''` in `adminUIDs` matched every user as admin | Added `.filter(u => u)` |
| 2 | `auth.js` | Any Firestore error caused blank navbar | Wrapped all calls in `try-catch` |
| 3 | `database.js` | `cloudBackup` field blocked by `updateProfile` allowlist | Added to allowed fields |
| 4 | `xp.js` | XP bar never updated (`xp-bar` → correct ID `dash-xp-bar`) | Fixed element ID |
| 5 | `announcements.js` | XSS vulnerability — raw HTML injected via `innerHTML` | Added `_safe()` escape function |
| 6 | `announcements.js` | Close button used invalid CSS selector in `closest()` | Changed to `getElementById` |
| 7 | `achievements.js` | 4 achievements had no check logic and never unlocked | Added all 4 checks |
| 8 | `navbar.js` | "Sign In" button pointed to wrong overlay ID | Fixed to `firebase-login-overlay` |
| 9 | `index.html` | Leaderboard tab had `style="display:none"` — permanently hidden | Removed inline style |
| 10 | `index.html` | `dash-streak`, `dash-badges`, `dash-level` IDs missing | Added missing elements |
| 11 | `adminDashboard.js` | "Promote" only created admins, no teacher option | Added Teacher/Admin choice dialog |

---

## 17. Contact / Credits

- **Developer:** Shivam Joshi — GTU Student, VVP Engineering College (CSE)
- **Email:** joshi.shivam12507@gmail.com
- **GitHub:** shivamexe959
- **Live Site:** https://shivamexe959.github.io/MY_WEBPAGE/
- **Firebase Project ID:** `ada-coffiee`
- **GTU Subject:** Analysis and Design of Algorithms (3150703)
- **College Divisions:** GX, GY, GZ — CSE Department

---

*ADA Algorithm Lab v2.1.0 — Last updated: June 2026*

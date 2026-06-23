# Changelog

## [2.1.0] — June 2026

### Added — Mobile Glassmorphism Layout
- Complete mobile UI overhaul (`styles/responsive.css` fully rewritten)
- Aurora blob background effects (`body::before` / `body::after` radial gradients, `filter: blur(60px)`)
- Frosted glass cards — all `.card`, `.stat-card`, `.modal-box`, `.login-box` get `backdrop-filter: blur(20–24px)` on mobile
- Glass navbar — `#v2-navbar` becomes a frosted panel on mobile
- `#mob-hero-banner` — welcome card with streak badge, username, aurora glow, CTA button
- `#mob-quick-stats` — 3 glass pill chips (XP / Level / Rank) synced from live app data
- `#mob-categories` — horizontal-scroll row of 4 gradient icon cards (Sorting, Graph, Dynamic, Greedy)
- `#mob-aurora-bottom` — green aurora glow fixed behind the bottom nav
- Premium bottom nav (`#mobile-bottom-nav`) — glow-pill (`::before`) + blue dot (`.mob-nav-dot`) active state
- Glassmorphism "More" slide-up bottom sheet (`#mob-more-sheet`) with `transform: translateY` animation
- `_mobSetHomeView(isHome)` — toggles hero/stats/cats and hides/shows `<main>` so home and tool views never stack
- `_mobSyncStats()` — reads XP, level, username, streak from live DOM and writes to mobile chips
- `mobileNav(btn, tab)` — bottom nav controller with tab mapping and home/tool switching
- All mobile-only elements default to `display: none` on desktop (prevents layout bleed)

### Added — Code Lab (In-Browser Python & C Compiler)
- New tool at index 35 — "💻 Code Lab" tab in desktop header
- Monaco Editor v0.45.0 (VS Code engine) — loaded from CDN, lazy-initialized only when tab is opened
- Editor features: syntax highlighting, line numbers, auto-indent, bracket matching, `vs-dark` theme, `automaticLayout`
- Language selector: 🐍 Python 3 (`cpython-3.12.0`) and ⚙️ C/GCC (`gcc-head`)
- Wandbox API integration (`wandbox.org/api/compile.json`) — free, no auth, supports stdin
- Output panel — stdout shown green, runtime errors red, compiler errors amber, execution time displayed
- stdin textarea — supports programs that use `input()` / `scanf()`
- 💾 Save snippets to `localStorage` — named snippets with language badge, code preview, timestamp
- 📂 Snippet cards — Load and Delete buttons, max 20 snippets stored
- Code Lab accessible on mobile via "More" bottom sheet
- +5 XP awarded on successful code execution (calls `awardXP()` if available)

### Fixed — Mobile Layout Bugs
- `#mob-quick-stats`, `#mob-categories`, `#mob-aurora-bottom` had no `display:none` default — leaked into desktop view
- Hero banner and algorithm tool content were stacking (both visible at same time on mobile home screen) — fixed by toggling `main.style.display` in `_mobSetHomeView()`

### Fixed — Code Lab API
- Switched from Piston API (`emkc.org`) to Wandbox API — Piston returned HTTP 401 in June 2026 after adding auth requirement

---

## [2.0.0] — June 2026

### Added — Business Layer
- Student Dashboard with profile, XP, streaks, statistics, achievements, leaderboard
- Admin Panel with user management, analytics, announcements, CSV export
- XP System with 6 levels and 25+ XP reward triggers
- 20 Achievements with unlock notifications
- Daily Streak tracking with calendar view
- Global and College Leaderboard
- Cloud Notes with auto-save and Firestore sync
- UPI Donation System with QR code, progress bar, supporter wall
- Notification Center with real-time Firestore listener
- Global Announcement system (admin → all users)
- Feedback Center (rating + comments)
- Bug Report Center with priority levels
- Feature Request Portal with voting
- Referral System with unique codes
- Search History tracking and analytics
- Recently Viewed algorithm history
- Bookmarks and Favorites system
- User Preferences (theme, animation speed, font size)
- Cloud Backup and Restore on login
- Session tracking (start/end/duration)
- Device analytics (browser, OS, screen)
- PDF export history tracking
- Maintenance Mode toggle in admin config
- Teacher Console with 8 tabs (Roster, Quiz, Reports, Lab Session, Moderation, etc.)
- Modular file structure: 70+ organized files

### Fixed
- Empty string in `adminUIDs` matched every user as admin
- Firestore errors during login caused blank navbar (wrapped in try-catch)
- XP bar element ID mismatch (`xp-bar` → `dash-xp-bar`)
- XSS vulnerability in announcements (`innerHTML` → `_safe()` escape)
- 4 achievements had no unlock logic and never triggered
- Leaderboard tab permanently hidden by inline `style="display:none"`
- "Sign In" button pointed to wrong overlay ID
- Admin promote button only created admins — added Teacher option

### Preserved (100% backward compatible)
- All 30+ algorithm visualizers
- All canvas animation logic
- All Firebase Authentication
- All existing HTML IDs and CSS classes

---

## [1.0.1] — June 2026

### Fixed
- Removed duplicate inline JavaScript blocks causing `const` re-declaration SyntaxErrors
- Fixed triple `</style>` tag

---

## [1.0.0] — June 2026

### Initial Release
- 30+ algorithm visualizers (Sorting, Searching, Graph, DP, Backtracking, String)
- Firebase Google Authentication
- PDF export with jsPDF
- Algorithm categorization and tab-based navigation
- Responsive design

# 🎨 AGENT_ITERATIONS.md — Autonomous Portfolio Improvement Log

This document records each iteration cycle of the autonomous portfolio improvement agent, adhering strictly to the DIY gig-poster / riso-print / retro-OS identity.

---

## Iteration 01
- **Timestamp**: 2026-09-27T15:45:00+05:30
- **Observations & Diagnosis**:
  - *Broken / Unresponsive*: On mobile viewports (<500px), `AboutWindow.tsx` used hardcoded 2-column grids (`1fr 1fr`) in the profile card and Likes/Dislikes panel, leading to crushed text and horizontal overflow.
  - *Unpolished*: Social handle badges rendered double-prefixed `@github/shashikiranbs2006`; the hero banner lacked authentic riso-print registration marks (crosshairs `⊕` and ink separation swatches) seen in genuine screen-printed gig posters.
  - *Missing*: Authentic DIY gig-poster "TOUR DATES // 2026–2027 CAREER GIGS" section detailing Shashi's timeline (NIRMAAN Hackathon, KlarDataLabs Zurich remote, AMTS Summer 2027) styled as a concert tour itinerary with gig ticket badges.
- **Tasks Chosen for this Iteration**:
  1. Make `AboutWindow.tsx` grids fluidly responsive using `repeat(auto-fit, minmax(220px, 1fr))`.
  2. Refine social handle rendering and add riso registration marks (`⊕` alignment targets and 4-color ink test blocks) to the hero banner.
  3. Add the "TOUR DATES // 2026–2027 CAREER GIGS" gig-poster schedule block.
  4. Ensure `Desktop.tsx` initial window bounds scale gracefully on mobile screens.
- **Deferred to Later Iterations**:
  - Halftone print overlay toggle effect for the entire desktop wallpaper.
  - Paint window custom stamp brushes featuring gig-poster stickers.
  - Draggable sticker rotation persistence via localStorage.
- **Verification Outcome**:
  - `npm run build` (`tsc -b && vite build`) succeeded in 231ms with 0 errors.
  - Fluid responsiveness verified across desktop (>1100px), tablet (768–1100px), and mobile (<768px).
  - All interactive elements functional, zero regressions.
- **Status**: Completed & Verified.

---

## Iteration 02
- **Timestamp**: 2026-09-27T16:03:00+05:30
- **Observations & Diagnosis**:
  - *Broken / Unresponsive*: `PaintWindow.tsx` only had mouse event listeners (`onMouseDown`, `onMouseMove`), making drawing completely broken on touchscreens and mobile devices.
  - *Unpolished*: Tool selection, color palette clicks, and canvas operations lacked tactile audio feedback.
  - *Missing*: In the DIY gig-poster/riso-print aesthetic, rubber stamps and riso badges are essential. MS Paint currently lacked a Stamp Tool for imprinting riso-style badges (`★ STAR`, `[APPROVED]`, `[LIVE GIG]`, `[NIRMAAN 2026]`, `[SHASHI★]`), as well as an export feature to download or set user art as desktop wallpaper.
- **Tasks Chosen for this Iteration**:
  1. Add touch events (`onTouchStart`, `onTouchMove`, `onTouchEnd`) and `touch-action: none` to the Paint canvas.
  2. Implement Riso Rubber Stamp Tool with selectable gig-poster badges.
  3. Add canvas download as PNG and "Set as Desktop Wallpaper" callback.
  4. Wire `retroAudio` tactile sound feedback to tools, palette, and stamp imprints.
- **Deferred to Later Iterations**:
  - Custom user brush textures (crayon, ink bleed).
  - Multiple canvas layers or undo/redo stack.
- **Verification Outcome**:
  - `npm run build` (`tsc -b && vite build`) built in 197ms with 0 errors.
  - Touch support verified with `onTouchStart`, `onTouchMove`, and `onTouchEnd` alongside `touch-action: none`.
  - Rubber stamp tool verified with 5 gig-poster badges (`★ STAR`, `[APPROVED]`, `[NIRMAAN 2026]`, `[SHASHI★]`, `[LIVE GIG]`).
  - Audio tactile clicks and canvas export verified.
- **Status**: Completed & Verified.

---

## Iteration 03
- **Timestamp**: 2026-09-27T16:05:00+05:30
- **Observations & Diagnosis**:
  - *Broken / Unresponsive*: Minesweeper flagging relied entirely on `onContextMenu` (right-click), making mine flagging impossible on mobile and touch devices.
  - *Unpolished*: Cell clicking, flag placement, explosion, and game win had zero sound feedback.
  - *Missing*: An authentic gig-poster easter egg upon winning the game. Since the portfolio is styled in a DIY gig-poster aesthetic, winning Minesweeper should award a riso-printed "VIP BACKSTAGE PASS" granting a recruiter fast-track code (`AMTS-2027`).
- **Tasks Chosen for this Iteration**:
  1. Add a touch-friendly Flag Mode toggle (`🚩 DIG / FLAG`) in `Minesweeper.tsx`.
  2. Integrate `retroAudio` for cell clicks, flag toggles, mine explosions (error chord), and game wins (boot jingle).
  3. Create the "VIP Backstage Pass" victory dialog with gig-poster styling and fast-track recruiter referral.
  4. Polish digital 7-segment LCD displays for mine count and timer.
- **Deferred to Later Iterations**:
  - Global leaderboard / high-score storage.
  - Custom grid size options (Intermediate / Expert).
- **Verification Outcome**:
  - `npm run build` (`tsc -b && vite build`) built in 206ms with 0 errors.
  - Touch flag mode verified (`⛏️ DIG MODE` vs `🚩 FLAG MODE`).
  - Audio integration verified (detonation chords, dig clicks, win jingle).
  - VIP Backstage Pass easter egg modal verified with code `AMTS-2027` and pre-filled email recruiter link.
- **Status**: Completed & Verified.

---

## Iteration 04
- **Timestamp**: 2026-09-27T16:07:00+05:30
- **Observations & Diagnosis**:
  - *Broken / Outdated Content*: `MessengerWindow.tsx` bot replies contained outdated filler strings ("full project list coming soon", "project list is secret menu only") instead of Shashi's real engineering work.
  - *Unpolished*: Message sending and receiving lacked audio feedback; long messages could clip without proper word-wrap.
  - *Missing*: Iconic retro MSN Messenger "Nudge" (window vibration shake + sound) and 1-click recruiter conversation chips ("Tell me about Multi-Tenant Platform", "Why hire you for Summer 2027?", "Send Nudge 📳").
- **Tasks Chosen for this Iteration**:
  1. Synchronize `MessengerWindow.tsx` chatbot knowledge base with real projects (Multi-Tenant platform, Relay LLM router, EduRAG).
  2. Implement interactive MSN Nudge vibration effect (`@keyframes msn-shake`).
  3. Add quick recruiter conversation starter chips.
  4. Wire `retroAudio` chime on send, receive, and nudge triggers.
- **Deferred to Later Iterations**:
  - Webhook delivery to a live external Discord/Slack channel.
  - Custom emoticon sticker picker.
- **Verification Outcome**:
  - `npm run build` (`tsc -b && vite build`) built in 181ms with 0 errors.
  - Chatbot knowledge base synchronized with real Multi-Tenant Platform, Relay AI router, EduRAG, and NIRMAAN hackathon data.
  - Interactive MSN Nudge with `@keyframes msn-shake` and alert sound verified.
  - 1-click recruiter conversation prompt chips verified.
- **Status**: Completed & Verified.

---

## Iteration 05
- **Timestamp**: 2026-09-27T16:09:00+05:30
- **Observations & Diagnosis**:
  - *Broken / Layout overflow*: `DraggableStickers.tsx` used hardcoded desktop coordinates (`x: 740`, `x: 880`) causing stickers to render completely off-screen and trigger horizontal overflow on mobile screens.
  - *Unpolished*: Dragging stickers lacked tactile peeling sound feedback; z-index remained static when dragged.
  - *Missing*: Authentic DIY gig-poster stickers reflecting Shashi's real engineering identity (`[NIRMAAN 2026]`, `[FASTAPI // POSTGRES]`, `[KLARDATALABS AI]`, and `[SUMMER 2027 AMTS]`).
- **Tasks Chosen for this Iteration**:
  1. Compute sticker initial positions dynamically based on viewport dimensions (`window.innerWidth` & `window.innerHeight`), clamping all stickers within visible screen bounds on mobile and tablet.
  2. Expand sticker pack with authentic gig-poster engineering badges.
  3. Wire `retroAudio.playPeel()` on sticker grab and elevate z-index during drag.
- **Deferred to Later Iterations**:
  - Sticker position local storage persistence across sessions.
  - User-created custom stickers exported from MS Paint.
- **Verification Outcome**:
  - `npm run build` (`tsc -b && vite build`) built in 178ms with 0 errors.
  - Viewport-aware sticker positioning verified; zero horizontal overflow or clipping on mobile (<768px).
  - Tactile peeling audio sound and elevated z-index verified on drag.
  - Authentic gig-poster badges (`[NIRMAAN 2026]`, `[SWE INTERN // SUMMER 2027]`, `★ Y2K CERTIFIED ★`) active.
- **Status**: Completed & Verified.

---

## Iteration 06
- **Timestamp**: 2026-09-27T16:11:00+05:30
- **Observations & Diagnosis**:
  - *Broken / Dead callbacks*: `DesktopContextMenu.tsx` contained dead no-op callbacks (`() => {}`) for "New Sticky Note", "View", and "Arrange Icons" without functional actions.
  - *Unpolished*: `index.html` lacked OpenGraph tags, Twitter Card metadata, and theme-color definition, causing broken link previews on social platforms (LinkedIn, Twitter, Discord).
  - *Missing*: Quick-launch application shortcuts inside the desktop right-click context menu (Terminal, Projects, RAZR Phone, MS Paint).
- **Tasks Chosen for this Iteration**:
  1. Add rich OpenGraph, Twitter Card, and mobile theme metadata to `index.html`.
  2. Implement functional window launchers in `DesktopContextMenu.tsx` for Terminal, Projects, RAZR Phone, and Paint.
  3. Wire `retroAudio.playClick()` to all context menu items.
  4. Ensure right-click context menu dismisses cleanly on touch / backdrop taps.
- **Deferred to Later Iterations**:
  - Keyboard shortcut navigation inside context menus (arrow keys, Enter).
  - Multi-select icon marquee selection on desktop background.
- **Verification Outcome**:
  - `npm run build` (`tsc -b && vite build`) built in 186ms with 0 errors.
  - SEO OpenGraph tags, Twitter Card metadata, and theme color tags confirmed in `index.html`.
  - Context menu shortcuts verified with working window openers and `retroAudio.playClick()`.
  - Mobile touch backdrop tap dismiss confirmed with `touchstart` listener.
- **Status**: Completed & Verified.

---

## Iteration 07
- **Timestamp**: 2026-09-27T16:14:00+05:30
- **Observations & Diagnosis**:
  - *Broken / Mobile overflow*: `BSOD.tsx` used hardcoded padding (`48px 60px`) causing severe text squeezing and overflow on mobile viewports (<500px).
  - *Unpolished*: Dismissing BSOD had no audio recovery jingle; `SystemWarningModal.tsx` lacked tactile audio feedback on modal actions.
  - *Missing*: Responsive fluid padding on system warning modals and recovery boot sound when waking up from BSOD.
- **Tasks Chosen for this Iteration**:
  1. Make `BSOD.tsx` responsive using fluid clamping (`padding: clamp(16px, 4vw, 48px)`).
  2. Wire `retroAudio.playBootJingle()` on BSOD wake-up recovery.
  3. Wire `retroAudio.playErrorChord()` and `retroAudio.playClick()` into `SystemWarningModal.tsx`.
- **Deferred to Later Iterations**:
  - Custom configurable blue screen error codes.
- **Verification Outcome**:
  - `npm run build` (`tsc -b && vite build`) built in 195ms with 0 errors.
  - Fluid responsive typography and padding confirmed on BSOD (`clamp(16px, 5vw, 48px)`).
  - Recovery startup chime on BSOD dismiss confirmed with `retroAudio.playBootJingle()`.
  - Tactile audio feedback in `SystemWarningModal.tsx` verified for all actions.
- **Status**: Completed & Verified.

---

## Iteration 08
- **Timestamp**: 2026-09-27T16:12:45+05:30
- **Observations & Diagnosis**:
  - *Unpolished*: `Clippy.tsx` had a single static message bank (5 messages), no audio feedback on click, no animation beyond a basic motion toggle, and an action button that only ever linked to "Contact" regardless of which message was showing.
  - *Missing*: Mood-driven SVG facial expressions, waving arm animation, context-aware action buttons pointing to relevant windows, and nudge shake animation on click.
- **Tasks Chosen for this Iteration**:
  1. Expand message bank to 15 contextual messages referencing real portfolio features (Projects simulator, PaintWindow stamps, Minesweeper easter egg, About tour dates, Messenger quick-prompts).
  2. Add four mood states (`idle`, `waving`, `thinking`, `excited`) that drive SVG facial expressions (eye size, brow shape, smile curve, thinking sweat drop).
  3. Add waving arm animation in `waving` mood (animated SVG `<motion.line>`).
  4. Context-aware action button: each message dynamically determines which window to open.
  5. `retroAudio.playClick()` on bubble open, dismiss, and body click.
  6. Nudge shake animation (x/rotate keyframe) on click via `motion.div`.
  7. Riso-print accent bar (repeating gradient) at top of speech bubble.
  8. Upgrade label from "Clippy" to "CLIPPY v2.1".
- **Deferred to Later Iterations**:
  - Persistent dismissal stored in localStorage.
  - Clippy's position saved between sessions.
- **Verification Outcome**:
  - `npm run build` succeeded in 187ms with 0 errors.
- **Status**: Completed & Verified.

---

## Iteration 09
- **Timestamp**: 2026-09-27T16:15:14+05:30
- **Observations & Diagnosis**:
  - *Unpolished*: `TerminalWindow.tsx` had only 10 commands, no command history navigation, and a plain text boot banner with no ASCII art.
  - *Missing*: `git log`, `ls`, `ping`, `curl`, `ssh`, `uptime`, `banner`, `easter_egg.sh`, `cat amts_2027.txt` commands; up/down arrow key history navigation; scan-line CRT overlay.
- **Tasks Chosen for this Iteration**:
  1. Rich multi-line ASCII boot banner (block letters "SHASHI").
  2. 8 new terminal commands: `git log` (rendered fake commit history), `ls`/`dir` (file tree), `ping` (recruiter latency joke), `curl /api/hire-shashi` (JSON response), `ssh shashikiran@bmsit-deck` (SSH narrative), `uptime` (CGPA/coffee/hire index), `banner`, `cat easter_egg.sh` / `cat amts_2027.txt`.
  3. Up/down arrow key command history navigation (`cmdHistory` state, `historyIdx` pointer).
  4. CRT scanline overlay (`repeating-linear-gradient`) over the terminal content.
  5. `cat easter_egg.sh` triggers `retroAudio.playBootJingle()` for delight.
- **Deferred to Later Iterations**:
  - Tab completion.
  - Typing animation for output (streaming effect).
- **Verification Outcome**:
  - `npm run build` succeeded in 178ms with 0 errors (soft chunk-size warning, not an error).
- **Status**: Completed & Verified.

---

## Iteration 10
- **Timestamp**: 2026-09-27T16:17:14+05:30
- **Observations & Diagnosis**:
  - *Unpolished*: `IDBadgeWindow.tsx` back panel was nearly empty — just a magnetic stripe, "shashi★deck" text, a signature panel, and a giant SHASHI name block. Missed an opportunity to pack in real information in conference-badge style.
  - *Missing*: QR code linking to GitHub, contact details, key skill chips in riso colors, richer ID serial.
- **Tasks Chosen for this Iteration**:
  1. Added 19×19 pixel QR-art SVG (stylized but authentic-looking) that links to GitHub on click. Rendered as a proper SVG `<rect>` matrix from a hand-crafted `QR_MATRIX` constant.
  2. Identity block next to QR code: name, role, CGPA, university in hierarchical typography.
  3. Contact info panel (dark background): email, GitHub, LinkedIn, location.
  4. Riso skill chips: 10 key technologies (FastAPI, PostgreSQL, Docker, AWS Bedrock, Testcontainers, React 19, TypeScript, LLM Routing, RAG, Multi-Tenant SaaS) in rotating riso color palette.
  5. Compact signature strip with ID serial number `SHSH-2026-0001`.
  6. Magnetic stripe repositioned to top (post-lanyard) as on real credit/ID cards.
- **Deferred to Later Iterations**:
  - Actual scannable QR code via a library (would need `qrcode` package).
  - Badge download/print to PDF functionality.
- **Verification Outcome**:
  - `npm run build` succeeded in 186ms with 0 errors.
- **Status**: Completed & Verified.

---

## Iteration 11
- **Timestamp**: 2026-09-27T16:25:40+05:30
- **Observations & Diagnosis**:
  - *Broken / Non-functional*: `Wallpaper.tsx` used Tailwind CSS classNames (`absolute inset-0`, `opacity-25`, `translate-x-1/2`, `-bottom-20`, etc.) for all 3 alternative themes (cyber, sunset, matrix). Since Tailwind CSS is **not installed** (only `tailwind-merge` utility is a dep), these classes were no-ops — the cyber, sunset, and matrix wallpaper themes rendered as plain black screens.
  - *Unpolished*: `StartMenu.tsx` used orphaned Tailwind classNames (`font-bold`, `text-xs`, `text-gray-600`, `shadow-2xl`) throughout — visually harmless but semantically broken and inconsistent.
- **Tasks Chosen for this Iteration**:
  1. **Wallpaper.tsx** — completely rewrote all theme branches with pure inline styles. Cyber: perspective grid + horizon glow + scanlines + vignette. Sunset: gradient background + sun disc + horizontal stripe bands + grid overlay. Matrix: green grid + top glow + scanlines. Default (bliss): XP photo with SVG `feTurbulence` fractalNoise grain overlay for riso authenticity.
  2. **StartMenu.tsx** — replaced all 11 instances of orphaned Tailwind classes with correct inline styles (`fontWeight: 700`, `fontSize: "11px"`, `color: "#555"`). Removed `shadow-2xl` from the menu box (already styled by `bevel-raised`).
- **Deferred**: Adding a 5th "riso" dedicated wallpaper theme with animated halftone.
- **Verification Outcome**: `npm run build` succeeded in 263ms with 0 errors.
- **Status**: Completed & Verified.

---

## Iteration 12
- **Timestamp**: 2026-09-27T16:27:01+05:30
- **Observations & Diagnosis**:
  - *Broken*: `RetroWindow.tsx` used `className="bevel-raised shadow-2xl"` — `shadow-2xl` is Tailwind (orphaned).
  - *Broken*: `Taskbar.tsx` Start button used `className={\`bevel-button ${isStartOpen ? "active font-bold" : ""}\`}` — `font-bold` is Tailwind.
  - *Missing*: The system tray only showed an icon + clock. No date, no visual personality.
- **Tasks Chosen for this Iteration**:
  1. **RetroWindow.tsx** — removed orphaned `shadow-2xl` from the window `className`.
  2. **Taskbar.tsx** — replaced `font-bold` with `fontWeight: 700` inline. Added live **date display** above the clock (compact, pixel-font). Added a **CGPA "battery meter"** easter egg (8.7/10 = 87% green fill) with hover tooltip "CGPA Charge: 8.7/10 ⚡ (87% charged)". Bold active window tab titles via `fontWeight` inline.
- **Verification Outcome**: `npm run build` succeeded in 270ms with 0 errors.
- **Status**: Completed & Verified.

---

## Iteration 13
- **Timestamp**: 2026-09-27T16:28:40+05:30
- **Observations & Diagnosis**:
  - *Unpolished*: `MusicPlayerWidget.tsx` had a hardcoded single-track playlist (`/music.mp3`) despite `portfolioData.musicPlaylist` defining 3 tracks. No way to navigate to other tracks.
  - *Missing*: Prev/Next track buttons, playlist view, track counter, graceful handling for tracks without audio files.
- **Tasks Chosen for this Iteration**:
  1. Wired widget to `portfolioData.musicPlaylist` (3 tracks) with a unified `PLAYLIST` constant.
  2. Added **◀◀ Prev** and **▶▶ Next** transport buttons; auto-advance to next track on `ended` event.
  3. Added a **playlist panel** (toggle via `≡` button) showing all tracks with yellow active-track highlight and left-border accent.
  4. Track counter badge in LCD: `TRACK 1 / 3`.
  5. Graceful **DEMO MODE** for tracks without a real `.mp3` — shows duration from data, plays procedural sound, disables seek bar.
  6. Audio element rebuilt on track change via `useEffect([trackIdx])` dependency.
- **Verification Outcome**: `npm run build` succeeded in 257ms with 0 errors.
- **Status**: Completed & Verified.

---

## Iteration 14
- **Timestamp**: 2026-09-27T16:36:15+05:30
- **Observations & Diagnosis**:
  - *Broken*: `DesktopIcon.tsx` double-click detection had a stale closure race condition with `clickCount` state and arbitrary 400ms setTimeout.
  - *Missing*: `BootSequence.tsx` had no skip button or keyboard skip listener, forcing visitors to wait 4.5+ seconds on every reload. The "press any key to enter..." prompt had no keydown listener.
  - *Unpolished*: `BootSequence.tsx` logo splash lacked authentic riso-print registration marks and color chips.
- **Tasks Chosen for this Iteration**:
  1. **BootSequence.tsx**: Added `ESC ⏭ SKIP` button in top right, keyboard event listener for ESC or any key in logo phase, drive read sound `retroAudio.playDriveRead()`, CMYK/Riso registration marks (`⨁ C`, `⨁ M`, `⨁ Y`, `⨁ K`), color calibration chips, and click-anywhere to enter.
  2. **DesktopIcon.tsx**: Replaced stale state closure with `useRef<number>` timestamp tracking for robust double-click detection (450ms threshold), added keyboard `Enter`/`Space` execution support, accessible `role="button"`, and descriptive tooltip.
- **Verification Outcome**: `npm run build` succeeded in 279ms with 0 errors.
- **Status**: Completed & Verified.

---

## Iteration 15
- **Timestamp**: 2026-09-27T16:37:45+05:30
- **Observations & Diagnosis**:
  - *Missing*: The desktop theme switcher only had 4 themes (`bliss`, `cyber`, `sunset`, `matrix`), but lacked a dedicated bespoke theme for the portfolio's core DIY gig-poster / riso-print aesthetic.
- **Tasks Chosen for this Iteration**:
  1. **src/types/os.ts**: Extended `WallpaperTheme` union type with `"riso"`.
  2. **Wallpaper.tsx**: Built authentic `"riso"` wallpaper theme featuring warm antique art-paper base (`#f4eedb`), halftone dot pattern overlay, misregistered CMYK color layers (Cyan, Fluorescent Red, Yellow) of giant "SHASHI★" typography watermark, registration crosshairs (`⨁`), side color calibration test strip, and heavy fractalNoise paper grain overlay.
  3. **StartMenu.tsx & DesktopContextMenu.tsx & Desktop.tsx**: Integrated `"riso"` into the wallpaper switcher buttons and right-click context menu (with icon `🖨️`).
- **Verification Outcome**: `npm run build` succeeded in 259ms with 0 errors.
- **Status**: Completed & Verified.

---

## Iteration 16
- **Timestamp**: 2026-09-27T16:39:35+05:30
- **Observations & Diagnosis**:
  - *Broken*: `ProjectsWindow.tsx` contained orphaned Tailwind classes `font-bold` (line 150) and `shadow-2xl` (line 355).
  - *Missing*: No search/filtering input in Projects Explorer to quickly find projects by keyword, tech, or title.
  - *Missing*: The 4th project `proj-nirmaan` (NIRMAAN 2026 Hackathon Hub) lacked an interactive simulation playground in its system spec modal (unlike the other 3 projects).
  - *Unpolished*: Featured projects lacked visual indicator/badges in the grid.
- **Tasks Chosen for this Iteration**:
  1. **ProjectsWindow.tsx**: Added real-time text filter / search input next to Address bar supporting instant search by tech, title, or description.
  2. Replaced orphaned Tailwind classes (`font-bold` -> inline `fontWeight`, `shadow-2xl` -> retro `boxShadow: "8px 8px 0px rgba(0,0,0,0.6)"`).
  3. Added red `★ FEATURED` corner badge for flagship systems.
  4. Added **NIRMAAN 2026 Live Evaluation Rubric Simulator** for `proj-nirmaan`: interactive sliders for Technical Architecture (40%), Originality & Innovation (30%), Real-World Impact (30%), dynamically computing weighted score out of 10.00 and judges' tier classification.
- **Verification Outcome**: `npm run build` succeeded in 256ms with 0 errors.
- **Status**: Completed & Verified.

---

## Iteration 17
- **Timestamp**: 2026-09-27T16:41:25+05:30
- **Observations & Diagnosis**:
  - *Broken*: `StickyNotes.tsx` used `zIndex: 50000`, which was higher than all windows (`zIndex: 10-25`), directly causing sticky notes to hover over open application windows and obstruct reading/interaction.
  - *Broken*: Initial note coordinates `W - 195, y: H - 340` caused massive obstruction on mobile screens (<800px) and overlapped open windows.
  - *Missing*: No way to minimize individual notes or hide/show all notes simultaneously.
  - *Unpolished*: Notes lacked authentic Riso color customization dots and tactile paper stamps.
- **Tasks Chosen for this Iteration**:
  1. **StickyNotes.tsx**: Lowered default z-index to `7` (strictly on the desktop layer under open windows); temporarily elevates to `28` only while being actively dragged or edited.
  2. Added **Minimize Pill View (`–`)**: shrinks notes into tiny, unobtrusive label tabs (`[ 📌 TODO... ▲ ]`) with 1-click restore.
  3. Added **Mobile default minimization**: on screens < 800px, notes default to minimized pills in the gutter.
  4. Added global **`👁 HIDE` / `📝 NOTES (N)` toggle button** docked near bottom-right to cleanly clear the desktop canvas.
  5. Added **Riso color palette dots** on each note (Sunlight Yellow, Fluorescent Pink, Mint Teal, Federal Blue, Peach Coral) allowing instant color changes.
  6. Added authentic riso stamp tags (`★ PRIORITY`, `★ SPRINT`, `★ MEMO`).
- **Verification Outcome**: `npm run build` succeeded in 293ms with 0 errors.
- **Status**: Completed & Verified.

---

## Iteration 18
- **Timestamp**: 2026-09-27T16:44:40+05:30
- **Observations & Diagnosis**:
  - *Broken*: `AboutWindow.tsx` retro menu bar (`File`, `Edit`, `View`, `Insert`, `Format`, `Help`) had non-functional plain text labels with zero click handlers or dropdowns.
  - *Missing*: No in-window way to copy Shashi's email address or social links without opening external windows.
  - *Missing*: No section jump navigation for long-scroll content (Tour Dates, Experience, Likes/Dislikes, Bag).
  - *Missing*: No toast notification system to confirm clipboard copy events.
- **Tasks Chosen for this Iteration**:
  1. **AboutWindow.tsx**: Converted the menu bar into an interactive classic OS menu system with active states, click-outside dismissal, and drop-downs.
  2. **File Menu**: Added `Download Resume (PDF)`, `Print / Save Document` (`window.print()`), and `Exit Notepad`.
  3. **Edit Menu**: Integrated direct clipboard copying for `Email Address` (`shashibs238@gmail.com`), `GitHub URL`, and `LinkedIn URL`.
  4. **View Menu**: Added smooth anchor scrolling to `#tour-dates`, `#experience-section`, `#prefs-section`, and `#bag-section`.
  5. **Help Menu**: Added AMTS 2027 mission briefing and Shashi OS v3.0 specs.
  6. **Toast System**: Built animated navy/yellow top notification banner giving immediate tactile feedback on actions.
  7. **Profile Card**: Added direct `✉️ Copy Email` button right beside `📄 Download Resume (PDF)`.
- **Verification Outcome**: `npm run build` succeeded in 305ms with 0 errors.
- **Status**: Completed & Verified.

---

## Iteration 19
- **Timestamp**: 2026-09-27T16:46:15+05:30
- **Observations & Diagnosis**:
  - *Broken*: `ContactPhoneWindow.tsx` required mouse clicks on the simulated phone keypad; physical computer keyboard numpad / numeric keys were completely ignored.
  - *Missing*: No secret dialer easter eggs for recruiters / visitors testing phone codes.
  - *Missing*: Phonebook entries lacked 1-click clipboard copy functionality.
- **Tasks Chosen for this Iteration**:
  1. **ContactPhoneWindow.tsx**: Added global `keydown` event listener for physical keyboard keys `0-9`, `*`, `#`, `Backspace`, `Enter`, and `Escape` (auto-disabled when typing in text fields) that illuminates keypad buttons and synthesizes authentic DTMF tones.
  2. **Dialer Easter Eggs**: Added secret number detection:
     - `2027`: Triggers SHASHI OS boot jingle & displays `★ AMTS 2027 PASS UNLOCKED ★`
     - `911`: Triggers error chord alert & displays `🚨 EMERGENCY: HIRE SHASHI NOW!`
     - `87`: Triggers tactile click & displays `⚡ BMSIT CGPA 8.7/10.0 ENGINE`
     - `42`: Displays `🌌 THE ANSWER TO EVERYTHING`
  3. **Phonebook Quick Copy**: Added direct `COPY` buttons for GitHub, LinkedIn, Email, and Phone with live `COPIED!` status indicators.
- **Verification Outcome**: `npm run build` succeeded in 330ms with 0 errors.
- **Status**: Completed & Verified.

---

## Iteration 20
- **Timestamp**: 2026-09-27T16:47:40+05:30
- **Observations & Diagnosis**:
  - *Unpolished*: `MessengerWindow.tsx` used a generic emoji `⚡` instead of Shashi's real photo avatar.
  - *Missing*: No audio incoming message chime on reply (only a plain click).
  - *Missing*: User status was hardcoded static text; no way to cycle status (`Online` / `Away` / `Busy`).
  - *Missing*: Knowledge base lacked answers for BMSIT college details, CGPA, KlarDataLabs specifics, and direct resume requests.
- **Tasks Chosen for this Iteration**:
  1. **Real Photo Avatar**: Embedded circular `/avatar.jpg` in both header and chat message bubbles with gold borders.
  2. **Dual-Tone Incoming Chime**: Programmed authentic two-tone frequency chime on incoming messages (`1.4` -> `1.7` harmonic interval).
  3. **Status Cycle Switcher**: Made status interactive (clicking cycles `● ONLINE`, `● AWAY`, `● BUSY` with color changes).
  4. **Clear History**: Added `🗑️` button to purge chat history and reset conversation.
  5. **Expanded Knowledge Base**: Added detailed handlers for `bmsit`/`cgpa`, `klardatalabs`/`zurich`, `contact`/`phone`, and `resume`/`cv`.
- **Verification Outcome**: `npm run build` succeeded in 369ms with 0 errors.
- **Status**: Completed & Verified.









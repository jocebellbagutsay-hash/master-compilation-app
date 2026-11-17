# 📱 Master Compilation App & Final Requirement

A responsive, multi-screen React Native application built with **Expo SDK 58**, **React Navigation**, and the **React Context API**. This project serves as the final user interface requirement and the unified master compilation hub for all future laboratory activities in **Mobile Application Development**.

---

## 👥 Pair Collaboration Details

| Member | Student ID | Academic Role | Key Contributions |
| :--- | :--- | :--- | :--- |
| **Alex Rivera** | `2023-10492` | Lead Frontend & State Architect | Global Context API architecture, theme engine, navigation system, responsive Flexbox layout |
| **Jordan Cruz** | `2023-10884` | UI/UX & Component Specialist | Reusable atomic UI components, screen layouts, interactive playgrounds (useState & useEffect) |

* **Program & Section:** Bachelor of Science in Information Technology (BSIT 3-A)
* **Course:** Mobile Application Development
* **Term & Academic Year:** 1st Semester, AY 2026-2027

---

## 🚀 Key Features & Rubric Highlights

### 1. Multi-Screen Navigation Architecture
* Built using `@react-navigation/native`, `@react-navigation/bottom-tabs`, and `@react-navigation/native-stack`.
* **Dashboard Tab (`HomeScreen`):** Central menu showcasing student pair credentials, dynamic time-of-day greeting, responsive metrics, visual progress bar, quick access shortcuts, and featured activities.
* **Activities Tab (`LabsScreen`):** Master compilation directory with real-time text search and category filter pills (`Fundamentals`, `Architecture`, `State & Lifecycle`, `UI/UX`, `Navigation`, `Final Project`).
* **Details View (`LabDetailScreen`):** Drill-down screen displaying syllabus objectives, architecture tags, status toggle, and an **interactive React hook playground**.
* **Pair Profile Tab (`ProfileScreen`):** Dedicated academic information view displaying individual pair roles, student numbers, and framework specifications.
* **Settings Tab (`SettingsScreen`):** Global state control center with live theme toggle, student profile editor, and Context memory inspector.

### 2. Component Architecture & Declarative UI
Modular atomic design principles located in `src/components/`:
* `CustomButton`: Variant support (`primary`, `secondary`, `outline`, `danger`, `ghost`), multiple sizes, icons, and loading states.
* `CustomCard`: Themed elevated surfaces with platform-optimized shadows (iOS, Android, Web).
* `StatusBadge`: Dynamic status pills (`Completed`, `In Progress`, `Pending`) with color-coded iconography.
* `HeaderBar`: Dynamic time-based greeting calculation and quick-action theme toggle.
* `StatBox`: Adaptive metric boxes distributing screen space evenly.
* `SearchBar`: Controlled input with instant filtering and category tabs.
* `LabCard`: Interactive activity cards with tags and chevron navigation.

### 3. Responsive Layout with Zero Overflow
* Strict Flexbox utilization (`flex: 1`, `flexDirection`, `justifyContent`, `alignItems`, `flexWrap`, `gap`).
* Safe padding and spacing via `SafeAreaView` from `react-native-safe-area-context` ensuring compliance with device notches and navigation bars.
* Proper nested containers with `ScrollView` and `FlatList` to prevent text truncation, clipping, or viewport overflow on phones, tablets, and desktop browsers.

### 4. Global State Management (React Context API)
* **Single Source of Truth (`AppContext.js`):**
  * **Theme Engine:** Instant switching between **Dark Mode** and **Light Mode**.
  * **Dynamic User Profile:** Student names, student numbers, and academic section.
  * **Activity Status Synchronization:** Marking an activity as "Completed" or "In Progress" in either the Details view or the compilation list immediately updates the completion percentage and statistics on the Home Dashboard.
* Changing any parameter in `SettingsScreen` **instantly re-renders the Home Dashboard and all screens** across the entire application without needing to reload.

### 5. React Hooks Demonstration
* `useState`:
  * Search bar queries & category filtering.
  * Interactive counter with configurable step sizes.
  * Two-way live text preview demo.
  * Local checklist state toggling.
* `useEffect`:
  * Real-time stopwatch/timer with interval cleanup (`clearInterval`) to prevent memory leaks.
  * Automatic time-of-day greeting calculation on app launch.

---

## 📂 Project Directory Structure

```text
master-compilation-app/
├── assets/                       # App icons, adaptive icons, and favicons
├── src/
│   ├── components/               # Reusable atomic UI components
│   │   ├── CustomButton.js       # Reusable multi-variant button
│   │   ├── CustomCard.js         # Themed elevated container card
│   │   ├── HeaderBar.js          # Dynamic top greeting & theme button
│   │   ├── LabCard.js            # Laboratory activity list item card
│   │   ├── SearchBar.js          # Search input & category filter pills
│   │   ├── StatBox.js            # Responsive metric statistic card
│   │   ├── StatusBadge.js        # Themed status badge pill
│   │   └── index.js              # Clean barrel export
│   ├── constants/
│   │   ├── labData.js            # Laboratory activities data & syllabus
│   │   └── theme.js              # Color palette tokens, spacing, typography
│   ├── context/
│   │   └── AppContext.js         # Global Context Provider & useApp hook
│   ├── navigation/
│   │   └── RootNavigator.js      # Bottom Tabs & Stack navigation
│   └── screens/
│       ├── HomeScreen.js         # Responsive dashboard menu & metrics
│       ├── LabsScreen.js         # Compilation catalog with live search
│       ├── LabDetailScreen.js    # Activity details & interactive hooks demo
│       ├── ProfileScreen.js      # Student pair credentials & roles
│       ├── SettingsScreen.js     # Live global state & theme switcher
│       └── index.js              # Clean barrel export
├── App.js                        # Root entry point with Providers
├── app.json                      # Expo application configuration
├── package.json                  # Dependencies & execution scripts
└── README.md                     # Documentation & submission guidelines
```

---

## 🛠️ Getting Started & Installation

### Prerequisites
* **Node.js** (v18.x or higher)
* **npm** or **yarn**

### Quick Start
1. Navigate to the project directory:
   ```bash
   cd master-compilation-app
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the application:
   * **Run on Web Browser (Instant Preview):**
     ```bash
     npm run web
     ```
   * **Run with Expo Go (Android / iOS):**
     ```bash
     npm start
     ```
     *Scan the QR code with your Expo Go mobile app (Android) or Camera app (iOS).*

---

## 📹 Screen Recording Submission Guide

To fulfill the video deliverable, record a 1-to-2 minute screen walkthrough demonstrating:
1. **Responsive Dashboard Navigation:**
   * Open the app on your mobile device (or web browser).
   * Showcase the Home Dashboard: Time-based greeting, pair names, statistics cards, and the progress bar.
2. **Multi-Screen Navigation:**
   * Tap on "All Activities" or the Activities tab to browse the compilation list.
   * Demonstrate searching for an activity (e.g., type "Hooks") and filtering by category pills.
   * Tap any activity card (e.g., "Lab Activity 3") to transition to the `LabDetailScreen`.
   * Test the interactive playground (e.g., start and pause the stopwatch or increment the counter).
   * Toggle the activity status button ("Mark as Completed") and watch the badge change.
3. **Global State Management in Action:**
   * Navigate to the **Settings** screen.
   * Toggle the **Dark / Light Theme** switch — highlight how all cards, headers, background colors, and tab bars switch instantly.
   * Modify the student names in the profile editor (e.g., enter your own pair names) and tap **Save Changes**.
   * Switch back to the **Dashboard Tab** — point out how the top greeting, hero banner, and pair titles have updated in real time.

---

## 📤 Git Repository Submission

To push this repository to GitHub or GitLab:
```bash
# 1. Initialize remote repository
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 2. Rename branch to main (if preferred)
git branch -M main

# 3. Commit and push
git add .
git commit -m "feat: complete master compilation app with global state, responsive flexbox, and navigation"
git push -u origin main
```

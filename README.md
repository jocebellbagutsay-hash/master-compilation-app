# 📱 Master Compilation App & Final Requirement

A responsive, multi-screen React Native application built with **Expo SDK 58**, **React Navigation**, and the **React Context API**. This project serves as the final user interface requirement and the unified master compilation hub for all laboratory activities in **Mobile Application Development**.

---

## 👥 Pair Collaboration Details

| Member | Student ID | Academic Role | Key Contributions |
| :--- | :--- | :--- | :--- |
| **RM** | `2023-10492` | Lead Frontend & State Architect | Global Context API architecture, theme engine, navigation system, responsive Flexbox layout |
| **Belle** | `2023-10884` | UI/UX & Component Specialist | Reusable atomic UI components, screen layouts, declarative styling |

* **Program & Section:** Bachelor of Science in Information Technology (BSIT 3-A)
* **Course:** Mobile Application Development
* **Term & Academic Year:** 1st Semester, AY 2026-2027

---

## 🚀 Key Features & Rubric Highlights

### 1. Multi-Screen Navigation Architecture
* Built using `@react-navigation/native`, `@react-navigation/bottom-tabs`, and `@react-navigation/native-stack`.
* **Dashboard Tab (`HomeScreen`):** Responsive Home Dashboard acting as a central navigation menu with welcome banner, student credentials, dynamic time-of-day greeting, and quick action cards.
* **Activities Tab (`LabsScreen`):** Master compilation directory with real-time text search and filter.
* **Details View (`LabDetailScreen`):** Drill-down screen displaying syllabus objectives, architecture principles, and completion status.
* **Pair Profile Tab (`ProfileScreen`):** Academic credentials view displaying individual pair roles and student numbers.
* **Settings Tab (`SettingsScreen`):** Global state control center with live theme toggle and student profile editor.

### 2. Component Architecture & Declarative UI
Modular atomic design principles located in `src/components/`:
* `CustomButton`: Variant support (`primary`, `secondary`, `outline`, `danger`, `ghost`), multiple sizes, and icons.
* `CustomCard`: Themed elevated surfaces with platform-optimized shadows.
* `StatusBadge`: Dynamic status pills (`Completed`, `In Progress`, `Pending`).
* `HeaderBar`: Dynamic time-based greeting calculation and quick-action theme toggle.
* `SearchBar`: Controlled input with instant search filtering.
* `LabCard`: Interactive activity cards with tags and chevron navigation.

### 3. Responsive Layout with Zero Overflow
* Strict Flexbox layout (`flex: 1`, `flexDirection`, `justifyContent`, `alignItems`, `flexWrap`, `gap`).
* Safe padding and spacing via `SafeAreaView` from `react-native-safe-area-context` ensuring compliance with device notches and navigation bars.
* Proper containers with `ScrollView` and `FlatList` to prevent text truncation, clipping, or viewport overflow across all device sizes.

### 4. Global State Management (React Context API)
* **Single Source of Truth (`AppContext.js`):**
  * **Theme Engine:** Instant switching between **Dark Mode** and **Light Mode**.
  * **Dynamic User Profile:** Student names, student numbers, section, and course.
* Changing any parameter in `SettingsScreen` **instantly updates the Home Dashboard and all screens** across the app in real time without needing to reload.

### 5. React Hooks
* `useState`: Local state for search queries, filter selection, and profile form input.
* `useEffect`: Dynamic time-of-day greeting calculation on app launch.

---

## 🛠️ Getting Started & Installation

### Quick Start
1. Navigate to the project directory:
   ```bash
   cd master-compilation-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   * **Web Browser Preview:**
     ```bash
     npm run web
     ```
   * **Mobile Device (Expo Go):**
     ```bash
     npx expo start
     ```

---

## 📹 Screen Recording Checklist

1. **Responsive Dashboard:** Show the time-of-day greeting, pair banner (RM & Belle), and navigation menu cards.
2. **Multi-Screen Navigation:** Open the Activities tab, use the search bar, and tap into Activity 1.
3. **Global State Update:** Go to Settings, toggle between Dark and Light mode, edit student names, and tap the Dashboard tab to demonstrate real-time synchronization.

---

## 📤 Git Repository Submission

```bash
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git branch -M main
git push -u origin main
```

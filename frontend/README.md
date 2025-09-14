# Weekendly - A Visual Weekend Planner

[![React Version](https://img.shields.io/badge/react-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-^5.0.0-yellowgreen.svg)](https://vitejs.dev/)
[![Deployment](https://img.shields.io/badge/deployment-Vercel-black.svg)](https://vercel.com)

An interactive web application that helps users design their perfect weekend. Browse activities, arrange them into a personalized Saturday-Sunday schedule, and create a memorable plan with a simple, fun, and visually engaging tool.

**Live Demo:** [**weekend-ly.vercel.app**](https://weekend-ly.vercel.app/) 🚀

---

## 📸 Sneak Peek


*A snapshot of the main planner view, showing the activity browser and the side-by-side weekend schedule.*
<img width="1919" height="855" alt="image" src="https://github.com/user-attachments/assets/00576e6e-d4d0-4c6d-b2ca-41d5cf690818" />
<img width="1919" height="857" alt="image" src="https://github.com/user-attachments/assets/00e04382-ca8b-4dd3-857d-943c92f83029" />
<img width="1919" height="855" alt="image" src="https://github.com/user-attachments/assets/e338a70a-a689-4fb0-9b86-d23d346dec14" />


---

## ✨ Features

This project successfully implements all core requirements, several bonus layers, and the advanced super-stretch goals outlined in the challenge.

### Core Requirements
-   [x] **Activity Browser**: Browse and filter a list of potential weekend activities.
-   [x] **Schedule Planner**: Add selected activities to a Saturday and Sunday schedule.
-   [x] **Visual Plan View**: View the weekend plan in a clear, card-based format.
-   [x] **Edit & Remove**: Dynamically edit, remove, and rearrange activities in the schedule.

### Bonus & Super Stretch Features
-   [x] **Drag & Drop Interface**: Intuitively rearrange activities between days and time slots.
-   [x] **Visual Richness**: A polished UI with icons and color-coded categories for activities.
-   [x] **Data Persistence**: Plans are automatically saved to `localStorage`, so your schedule is always there when you return.
-   [x] **Scalable UI**: The schedule columns are independently scrollable, ensuring the app works smoothly with 50+ activities.
-   [x] **Offline-Friendly (PWA)**: The application is a Progressive Web App. It loads instantly and works reliably even without a network connection.
-   [x] **Automated Testing**: Includes unit tests for Redux state logic to ensure reliability.
-   [x] **Component-Based Design System**: Built with a "mini design system" approach, with reusable components documented in Storybook.

---

## 🛠️ Tech Stack

-   **Framework**: React
-   **State Management**: Redux Toolkit
-   **Drag & Drop**: `dnd-kit`
-   **Styling**: Tailwind CSS
-   **Component Library/Documentation**: Storybook
-   **Testing**: Vitest & React Testing Library
-   **PWA / Offline Support**: Workbox (`vite-plugin-pwa`)
-   **Utilities**: `date-fns`, `lucide-react`, `uuid`

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later)
-   npm

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/avhixorin/planWithMe](https://github.com/avhixorin/planWithMe)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd planWithMe
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```

### Running the Application

-   **Development Server:**
    ```sh
    npm run dev
    ```
-   **Run Unit Tests:**
    ```sh
    npm test
    ```
-   **Browse Component Library:**
    ```sh
    npm run storybook
    ```

---

## 🏗️ Design & Engineering Decisions

This section covers the major design decisions and trade-offs as required by the challenge documentation.

### State Management
Effective state management was crucial for this application. I chose **Redux Toolkit** as the single source of truth for all plans and activities. This approach was favored over local component state (`useState`) for several reasons:
-   **Centralization**: It decouples state from the components, making it easier to manage data that is shared across the app (e.g., the activity list and the schedule).
-   **Predictability**: Redux's strict update patterns (actions and reducers) make state changes predictable and easier to debug.
-   **Scalability**: Using slices for different parts of the state (plans, UI state, themes) keeps the logic organized and maintainable as the app grows.

### Drag & Drop
To meet the drag-and-drop requirement, I chose **`dnd-kit`** over the native HTML5 Drag and Drop API.
-   **Trade-off**: `dnd-kit` adds a new dependency, whereas the native API is built-in.
-   **Decision**: The benefits far outweighed the cost. `dnd-kit` offers superior performance, full accessibility compliance, and, most importantly, excellent **touch support for mobile devices**, which is a major weakness of the native API. This was a key decision for ensuring the app is fully responsive and has smooth interactions.

### Persistence & Offline Support
For the "Super Stretch" goals, I implemented a two-part strategy for persistence and offline use:
1.  **Data Persistence**: `localStorage` was used to save the user's plans. A Redux middleware subscribes to store changes and saves the state, ensuring that any modification (add, remove, move) is persisted.
2.  **Offline Application Access**: To make the app itself load offline, it was converted into a **Progressive Web App (PWA)**. A Service Worker, configured via `vite-plugin-pwa`, automatically caches all application assets (HTML, JS, CSS). This allows the app to load instantly from the cache, even without a network connection.

---

## 🎯 Challenges Faced

A couple of interesting challenges arose during development:

1.  **State Synchronization on Drag:** A bug appeared where dragged items would revert to their original positions on page refresh.
    -   **Problem**: The drag-and-drop UI was updating visually, but the Redux action to modify the state was either missing or incorrect, so nothing was being saved to `localStorage`.
    -   **Solution**: I implemented a dedicated `moveActivity` reducer in the Redux slice. The `onDragEnd` handler was refactored to dispatch this single, reliable action, ensuring the Redux store (the single source of truth) was correctly updated, which in turn triggered the save to `localStorage`.

2.  **Router Context in Storybook:** Documenting components that use React Router hooks (`useNavigate`, `useLocation`) was challenging because Storybook renders components in isolation, without a router context.
    -   **Problem**: The `Header` component would crash in Storybook due to the missing context.
    -   **Solution**: I used Storybook's decorator feature to wrap the `Header` stories in a `<MemoryRouter>`. This provided the necessary context and allowed me to write stories for different routes (e.g., `/` vs. `/plans`), enabling robust component testing and documentation.

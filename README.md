# Financial Calculators

A modern, responsive web application providing a suite of financial calculators to help you plan your investments and withdrawals. 

**Live Application:** [https://fin-calculators.web.app/](https://fin-calculators.web.app/)

## Features

*   **SIP Calculator:** Calculate the future value of your Systematic Investment Plan investments, including total investment, total gains, and maturity amount.
*   **Lumpsum Calculator:** Calculate the future value of a single, one-time investment.
*   **SWP Calculator:** Plan your Systematic Withdrawal Plan. See how long your funds will last given a specific withdrawal rate and expected return, or calculate the remaining amount after a certain period.
*   **Inflation Adjusted Values:** All calculators include an option to see the future value or remaining amount adjusted for expected inflation.
*   **Interactive Charts:** Visualize the proportion of your investments versus gains (or withdrawn versus remaining funds) using interactive Pie charts.
*   **Yearly Breakdown:** Detailed year-by-year breakdown of your investment journey or withdrawal schedule in a DataGrid format.
*   **Dark/Light Mode:** Includes a theme toggle to seamlessly switch between light and dark modes based on your preference.
*   **Responsive Design:** Fully responsive layout that works beautifully on desktop, tablet, and mobile devices.

## Technologies Used

*   **Frontend Framework:** React (with Vite)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Charting Library:** Chart.js with `react-chartjs-2`
*   **Routing:** React Router DOM

## Setup Instructions

### Prerequisites

*   Node.js (v16 or higher recommended)
*   npm

### Installation

1.  Clone the repository
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser and navigate to `http://localhost:5173/`.

### Building for Production

To create a production-ready build, run:
```bash
npm run build
```
The compiled assets will be available in the `dist/` directory.

## Project Structure

*   `src/components/`: Contains the main calculator components (`SIPCalculator`, `LumpsumCalculator`, `SWPCalculator`) and layout components (`Header`, `Footer`, `ThemeToggle`).
*   `src/controls/`: Contains reusable generic UI controls (`CurrencyInput`, `DataGrid`, `InflationAdjustedValue`).
*   `src/pages/`: Contains the page-level components corresponding to different routes.
*   `src/utils/`: Contains utility functions, such as number formatters.
*   `src/App.tsx`: The root component setting up React Router and the application layout.

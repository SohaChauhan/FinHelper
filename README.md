# FinHelper CVP Analysis Tool

FinHelper is a modern, user-friendly Cost-Volume-Profit (CVP) analysis tool designed to help you make smarter financial decisions for your business or studies. Easily manage multiple products, analyze break-even points, calculate target profits, and export your results in CSV or PDF format.

## Features

- **Product Management:** Add, edit, and remove products with detailed cost and sales inputs.
- **CVP Analysis:** Instantly visualize break-even points, contribution margins, and profits for each product.
- **What-If Analysis:** Calculate required sales to achieve a target profit and margin of safety.
- **Export:** Download your analysis as CSV or PDF for sharing or record-keeping.
- **Modern UI:** Responsive, accessible, and easy to use on any device.

## Live Demo

Access the live app here: [https://finhelper.vercel.app](https://finhelper.vercel.app)

## How to Use

1. **Add Products:** Use the Product Management section to add products and enter details like name, units sold, selling price, variable cost, and fixed cost.
2. **Analyze:** View break-even points, contribution margins, and profits in the CVP Analysis section.
3. **What-If:** Enter a target profit in the What-If Analysis section to see required sales and margin of safety.
4. **Export:** Download your results as CSV or PDF using the export buttons.

## Financial Terms Explained

- **Break-Even Point:** The number of units that must be sold to cover all costs (no profit, no loss).
- **Contribution Margin:** The amount each unit contributes to covering fixed costs and generating profit (Selling Price per Unit - Variable Cost per Unit).
- **Variable Cost:** Costs that change with the number of units produced (e.g., materials).
- **Fixed Cost:** Costs that remain constant regardless of units produced (e.g., rent).
- **Margin of Safety:** The difference between actual/expected sales and break-even sales.
- **Target Profit:** The profit goal you want to achieve, used to calculate required sales.

## Tech Stack

- [Next.js](https://nextjs.org/) & [React](https://react.dev/) for the frontend
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Chart.js](https://www.chartjs.org/) (via [react-chartjs-2](https://react-chartjs-2.js.org/)) for charts
- [jsPDF](https://github.com/parallax/jsPDF) and [PapaParse](https://www.papaparse.com/) for exports

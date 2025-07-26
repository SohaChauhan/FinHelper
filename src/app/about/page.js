"use client";
import Navbar from "../../components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen w-full bg-blue-50">
      <Navbar />
      <main className="w-full min-h-screen flex flex-col p-8">
        <section className="bg-white rounded-xl shadow p-8 w-full flex flex-col gap-6">
          <h1 className="text-4xl text-center font-bold text-blue-900 mb-2">About FinHelper CVP Analysis Tool</h1>
          <p className="text-lg text-gray-700">
            <b>FinHelper</b> is a modern, user-friendly Cost-Volume-Profit (CVP) analysis tool designed to help you make smarter financial decisions for your business or studies. Easily manage multiple products, analyze break-even points, calculate target profits, and export your results in CSV or PDF format.
          </p>
          <ul className="list-disc pl-6 text-gray-800 text-base">
            <li>📊 <b>Product Management:</b> Add, edit, and remove products with detailed cost and sales inputs.</li>
            <li>🔍 <b>CVP Analysis:</b> Instantly visualize break-even points, contribution margins, and profits for each product.</li>
            <li>🧮 <b>What-If Analysis:</b> Calculate required sales to achieve a target profit and margin of safety.</li>
            <li>⬇️ <b>Export:</b> Download your analysis as CSV or PDF for sharing or record-keeping.</li>
            <li>✨ <b>Modern UI:</b> Responsive, accessible, and easy to use on any device.</li>
          </ul>

          <p className="text-base text-gray-700 mt-2">
            <b>How to Use This App:</b> <br/>
            Start by adding your products using the Product Management section. Enter details such as product name, units sold, capacity, selling price per unit, variable cost per unit, and fixed cost. Once products are added, you can instantly view their break-even points, contribution margins, and profits in the CVP Analysis section. Use the What-If Analysis section to input a target profit and see how many units you need to sell to achieve that goal, along with your margin of safety. You can also export your results as CSV or PDF for further analysis or sharing.
          </p>

          <p className="text-base text-gray-700 mt-2">
            <b>Financial Terms Explained:</b> <br/>
            <b>Break-Even Point:</b> The number of units that must be sold to cover all costs (no profit, no loss). <br/>
            <b>Contribution Margin:</b> The amount each unit contributes to covering fixed costs and generating profit, calculated as Selling Price per Unit minus Variable Cost per Unit. <br/>
            <b>Variable Cost:</b> Costs that change with the number of units produced (like materials). <br/>
            <b>Fixed Cost:</b> Costs that remain constant regardless of units produced (like rent). <br/>
            <b>Margin of Safety:</b> The difference between actual or expected sales and the break-even sales, showing how much sales can drop before incurring a loss. <br/>
            <b>Target Profit:</b> The profit goal you want to achieve, used to calculate required sales.
          </p>

          <p className="text-base text-gray-700 mt-2">
            <b>How This App Was Developed:</b> <br/>
            This app was built using Next.js and React for a fast, interactive user experience, and styled with Tailwind CSS for modern, responsive design. Charts are rendered using Chart.js via react-chartjs-2 for clear financial visualization. Export features use jsPDF and PapaParse for PDF and CSV downloads. The codebase is modular and follows best practices for maintainability and accessibility. The project is open source and can be extended for more advanced financial analysis or business needs.
          </p>

          
          <div className="mt-4 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} FinHelper CVP Analysis Tool
          </div>
        </section>
      </main>
    </div>
  );
}

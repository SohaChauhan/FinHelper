"use client";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function Analysis() {
  const [products, setProducts] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [targetProfit, setTargetProfit] = useState("");
  const [requiredSales, setRequiredSales] = useState("");
  const [marginOfSafety, setMarginOfSafety] = useState("");
  const [whatIfProduct, setWhatIfProduct] = useState(null);

  const handleAddProduct = (event) => {
    event.preventDefault();
    const product = {
      name: event.target.name.value,
      unitsSold: parseInt(event.target.unitsSold.value),
      capacity: parseInt(event.target.capacity.value),
      sellingPrice: parseFloat(event.target.sellingPrice.value),
      totalCost: parseFloat(event.target.totalCost.value),
      variableCost: parseFloat(event.target.variableCost.value),
      fixedCost: parseFloat(event.target.fixedCost.value),
    };

    const contributionMargin = (
      product.sellingPrice - product.variableCost
    ).toFixed(2);
    const variableExpenseRatio = (
      product.variableCost / product.sellingPrice
    ).toFixed(2);
    const breakEvenPoint = Math.ceil(product.fixedCost / contributionMargin);

    const profit = (
      parseFloat(product.unitsSold) * parseFloat(contributionMargin) -
      parseFloat(product.fixedCost)
    ).toFixed(2);
    setTotalProfit((prev) => prev + parseFloat(profit));

    setProducts([
      ...products,
      {
        ...product,
        contributionMargin,
        variableExpenseRatio,
        breakEvenPoint,
        profit,
      },
    ]);
    event.target.reset();
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    const removedProduct = updatedProducts.splice(index, 1)[0];
    setTotalProfit((prev) => prev - removedProduct.profit);
    setProducts(updatedProducts);
  };

  const handleSelectProduct = (index) => {
    setSelectedProduct(products[index]);
  };

  const handleWhatIfAnalysis = () => {
    if (!whatIfProduct) return;
    const requiredSalesUnits = Math.ceil(
      (parseFloat(targetProfit) + whatIfProduct.fixedCost) /
        whatIfProduct.contributionMargin
    );
    const requiredSalesRevenue = (
      whatIfProduct.fixedCost +
      whatIfProduct.variableCost * whatIfProduct.unitsSold +
      parseFloat(targetProfit)
    ).toFixed(2);

    const marginOfSafety = Math.ceil(
      requiredSalesUnits - whatIfProduct.breakEvenPoint
    );

    setRequiredSales({
      units: requiredSalesUnits,
      revenue: requiredSalesRevenue,
    });
    setMarginOfSafety(marginOfSafety);
  };

  const cvpData = {
    labels: products.map((p) => p.name),
    datasets: [
      {
        label: "Break-Even Point",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: products.map((p) => p.breakEvenPoint),
      },
      {
        label: "Units Sold",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        data: products.map((p) => p.unitsSold),
      },
    ],
  };

  const getCVPLineData = (product) => {
    if (!product) return { labels: [], datasets: [] };

    const maxUnits = product.capacity; // Maximum units up to capacity
    const unitsArray = Array.from({ length: maxUnits + 1 }, (_, i) => i);

    const totalRevenue = unitsArray.map(
      (units) => units * product.sellingPrice
    );
    const totalCost = unitsArray.map(
      (units) => product.fixedCost + units * product.variableCost
    );

    return {
      labels: unitsArray,
      datasets: [
        {
          label: "Total Revenue",
          data: totalRevenue,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "Total Cost",
          data: totalCost,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderWidth: 2,
          fill: false,
        },
      ],
    };
  };

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold mb-4">CVP Analysis</h2>
        <form onSubmit={handleAddProduct} className="grid grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Product Name"
            className="border p-2"
            required
          />
          <input
            name="unitsSold"
            type="number"
            placeholder="Units Sold"
            className="border p-2"
            required
          />
          <input
            name="capacity"
            type="number"
            placeholder="Capacity"
            className="border p-2"
            required
          />
          <input
            name="sellingPrice"
            type="number"
            placeholder="Selling Price per Unit"
            className="border p-2"
            required
          />
          <input
            name="totalCost"
            type="number"
            placeholder="Total Cost per Unit"
            className="border p-2"
            required
          />
          <input
            name="variableCost"
            type="number"
            placeholder="Variable Cost per Unit"
            className="border p-2"
            required
          />
          <input
            name="fixedCost"
            type="number"
            placeholder="Fixed Cost"
            className="border p-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add Product
          </button>
        </form>
        <hr className="mt-5"></hr>
        {Boolean(products.length) && (
          <table className="w-full mt-6 border-2">
            <thead className="border">
              <tr>
                <th className="border">Product Name</th>
                <th className="border">Total Cost per unit</th>
                <th className="border">Variable Cost per unit</th>
                <th className="border">Fixed Cost per unit</th>
                <th className="border">Selling price per unit</th>
                <th className="border">Units Sold</th>
                <th className="border">Profit/Loss per unit</th>
                <th className="border">Contribution Margin</th>
                <th className="border">Variable-Expense Ratio</th>
                <th className="border">Break-Even Point</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className=" text-center">
                  <td className="border">{product.name}</td>
                  <td className="border">{product.totalCost}</td>
                  <td className="border">{product.variableCost}</td>
                  <td className="border">
                    {product.fixedCost / product.unitsSold}
                  </td>
                  <td className="border">{product.sellingPrice}</td>
                  <td className="border">{product.unitsSold}</td>
                  <td className="border">
                    {product.profit / product.unitsSold}
                  </td>

                  <td className="border">{product.contributionMargin}</td>
                  <td className="border">{product.variableExpenseRatio}</td>
                  <td className="border">{product.breakEvenPoint}</td>
                  <td className="border">
                    <button
                      onClick={() => handleDeleteProduct(index)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h3 className="text-2xl font-semibold mt-6">
          Total Profit: {totalProfit}
        </h3>

        <div className="flex flex-wrap -mx-4 mb-6">
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-2xl font-semibold mb-4">
              Break-Even and Units Sold for All Products
            </h2>
            <Bar
              data={cvpData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Break-Even and Units Sold",
                  },
                },
                scales: {
                  x: { title: { display: true, text: "Products" } },
                  y: { title: { display: true, text: "Units" } },
                },
              }}
            />
          </div>

          <div className="w-full md:w-1/2 px-4">
            {/* Dropdown for selecting a product */}
            <div className="mb-4">
              <label className="block text-xl font-semibold mb-2">
                Select a Product for CVP Analysis:
              </label>
              <select
                onChange={(e) =>
                  setSelectedProduct(
                    products.find((p) => p.name === e.target.value)
                  )
                }
                className="p-2 border border-gray-300 rounded-md"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a product
                </option>
                {products.map((product) => (
                  <option key={product.name} value={product.name}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedProduct && (
              <>
                <h2 className="text-2xl font-semibold mb-4">
                  CVP Graph for {selectedProduct.name}
                </h2>
                <Line
                  data={getCVPLineData(selectedProduct)}
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "Total Revenue vs Total Cost",
                      },
                    },
                    scales: {
                      x: { title: { display: true, text: "Number of Units" } },
                      y: { title: { display: true, text: "Cost (Rupees)" } },
                    },
                  }}
                />
              </>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-xl font-semibold mb-2">
            Select a Product for What-If Analysis:
          </label>
          <select
            onChange={(e) =>
              setWhatIfProduct(products.find((p) => p.name === e.target.value))
            }
            className="p-2 border border-gray-300 rounded-md"
            defaultValue=""
          >
            <option value="" disabled>
              Select a product
            </option>
            {products.map((product) => (
              <option key={product.name} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {whatIfProduct && (
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-4">
              What-If Analysis for {whatIfProduct.name}
            </h2>
            <input
              type="number"
              placeholder="Target Profit"
              value={targetProfit}
              onChange={(e) => setTargetProfit(e.target.value)}
              className="border p-2 mt-4"
            />
            <button
              onClick={handleWhatIfAnalysis}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
            >
              Calculate
            </button>
            {requiredSales && (
              <div className="mt-4">
                <p>Required Sales (Units): {requiredSales.units} units</p>
                <p>Required Sales (Revenue): {requiredSales.revenue} Rs.</p>
                <p>Margin of Safety: {marginOfSafety} units</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

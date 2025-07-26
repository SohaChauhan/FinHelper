"use client";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";

export default function Analysis() {
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formState, setFormState] = useState({
    name: "",
    unitsSold: "",
    capacity: "",
    sellingPrice: "",
    variableCost: "",
    fixedCost: "",
  });
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
    const totalCost = (
      product.variableCost +
      product.fixedCost / product.unitsSold
    ).toFixed(2);

    if (editIndex !== null) {
      // Edit mode: update existing product
      const updatedProducts = [...products];
      const oldProfit = parseFloat(updatedProducts[editIndex].profit);
      updatedProducts[editIndex] = {
        ...product,
        totalCost,
        contributionMargin,
        variableExpenseRatio,
        breakEvenPoint,
        profit,
      };
      setProducts(updatedProducts);
      setTotalProfit((prev) => prev - oldProfit + parseFloat(profit));
      setEditIndex(null);
      setFormState({
        name: "",
        unitsSold: "",
        capacity: "",
        sellingPrice: "",
        variableCost: "",
        fixedCost: "",
      });
    } else {
      // Add mode: add new product
      setTotalProfit((prev) => prev + parseFloat(profit));
      setProducts([
        ...products,
        {
          ...product,
          totalCost,
          contributionMargin,
          variableExpenseRatio,
          breakEvenPoint,
          profit,
        },
      ]);
    }
    event.target.reset();
  };

  const handleEditProduct = (index) => {
    const p = products[index];
    setEditIndex(index);
    setFormState({
      name: p.name,
      unitsSold: p.unitsSold,
      capacity: p.capacity,
      sellingPrice: p.sellingPrice,
      variableCost: p.variableCost,
      fixedCost: p.fixedCost,
    });
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setFormState({
      name: "",
      unitsSold: "",
      capacity: "",
      sellingPrice: "",
      variableCost: "",
      fixedCost: "",
    });
  };

  const handleExportCSV = () => {
    const headers = [
      "Name",
      "Total Cost/unit",
      "Variable Cost/unit",
      "Fixed Cost",
      "Selling Price/unit",
      "Units Sold",
      "Profit/unit",
      "Contribution Margin",
      "Var. Expense Ratio",
      "Break-Even",
    ];
    const rows = products.map((p) => [
      p.name,
      p.totalCost,
      p.variableCost,
      p.fixedCost,
      p.sellingPrice,
      p.unitsSold,
      (p.profit / p.unitsSold).toFixed(2),
      p.contributionMargin,
      p.variableExpenseRatio,
      p.breakEvenPoint,
    ]);
    const csv = Papa.unparse({
      fields: headers,
      data: rows,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "cvp_analysis.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("CVP Analysis Results", 14, 15);
    const tableColumn = [
      "Name",
      "Total Cost/unit",
      "Variable Cost/unit",
      "Fixed Cost",
      "Selling Price/unit",
      "Units Sold",
      "Profit/unit",
      "Contribution Margin",
      "Var. Expense Ratio",
      "Break-Even",
    ];
    const tableRows = products.map((p) => [
      p.name,
      p.totalCost,
      p.variableCost,
      p.fixedCost,
      p.sellingPrice,
      p.unitsSold,
      (p.profit / p.unitsSold).toFixed(2),
      p.contributionMargin,
      p.variableExpenseRatio,
      p.breakEvenPoint,
    ]);
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });
    doc.text(
      `Total Profit: Rs. ${totalProfit}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.save("cvp_analysis.pdf");
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
    const length = 15;
    const step = maxUnits / (length - 1); // Calculate the interval

    const unitsArray = Array.from({ length }, (_, i) => Math.floor(i * step));

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
    <div className="min-h-screen w-full bg-blue-50">
      <Navbar />
      <main className="w-full min-h-screen p-4 flex flex-col gap-8">
        {/* Product Input Form Section */}
        <section className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-2 text-blue-900 flex items-center gap-2">
            <span>Product Management</span>
          </h2>
          <form
            onSubmit={handleAddProduct}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              name="name"
              placeholder="Product Name"
              className="border p-2 rounded-xl placeholder:text-gray-500"
              required
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
            />
            <input
              name="unitsSold"
              type="number"
              placeholder="Units Sold"
              className="border p-2 rounded-xl placeholder:text-gray-500"
              min={1}
              required
              value={formState.unitsSold}
              onChange={(e) =>
                setFormState({ ...formState, unitsSold: e.target.value })
              }
            />
            <input
              name="capacity"
              type="number"
              placeholder="Capacity"
              className="border p-2 rounded-xl placeholder:text-gray-500"
              min={1}
              required
              value={formState.capacity}
              onChange={(e) =>
                setFormState({ ...formState, capacity: e.target.value })
              }
            />
            <input
              name="sellingPrice"
              type="number"
              placeholder="Selling Price per Unit"
              className="border p-2 rounded-xl placeholder:text-gray-500"
              min={0.01}
              step={0.01}
              required
              value={formState.sellingPrice}
              onChange={(e) =>
                setFormState({ ...formState, sellingPrice: e.target.value })
              }
            />
            <input
              name="variableCost"
              type="number"
              placeholder="Variable Cost per Unit"
              className="border p-2 rounded-xl placeholder:text-gray-500"
              min={0}
              step={0.01}
              required
              value={formState.variableCost}
              onChange={(e) =>
                setFormState({ ...formState, variableCost: e.target.value })
              }
            />
            <input
              name="fixedCost"
              type="number"
              placeholder="Fixed Cost"
              className="border p-2 rounded-xl placeholder:text-gray-500"
              min={0}
              step={0.01}
              required
              value={formState.fixedCost}
              onChange={(e) =>
                setFormState({ ...formState, fixedCost: e.target.value })
              }
            />
            <div className="flex gap-4 col-span-1 md:col-span-2">
              <button
                type="submit"
                className="bg-blue-900 text-white py-2 px-4 rounded-xl w-full md:w-1/2 mt-2"
              >
                {editIndex !== null ? "Save Changes" : "Add Product"}
              </button>
              {editIndex !== null && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-xl w-full md:w-1/2 mt-2"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
          {/* Feedback placeholder */}
          {/* <div className="alert alert-success">Product added!</div> */}
          {/* Export Buttons */}
          {Boolean(products.length) && (
            <div className="flex gap-4 mb-4">
              <button
                onClick={handleExportCSV}
                className="bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition"
                type="button"
              >
                Export CSV
              </button>
              <button
                onClick={handleExportPDF}
                className="bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700 transition"
                type="button"
              >
                Export PDF
              </button>
            </div>
          )}
          {/* Product Table */}
          {Boolean(products.length) && (
            <div className="overflow-x-auto w-full">
              <table className="w-full mt-6 border-2 bg-white rounded-xl shadow-sm">
                <thead className="border bg-blue-50">
                  <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Total Cost/unit</th>
                    <th className="border p-2">Variable Cost/unit</th>
                    <th className="border p-2">Fixed Cost</th>
                    <th className="border p-2">Selling Price/unit</th>
                    <th className="border p-2">Units Sold</th>
                    <th className="border p-2">Profit/unit</th>
                    <th className="border p-2">Contribution Margin</th>
                    <th className="border p-2">Var. Expense Ratio</th>
                    <th className="border p-2">Break-Even</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={index}
                      className="text-center hover:bg-blue-50 transition"
                    >
                      <td className="border p-2">{product.name}</td>
                      <td className="border p-2">{product.totalCost}</td>
                      <td className="border p-2">{product.variableCost}</td>
                      <td className="border p-2">{product.fixedCost}</td>
                      <td className="border p-2">{product.sellingPrice}</td>
                      <td className="border p-2">{product.unitsSold}</td>
                      <td className="border p-2">
                        {product.profit / product.unitsSold}
                      </td>
                      <td className="border p-2">
                        {product.contributionMargin}
                      </td>
                      <td className="border p-2">
                        {product.variableExpenseRatio}
                      </td>
                      <td className="border p-2">{product.breakEvenPoint}</td>
                      <td className="border p-2">
                        <button
                          onClick={() => handleEditProduct(index)}
                          className="text-yellow-600 hover:underline text-sm px-2 mr-2"
                          title="Edit product"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(index)}
                          className="text-red-600 hover:underline text-sm px-2"
                          title="Delete product"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <h3 className="text-xl font-semibold mt-4 text-green-900">
            Total Profit: Rs. {totalProfit}
          </h3>
        </section>

        {/* CVP Analysis Section */}
        <section className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-2 text-blue-900 flex items-center gap-2">
            <span>CVP Analysis</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-8 w-full mb-2">
            <div className="w-full md:w-1/2 mt-1 flex flex-col">
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">
                  Select a Product for CVP Analysis:
                </label>
                <select
                  onChange={(e) =>
                    setSelectedProduct(
                      products.find((p) => p.name === e.target.value)
                    )
                  }
                  className="p-2 border border-gray-300 rounded-xl bg-white w-full"
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
                  <h3 className="text-lg font-semibold mb-2">
                    CVP Graph for {selectedProduct.name}
                  </h3>
                  <Line
                    data={getCVPLineData(selectedProduct)}
                    className="bg-white rounded-xl p-3 w-full h-[400px]"
                    options={{
                      plugins: {
                        title: {
                          display: true,
                          text: "Total Revenue vs Total Cost",
                        },
                      },
                      scales: {
                        x: {
                          title: { display: true, text: "Number of Units" },
                        },
                        y: { title: { display: true, text: "Cost (Rupees)" } },
                      },
                    }}
                  />
                </>
              )}
            </div>
            {Boolean(products.length) && (
              <div className="w-full md:w-1/2 h-full md:mt-0 flex flex-col md:pt-24">
                <h3 className="text-lg font-semibold mb-2">
                  Break-Even and Units Sold for All Products
                </h3>
                <Bar
                  data={cvpData}
                  className="bg-white rounded-xl p-3 w-full h-[400px]"
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
            )}
          </div>
        </section>

        {/* What-If Analysis Section */}
        <section className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-2 text-blue-900 flex items-center gap-2">
            <span>What-If Analysis</span>
          </h2>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">
              Select a Product for What-If Analysis:
            </label>
            <select
              onChange={(e) =>
                setWhatIfProduct(
                  products.find((p) => p.name === e.target.value)
                )
              }
              className="p-2 border border-gray-300 rounded-xl bg-white w-full"
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
            <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-end">
              <div>
                <label className="block text-base font-medium mb-1">
                  Target Profit (Rs.)
                </label>
                <input
                  type="number"
                  placeholder="Target Profit"
                  value={targetProfit}
                  onChange={(e) => setTargetProfit(e.target.value)}
                  className="border p-2 rounded-xl w-full"
                  min={0}
                  step={0.01}
                />
              </div>
              <button
                onClick={handleWhatIfAnalysis}
                className="bg-blue-900 text-white py-2 px-4 rounded-xl ml-0 md:ml-4 mt-3 md:mt-0"
              >
                Calculate
              </button>
            </div>
          )}
          {requiredSales && (
            <div className="mt-4 text-lg bg-blue-50 p-4 rounded-xl">
              <p>
                Required Sales <b>(Units)</b>: {requiredSales.units} units
              </p>
              <p>
                Required Sales <b>(Revenue)</b>: {requiredSales.revenue} Rs.
              </p>
              <p>Margin of Safety: {marginOfSafety} units</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

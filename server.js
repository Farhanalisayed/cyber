const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let vendors = [
  { id: 1, name: "Acme Corp", type: "Supplier", criticality: "High", status: "Active", contact: "john@acme.com" },
  { id: 2, name: "TechPro Solutions", type: "Service Provider", criticality: "Medium", status: "Active", contact: "sarah@techpro.com" },
  { id: 3, name: "Global Logistics", type: "Logistics", criticality: "Critical", status: "Under Review", contact: "mike@globallogistics.com" },
  { id: 4, name: "Eco Friendly Materials", type: "Supplier", criticality: "Low", status: "Inactive", contact: "lisa@ecofriendly.com" },
  { id: 5, name: "Innovative Software Inc", type: "Technology", criticality: "High", status: "Active", contact: "david@innovative.com" },
];

const criticalityData = [
    { name: 'Low', value: 1 },
    { name: 'Medium', value: 1 },
    { name: 'High', value: 2 },
    { name: 'Critical', value: 1 },
  ]
  
  const vendorTypeData = [
    { name: 'Supplier', value: 2 },
    { name: 'Service Provider', value: 2 },
    { name: 'Logistics', value: 1 },
  ]

// Fetch vendors
app.get("/vendors", (req, res) => {
  res.json(vendors);
});

//Fetch criticalityData
app.get("/criticality", (req, res) => {
    res.json(criticalityData);
  });

// Fetch vendorType
app.get("/vendortype", (req, res) => {
    res.json(vendorTypeData);
});

// Add vendor
app.post("/vendors", (req, res) => {
  const newVendor = { id: vendors.length + 1, ...req.body };
  vendors.push(newVendor);
  res.json(newVendor);
});

// Logout
app.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

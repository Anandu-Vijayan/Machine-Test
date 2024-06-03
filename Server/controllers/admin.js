const express = require("express");
const Assembly = require("../models/Assembly");



// Get Metrics
const metrics = async (req, res) => {
  const { from, to } = req.query;
  try {
    // Parse the date strings into JavaScript Date objects
    const fromDate = new Date(`${from}T00:00:00`);
    const toDate = new Date(`${to}T23:59:59`);

    const assemblies = await Assembly.find({
      // Using the parsed Date objects in the query
      endTime: { $gte: fromDate, $lte: toDate },
    }).populate("user", ["name", "email"]);
    
    res.json(assemblies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};



module.exports = {
  metrics
};

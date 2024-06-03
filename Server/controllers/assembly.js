const express = require("express");
const Assembly = require("../models/Assembly");

// Start Assembly
const start = async (req, res) => {
  const { bikeType } = req.body;
  try {
    const startTime = new Date();
    const assembly = new Assembly({
      user: req.user.id,
      bikeType,
      startTime,
      endTime: null,
    });
    await assembly.save();
    res.json(assembly);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// End Assembly
const end = async (req, res) => {
  try {
    const assembly = await Assembly.findOne({
      user: req.user.id,
      endTime: null,
    });
    if (!assembly) {
      return res.status(400).json({ msg: "No active assembly session found" });
    }
    assembly.endTime = new Date();
    await assembly.save();
    res.json(assembly);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  start,
  end,
};

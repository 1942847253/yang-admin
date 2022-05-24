module.exports = async () => {
  const Counters = require("../models/Counters");
  const counter = await Counters.findById("6281c578804ab3d85892dfd6");
  counter.self_increasing++;
  counter.save();

  //   const result = JSON.parse(JSON.stringify(counter.self_increasing));

  return counter.self_increasing;
};

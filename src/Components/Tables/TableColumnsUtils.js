export const ins1000Sep = (val) => {
  val = val.split(".");
  val[0] = val[0].split("").reverse().join("");
  val[0] = val[0].replace(/(\d{3})/g, "$1,");
  val[0] = val[0].split("").reverse().join("");
  val[0] = val[0].indexOf(",") === 0 ? val[0].substring(1) : val[0];
  return val.join(".");
};

export const rem1000Sep = (val) => {
  return val.replace(/,/g, "");
};

export const formatNum = (val) => {
  val = Math.round(val * 100) / 100;
  val = ("" + val).indexOf(".") > -1 ? val + "00" : val + ".00";
  var dec = val.indexOf(".");
  return dec === val.length - 3 || dec === 0 ? val : val.substring(0, dec + 3);
};

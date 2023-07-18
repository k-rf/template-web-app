module.exports = import("template-web-app-config").then((res) => {
  return [...res.baseRules, res.tsRules];
});

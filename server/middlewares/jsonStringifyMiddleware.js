const JSONBigIntMiddleware = (req, res, next) => {
  res.sendJSON = (obj) => {
    res.setHeader("Content-Type", "application/json");
    res.send(
      JSON.stringify(obj, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );
  };
  next();
};

module.exports = JSONBigIntMiddleware;

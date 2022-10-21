exports.getData = (req, res, next) => {
  const dataType = req.params.dataType;

  console.log("dataType :>> ", dataType);
};

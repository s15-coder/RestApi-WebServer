const { response, request } = require("express");
const usersGet = (req = request, res = response) => {
  const { limit = '10', page = '1' } = req.query;
  res.json({
    msg: "Get request",
    limit,
    page,
  });
};
const usersPut = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "usersPut request",
    given_id: id,
  });
};
const usersDelete = (req = request, res = response) => {
  res.json({
    msg: "usersDelete request",
  });
};
const usersPost = (req = request, res = response) => {
  const body = req.body;
  res.json({
    msg: "usersPost request",
    ...body,
  });
};

module.exports = {
  usersGet,
  usersDelete,
  usersPost,
  usersPut,
};

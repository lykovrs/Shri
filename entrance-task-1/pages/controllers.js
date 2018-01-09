module.exports.index = function(req, res) {
  console.log(req.query);
  const query = req.query;

  let response = {};

  if ('user' in query) {
    response.user = 'test user';
  }

  res.send(JSON.stringify(response));
};


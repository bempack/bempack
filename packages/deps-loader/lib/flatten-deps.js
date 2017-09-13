const bemDeps = require('@bem/deps');


module.exports = function (declaration, levels) {

  // TODO: cache graph
  const graph = bemDeps.load({ levels: levels }).then(bemDeps.buildGraph)

  return graph
      .then(graph => graph.dependenciesOf(declaration))
      .then(function(res) {
          return res.map(cell => cell.entity);
      });
};

define([], function () {

  return {
    report: function (res) {
      var _res = this.getDifferences(res);
      var output = '';

      for (var path in _res) {
        output += [path, "\n\t", _res[path].join('\n\t')].join('');
      }

      return output;
    },
    getDifferences: function (res) {
      var _res = {};
      var diff = res.getDifferences();
      for (var i in diff) {
        var f = diff[i];
        (_res[f.node] = (_res[f.node] || [])).push(f.message);
      }
      return _res;
    }
  };

});
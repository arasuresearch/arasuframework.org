angular.module('collection', [])
.factory('collection', function () {
  var col = {};
  col['findById'] = function(a, id) {
      for (var i = 0; i < a.length; i++) {
        if (a[i].$$hashKey == id) return a[i];
      }
      return null;
    };
  col['newRandomKey'] = function(coll, key, currentKey){
      var randKey;
      do {
        randKey = coll[Math.floor(coll.length * Math.random())][key];
      } while (randKey == currentKey);
      return randKey;
    };
  return col;
});
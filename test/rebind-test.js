var tape = require("tape"),
    rebind = require("../");

tape("rebind() source function always has source as context", function(test) {
  var target = {}, source = {method: function() { that = this; }}, that;
  rebind.rebind(target, source, "method");
  test.strictEqual((target.method(), that), source);
  test.strictEqual((target.method.call({}), that), source);
  test.end();
});

var tape = require("tape"),
    rebind = require("../");

tape("rebind() source function always has source as context", function(test) {
  var target = {}, source = {method: function() { that = this; }}, that;
  rebind.rebind(target, source, "method");
  test.strictEqual((target.method(), that), source);
  test.strictEqual((target.method.call({}), that), source);
  test.end();
});

tape("rebind() source function receives target function's arguments", function(test) {
  var target = {}, source = {method: function() { those = Array.prototype.slice.call(arguments); }}, those;
  rebind.rebind(target, source, "method");
  test.deepEqual((target.method(), those), []);
  test.deepEqual((target.method(1), those), [1]);
  test.deepEqual((target.method(null), those), [null]);
  test.deepEqual((target.method(source, source, 1), those), [source, source, 1]);
  test.end();
});

tape("rebind() target function returns target if source function returns source", function(test) {
  var target = {}, source = {method: function(value) { return value ? source : 42; }};
  rebind.rebind(target, source, "method");
  test.strictEqual(target.method(true), target);
  test.end();
});

tape("rebind() otherwise, target function returns source function return value", function(test) {
  var target = {}, source = {method: function(value) { return value ? source : 42; }};
  rebind.rebind(target, source, "method");
  test.strictEqual(target.method(false), 42);
  test.end();
});

tape("rebind() can bind multiple methods", function(test) {
  var target = {}, source = {
    foo: function() { return 1; },
    bar: function() { return 2; }
  };
  rebind.rebind(target, source, "foo", "bar");
  test.strictEqual(target.foo(), 1);
  test.strictEqual(target.bar(), 2);
  test.end();
});

tape("rebind() returns the target object", function(test) {
  var target = {}, source = {foo: function() {}};
  test.strictEqual(rebind.rebind(target, source, "foo"), target);
  test.end();
});

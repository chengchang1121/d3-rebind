/*
Copyright (c) 2010-2016, Michael Bostock
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* The name Michael Bostock may not be used to endorse or promote products
  derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL MICHAEL BOSTOCK BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
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

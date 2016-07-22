# d3-rebind

Copies a variable number of methods from source to target.

This is a verbatim extraction from d3.v3.5.17 source code, available [here](https://github.com/d3/d3/blob/v3.5.17/src/core/rebind.js).

## Installing

If you use NPM, `npm install @zambezi/d3-rebind`. Otherwise, download the [latest release](https://github.com/zambezi/d3-rebind/releases/latest).

## API Reference

<a href="#rebind" name="rebind">#</a> <b>rebind</b>(<i>target</i>, <i>source</i>, <i>names…</i>)

Copies the methods with the specified names from source to target, and returns target. Calling one of the named methods on the target object invokes the same-named method on the source object, passing any arguments passed to the target method, and using the source object as the this context. If the source method returns the source object, the target method returns the target object (“setter” method); otherwise, the target method returns the return value of the source method (“getter” mode). The rebind operator allows inherited methods (mix-ins) to be rebound to a subclass on a different object.

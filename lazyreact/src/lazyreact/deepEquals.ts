export function deepEquals(
    a:unknown,
    b:unknown
){
    if (a === b) return true;

    if (a && b && typeof a == 'object' && typeof b == 'object') {
      if (a.constructor !== b.constructor) return false;
  
      var length, i, keys;
      if (Array.isArray(a)) {
        length = (a as unknown[]).length;
        if (length != (b as unknown[]).length) return false;
        for (i = length; i-- !== 0;)
          if (!deepEquals((a as unknown[])[i], (b as unknown[])[i])) return false;
        return true;
      }
  
  
      if ((a instanceof Map) && (b instanceof Map)) {
        if (a.size !== b.size) return false;
        for (i of a.entries())
          if (!b.has(i[0])) return false;
        for (i of a.entries())
          if (!deepEquals(i[1], b.get(i[0]))) return false;
        return true;
      }
  
      if ((a instanceof Set) && (b instanceof Set)) {
        if (a.size !== b.size) return false;
        for (i of a.entries())
          if (!b.has(i[0])) return false;
        return true;
      }
  
      if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
        length = (a as any).length;
        if (length != (b as any).length) return false;
        for (i = length; i-- !== 0;)
          if ((a as any)[i] !== (b as any)[i]) return false;
        return true;
      }
  
  
      if (a.constructor === RegExp) return (a  as any).source === (b as any).source && (a as any).flags === (b as any).flags;
      if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
  
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) return false;
  
      for (i = length; i-- !== 0;)
        if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
  
      for (i = length; i-- !== 0;) {
        var key = keys[i];
  
        if (!deepEquals((a as any)[key], (b as any)[key])) return false;
      }
  
      return true;
    }
  
    // true if both NaN, false otherwise
    return a!==a && b!==b;  
}
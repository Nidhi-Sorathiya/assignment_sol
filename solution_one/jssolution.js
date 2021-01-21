function mutateTheArray(n, a) {
  var b = [];
  for (let i = 0; i < a.length; i++) {
    b[i] = (i == 0 ? 0 : a[i - 1]) + a[i] + (i == a.length - 1 ? 0 : a[i + 1]);
  }
  return b;
}

console.log(mutateTheArray(2, [4, 2]));

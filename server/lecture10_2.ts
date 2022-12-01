function inside(point: Array<number>, vs: Array<number[]>): boolean {

  let x = point[0], y = point[1];

  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    let xi = vs[i][0], yi = vs[i][1];
    let xj = vs[j][0], yj = vs[j][1];

    let intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }

  return inside;
};

// array of coordinates of each vertex of the polygon
let polygon = [ [ 1, 1 ], [ 2, 1 ], [ 1.7, 2 ]];
console.log(inside([ 1.5, 1.5 ], polygon)); // true
console.log(inside([ 3, 3.5 ], polygon)); // false

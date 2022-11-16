class Figure {
  constructor(name, color, x, y) {
    this.name = name;
    this.color = color;
    this.x = x;
    this.y = y;
  }
  getName = () => {
    return this.name;
  };

  getColor = () => {
    return this.color;
  };

  getSquare = () =>
    console.log(`The area is calculated individually for each figure`);

  getPerimeter = () =>
    console.log(`The perimeter is calculated individually for each figure`);

  getCrossArea = () =>
    console.log(
      `The cross-sectional area is calculated individually for each figure`,
    );
}

class Circle extends Figure {
  #owner;
  constructor(name, color, x, y, radius, owner) {
    super(name, color, x, y);
    this.radius = radius;
    this.#owner = owner;
  }
  getSquare = () => {
    return Math.PI * Math.pow(this.radius, 2);
  };
  getPerimeter = () => {
    return 2 * Math.PI * this.radius;
  };
  getOwner = () => {
    return this.#owner;
  };

  getCrossArea = (SecondCircle) => {
    let distance = Math.sqrt(
      Math.pow(this.x - SecondCircle.x, 2) +
        Math.pow(this.y - SecondCircle.y, 2),
    );

    if (distance >= this.radius + SecondCircle.radius) {
      return 0;
    } else if (distance + SecondCircle.radius <= this.radius) {
      return SecondCircle.getAreaCircle();
    } else if (distance + this.radius <= SecondCircle.radius) {
      return this.getAreaCircle();
    } else {
      const F1 =
        2 *
        Math.acos(
          (this.radius * this.radius -
            SecondCircle.radius * SecondCircle.radius +
            distance * distance) /
            (2 * this.radius * distance),
        );
      const F2 =
        2 *
        Math.acos(
          (SecondCircle.radius * SecondCircle.radius -
            this.radius * this.radius +
            distance * distance) /
            (2 * SecondCircle.radius * distance),
        );

      const S1 = (this.radius * this.radius * (F1 - Math.sin(F1))) / 2;
      const S2 =
        (SecondCircle.radius * SecondCircle.radius * (F2 - Math.sin(F2))) / 2;

      return S1 + S2;
    }
  };
}

class Rectangle extends Figure {
  constructor(
    name,
    color,
    x,
    y,
    x_TopRight,
    y_TopRight,
    x_BottomLeft,
    y_BottomLeft,
    x_BottomRight,
    y_BottomRight,
  ) {
    super(name, color, x, y);
    this.x_TopRight = x_TopRight;
    this.y_TopRight = y_TopRight;
    this.x_BottomLeft = x_BottomLeft;
    this.y_BottomLeft = y_BottomLeft;
    this.x_BottomRight = x_BottomRight;
    this.y_BottomRight = y_BottomRight;
  }

  getPerimeter() {
    return (
      (Math.abs(this.x - this.x_TopRight + (this.y - this.y_TopRight)) +
        Math.abs(
          this.x_TopRight -
            this.x_BottomLeft +
            (this.y_TopRight - this.y_BottomLeft),
        )) *
      2
    );
  }

  getSquare() {
    return (
      Math.abs(this.y - this.y_TopRight) *
      Math.abs(this.x_TopRight - this.x_BottomLeft)
    );
  }

  getCrossArea = (SecondRectangle) => {
    const left = Math.max(this.x_BottomLeft, SecondRectangle.x_BottomLeft);
    const top = Math.min(this.y_TopRight, SecondRectangle.y_TopRight);
    const right = Math.min(this.x_TopRight, SecondRectangle.x_TopRight);
    const bottom = Math.max(this.y_BottomLeft, SecondRectangle.y_BottomLeft);

    const width = right - left;
    const height = top - bottom;

    if (width < 0 || height < 0) return 0;

    return width * height;
  };
}

class Triangle extends Figure {
  constructor(name, color, x, y, x2, y2, x3, y3) {
    super(name, color, x, y);
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
  }

  getPerimeter = () => {
    let sideFirst = Math.sqrt(
      (this.x2 - this.x) * (this.x2 - this.x) +
        (this.y2 - this.y) * (this.y2 - this.y),
    );
    let sideSecond = Math.sqrt(
      (this.x3 - this.x) * (this.x3 - this.x) +
        (this.y3 - this.y) * (this.y3 - this.y),
    );
    let sideThird = Math.sqrt(
      (this.x3 - this.x2) * (this.x3 - this.x2) +
        (this.y3 - this.y2) * (this.y3 - this.y2),
    );
    return sideFirst + sideSecond + sideThird;
  };

  getSquare = () => console.log(`The method is currently not implemented`);

  getCrossArea = () => console.log(`The method is currently not implemented`);
}

function boot() {
  const circle1 = new Circle('circle 1', 'white', 50, 50, 100, 'me');
  const circle2 = new Circle('circle 2', 'blue', 75, 75, 100, 'nobody');

  console.log(`The owner of circle 1 is ${circle1.getOwner()}`);
  console.log(
    `Area of intersection of circles: ${circle1
      .getCrossArea(circle2)
      .toFixed(2)}`,
  );

  const rectangle1 = new Rectangle(
    'rectangle 1',
    'blue',
    50,
    50,
    100,
    100,
    75,
    75,
    125,
    125,
  );

  const rectangle2 = new Rectangle(
    'rectangle 2',
    'green',
    60,
    60,
    110,
    110,
    85,
    85,
    135,
    135,
  );

  console.log(
    `Area of intersection of rectangles: ${rectangle1
      .getCrossArea(rectangle2)
      .toFixed(2)}`,
  );

  const myTriangle = new Triangle(
    'triangle',
    'green',
    100,
    20,
    20,
    100,
    180,
    180,
  );

  console.log(
    `The perimeter of triangle is ${myTriangle.getPerimeter().toFixed(2)}`,
  );
}

boot();

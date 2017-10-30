import {CMatrix} from './CMatrix';

describe('CMatrix', () => {
  let component: CMatrix;

  beforeEach( () => { component = new CMatrix(); });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should be matrix with one row and two columns', () => {
    component.populateMainEffect(2);
    expect(component.values.get([0, 0])).toEqual(1);
    expect(component.values.get([0, 1])).toEqual(-1);
  });

  it('Should return a TeX formatted string', () => {
    component.populateMainEffect(2);
    expect(component.toTeX()).toEqual('$\\begin{bmatrix}1 & -1 \\end{bmatrix}$');
  });

  it('Should return a TeX formatted string', () => {
    component.populateMainEffect(3);
    expect(component.toTeX()).toEqual('$\\begin{bmatrix}1 & -1 & 0 \\\\1 & 0 & -1 \\end{bmatrix}$');
  });

  it('Should be matrix with three rows and four columns', () => {
    component.populateMainEffect(4);
    expect(component.values.get([0, 0])).toEqual(1);
    expect(component.values.get([0, 1])).toEqual(-1);
    expect(component.values.get([0, 2])).toEqual(0);
    expect(component.values.get([0, 3])).toEqual(0);

    expect(component.values.get([1, 0])).toEqual(1);
    expect(component.values.get([1, 1])).toEqual(0);
    expect(component.values.get([1, 2])).toEqual(-1);
    expect(component.values.get([1, 3])).toEqual(0);

    expect(component.values.get([2, 0])).toEqual(1);
    expect(component.values.get([2, 1])).toEqual(0);
    expect(component.values.get([2, 2])).toEqual(0);
    expect(component.values.get([2, 3])).toEqual(-1);
  });

  it('Should be matrix with one row and two columns', () => {
    component.populatePolynomialEvenSpacing(2);
    expect(component.values.get([0, 0])).toEqual(-1);
    expect(component.values.get([0, 1])).toEqual(1);
  });

  it('Should be matrix with two rows and three columns', () => {
    component.populatePolynomialEvenSpacing(3);
    expect(component.values.get([0, 0])).toEqual(-1);
    expect(component.values.get([0, 1])).toEqual(0);
    expect(component.values.get([0, 2])).toEqual(1);

    expect(component.values.get([1, 0])).toEqual(1);
    expect(component.values.get([1, 1])).toEqual(-2);
    expect(component.values.get([1, 2])).toEqual(1);
  });

  it('Should be matrix with two rows and three columns', () => {
    component.populatePolynomialEvenSpacing(4);
    expect(component.values.get([0, 0])).toEqual(-3);
    expect(component.values.get([0, 1])).toEqual(-1);
    expect(component.values.get([0, 2])).toEqual(1);
    expect(component.values.get([0, 3])).toEqual(3);

    expect(component.values.get([1, 0])).toEqual(1);
    expect(component.values.get([1, 1])).toEqual(-1);
    expect(component.values.get([1, 2])).toEqual(-1);
    expect(component.values.get([1, 3])).toEqual(1);

    expect(component.values.get([2, 0])).toEqual(-1);
    expect(component.values.get([2, 1])).toEqual(3);
    expect(component.values.get([2, 2])).toEqual(-3);
    expect(component.values.get([2, 3])).toEqual(1);
  });

  it('Should be matrix with two rows and three columns', () => {
    component.populatePolynomialEvenSpacing(5);
    expect(component.values.get([0, 0])).toEqual(-2);
    expect(component.values.get([0, 1])).toEqual(-1);
    expect(component.values.get([0, 2])).toEqual(0);
    expect(component.values.get([0, 3])).toEqual(1);
    expect(component.values.get([0, 4])).toEqual(2);

    expect(component.values.get([1, 0])).toEqual(2);
    expect(component.values.get([1, 1])).toEqual(-1);
    expect(component.values.get([1, 2])).toEqual(-2);
    expect(component.values.get([1, 3])).toEqual(-1);
    expect(component.values.get([1, 4])).toEqual(2);

    expect(component.values.get([2, 0])).toEqual(-1);
    expect(component.values.get([2, 1])).toEqual(2);
    expect(component.values.get([2, 2])).toEqual(0);
    expect(component.values.get([2, 3])).toEqual(-2);
    expect(component.values.get([2, 4])).toEqual(1);

    expect(component.values.get([3, 0])).toEqual(1);
    expect(component.values.get([3, 1])).toEqual(-4);
    expect(component.values.get([3, 2])).toEqual(6);
    expect(component.values.get([3, 3])).toEqual(-4);
    expect(component.values.get([3, 4])).toEqual(1);
  });

  it('Should be matrix with two rows and three columns', () => {
    component.populatePolynomialEvenSpacing(6);
    expect(component.values.get([0, 0])).toEqual(-5);
    expect(component.values.get([0, 1])).toEqual(-3);
    expect(component.values.get([0, 2])).toEqual(-1);
    expect(component.values.get([0, 3])).toEqual(1);
    expect(component.values.get([0, 4])).toEqual(3);
    expect(component.values.get([0, 5])).toEqual(5);

    expect(component.values.get([1, 0])).toEqual(5);
    expect(component.values.get([1, 1])).toEqual(-1);
    expect(component.values.get([1, 2])).toEqual(-4);
    expect(component.values.get([1, 3])).toEqual(-4);
    expect(component.values.get([1, 4])).toEqual(-1);
    expect(component.values.get([1, 5])).toEqual(5);

    expect(component.values.get([2, 0])).toEqual(-5);
    expect(component.values.get([2, 1])).toEqual(7);
    expect(component.values.get([2, 2])).toEqual(4);
    expect(component.values.get([2, 3])).toEqual(-4);
    expect(component.values.get([2, 4])).toEqual(-7);
    expect(component.values.get([2, 5])).toEqual(5);

    expect(component.values.get([3, 0])).toEqual(1);
    expect(component.values.get([3, 1])).toEqual(-3);
    expect(component.values.get([3, 2])).toEqual(2);
    expect(component.values.get([3, 3])).toEqual(2);
    expect(component.values.get([3, 4])).toEqual(-3);
    expect(component.values.get([3, 5])).toEqual(1);

    expect(component.values.get([4, 0])).toEqual(-1);
    expect(component.values.get([4, 1])).toEqual(5);
    expect(component.values.get([4, 2])).toEqual(-10);
    expect(component.values.get([4, 3])).toEqual(10);
    expect(component.values.get([4, 4])).toEqual(-5);
    expect(component.values.get([4, 5])).toEqual(1);
  });

  it('Should be av average matrix with one row and three columns', () => {
    component.poopulateAverageMatrix(3);
    expect(component.values.get([0, 0])).toEqual( 1 / 3);
    expect(component.values.get([0, 1])).toEqual( 1 / 3);
    expect(component.values.get([0, 2])).toEqual( 1 / 3);
  });

  it('Should be a 4x4 identity matrix.', () => {
    component.populateIdentityMatrix(4);
    expect(component.values.get([0, 0])).toEqual( 1);
    expect(component.values.get([0, 1])).toEqual( 0);
    expect(component.values.get([0, 2])).toEqual( 0);
    expect(component.values.get([0, 3])).toEqual( 0);

    expect(component.values.get([1, 0])).toEqual( 0);
    expect(component.values.get([1, 1])).toEqual( 1);
    expect(component.values.get([1, 2])).toEqual( 0);
    expect(component.values.get([1, 3])).toEqual( 0);

    expect(component.values.get([2, 0])).toEqual( 0);
    expect(component.values.get([2, 1])).toEqual( 0);
    expect(component.values.get([2, 2])).toEqual( 1);
    expect(component.values.get([2, 3])).toEqual( 0);

    expect(component.values.get([3, 0])).toEqual( 0);
    expect(component.values.get([3, 1])).toEqual( 0);
    expect(component.values.get([3, 2])).toEqual( 0);
    expect(component.values.get([3, 3])).toEqual( 1);
  });

});

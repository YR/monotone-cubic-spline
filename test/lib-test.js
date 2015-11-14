'use strict';

var expect, spline;

// Make it work in node..
try {
  spline = require('../src/index.js');
  expect = require('expect.js');
// .. or browser
} catch (err) {
  spline = require('src/index.js');
  expect = window.expect;
}

describe('monotCubicSpline', function () {
  describe('points()', function () {
    it('should generate points', function () {
      var points = spline.points([[0,0], [1,1], [2,1], [3,0], [4,0]])
        , results = [
            [0,0],
            [0.08333333333333333,0.08333333333333333,0.6666666666666667,1,1,1],
            [1.6666666666666667,1,2,1],
            [2.6666666666666665,0,3,0],
            [3.8333333333333335,0,4,0]
          ];
      points.forEach(function (point, idx) {
        expect(point).to.eql(results[idx]);
      });
    });
  });

  describe('slice()', function () {
    it('should return a subset of points for start=0', function () {
      var points = spline.slice(spline.points([[0,0], [1,1], [2,1], [3,0], [4,0], [5,1], [6,0]]), 0, 4)
        , results = [
            [0,0],
            [0.08333333333333333,0.08333333333333333,0.6666666666666667,1,1,1],
            [1.6666666666666667,1,2,1],
            [2.6666666666666665,0,3,0]
          ];
      points.forEach(function (point, idx) {
        expect(point).to.eql(results[idx]);
      });
    });
    it('should return a subset of points for start=1', function () {
      var points = spline.slice(spline.points([[0,0], [1,1], [2,1], [3,0], [4,0], [5,1], [6,0]]), 1, 5)
        , results = [
            [1,1],
            [1.3333333333333333,1,1.6666666666666667,1,2,1],
            [2.6666666666666665,0,3,0],
            [3.6666666666666665,0,4,0]
         ];
      points.forEach(function (point, idx) {
        expect(point).to.eql(results[idx]);
      });
    });
    it('should return a subset of points for start=2', function () {
      var points = spline.slice(spline.points([[0,0], [1,1], [2,1], [3,0], [4,0], [5,1], [6,0]]), 2, 6)
        , results = [
            [2,1],
            [2.333333333333333,1,2.6666666666666665,0,3,0],
            [3.6666666666666665,0,4,0],
            [4.666666666666667,1,5,1]
         ];
      points.forEach(function (point, idx) {
        expect(point).to.eql(results[idx]);
      });
    });
  });

  describe('svgPath()', function () {
    it('should generate an svg path', function () {
      var points = spline.points([[0,0], [1,1], [2,1], [3,0], [4,0]]);
      expect(spline.svgPath(points)).to.equal('M0 0C0.08333333333333333, 0.08333333333333333, 0.6666666666666667, 1, 1, 1S1.6666666666666667, 1, 2, 1S2.6666666666666665, 0, 3, 0S3.8333333333333335, 0, 4, 0');
    });
  });
});
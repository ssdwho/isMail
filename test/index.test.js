const ismail = require("../dist/index");

test('thismail@isvalid.com', () => {
  expect(ismail("thismail@isvalid.com")).toEqual({'valid': true, 'simplify': 'thismail@isvalid.com'});
})

test('w.i.l.l.i.a.m+hello+my+dear@googlemail.com', () => {
  expect(ismail("w.i.l.l.i.a.m+hello+my+dear@googlemail.com")).toEqual({'valid': true, 'simplify': 'william@gmail.com'});
})

test('look_at-this+no+no@outlook.com', () => {
  expect(ismail("look_at-this+no+no@outlook.com")).toEqual({'valid': true, 'simplify': 'look_at-this@outlook.com'});
})

test('3215', () => {
  expect(ismail(3215)).toEqual({'valid': false, 'simplify': '3215'});
})
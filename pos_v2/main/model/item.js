'use strict';

class Item {
  constructor(barcode, name, unit, price = 0.00) {
    this.barcode = barcode;
    this.name = name;
    this.unit = unit;
    this.price = price;
  }
}

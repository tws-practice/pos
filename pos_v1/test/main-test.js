'use strict';

describe('pos', () => {

  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});


describe('buildCodeAndNumArray check', () => {

  it('check return codeAndNumArray', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    const codeAndNumArrayCheck = [{code: 'ITEM000001', num: 5}, {code: 'ITEM000003', num: 2.5}, {
      code: 'ITEM000005',
      num: 3
    }];


    let codeAndNumArray = buildCodeAndNumArray(tags);
    let codeAndNumArrayToJson = JSON.stringify(codeAndNumArray);
    expect(codeAndNumArrayToJson).toBe(JSON.stringify(codeAndNumArrayCheck));
  });
});


describe('buildReceiptArray check', () => {

  it('check return recieptArray', () => {

    const allGoodItemArray = [
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000002',
        name: '苹果',
        unit: '斤',
        price: 5.50
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00
      },
      {
        barcode: 'ITEM000004',
        name: '电池',
        unit: '个',
        price: 2.00
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50
      }
    ];
    const recieptArrayCheck = [
      {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, num: 5},
      {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, num: 2.5},
      {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, num: 3}];
    const codeAndNumArray = [
      {code: 'ITEM000001', num: 5},
      {code: 'ITEM000003', num: 2.5},
      {code: 'ITEM000005', num: 3}];

    let recieptArray = buildReceiptArray(allGoodItemArray, codeAndNumArray);
    let recieptArrayToJson = JSON.stringify(recieptArray);
    expect(recieptArrayToJson).toBe(JSON.stringify(recieptArrayCheck));
  });
});


describe('getReceiptPreSum check', () => {

  it('check return noDiscountTotalPriceCheck', () => {

    const noDiscountTotalPriceCheck = 66;

    const recieptArray = [
      {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, num: 5},
      {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, num: 2.5},
      {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, num: 3}];


    let noDiscountTotalPrice = getReceiptPreSum(recieptArray);
    expect(noDiscountTotalPrice).toBe(noDiscountTotalPriceCheck);
  });
});


describe('getReceiptInfo check', () => {

  it('check return recieptArrayCheck', () => {

    const promotion =
      [
        {
          type: 'BUY_TWO_GET_ONE_FREE',
          barcodes: [
            'ITEM000000',
            'ITEM000001',
            'ITEM000005'
          ]
        }
      ];
    const recieptArray1 = [
      {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, num: 5},
      {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, num: 2.5},
      {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, num: 3}];
    const recieptArrayCheck = [
      {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, num: 5, sum: 12},
      {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, num: 2.5, sum: 37.5},
      {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, num: 3, sum: 9}];

    let recieptArray = getReceiptInfo(recieptArray1, promotion);
    let recieptArrayToJson = JSON.stringify(recieptArray);
    expect(recieptArrayToJson).toBe(JSON.stringify(recieptArrayCheck));
  });
});


describe('getReceiptPoSum check', () => {

  it('check return discountTotalPrice', () => {

    const discountTotalPriceCheck = 58.5;

    const recieptArray = [
      {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, num: 5, sum: 12},
      {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, num: 2.5, sum: 37.5},
      {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, num: 3, sum: 9}];


    let discountTotalPrice = getReceiptPoSum(recieptArray);
    expect(discountTotalPrice).toBe(discountTotalPriceCheck);
  });
});


describe('generateReciept', () => {

  it('should print text', () => {

    const recieptArray = [{barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, num: 5, sum: 12},
      {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, num: 2.5, sum: 37.5},
      {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, num: 3, sum: 9}];


    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;
    const discountTotalPrice = 58.5;
    const totalPrice = 7.5;

    let receiptPrint = generateReciept(recieptArray, discountTotalPrice, totalPrice);
    expect(receiptPrint).toBe(expectText);
  });
});

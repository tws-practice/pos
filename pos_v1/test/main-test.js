'use strict';


describe('Function calculatingTypeAndNumber test',()=> {
  it('it should have same typeAndNumberOfItems', () => {

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

    let typeAndNumberOfItems = calculatingTypeAndNumber(tags);
    const result=[
      {code: "ITEM000001", number: 5},
    {code: "ITEM000003", number: 2.5},
      {code: "ITEM000005", number: 3}
  ];
    expect(typeAndNumberOfItems).toEqual(result);
  });
});


describe('Function getItemsDetails test',()=> {
  it('it should have same ItemsDetails', () => {

    const typeAndNumberOfItems=[
      {code: "ITEM000001", number: 5},
      {code: "ITEM000003", number: 2.5},
      {code: "ITEM000005", number: 3}
    ];
    const allItems=loadAllItems();
    const itemsDetails = getItemsDetails(typeAndNumberOfItems, allItems);
    const result=[
      {code: "ITEM000001", number: 5, name: "雪碧", unit: "瓶", price: 3}
    ,
    {code: "ITEM000003", number: 2.5, name: "荔枝", unit: "斤", price: 15}
   ,
    {code: "ITEM000005", number: 3, name: "方便面", unit: "袋", price: 4.5}
  ]
    expect(itemsDetails).toEqual(result);
  });
});


describe('Function getPromotion test',()=> {
  it('it should have same ItemsDetails', () => {
    const items=[
      {code: "ITEM000001", number: 5, name: "雪碧", unit: "瓶", price: 3}
      ,
      {code: "ITEM000003", number: 2.5, name: "荔枝", unit: "斤", price: 15}
      ,
      {code: "ITEM000005", number: 3, name: "方便面", unit: "袋", price: 4.5}
    ]
    const promotions=loadPromotions();
    const itemsDetails = getPromotion(items, promotions);
    const result=[
      {code: "ITEM000001", number: 5, name: "雪碧", unit: "瓶", price: 3,status:'Promotion'}
      ,
      {code: "ITEM000003", number: 2.5, name: "荔枝", unit: "斤", price: 15}
      ,
      {code: "ITEM000005", number: 3, name: "方便面", unit: "袋", price: 4.5,status:'Promotion'}
    ]
    expect(itemsDetails).toEqual(result);
  });
});


describe('Function countItem test',()=> {
  it('it should have same ItemsDetails', () => {
    const items=[
      {code: "ITEM000001", number: 5, name: "雪碧", unit: "瓶", price: 3,status:'Promotion'}
      ,
      {code: "ITEM000003", number: 2.5, name: "荔枝", unit: "斤", price: 15}
      ,
      {code: "ITEM000005", number: 3, name: "方便面", unit: "袋", price: 4.5,status:'Promotion'}
    ]
     const  itemsDetails = countItem(items);
    const result=[
      {code: "ITEM000001", number: 5, name: "雪碧", unit: "瓶", price: 3,status:'Promotion',count: 12}
      ,
      {code: "ITEM000003", number: 2.5, name: "荔枝", unit: "斤", price: 15,count: 37.5}
      ,
      {code: "ITEM000005", number: 3, name: "方便面", unit: "袋", price: 4.5,status:'Promotion',count: 9}
    ]
    expect(itemsDetails).toEqual(result);
  });
});

describe('Function countAllItem test',()=> {
  it('it should have same ItemsDetails', () => {
    const items=[
      {code: "ITEM000001", number: 5, name: "雪碧", unit: "瓶", price: 3,status:'Promotion',count: 12}
      ,
      {code: "ITEM000003", number: 2.5, name: "荔枝", unit: "斤", price: 15,count: 37.5}
      ,
      {code: "ITEM000005", number: 3, name: "方便面", unit: "袋", price: 4.5,status:'Promotion',count: 9}
    ]
    const   itemsDetails = countAllItems(items);
    const result=[
      {code: "ITEM000001", number: 5, name: "雪碧", unit: "瓶", price: 3,status:'Promotion',count: 12}
      ,
      {code: "ITEM000003", number: 2.5, name: "荔枝", unit: "斤", price: 15,count: 37.5}
      ,
      {code: "ITEM000005", number: 3, name: "方便面", unit: "袋", price: 4.5,status:'Promotion',count: 9},
      {
        finalcount: 58.5,
        saved: 7.5
      }
    ]
    expect(itemsDetails).toEqual(result);
  });
});





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

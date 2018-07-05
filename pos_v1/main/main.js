'use strict';
var saveMoney = 0.00;
//TODO: 请在该文件中实现练习要求并删除此注释
function printReceipt(inputs) {
  let itemsCountArr = calculateCount(inputs);
  let itemsPriceInfo = calculatePrice(itemsCountArr);

  return createReceipt(itemsPriceInfo);

}

function getBarcode(barcode) {
  if (barcode.indexOf('-') > 0) {
    return barcode.substr(0, barcode.indexOf('-'));
  }
  return barcode;
}

function calculateCount(inputs) {
  let itemsCountArr = [];
  let mark = new Set();
  for (let i = 0; i < inputs.length; i++) {
    const match = getBarcode(inputs[i]);
    if (mark.has(match)) continue;
    mark.add(match);
    let count = 0;
    for (let j = 0; j < inputs.length; j++) {
      const element = inputs[j];
      let num = 1;
      let barcode = getBarcode(element);
      if (element.indexOf('-') > 0) {
        num = parseFloat(element.substr(element.indexOf('-') + 1, element.length));
      }
      if (match == barcode) {
        count += num;
      }
    }
    itemsCountArr.push({
      barcode: match,
      count: count
    });
  }
  return itemsCountArr;
}

function calculatePrice(itemsCountArr) {
  let itemsInfo = loadAllItems();
  let itemsPriceInfo = []
  itemsCountArr.forEach(item => {
    for (let index = 0; index < itemsInfo.length; index++) {
      let itemInfo = itemsInfo[index];
      if (item.barcode == itemInfo.barcode) {
        itemsPriceInfo.push({
          name: itemInfo.name,
          count: item.count,
          unit: itemInfo.unit,
          price: itemInfo.price,
          total: calculateTotal(item, itemInfo.price)
        })
        break;
      }
    }
  });
  return itemsPriceInfo;
}

function calculateTotal(item, price) {
  let promotionsInfo = loadPromotions();
  for (let i = 0; i < promotionsInfo.length; i++) {
    for (let index = 0; index < promotionsInfo[i].barcodes.length; index++) {
      const barcode = promotionsInfo[i].barcodes[index];
      if (barcode == item.barcode) {
        if (promotionsInfo[i].type == 'BUY_TWO_GET_ONE_FREE') {
          saveMoney += (parseInt(item.count / 3)) * price;
          return ((item.count - parseInt(item.count / 3)) * price).toFixed(2);
        }
      }
    }
  }
  return (item.count * price).toFixed(2);
}

function createReceipt(itemsPriceInfo) {
  let total = 0;
  let str = '';
  str += '***<没钱赚商店>收据***\n';
  itemsPriceInfo.forEach(item => {
    str += '名称：' + item.name + '，数量：' + item.count + item.unit + '，单价：' + item.price.toFixed(2) + '(元)，小计：' + item.total + '(元)\n';
    total += parseFloat(item.total);
  });

  str += '----------------------\n';
  str += '总计：' + total.toFixed(2) + '(元)\n';

  str += '节省：' + saveMoney.toFixed(2) + '(元)\n';
  str += '**********************';
  console.log(str);
}

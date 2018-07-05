'use strict';

function printReceipt(tags) {

  let codeAndNum1 = getCodeAndNum(tags);
  let itemInfo = loadAllItems();
  let tagsItem1 = getItems(itemInfo, codeAndNum1);
  let sum = getItemsPreSum(tagsItem1);
  let promotion = loadPromotions()[0].barcodes;
  let presum = getItemsPreSum(tagsItem1, promotion);
  tagsItem1 = getItemsInfo(tagsItem1, promotion);
  let posum = getItemsPoSum(tagsItem1);
  let cutsum = presum - posum;
  let content = '';
  for (let i = 0; i < tagsItem1.length; i++) {
    content += '名称：' + tagsItem1[i].name + '，数量：' + tagsItem1[i].num + tagsItem1[i].unit + '，单价：' + tagsItem1[i].price.toFixed(2) + '(元)，小计：' + tagsItem1[i].sum.toFixed(2) + '(元)\n'
  }
  console.log('***<没钱赚商店>收据***\n' +
    content +
    '----------------------\n' +
    '总计：' + posum.toFixed(2) + '(元)\n' +
    '节省：' + cutsum.toFixed(2) + '(元)\n' +
    '**********************');

}

//获取商品数量
function getCodeAndNum(tags) {
  let codeAndNum = [];
  for (let i = 0; i < tags.length; i++) {
    let num = 1.00;
    let flag = 0;
    let code = tags[i];
    let index = tags[i].indexOf('-');
    if (index !== -1) {
      code = tags[i].substring(0, index);
      num = parseFloat(tags[i].substring(index + 1, tags[i].length));
      console.log(num);
    }
    for (let j = 0; j < codeAndNum.length && flag === 0; j++) {
      let k = codeAndNum[j].code;
      if (k === code) {
        flag = 1;
        codeAndNum[j].num += num;
      }
    }
    if (flag === 0) {
      codeAndNum.push({code: code, num: num});
    }
  }
  return codeAndNum;
}

//获得各商品信息
function getItems(items, codeAndNum) {
  let tagsItem = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < codeAndNum.length; j++) {
      if (items[i].barcode === codeAndNum[j].code) {
        tagsItem.push({
          barcode: codeAndNum[j].code,
          name: items[i].name,
          unit: items[i].unit,
          price: items[i].price,
          num: codeAndNum[j].num
        })
      }
    }
  }
  return tagsItem;
}

function getItemsPreSum(tagsItem1) {
  let sum = 0.00;
  for (let i = 0; i < tagsItem1.length; i++) {
    sum += tagsItem1[i].price * tagsItem1[i].num;
  }
  return sum;
}


//查找对应商品信息
function getItemsInfo(tagsItem1, promotion) {
  let sum = 0.00;
  for (let i = 0; i < tagsItem1.length; i++) {
    let ponum = tagsItem1[i].num;
    let flag = 0;
    for (let j = 0; j < promotion.length && flag === 0; j++) {
      if (promotion[j] === tagsItem1[i].barcode) {
        flag = 1;
      }

    }
    if (tagsItem1[i].num > 2 && flag) {
      ponum = tagsItem1[i].num - 1;
    }
    tagsItem1[i].sum = tagsItem1[i].price * ponum;
  }
  return tagsItem1;
}

//获取商品优惠总价
function getItemsPoSum(tagsItem1) {
  let sum = 0.00;
  for (let i = 0; i < tagsItem1.length; i++) {
    sum += tagsItem1[i].sum;
  }
  return sum;
}

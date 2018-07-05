'use strict';


function printReceipt(buyGoodsList) {
  let allGoodItemArray = loadAllItems();
  let promotion = loadPromotions()[0].barcodes;
  let codeAndNumArray = BuildCodeAndNumArray(buyGoodsList);
  let recieptArray = getReceiptArray(allGoodItemArray, codeAndNumArray);
  let noDiscountTotalPrice = getReceiptPreSum(recieptArray);
  recieptArray = getReceiptInfo(recieptArray, promotion);
  let discountTotalPrice = getReceiptPoSum(recieptArray);
  let totalPrice = noDiscountTotalPrice - discountTotalPrice;
  let receiptPrint = generateReciept(recieptArray, discountTotalPrice, totalPrice);
  console.log(receiptPrint);

}

//获取商品数量
function BuildCodeAndNumArray(buyGoodsList) {
  let codeAndNumArray = [];
  for (let i = 0; i < buyGoodsList.length; i++) {
    let codeAndNumObject = {code: buyGoodsList[i], num: 1.00};
    let hasCodeFlag = false;
    if (buyGoodsList[i].indexOf('-') !== -1) {
      let codeSplit = buyGoodsList[i].split('-');
      codeAndNumObject.code = codeSplit[0];
      codeAndNumObject.num = parseFloat(codeSplit[1]);
    }
    for (let j = 0; j < codeAndNumArray.length; j++) {
      if (codeAndNumArray[j].code === codeAndNumObject.code) {
        hasCodeFlag = true;
        codeAndNumArray[j].num += codeAndNumObject.num;
        break;
      }
    }
    if (!hasCodeFlag) {
      codeAndNumArray.push(codeAndNumObject);
    }
  }
  return codeAndNumArray;
}

//获得各商品信息
function getReceiptArray(allGoodItems, codeAndNumObject) {
  let tagsItem = [];
  for (let i = 0; i < allGoodItems.length; i++) {
    for (let j = 0; j < codeAndNumObject.length; j++) {
      if (allGoodItems[i].barcode !== codeAndNumObject[j].code) continue;
      const {name, unit, price} = allGoodItems[i];
      const {code, num} = codeAndNumObject[j];
      tagsItem.push({
        barcode: code,
        name: name,
        unit: unit,
        price: price,
        num: num
      })

    }
  }
  return tagsItem;
}

function getReceiptPreSum(buyGoodsList) {
  let sum = 0.00;
  for (let i = 0; i < buyGoodsList.length; i++) {
    sum += buyGoodsList[i].price * buyGoodsList[i].num;
  }
  return sum;
}


//查找对应商品信息
function getReceiptInfo(buyGoodsList, promotion) {
  let sum = 0.00;
  for (let i = 0; i < buyGoodsList.length; i++) {
    let ponum = buyGoodsList[i].num;
    let hasCodeflag = false;
    for (let j = 0; j < promotion.length ; j++) {
      if (promotion[j] === buyGoodsList[i].barcode) {
        hasCodeflag = true;
        break;
      }
    }
    if (hasCodeflag) {
      ponum = buyGoodsList[i].num-Math.floor(buyGoodsList[i].num/3);
    }
    buyGoodsList[i].sum = buyGoodsList[i].price * ponum;
  }
  return buyGoodsList;
}

//获取商品优惠总价
function getReceiptPoSum(buyGoodsList) {
  let sum = 0.00;
  for (let i = 0; i < buyGoodsList.length; i++) {
    sum += buyGoodsList[i].sum;
  }
  return sum;
}

//组装打印数据
function generateReciept(recieptArray, discountTotalPrice, totalPrice) {
  let receiptPrint,content='';
  for (let i = 0; i < recieptArray.length; i++) {
    content += '名称：' + recieptArray[i].name + '，数量：' + recieptArray[i].num + recieptArray[i].unit + '，单价：' + recieptArray[i].price.toFixed(2) + '(元)，小计：' + recieptArray[i].sum.toFixed(2) + '(元)\n'
  }
  receiptPrint ='***<没钱赚商店>收据***\n' +
    content +
    '----------------------\n' +
    '总计：' + discountTotalPrice.toFixed(2) + '(元)\n' +
    '节省：' + totalPrice.toFixed(2) + '(元)\n' +
    '**********************'
  return receiptPrint;
}


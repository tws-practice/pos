'use strict';


function printReceipt(buyGoodsList) {
  let allGoodItemArray = loadAllItems();
  let promotion = loadPromotions();
  let codeAndNumArray = buildCodeAndNumArray(buyGoodsList);
  let recieptArray = buildReceiptArray(allGoodItemArray, codeAndNumArray);
  let noDiscountTotalPrice = getReceiptPreSum(recieptArray);
  recieptArray = getReceiptInfo(recieptArray, promotion);
  let discountTotalPrice = getReceiptPoSum(recieptArray);
  let totalPrice = noDiscountTotalPrice - discountTotalPrice;
  let receiptPrint = generateReciept(recieptArray, discountTotalPrice, totalPrice);

  console.log(receiptPrint);

}

//获取商品数量
function buildCodeAndNumArray(buyGoodsList) {
  let codeAndNumArray = [];
  for(let buyGood of buyGoodsList){
    let codeAndNumObject = {code: buyGood, num: 1.00};
    let hasCodeFlag = false;
    if (buyGood.indexOf('-') !== -1) {
      let codeSplit = buyGood.split('-');
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
function buildReceiptArray(allGoodItems, codeAndNumObject) {
  let receiptArray = [];
  for (let i = 0; i < allGoodItems.length; i++) {
    for (let j = 0; j < codeAndNumObject.length; j++) {
      if (allGoodItems[i].barcode !== codeAndNumObject[j].code) continue;
      const {name, unit, price} = allGoodItems[i];
      const {code, num} = codeAndNumObject[j];
      receiptArray.push({
        barcode: code,
        name,
        unit,
        price,
        num
      })

    }
  }
  return receiptArray;
}

function getReceiptPreSum(receiptArray) {
  let sum = 0.00;
  for (let i = 0; i < receiptArray.length; i++) {
    sum += receiptArray[i].price * receiptArray[i].num;
  }
  return sum;
}


//查找对应商品信息
function getReceiptInfo(receiptArray, promotion) {
  for(let promotionObject of promotion) {
    let sum = 0.00;
    for (let i = 0; i < receiptArray.length; i++) {
      let gitNum = receiptArray[i].num;
      let hasCodeflag = false;
      let barcodes = promotionObject.barcodes;
      for (let j = 0; j < barcodes.length; j++) {
        if (promotionObject.barcodes[j] === receiptArray[i].barcode) {
          hasCodeflag = true;
          break;
        }
      }
      if (hasCodeflag) {
        gitNum = receiptArray[i].num - Math.floor(receiptArray[i].num / 3);
      }
      receiptArray[i].sum = receiptArray[i].price * gitNum;
    }
  }
  return receiptArray;
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
/**
 * 组装打印数据
 * @param recieptArray
 * @param discountTotalPrice
 * @param totalPrice
 * @returns {string|*}
 */
function generateReciept(recieptArray, discountTotalPrice, totalPrice) {
  let receiptPrint,content='';
  for (let i = 0; i < recieptArray.length; i++) {
    content += '名称：' + recieptArray[i].name + '，数量：' + recieptArray[i].num + recieptArray[i].unit + '，单价：' +
                recieptArray[i].price.toFixed(2) + '(元)，小计：' + recieptArray[i].sum.toFixed(2) + '(元)\n'
  }
  receiptPrint ='***<没钱赚商店>收据***\n' +
    content +
    '----------------------\n' +
    '总计：' + discountTotalPrice.toFixed(2) + '(元)\n' +
    '节省：' + totalPrice.toFixed(2) + '(元)\n' +
    '**********************'
  return receiptPrint;
}


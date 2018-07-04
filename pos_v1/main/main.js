'use strict';

function printReceipt(tags) {
  var codeAndNum1 = getCodeAndNum(tags);
  var itemInfo = loadAllItems();
  var tagsItem1 = getItems(itemInfo,codeAndNum1);
  var sum = getItemsPreSum(tagsItem1);
  var promotion = loadPromotions()[0].barcodes;
  var presum = getItemsPreSum(tagsItem1,promotion);
  var tagsItem1 = getItemsInfo(tagsItem1,promotion);
  var posum = getItemsPoSum(tagsItem1);
  var cutsum = presum-posum;
  var content='';
  for(var i=0;i<tagsItem1.length;i++){
    content +='名称：'+tagsItem1[i].name+'，数量：'+tagsItem1[i].num+tagsItem1[i].unit+'，单价：'+tagsItem1[i].price.toFixed(2)+'(元)，小计：'+tagsItem1[i].sum.toFixed(2)+'(元)\n'
  }
  console.log('***<没钱赚商店>收据***\n' +
    content +
    '----------------------\n' +
    '总计：'+posum.toFixed(2)+'(元)\n'+
    '节省：'+cutsum.toFixed(2)+'(元)\n'+
    '**********************');

}
//获取商品数量
function getCodeAndNum(tags){
  var codeAndNum =[];
  for(var i=0;i<tags.length;i++){
    var num = 1.00;
    var flag=0;
    var code = tags[i];
    var index = tags[i].indexOf('-');
    if(index!=-1){
      var code = tags[i].substring(0,index);
      var num = parseFloat(tags[i].substring(index+1,tags[i].length));
    }
    for(var j=0;j<codeAndNum.length&&flag==0;j++){
      var k= codeAndNum[j].code;
      if(k==code){
        flag=1;
        codeAndNum[j].num +=num;
      }
    }
    if(flag==0){
      codeAndNum.push({code: code,num: num});
    }
  }
  return codeAndNum;
}

//获得各商品信息
function getItems(items,codeAndNum){
    var tagsItem = [];
    for(var i=0;i<items.length;i++){
      for(var j=0;j<codeAndNum.length;j++) {
        var k1 =codeAndNum[j].code;
        var k1 =codeAndNum[j].num;
        if (items[i].barcode == codeAndNum[j].code) {
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

function getItemsPreSum(tagsItem1){
  var sum = 0.00;
  for(var i=0;i<tagsItem1.length;i++){
    sum += tagsItem1[i].price*tagsItem1[i].num;
  }
  return sum;
}


//查找对应商品信息
function getItemsInfo(tagsItem1,promotion){
  var sum = 0.00;
  for(var i=0;i<tagsItem1.length;i++){
    var ponum = tagsItem1[i].num;
    var flag=0;
    for(var j =0;j<promotion.length&&flag==0;j++){
      if(promotion[j]==tagsItem1[i].barcode){
        flag=1;
      }

    }
    if(tagsItem1[i].num>2&&flag){
      ponum=tagsItem1[i].num-1;
    }
    tagsItem1[i].sum = tagsItem1[i].price*ponum;
  }
  return tagsItem1;
}
//获取商品优惠总价
function getItemsPoSum(tagsItem1){
  var sum = 0.00;
  for(var i=0;i<tagsItem1.length;i++){
    sum +=tagsItem1[i].sum;
  }
  return sum;
}

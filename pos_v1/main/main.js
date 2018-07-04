'use strict';

function  printReceipt(tags){
  //计算数量
    var item= count(tags);
    const  deatil=loadAllItems();
    item=getDeatil(item,deatil);
    const loadPromotion=loadPromotions();
    item=getPromotion(item,loadPromotion);
    item=  countKind(item);
    item= countAll(item);
   const final=print(item);
    console.log(final);
}

//计算数量
function count(tags) {

  let itemCount=[];

  for(let id of tags){
    let tempId= splitItem(id);
    let Iscontain=contain(tempId,itemCount);
    if(!Iscontain){
      itemCount.push({
        code: tempId.code,
        number: tempId.number
      })
    }

  }
  return itemCount;
}
function getDeatil(item,deatil) {
  // for(let det of deatil)
  for (let tempitem of item) {
    for(let det of deatil){
      if(tempitem.code==det.barcode){
        tempitem.name=det.name;
        tempitem.unit=det.unit;
        tempitem.price=det.price;
      }
    }
  }
  return item;
}

function  getPromotion(item,loadPromotion) {
 let barcode= loadPromotion[0].barcodes;
  for (let tempitem of item) {
    for(let i=0;i<barcode.length;i++){
      if(tempitem.code==barcode[i]){
        tempitem.status='Promotion';

      }
    }
  }
  return item;
}

function countKind(item) {
  for(let it of item){
    let mycount;
    if(it.hasOwnProperty('status')){
      mycount =(parseInt(it.number/3)*2+it.number%3)*it.price;
      it.count=mycount;
    }
    else{
      mycount=it.number*it.price;
      it.count=mycount;
    }
  }
  return item;
}

function  countAll(item) {
  let count=0 ;
  let countfa=0;
  for(let it of item){
   count=count+it.count;
    countfa=it.number*it.price+countfa;
  }

  item.push({
    finalcount: count,
    finalcon: countfa-count
  })
  return item;
}


function  print(item) {
  let final='***<没钱赚商店>收据***\n';
  for(let i=0;i<item.length-1;i++){
    final=final+'名称：'+item[i].name+'，数量：'+item[i].number+''+item[i].unit+'，单价：'+parseFloat(item[i].price).toFixed(2)+'(元)，小计：'+parseFloat(item[i].count).toFixed(2)+'(元)'+'\n';
  }
  final=final+'----------------------\n';
  final=final+'总计：'+parseFloat(item[item.length-1].finalcount).toFixed(2)+'(元)'+'\n';
  final=final+'节省：'+item[item.length-1].finalcon.toFixed(2)+'(元)'+'\n';
  final=final+'**********************';
;
final=`${final}`;
return final;
}


function splitItem(id) {
  let tempId={};
  if(id.indexOf('-')>=0){
      tempId={
       code : id.split('-')[0],
       number : parseFloat(id.split('-')[1])
     }
  }
  else{
    tempId={code : id,
      number : 1}
  }
  return tempId;
}

function  contain(tempId,itemCount) {
  if(itemCount.length==0){
    return false;
  }
    for(let temp of itemCount){
      if(temp.code==tempId.code){
        temp.number=temp.number+tempId.number;
        return true;
      }

    } return false;
}

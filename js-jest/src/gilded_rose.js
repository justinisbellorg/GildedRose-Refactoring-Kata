class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(item =>{
      switch(item.name){
        case 'Aged Brie':
          if(item.sellIn>0){
            item.quality = item.quality+1
          }
          if(item.sellIn <= 0){
            item.quality = item.quality +2
          }
          if(item.quality > 50) {item.quality = 50}
          item.sellIn = item.sellIn -1
          return;
        
        case 'Sulfuras, Hand of Ragnaros':
          return;
        
        case 'Backstage passes to a TAFKAL80ETC concert':
          if(item.sellIn>0){
            item.quality = item.quality+1
          }
          if(item.sellIn <= 10){
            item.quality = item.quality +1
          }
          if(item.sellIn <= 5){
            item.quality = item.quality +1
          }
          item.sellIn = item.sellIn -1
          if(item.sellIn<0) {item.quality = 0}
          if(item.quality > 50) {item.quality = 50}
          return;
        
        default:
          if(item.sellIn>0){
            item.quality = item.quality-1
          }
          if(item.sellIn <= 0){
            item.quality = item.quality -2
          }
          if(item.quality < 0) {item.quality = 0}
          item.sellIn = item.sellIn -1
          return;
                  
      }
    })
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}

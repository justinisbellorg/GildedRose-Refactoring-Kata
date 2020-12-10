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
    //basic loop to loop through all items
    for (let i = 0; i < this.items.length; i++) {
      //if the item is not aged bree or a backstage pass, I presume because they go up in value and everything else but sulfuras goes down.
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        //If the quality is above zero because quality can't be negative.
        if (this.items[i].quality > 0) {
          //Checking now to make sure this is not sulfuras because its value can't change.
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            //Now we can drop the quality by one of the item since we have excluded all of the reasons it can't change.
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      }//This is where all of the items that go UP in value get handled, which currently is aged bree and a backstage pass. 
      else { 
        //Quality can't go above 50 so this checks that
        if (this.items[i].quality < 50) {
          //the quality automatically goes up by one then
          this.items[i].quality = this.items[i].quality + 1;
          //but now we need to see if this is a backstage pass
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            //if the sell by date is less than 11 and if the quality still isn't 50
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                //we can let the value go up by one again
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            //If the concert is within less than 6 days and if the value is less than 50
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                //We can bump the value by one now.
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      //This the the end of the section where we change value for the most part, now we are messing with sell by date.
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        //as long as its not Sulfuras you drop the sell by by one, note this is happening AFTER the value changes, not before.
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      //Now we handle if we have gone past the sell by date.
      if (this.items[i].sellIn < 0) {
        //if it is not brie
        if (this.items[i].name != 'Aged Brie') {
          //if it is not a backstage pass
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            //as long as quality is above 0
            if (this.items[i].quality > 0) {
              //as long as its not sulfuras
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                //drop the value by one
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            //if this else is triggerd then it means that the value needs to be zero, we do this by subtracting the current value by the value. Why can't we just set it to 0?
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          //brie aging is worth extra, we handle it here
          if (this.items[i].quality < 50) {
            //as long as brie is worth less than 50 we add value again
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
      //we don't do anything else here if we haven't passed the sell by date.
    }
    //we return all the items.
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}

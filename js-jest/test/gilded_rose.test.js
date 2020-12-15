const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  describe("Brie",function(){
    it("should increase in value by 1 when sellby is not past", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 4, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(11);
    });
    //this is how it works now and it seems like it PROBABLY matches what they want.
    it("should increase in value by 2 once past its sell by date", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(12);
    });
    it("should never be worth more than 50", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 4, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });
    it("should drop sellin by 1", function(){
      const gildedRose = new Shop([new Item("Aged Brie", 4, 40)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(3);
    })
  })

  describe("Sulfuras", function(){
    it("should stay the same when past its sell by date", function() {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 55)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(55);
    });
    it("should stay the same when not past its sell by date", function() {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 55)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(55);
    });
    it("should not drop sellin", function(){
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 4, 40)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
    })
  })

  describe("Backstage Pass", function(){
    it("should go up in value normally outside of 10 days to sellIn", function(){
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 20, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(11);
    });
    it("should go up in value by 2 within 10 days but outside of 5", function(){
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 9, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(12);
    });
    it("should go up in value by 3 within 5 days of sell in", function(){
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(13);
    })
    it("Should value 0 once it is passed sell in", function(){
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    })
    it("should never go above 50", function(){
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    })
    it("should drop sellin by 1", function(){
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 40)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(3);
    })
  })

  describe("Standard Items",function(){
    it("should go down in value one day at a time", function(){
      const gildedRose = new Shop([new Item("Rando", 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(9);
    })
    it("should never be below 0", function(){
      const gildedRose = new Shop([new Item("Rando", 4, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    })
    it("Should lose value twice as fast once past sell by", function(){
      const gildedRose = new Shop([new Item("Rando", 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(8);
    })
    it("should drop sellin by 1", function(){
      const gildedRose = new Shop([new Item("Rando", 4, 40)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(3);
    })
  })
});


const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("fixme");
  });
});

// - All items have a SellIn value which denotes the number of days we have to sell the item
// - All items have a Quality value which denotes how valuable the item is
// - At the end of each day our system lowers both values for every item

// Pretty simple, right? Well this is where it gets interesting:

// - Once the sell by date has passed, Quality degrades twice as fast
// - The Quality of an item is never negative
// - "Aged Brie" actually increases in Quality the older it gets
// - The Quality of an item is never more than 50
// - "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
// - "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
// Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
// Quality drops to 0 after the concert

/* Scenario Walkthroughs to help thinking
***************************
Here we list out what seem like common scenarios. This plus the logic comments we put in should help us map out how this thing actually works
1. We don't know if how it works actually matches the rules
2. We presume anywhere it doesn't work matching the specs is a bug but this is an assumption
3. Lets assuming this is running live in how we approach making changes and limit the number of breaking changes
***************************

One big Note is that it looks like we don't have any items changing the value of other items which is great, this basically leaves us with just a few scenarios for each item:
1. The item is not passed its sell by date
2. The item is passed its sell by date.
3. The items value has hit zero
4. The items value has hit 50

We can probably just makes 4 sets of tests to handle these situations. 

*/
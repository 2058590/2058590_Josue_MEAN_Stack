"use strict";
exports.__esModule = true;
exports.Item = void 0;
var Item = /** @class */ (function () {
    function Item(name, id, price, img) {
        if (img === void 0) { img = ""; }
        this.name = name;
        this.id = id;
        this.price = price;
        this.img = img;
        //this.template = 
    }
    Item.prototype.toString = function () {
        return "<div>" + this.name + "</div>\n        <div>Item #" + this.id + "</div>\n        <div>Price $" + this.price + "</div>\n        <div>" + this.img + "</div>";
        //this.template;
    };
    Item.prototype.toObj = function () {
        return { name: this.name, id: this.id, price: this.price, img: this.img };
    };
    return Item;
}());
exports.Item = Item;

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.content = exports.inventory = exports.quants = void 0;
//import * as fs from "fs";
var Item_1 = require("./Item");
var data = [
    { "name": "water bottle",
        "id": 1000,
        "price": 2.50,
        "img": "" },
    { "name": "bacon dog snacks",
        "id": 1001,
        "price": 3.50,
        "img": "" },
    { "name": "chocolate bar",
        "id": 1002,
        "price": 1.0,
        "img": "" },
    { "name": "shirt",
        "id": 1003,
        "price": 4.50,
        "img": "" },
    { "name": "chips",
        "id": 1004,
        "price": 2.25,
        "img": "" }
];
function loadData() {
    var inventory = [];
    for (var i in data) {
        inventory.push(new Item_1.Item(data[i].name, data[i].id, data[i].price, data[i].img));
    }
    return inventory;
}
function print(inventory) {
    var content = "<form>";
    for (var i in inventory) {
        content += "<div>" + inventory[i] + "<label>Quantity  </label><input type=\"text\" id=\"" + i + "\"></div><br/>";
        exports.quants.push(0);
    }
    content += "</form>";
    return content;
}
function addValues() {
    var total = 0;
    for (var i in exports.quants) {
        var el_1 = document.getElementById(i);
        if (el_1 != null) {
            try {
                var htmlel = el_1;
                var v = (htmlel).value;
                console.log(v);
                var k = JSON.parse(v);
                exports.quants[i] = k;
                total += k;
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            console.log("it's null");
        }
    }
    var el = document.getElementById("items");
    if (el != null)
        el.innerHTML = JSON.stringify(total);
    sessionStorage.setItem("quants", JSON.stringify(exports.quants));
    sessionStorage.setItem("total", JSON.stringify(total));
}
function updateCheckout(element) {
    var cost = 0.0;
    var total = 0;
    var item = sessionStorage.getItem("quants");
    if (item != null) {
        exports.quants = JSON.parse(item);
    }
    console.log("quantities:" + item);
    var content = "<table>";
    for (var i in exports.quants) {
        if (exports.quants[i] > 0) {
            content += "<tr><td>" + exports.inventory[i]['name'] + "</td>  <td>$" + exports.inventory[i]["price"] + "</td><td>" + exports.quants[i] + "</td></tr><br/>";
            total += exports.quants[i];
            cost += exports.quants[i] * exports.inventory[i]["price"];
        }
    }
    console.log(cost);
    console.log(exports.quants);
    content += "</table><br/>";
    content += "<table id=\"total\" class=\"highlight\"><tr><td>Total:<div>$" + cost + "</div></td><td>#Items:<div>" + total + "</div></td></tr></table>";
    element.innerHTML = content;
}
exports.quants = [];
exports.inventory = loadData();
exports.content = print(exports.inventory);
var element = document.getElementById("inventory");
if (element != null) {
    element.innerHTML = exports.content;
}
element = document.getElementById("add");
if (element != null) {
    element.onclick = addValues;
}
element = document.getElementById("checkout");
if (element != null) {
    updateCheckout(element);
}

},{"./Item":1}]},{},[2]);

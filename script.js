/*jslint globalstrict:true*/
/*jslint browser:true*/
/*jslint esversion:6*/
"use strict";

let version = document.getElementById("version").textContent = "ALPHA 0.0.8";

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function precise(num, acc) {
    return Number.parseFloat(num).toPrecision(acc);
}

function expo(num) {
    return Number.parseFloat(num).toExponential(2);
}

function numberFormat(num) {
    if (num.toString().length > 3) {
        return expo(num);
    } else {
        return num;
    }
}

let hydrogen = 1;
let hydrogenExtractor = 0;
let hydrogenCost = 1;
let heliumExtractor = 0;
let heliumActivated = false;
let heliumCost = 1000;
let lithiumExtractor = 0;
let lithiumActivated = false;
let lithiumCost = 100000;
let berylliumExtractor = 0;
let berylliumActivated = false;
let berylliumCost = 10000000;
let tickspeed = 1000;
let tickspeedCost = 10;
let hydrogenCount = document.getElementById("hydrogen-count");
let hydrogenButton = document.getElementById("hydrogen-button");
let tickspeedButton = document.getElementById("tickspeed-button");
let buttonTop;
let buttonBottom;

hydrogenButton.onclick = () => {
    if (hydrogen < hydrogenCost) {
        return;
    }

    hydrogen -= hydrogenCost;
    hydrogenCost += hydrogenCost * 0.772;
    hydrogenExtractor += 1;
    hydrogenCount.textContent = numberFormat(hydrogen) + " Hydrogen";
    hydrogenButton.firstElementChild.textContent = "Hydrogen Extractor (" + numberFormat(hydrogenExtractor) + ")";
    hydrogenButton.lastElementChild.textContent = "(" + numberFormat(hydrogenCost) + ")";
};

var counter = tickspeed;
var myFunction = function() {
    callback();
    var counter = tickspeed;
    setTimeout(myFunction, counter);
};
setTimeout(myFunction, counter);

let heliumButton = document.createElement("div");
heliumButton.id = "helium-button";
heliumButton.className = "text display button centered";
heliumButton.dataset.size = "small";
buttonTop = document.createElement("div");
buttonBottom = document.createElement("div");
buttonTop.id = "helium-extractor-display";
buttonTop.textContent = "Helium Extractor (0)";
buttonBottom.id = "helium-extractor-cost-display";
buttonBottom.textContent = "(1000)";
heliumButton.appendChild(buttonTop);
heliumButton.appendChild(buttonBottom);

heliumButton.onclick = () => {
    if (heliumExtractor < heliumCost) {
        return;
    }

    hydrogen -= heliumCost;
    heliumExtractor += 1;
    heliumCost += heliumCost * 0.772;
    hydrogenCount.textContent = numberFormat(hydrogen) + " Hydrogen";
    heliumButton.firstElementChild.textContent = "Helium Extractor (" + numberFormat(heliumExtractor) + ")";
    heliumButton.lastElementChild.textContent = "(" + numberFormat(heliumCost) + ")";
};

let lithiumButton = document.createElement("div");
lithiumButton.id = "lithium-button";
lithiumButton.className = "text display button centered";
lithiumButton.dataset.size = "small";
buttonTop = document.createElement("div");
buttonBottom = document.createElement("div");
buttonTop.id = "lithium-extractor-display";
buttonTop.textContent = "Lithium Extractor (0)"
buttonBottom.id = "lithium-extractor-cost-display";
buttonBottom.textContent = "(100000)";
lithiumButton.appendChild(buttonTop);
lithiumButton.appendChild(buttonBottom);

lithiumButton.onclick = () => {
    if (lithiumExtractor < lithiumCost) {
        return;
    }

    hydrogen -= lithiumCost;
    lithiumExtractor += 1;
    lithiumCost += lithiumCost * 0.772;
    lithiumButton.firstElementChild.textContent = "lithium Extractor (" + numberFormat(lithiumExtractor) + ")";
    lithiumButton.lastElementChild.textContent = "(" + numberFormat(lithiumCost) + ")";
};

let berylliumButton = document.createElement("div");
berylliumButton.id = "beryllium-button";
berylliumButton.className = "text display button centered";
berylliumButton.dataset.size = "small";
hydrogenCount.textContent = numberFormat(hydrogen) + " Hydrogen";
buttonTop = document.createElement("div");
buttonBottom = document.createElement("div");
buttonTop.id = "beryllium-extractor-display";
buttonTop.textContent = "Beryllium Extractor (0)"
buttonBottom.id = "beryllium-extractor-cost-display";
buttonBottom.textContent = "(100000)";
berylliumButton.appendChild(buttonTop);
berylliumButton.appendChild(buttonBottom);

berylliumButton.onclick = () => {
    if (berylliumExtractor < berylliumCost) {
        return;
    }

    hydrogen -= berylliumCost;
    berylliumExtractor += 1;
    berylliumCost += berylliumCost * 0.772;
    hydrogenCount.textContent = numberFormat(hydrogen) + " Hydrogen";
    berylliumButton.firstElementChild.textContent = "beryllium Extractor (" + numberFormat(berylliumExtractor) + ")";
    berylliumButton.lastElementChild.textContent = "(" + numberFormat(berylliumCost) + ")";
};

let callback = () => {
    lithiumExtractor += berylliumExtractor;
    heliumExtractor += lithiumExtractor;
    hydrogenExtractor += heliumExtractor;
    hydrogen += hydrogenExtractor;
    lithiumButton.firstElementChild.textContent = "Lithium Extractor (" + numberFormat(lithiumExtractor) + ")";
    lithiumButton.lastElementChild.textContent = "(" + numberFormat(lithiumCost) + ")";
    heliumButton.firstElementChild.textContent = "Helium Extractor (" + numberFormat(heliumExtractor) + ")";
    heliumButton.lastElementChild.textContent = "(" + numberFormat(heliumCost) + ")";
    hydrogenCount.textContent = numberFormat(hydrogen) + " Hydrogen";
    hydrogenButton.firstElementChild.textContent = "Hydrogen Extractor (" + numberFormat(hydrogenExtractor) + ")";
    hydrogenButton.lastElementChild.textContent = "(" + numberFormat(hydrogenCost) + ")";
};

tickspeedButton.onclick = () => {
    if (hydrogen < tickspeedCost) {
        return;
    }

    hydrogen -= tickspeedCost;
    hydrogenCount.textContent = numberFormat(hydrogen) + " Hydrogen";
    tickspeedCost *= 10;

    if (tickspeed == 0.01 && !heliumActivated) {
        insertAfter(heliumButton, hydrogenButton);
        tickspeed = 1000;
        tickspeedButton.firstElementChild.textContent = "Tickspeed (" + numberFormat(tickspeed) + ")";
        tickspeedButton.lastElementChild.textContent = "(" + numberFormat(tickspeedCost) + ")";
        heliumActivated = true;
        return;
    } else if (tickspeed == 0.01 && !lithiumActivated) {
        insertAfter(lithiumButton, heliumButton);
        tickspeed = 1000;
        tickspeedButton.firstElementChild.textContent = "Tickspeed (" + numberFormat(tickspeed) + ")";
        tickspeedButton.lastElementChild.textContent = "(" + numberFormat(tickspeedCost) + ")";
        lithiumActivated = true;
        return;
    } else if (tickspeed == 0.01 && !berylliumActivated) {
        insertAfter(berylliumButton, lithiumButton);
        tickspeed = 1000;
        tickspeedButton.firstElementChild.textContent = "Tickspeed (" + numberFormat(tickspeed) + ")";
        tickspeedButton.lastElementChild.textContent = "(" + numberFormat(tickspeedCost) + ")";
        berylliumActivated = true;
        return;
    }

    tickspeed = Math.max(precise(tickspeed / 1.1, 3), 0.01);
    tickspeedButton.firstElementChild.textContent = "Tickspeed (" + numberFormat(tickspeed) + ")";
    tickspeedButton.lastElementChild.textContent = "(" + numberFormat(tickspeedCost) + ")";
};
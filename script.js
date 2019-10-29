/*jslint globalstrict:true*/
/*jslint browser:true*/
/*jslint esversion:6*/
"use strict";

let version = document.getElementById("version").textContent = "ALPHA 0.0.6";

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
let heliumExtractor = 0;
let heliumActivated = false;
let lithiumExtractor = 0;
let lithiumActivated = false;
let berylliumExtractor = 0;
let berylliumActivated = false;
let tickspeed = 1000;
let hydrogenCount = document.getElementById("hydrogen-count");
let hydrogenButton = document.getElementById("hydrogen-button");
let tickspeedButton = document.getElementById("tickspeed-button");

hydrogenButton.onclick = () => {
    hydrogenExtractor += 1;
    hydrogenButton.textContent = "Hydrogen Extractor (" + numberFormat(hydrogenExtractor) + ")";
};

let callback = () => {
    lithiumExtractor += berylliumExtractor;
    heliumExtractor += lithiumExtractor;
    hydrogenExtractor += heliumExtractor;
    hydrogen += hydrogenExtractor;
    lithiumButton.textContent = "Lithium Extractor (" + numberFormat(lithiumExtractor) + ")";
    heliumButton.textContent = "Helium Extractor (" + numberFormat(heliumExtractor) + ")";
    hydrogenCount.textContent = numberFormat(hydrogen) + " Hydrogen";
    hydrogenButton.textContent = "Hydrogen Extractor (" + numberFormat(hydrogenExtractor) + ")";
};

var counter = tickspeed;
var myFunction = function() {
    callback();
    var counter = tickspeed;
    setTimeout(myFunction, counter);
}
setTimeout(myFunction, counter);

let heliumButton = document.createElement("div");
heliumButton.id = "helium-button";
heliumButton.className = "text display button centered";
heliumButton.dataset.size = "small";
heliumButton.textContent = "Helium Extractor (0)";

heliumButton.onclick = () => {
    heliumExtractor += 1;
    heliumButton.textContent = "Helium Extractor (" + numberFormat(heliumExtractor) + ")";
};

let lithiumButton = document.createElement("div");
lithiumButton.id = "lithium-button";
lithiumButton.className = "text display button centered";
lithiumButton.dataset.size = "small";
lithiumButton.textContent = "Lithium Extractor (0)";

lithiumButton.onclick = () => {
    lithiumExtractor += 1;
    lithiumButton.textContent = "Lithium Extractor (" + numberFormat(lithiumExtractor) + ")";
};

let berylliumButton = document.createElement("div");
berylliumButton.id = "beryllium-button";
berylliumButton.className = "text display button centered";
berylliumButton.dataset.size = "small";
berylliumButton.textContent = "Beryllium Extractor (0)";

berylliumButton.onclick = () => {
    berylliumExtractor += 1;
    berylliumButton.textContent = "Beryllium Extractor (" + numberFormat(berylliumExtractor) + ")";
};


tickspeedButton.onclick = () => {
    if (tickspeed == 0.01 && !heliumActivated) {
        insertAfter(heliumButton, hydrogenButton);
        tickspeed = 1000;
        tickspeedButton.textContent = "Tickspeed (" + numberFormat(tickspeed) + ")";
        heliumActivated = true;
        return;
    } else if (tickspeed == 0.01 && !lithiumActivated) {
        insertAfter(lithiumButton, heliumButton);
        tickspeed = 1000;
        tickspeedButton.textContent = "Tickspeed (" + numberFormat(tickspeed) + ")";
        lithiumActivated = true;
        return;
    } else if (tickspeed == 0.01 && !berylliumActivated) {
        insertAfter(berylliumButton, lithiumButton);
        tickspeed = 1000;
        tickspeedButton.textContent = "Tickspeed (" + numberFormat(tickspeed) + ")";
        berylliumActivated = true;
        return;
    }

    tickspeed = Math.max(precise(tickspeed / 1.1, 3), 0.01);
    tickspeedButton.textContent = "Tickspeed (" + numberFormat(tickspeed) + ")";
};
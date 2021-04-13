/*jslint globalstrict:true*/
/*jslint browser:true*/
/*jslint esversion:6*/
"use strict";

let version = document.getElementById("version").textContent = "ALPHA 0.1.0";

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
    if (Math.log10(num) >= 4.0) {
        return expo(Math.round(num));
    } else {
        return Math.round(num);
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";";
}

function deleteCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function deleteCookies(cnames) {
    for (var cname in cnames) {
        deleteCookie(cname);
    }
}

let hydrogen = 1;
let hydrogenExtractor = 0;
let hydrogenCost = 1;
let heliumExtractor = 0;
let heliumActivated = false;
let heliumCost = 500;
let lithiumExtractor = 0;
let lithiumActivated = false;
let lithiumCost = 100000;
let berylliumExtractor = 0;
let berylliumActivated = false;
let berylliumCost = 100000000;
let tickspeed = 1000;
let tickspeedCost = 10;
let hydrogenCount = document.getElementById("hydrogen-count");
let tickspeedButton = document.getElementById("tickspeed-button");
let buttonTop;
let buttonBottom;

function loadFunction() {
    if (getCookie("hydrogen") != "") {
        hydrogen = parseInt(getCookie("hydrogen"));
        hydrogenExtractor = parseInt(getCookie("hydrogenExtractor"));
        hydrogenCost = parseInt(getCookie("hydrogenCost"));
        heliumExtractor = parseInt(getCookie("heliumExtractor"));
        heliumActivated = getCookie("heliumActivated") == "true";
        heliumCost = parseInt(getCookie("heliumCost"));
        lithiumExtractor = parseInt(getCookie("lithiumExtractor"));
        lithiumActivated = getCookie("lithiumActivated") == "true";
        lithiumCost = parseInt(getCookie("lithiumCost"));
        berylliumExtractor = parseInt(getCookie("berylliumExtractor"));
        berylliumActivated = getCookie("berylliumActivated") == "true";
        berylliumCost = parseInt(getCookie("berylliumCost"));
        tickspeed = parseInt(getCookie("tickspeed"));
        tickspeedCost = parseInt(getCookie("tickspeedCost"));
    }
}

window.onload = loadFunction;

function saveProgress() {
    setCookie("hydrogen", hydrogen);
    setCookie("hydrogenExtractor", hydrogenExtractor);
    setCookie("hydrogenCost", hydrogenCost);
    setCookie("heliumExtractor", heliumExtractor);
    setCookie("heliumActivated", heliumActivated);
    setCookie("heliumCost", heliumCost);
    setCookie("lithiumExtractor", lithiumExtractor);
    setCookie("lithiumActivated", lithiumActivated);
    setCookie("lithiumCost", lithiumCost);
    setCookie("berylliumExtractor", berylliumExtractor);
    setCookie("berylliumActivated", berylliumActivated);
    setCookie("berylliumCost", berylliumCost);
    setCookie("tickspeed", tickspeed);
    setCookie("tickspeedCost", tickspeedCost);
}

function checkNextUpgrade() {
    if (!heliumActivated && hydrogenExtractor >= 10) {
        heliumActivated = true;
        document.body.appendChild(heliumButton);
    }
    if (!lithiumActivated && heliumExtractor >= 10) {
        lithiumActivated = true;
        document.body.appendChild(lithiumButton);
    }
    if (!berylliumActivated && lithiumExtractor >= 10) {
        berylliumActivated = true;
        document.body.appendChild(berylliumButton);
    }
}

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

var counter = tickspeed;
var loopFunction = function() {
    callback();
    checkNextUpgrade();
    var counter = tickspeed;
    setTimeout(loopFunction, counter);
};
setTimeout(loopFunction, counter);

let hydrogenButton = document.getElementById("hydrogen-button");
hydrogenButton.onclick = () => {
    if (hydrogen < hydrogenCost) {
        return;
    }

    hydrogen -= hydrogenCost;
    hydrogenCost += hydrogenCost * 0.571;
    hydrogenExtractor += 1;
    hydrogenCount.textContent = numberFormat(hydrogen) + " Hydrogen";
    hydrogenButton.firstElementChild.textContent = "Hydrogen Extractor (" + numberFormat(hydrogenExtractor) + ")";
    hydrogenButton.lastElementChild.textContent = "(" + numberFormat(hydrogenCost) + ")";
};

let heliumButton = document.createElement("div");
heliumButton.id = "helium-button";
heliumButton.className = "text display button centered";
heliumButton.dataset.size = "small";
buttonTop = document.createElement("div");
buttonBottom = document.createElement("div");
buttonTop.id = "helium-extractor-display";
buttonTop.textContent = "Helium Extractor (0)";
buttonBottom.id = "helium-extractor-cost-display";
buttonBottom.textContent = "(500)";
heliumButton.appendChild(buttonTop);
heliumButton.appendChild(buttonBottom);

heliumButton.onclick = () => {
    if (hydrogen < heliumCost) {
        return;
    }

    hydrogen -= heliumCost;
    heliumExtractor += 1;
    heliumCost += heliumCost * 0.625;
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
buttonBottom.textContent = "(1e+5)";
lithiumButton.appendChild(buttonTop);
lithiumButton.appendChild(buttonBottom);

lithiumButton.onclick = () => {
    if (hydrogen < lithiumCost) {
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
buttonBottom.textContent = "(1e+8)";
berylliumButton.appendChild(buttonTop);
berylliumButton.appendChild(buttonBottom);

berylliumButton.onclick = () => {
    if (hydrogen < berylliumCost) {
        return;
    }

    hydrogen -= berylliumCost;
    berylliumExtractor += 1;
    berylliumCost += berylliumCost * 0.833;
    hydrogenCount.textContent = numberFormat(hydrogen) + " Hydrogen";
    berylliumButton.firstElementChild.textContent = "Beryllium Extractor (" + numberFormat(berylliumExtractor) + ")";
    berylliumButton.lastElementChild.textContent = "(" + numberFormat(berylliumCost) + ")";
};

tickspeedButton.onclick = () => {
    if (hydrogen < tickspeedCost) {
        return;
    }

    hydrogen -= tickspeedCost;
    hydrogenCount.textContent = numberFormat(hydrogen) + " Hydrogen";
    tickspeedCost *= 8.18;

    tickspeed = Math.max(precise(tickspeed / 1.1, 3), 0.01);
    tickspeedButton.firstElementChild.textContent = "Tickspeed (" + numberFormat(tickspeed) + ")";
    tickspeedButton.lastElementChild.textContent = "(" + numberFormat(tickspeedCost) + ")";
};
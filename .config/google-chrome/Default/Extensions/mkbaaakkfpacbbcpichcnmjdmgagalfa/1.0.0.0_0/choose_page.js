//Translate choice from English to differnt language
oliveValue = document.getElementById("olive");
oliveText = chrome.i18n.getMessage("choiceOlive");
oliveValue.textContent = oliveText;

greenValue = document.getElementById("green");
greenText = chrome.i18n.getMessage("choiceGreen");
greenValue.textContent = greenText;

yellowValue = document.getElementById("yellow");
yellowText = chrome.i18n.getMessage("choiceYellow");
yellowValue.textContent = yellowText;

greyValue = document.getElementById("grey");
greyText = chrome.i18n.getMessage("choiceGrey");
greyValue.textContent = greyText;

orignValue = document.getElementById("orign");
orignText = chrome.i18n.getMessage("choiceOrign");
orignValue.textContent = orignText;

customValue = document.getElementById("custom");
customValue.textContent = chrome.i18n.getMessage("choiceCustom");

optionsValue = document.getElementById("options");
optionsValue.textContent = chrome.i18n.getMessage("choiceOptions");

document.addEventListener("click", function(e){
    if(!e.target.classList.contains("page-choice")){
        return;
    }

    //Use ID instead of textConet as we will use i18n API
    var value = e.target.id;

    if (value == "options") {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html')); 
        }

        return;
    }

    /*
    var gettingActiveTab = chrome.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id, {colorValue: value});
    });
    */
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {colorValue: value});
    });
});
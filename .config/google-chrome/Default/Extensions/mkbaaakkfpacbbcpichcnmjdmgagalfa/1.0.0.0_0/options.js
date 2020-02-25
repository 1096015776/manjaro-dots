function saveOptions(e) {
  console.log("Save color: ", document.querySelector("#color").value);
  e.preventDefault();
  chrome.storage.local.set({
    color: document.querySelector("#color").value
  });
}

/*
function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#color").value = result.color || "olive";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = chrome.storage.local.get("color");
  getting.then(setCurrentChoice, onError);
}
*/

//document.addEventListener("DOMContentLoaded", restoreOptions);

function checkBoxHandler(e) {
  console.log("whether enable change background color at new tab");
  var checkBox = e.target;

  if (checkBox.id == "newTab") {
    if (checkBox.checked) {
      chrome.storage.local.set({
        newTab: true
      });
    } else {
      chrome.storage.local.set({
        newTab: false
      });
    }
    //alert(checkBox.checked);
  }


  if (checkBox.id == "customEnable") {
    if (checkBox.checked) {
      chrome.storage.local.set({
        customEnable: true
      });

      var color = document.getElementsByClassName("jscolor")[0].value;
      color = "#" + color;
      //alert("custome color: " + color);
      chrome.storage.local.set({
        customColor: color
      });

    } else {
      chrome.storage.local.set({
        customEnable: false
      });
      chrome.storage.local.set({
        customColor: null
      });
    }
  }
}

function inputHandler(e) {
  console.log("input change handler");
  var color = document.getElementsByClassName("jscolor")[0].value;
  color = "#" + color;
  //alert("custome color: " + color);
  var checkbox = document.getElementById("customEnable");
  if (checkbox.checked) {
    chrome.storage.local.set({
      customColor: color
    });
  }
}

function isEnableAtNewTab() {
  chrome.storage.local.get("newTab", newTabItem => {
    var flag = newTabItem.newTab;
    //console.log(flag);
    if (flag) {
      var checkbox = document.getElementById("newTab");
      checkbox.checked = true;
    }

  });
}

function isCustomColorEnabled() {
  chrome.storage.local.get("customEnable", customEnableItem => {
    var flag = customEnableItem.customEnable;
    if(flag) {
      var checkBox = document.getElementById("customEnable");
      checkBox.checked = true;
    }
  });
}

function getCustomColorValue() {
  chrome.storage.local.get("customColor", customColorItem => {
    var flag = customColorItem.customColor;
    if(flag) {
      var colorInput = document.getElementsByClassName("jscolor")[0];
      colorInput.value = flag.substring(1);
    }
  });
}

function shieldSitesHandler() {
  console.log("shield Web Sites change handler");
  var shieldText = document.getElementById("shieldSites").value;
  //alert("Shield Web Sites: " + shieldText);

  //1. 提取出已经保存的过滤网址过滤内容
  //2. 然后保存

  chrome.storage.local.set({shieldSites: shieldText});
  console.log("Shield Sites to saved: ", shieldText);
  /*
  if (checkbox.checked) {
    chrome.storage.local.set({
      customColor: color
    });
  }
  */
}

function getShieldList() {
  chrome.storage.local.get("shieldSites", shieldSitesItem => {
    var text = shieldSitesItem.shieldSites;
    if(text) {
      var shieldTextArea = document.getElementById("shieldSites");
      shieldTextAreat.value = text;
      console.log("Read shield sites", shieldTextArea.value);
    }
  });
}

//International
var newTabLabel = document.getElementById("newTabLabel");
newTabLabel.textContent = chrome.i18n.getMessage("enableAtNewTab");

var customEnableLabel = document.getElementById("customEnableLabel");
customEnableLabel.textContent = chrome.i18n.getMessage("enableCustomColor");


var customColorLabel = document.getElementById("customColorLabel");
customColorLabel.textContent = chrome.i18n.getMessage("customColor");

var shieldLabel= document.getElementById("shieldLabel");
shieldLabel.textContent = chrome.i18n.getMessage("shieldLabel");

//Add Callback Handler
var checkbox1 = document.getElementById("newTab");
checkbox1.addEventListener("change", checkBoxHandler);

isEnableAtNewTab();

var checkbox2 = document.getElementById("customEnable");
checkbox2.addEventListener("change", checkBoxHandler);

var colorInput = document.getElementsByClassName("jscolor")[0];
colorInput.addEventListener("change", inputHandler);

var shieldTextArea = document.getElementById("shieldSites");
shieldTextArea.addEventListener("change", shieldSitesHandler);

isCustomColorEnabled();
getCustomColorValue();
getShieldList();
/*
window.onload = function (){
  alert("text");
  var cclabel = document.getElementById("cbLabel");
};
*/
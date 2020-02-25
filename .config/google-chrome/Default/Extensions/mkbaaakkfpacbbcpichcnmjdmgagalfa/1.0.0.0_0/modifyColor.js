/**
 * @author: neilhhw@hotmail.com
 */

//当网页的背景颜色的rgb值分别大于Gr1,Gg1,Gb1时此脚本将把颜色改成目标颜色color
var Gr1 = 242; //RGB中的R值
var Gg1 = 242; //RGB中的G值
var Gb1 = 242; //RGB中的B值

//**********以下代码用户无需修改***********//
var Gr, Gg, Gb; //全局变量记录当前标签的rgb值,用于比较

//store orignal rbg color here
var OrignalBGColor = document.defaultView.getComputedStyle(document.body, "").getPropertyValue("background-Color");
var ChangedBGColor = "";
var ChangedBGColorFlagArray, OrignalBGColorArray;
var isShielded = false;

//以下函数用于分解获取的"rgb(255, 255, 255)"格式的rgb

function FGrgb(Grgb) {
    Grgb = Grgb.replace(/[rgba\(\)]/g, '');
    var kaisi = Grgb.split(",");
    if (kaisi < 3) return;
    Gr = parseInt(kaisi[0]);
    Gg = parseInt(kaisi[1]);
    Gb = parseInt(kaisi[2]);
    //alert(Gr+"|"+Gb+"|"+Gg);
}

function initAllElementsColorArray() {
    var alltags = document.getElementsByTagName("*");
    var len = alltags.length;
    ChangedBGColorFlagArray = new Array(len);
    OrignalBGColorArray = new Array(len);
    for (var i = 0; i < len; i++) {
        ChangedBGColorFlagArray[i] = false;
        OrignalBGColorArray[i] = document.defaultView.getComputedStyle(document.body, "").getPropertyValue("background-Color");
    }
}


function changeAllElementsColor(color) {
    var Lcolor = ""; //用于记录网页中获取的背景颜色
    //获取并修改所有标签的背景颜色
    var alltags = document.getElementsByTagName("*");
    var len = alltags.length;
    for (var i = 0; i < len; i++) {

        if (alltags[i].style.backgroundColor == color) {
            continue;
        }

        Lcolor = document.defaultView.getComputedStyle(alltags[i], "").getPropertyValue("background-Color");
        FGrgb(Lcolor);
        //if color is lighting than target color, then change it or the orignal color has already been changed
        if ((Gr > Gr1 && Gg > Gg1 && Gb > Gb1) || ChangedBGColorFlagArray[i]) {
            if (color == OrignalBGColor) {
                var llcolor = alltags[i].style.backgroundColor;
                alltags[i].style.backgroundColor = OrignalBGColorArray[i];
                ChangedBGColorFlagArray[i] = false;
                console.log("Revert Element back", llcolor, OrignalBGColorArray[i])
            } else {
                alltags[i].style.backgroundColor = color;
                ChangedBGColorFlagArray[i] = true;
                console.log("Change Element to Color", OrignalBGColorArray[i], color)
            }
        }
    }
}

function fixAutoPage(color) {
    var _bodyHeight = document.body.clientHeight;
    // 创建观察者对象
    var observer = new window.MutationObserver(function (mutations) {
        if (mutations[0].addedNodes) {
            if (document.body.clientHeight > _bodyHeight) {

                // console.log("--------addedNodes---------");

                setTimeout(function () {
                    changeAllElementsColor(color);
                }, 200);

                _bodyHeight = document.body.clientHeight;
            }
        }
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    });
}

/***************************
 * Note: 这个是主要逻辑函数
 * 
 */
function changeColor(colorValue) {

    if (isShielded) {
        console.log("This page is shielded, no action");
        return;
    }

    console.log("======================changeColor==================================");

    var color = "";
    var Lcolor = ""; //用于记录网页中获取的背景颜色
    var flag = false;
    //获取并修改body的背景颜色.

    try {
        Lcolor = document.defaultView.getComputedStyle(document.body, "").getPropertyValue("background-Color");
    } catch (e) {
        return;
    }

    console.log("Orignal Color is: ", OrignalBGColor);

    FGrgb(Lcolor);

    if (colorValue == "yellow") {
        color = "#F6F4EC";
        //alert("Yellow");
    } else if (colorValue == "green") {
        color = "#CCE8CF";
        //alert("Green");
    } else if (colorValue == "grey") {
        color = "#F2F2F2";
        //alert("Grey");
    } else if (colorValue == "olive") {
        color = "#E1E6D7";
    } else if (colorValue == "orign") {
        color = OrignalBGColor;
        //If never changed background color, do nothing here
        if (ChangedBGColor == "") {
            console.log("You have not changed any color before, do nothing");
            return;
        }
    } else if (colorValue == "custom") {
        changeCustomColor(Lcolor);
        return;
    }

    if ((Gr > Gr1 && Gg > Gg1 && Gb > Gb1) || Lcolor == "transparent" || Gr == 0 && Gg == 0 && Gb == 0 || ChangedBGColor != "") {
        console.log("Change BGColor--------");
        document.body.style.backgroundColor = color;
        flag = true;
    }

    changeAllElementsColor(color);

    fixAutoPage(color);

    if (flag) {
        ChangedBGColor = color;
        console.log("Changed body Background Color is: ", ChangedBGColor);
    }
}


function changeCustomColor(Lcolor) {
    var flag = false;

    function setCurrentChoice(customColorItem) {
        var color = customColorItem.customColor;
        if (typeof color == 'undefined' || color == null) {
            notifyContent = chrome.i18n.getMessage("noCustomColorError");
            console.log("Get color is undefined!!");
            chrome.runtime.sendMessage({content: notifyContent});
            return;
        }

        console.log("Change custom color to: " + color);

        if ((Gr > Gr1 && Gg > Gg1 && Gb > Gb1) || Lcolor == "transparent" || Gr == 0 && Gg == 0 && Gb == 0 || ChangedBGColor != "") {
            console.log("Change BGColor--------");
            document.body.style.backgroundColor = color;
            flag = true;
        }

        changeAllElementsColor(color);

        fixAutoPage(color);

        if (flag) {
            ChangedBGColor = color;
            console.log("Changed body Background Color is: ", ChangedBGColor);
        }
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    chrome.storage.local.get("customColor", setCurrentChoice);

}

/**
 * @function: handleMessage
 */

function handleChooseMessage(request, sender, sendResponse) {
    changeColor(request.colorValue);
    //console.log("Receive message change color to: ", request.colorValue);
    //Set selected color when it choose
    console.log("Save selected background color: ", request.colorValue);
    chrome.storage.local.set({
        color: request.colorValue
    });
}

function changeBGColorAtNewTab() {
    chrome.storage.local.get("newTab", newTabItem => {
        var flag = newTabItem.newTab;
        //console.log(flag);
        if (flag) {
            chrome.storage.local.get("color", item => {
                console.log("You have enable set BG color at new tab, color", item.color);
                changeColor(item.color);
            });
        }

    });
}

function wildCardMatchRule(str, rule) {
    //应该支持 *以及？
    //*匹配任意长度任意字符
    //?匹配任意一个字符
    //[...]匹配括号中列出的字符中的任意一个，与正则一样
    //[!..]不匹配括号中列出的字符中的任意一个，对应正则是[^...]

    rule = rule.replace(".", "\.");
    rule = rule.split("*").join(".*");
    //需要考虑 ..* 问题
    rule = rule.split("?").join(".?");
    rule = rule.replace("!", "^");

    rule = "^"+rule+"$";

    var reg = new RegExp(rule);

    console.log("Now Reg Exp Rule is: ", rule);

    return reg.test(str);

}

function handleShield() {

    //如果是被屏蔽的网址，直接返回

    function onGet(shieldSitesItem) {
        var textArea = shieldSitesItem.shieldSites;
        //console.log(flag);
        if (textArea) {
            //一行行检查，看当前URL是否满足要求
            console.log("This site is: ", document.URL);
            var strArr = textArea.split("\n");
            
            for (let index = 0; index < strArr.length; index++) {
                const siteURL = strArr[index];
                console.log("shielded site is: ", siteURL);
                if (wildCardMatchRule(document.URL, siteURL)) {
                    console.log("URL matched!!!");
                    isShielded = true;
                }
                
            }

        }
    }

    function onError(error) {
        console.log("No shielded web sites set or set error, normal startup!");
    }

    /*
    let gettingItem = chrome.storage.local.get(["shieldSites"]);
    gettingItem.then(onGet, onError);
    */
    chrome.storage.local.get("shieldSites", onGet);

    //console.log("Handle Web Page Is Here");

}

/*
function changeBGColorAtStartup() {
    chrome.storage.local.get("startup", startupItem=> {
        var flag = startupItem.startup;
        console.log(flag);
        if (flag) {
            chrome.storage.local.get("color", item => {
                console.log("You have enable set BG color at startup, color", item.color);
                changeColor(item.color);
            });
        }

    });
}
*/

function startup() {
    initAllElementsColorArray();
    handleShield();
    //changeBGColorAtStartup();
    changeBGColorAtNewTab();
    chrome.runtime.onMessage.addListener(handleChooseMessage);
}

startup();

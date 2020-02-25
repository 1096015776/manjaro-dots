function changeBGColorAtStartup() {
    console.log("I am background script");
    chrome.storage.local.get("startup", startupItem=> {
        var flag = startupItem.startup;
        console.log(flag);
        if (flag) {
            chrome.storage.local.get("color", item => {
                console.log("You have enable set BG color at startup, color", item.color);
                //changeColor(item.color);
            });
        }

    });
}

function handleMessages(request, sender, sendResponse) {
    var title = chrome.i18n.getMessage("notification");
    var content = request.content;
    chrome.notifications.create({
        "type": "basic",
        "iconUrl": chrome.extension.getURL("icons/eye_48.png"),
        "title": title,
        "message": content
    });
}

chrome.runtime.onMessage.addListener(handleMessages);
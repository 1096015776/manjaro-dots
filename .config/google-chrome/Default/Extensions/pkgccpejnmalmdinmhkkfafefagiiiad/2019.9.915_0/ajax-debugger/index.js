let TRstaticjsmsg_type=function(e){return"object"==typeof e&&(e.exports={STABLE_EXTENSION_ID:"pkgccpejnmalmdinmhkkfafefagiiiad",DOWNLOAD_FROM_GITHUB:"https://github.com/zxlie/FeHelper/tree/master/apps/static/screenshot/crx",CODE_STANDARDS:"code_standards",FCP_HELPER_INIT:"fcp_helper_init",FCP_HELPER_DETECT:"fcp_helper_detect",GET_CSS:"get-css",GET_JS:"get-js",GET_HTML:"get-html",GET_COOKIE:"get-cookie",REMOVE_COOKIE:"remove-cookie",SET_COOKIE:"set-cookie",CSS_READY:"css-ready",JS_READY:"js-ready",HTML_READY:"html-ready",ALL_READY:"all-ready",GET_OPTIONS:"get_options",SET_OPTIONS:"set_options",MENU_SAVED:"menu_saved",START_OPTION:"start-option",OPT_START_FCP:"opt-item-fcp",CALC_PAGE_LOAD_TIME:"calc-page-load-time",GET_PAGE_WPO_INFO:"get_page_wpo_info",SHOW_PAGE_LOAD_TIME:"wpo",TAB_CREATED_OR_UPDATED:"tab_created_or_updated",REGEXP_TOOL:"regexp",EN_DECODE:"en-decode",JSON_FORMAT:"json-format",QR_CODE:"qr-code",CODE_BEAUTIFY:"code-beautify",JS_CSS_PAGE_BEAUTIFY:"JS_CSS_PAGE_BEAUTIFY",JS_CSS_PAGE_BEAUTIFY_REQUEST:"JS_CSS_PAGE_BEAUTIFY_REQUEST",CODE_COMPRESS:"code-compress",TIME_STAMP:"timestamp",IMAGE_BASE64:"image-base64",RANDOM_PASSWORD:"password",QR_DECODE:"qr-decode",JSON_COMPARE:"json-diff",JSON_PAGE_FORMAT:"JSON_PAGE_FORMAT",JSON_PAGE_FORMAT_REQUEST:"JSON_PAGE_FORMAT_REQUEST",COLOR_PICKER:"color-picker:newImage",SHOW_COLOR_PICKER:"show_color_picker",AJAX_DEBUGGER:"ajax-debugger",AJAX_DEBUGGER_CONSOLE:"ajax-debugger-console",AJAX_DEBUGGER_SWITCH:"ajax-debugger-switch",HTML_TO_MARKDOWN:"html2markdown",PAGE_CAPTURE:"page-capture",PAGE_CAPTURE_SCROLL:"page_capture_scroll",PAGE_CAPTURE_CAPTURE:"page_capture_capture",STICKY_NOTES:"sticky-notes",DEV_TOOLS:"dev-tools",OPEN_OPTIONS_PAGE:"open-options-page",GRID_RULER:"grid-ruler",POST_MAN:"postman",MULTI_TOOLKIT:"toolkit",PAGE_MODIFIER:"page-monkey",GET_PAGE_MODIFIER_CONFIG:"get_page_modifier_config",SAVE_PAGE_MODIFIER_CONFIG:"save_page_modifier_config",PAGE_MODIFIER_KEY:"PAGE-MODIFIER-LOCAL-STORAGE-KEY",REMOVE_PERSON_IMG_BG:"remove-person-img-bg",REMOVE_BG:"remove-bg"}),e.exports}({exports:{}}),AjaxDebugger=function(){let e=TRstaticjsmsg_type,t=function(){let t="log,debug,info,warn,error,group,groupCollapsed,groupEnd".split(","),_=new Function;return t.forEach(function(t){_[t]=function(t,_,s){chrome.runtime.sendMessage({type:e.AJAX_DEBUGGER_CONSOLE,content:escape(JSON.stringify(Array.prototype.slice.call(arguments,0)))})}.bind(_,t)}),_}();chrome.devtools.network.onRequestFinished.addListener(function(_){let s=_.request.url.split("?")[0];if(/\.js$/.test(s))return!1;(/\.json$/.test(s)||_.request.headers.concat(_.response.headers).some(function(e){return"X-Requested-With"===e.name&&"XMLHttpRequest"===e.value||"Content-Type"===e.name&&("application/x-www-form-urlencoded"===e.value||/application\/json/.test(e.value)||/application\/javascript/.test(e.value)||/text\/javascript/.test(e.value))}))&&chrome.runtime.sendMessage({type:e.AJAX_DEBUGGER_SWITCH},function(e){e&&function(e){let _=e.request.url||"",s=_.indexOf("?")>-1?"&":"?",o=e.request.postData&&e.request.postData.params||[],E=e.response.status+" "+e.response.statusText,r=e.response.bodySize+e.response.headersSize,a="";o.forEach(function(e,t){a+=(0===t?s:"&")+e.name+"="+e.value});let n="/"+(_.split("?")||[""])[0].replace("://","").split("/").splice(1).join("/"),i=e.time>1e3?Math.ceil(e.time/1e3)+"s":Math.ceil(e.time)+"ms";r=r>1024?Math.ceil(r/1024)+"KB":Math.ceil(r)+"B",e.getContent(function(s,o){if(s)try{e.response.responseData=JSON.parse(s)}catch(t){e.response.responseData=s}let p="Ajax请求加载完毕 ("+[n,E,i,r].join(" - ")+")  -- By FeHelper";t.group(p),t.log("AjaxURL  :",{url:_+a}),t.log("Request  :",{request:e.request}),t.log("Response :",{response:e.response}),t.log("OtherInfo:",{timeConsuming:i,timings:e.timings,time:e.startedDateTime,server:e.serverIPAddress}),t.groupEnd()})}(_)})}),chrome.runtime.connect({name:e.DEV_TOOLS})}();
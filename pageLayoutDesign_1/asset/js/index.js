function navBarSwitch(currNavKey) {
    console.log(currNavKey);
    let middleContainerMinHeight = window.innerHeight - 200,
        loadingAnimateContainerEl = $('.loading-animate-container'),
        contentContainerEl = $('.content-container');

    let contentList = {
        home: 'home.html',
        gameCenter: 'gameCenter.html'
    };
    let scriptList = {
        home: jsBaseUrl + 'home.js',
        gameCenter: jsBaseUrl + 'gameCenter.js'
    };
    let linkList = {
        home: cssBaseUrl + 'home.css',
        gameCenter: cssBaseUrl + 'gameCenter.css'
    };

    contentContainerEl.hide();
    contentContainerEl.empty();
    loadingAnimateContainerEl.fadeIn(500);

    // 加载对应的js、css文件
    console.log(importJs(scriptList[currNavKey]));
    console.log(importCss(linkList[currNavKey]));

    // 加载页面结构
    contentContainerEl.load(contentList[currNavKey], function () {
        // 模拟3s后获取到页面内容信息
        setTimeout(function () {
            loadingAnimateContainerEl.fadeOut(500, function () {
                loadingAnimateContainerEl.hide();
                contentContainerEl.css('min-height', middleContainerMinHeight + 'px');
                contentContainerEl.fadeIn(500);
                console.log('页面切换成功');
            });
        }, 3000)
    });
}

/**
 * 动态加载指定的js文件
 * @param fileSrc
 * @returns {boolean}
 */
function importJs(fileSrc = '') {
    let scriptElementList = $('script');
    for (let i = 0; i < scriptElementList.length; i++) {
        if (scriptElementList[i].src.indexOf(fileSrc) !== -1) {
            // 该js文件已经引入
            return false;
        }
    }
    $.getScript(fileSrc);
    return true;
}

function importCss(fileSrc = '') {
    console.log(fileSrc);
    let linkElementList = $('link');
    for (let i = 0; i < linkElementList.length; i++) {
        if (linkElementList[i].href.indexOf(fileSrc) !== -1) {
            return false;
        }
    }
    $('head').append('<link rel="stylesheet" type="text/css" href="' + fileSrc + '?v=' + version +'">');
    return true;
}
/**
 * 顶部导航栏切换，加载并显示不同页面内容
 * @param currNavKey
 */
function navBarSwitch(currNavKey) {
    console.log(currNavKey);
    let middleContainerMinHeight = window.innerHeight - 200, // 窗口高度 - （顶部 + 底部）高度 = 中间内容区域最小高度
        loadingAnimateContainerEl = $('.loading-animate-container'),
        contentContainerEl = $('.content-container');

    // 切换导航栏时动态加载不同的文件
    let dynamicImportFileList = {
        home: {
            content: baseUrl + '/home.html',
            js: [jsBaseUrl + '/home.js', jsBaseUrl + '/customUtility/common.js'],
            css: [cssBaseUrl + '/home.css']
        },
        gameCenter: {
            content: baseUrl + '/gameCenter.html',
            js: [jsBaseUrl + '/gameCenter.js', jsBaseUrl + '/customUtility/common.js'],
            css: [cssBaseUrl + '/gameCenter.css']
        }
    };

    // 清除内容容器里面原有的页面结构，显示加载动画
    contentContainerEl.hide();
    contentContainerEl.empty();
    loadingAnimateContainerEl.fadeIn(500);

    // const.js文件中定义了静态资源文件版本号变量，所以要在加载const.js文件成功后才能进行其他的静态资源文件加载
    // 那怎么保证加载的const.js也是最新的呢，这里使用了jquery的getScript方法，这个方法会自动在所加载的文件url
    // 后面添加一个query参数'_=当前时间戳值'，这样就保证了每次加载的url都是不同的，获取到const.js也就最新的了
    importJs('asset/js/version.js', Math.random());

    // 加载当前选择的导航栏对应的js、css文件
    dynamicImportFileList[currNavKey]['js'].forEach(function (jsItem) {
        importJs(jsItem, version);
    });
    dynamicImportFileList[currNavKey]['css'].forEach(function (cssItem) {
        importCss(cssItem, version)
    });

    // 加载当前选择的导航栏对应的页面内容
    contentContainerEl.load(dynamicImportFileList[currNavKey]['content'], function () {
        // 模拟3s后获取到页面内容信息
        setTimeout(function () {
            loadingAnimateContainerEl.fadeOut(500, function () {
                loadingAnimateContainerEl.hide();
                contentContainerEl.css('min-height', middleContainerMinHeight + 'px');
                contentContainerEl.fadeIn(500);

                // 存储当前选择导航栏key值
                window.localStorage.setItem('currNavKey', currNavKey);
                console.log('页面切换成功');
            });
        }, 3000)
    });
}

/**
 * 动态加载指定的js文件
 * @param fileSrc
 * @param version
 * @returns {boolean}
 */
function importJs(fileSrc = '', version = 1) {
    let scriptElementList = $('head script'),
        src = fileSrc + '?v=' + version;
    for (let i = 0; i < scriptElementList.length; i++) {
        if (scriptElementList[i].src.indexOf(src) !== -1) {
            // 该js文件已经引入
            return false;
        }
    }
    scriptElementList.last().after('<script type="text/javascript" src="' + src + '"></script>');
    return true;
}

/**
 * 动态加载指定的css文件
 * @param fileSrc
 * @param version
 * @returns {boolean}
 */
function importCss(fileSrc = '', version = 1) {
    let linkElementList = $('link'),
        src = fileSrc + '?v=' + version;
    for (let i = 0; i < linkElementList.length; i++) {
        if (linkElementList[i].href.indexOf(src) !== -1) {
            return false;
        }
    }
    $('head').append('<link rel="stylesheet" type="text/css" href="' + src +'">');
    return true;
}
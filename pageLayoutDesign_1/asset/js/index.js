let currNavKey = 'home';
function navBarSwitch(key) {
    console.log(key);
    let middleContainerMinHeight = window.innerHeight - 200,
        loadingAnimateContainerEl = $('.loading-animate-container'),
        contentContainerEl = $('.content-container');

    let contentList = {
        home: 'home.html',
        gameCenter: 'gameCenter.html'
    };
    contentContainerEl.hide();
    contentContainerEl.empty();
    loadingAnimateContainerEl.fadeIn(500);

    contentContainerEl.load(contentList[key], function () {
        loadingAnimateContainerEl.fadeOut(2000);
        setTimeout(function () {
            contentContainerEl.css('min-height', middleContainerMinHeight + 'px');
            contentContainerEl.fadeIn(500);
            console.log('页面切换成功');
        }, 2000)
    });
}
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
        setTimeout(function () {
            loadingAnimateContainerEl.fadeOut(500, function () {
                loadingAnimateContainerEl.hide();
                contentContainerEl.css('min-height', middleContainerMinHeight + 'px');
                contentContainerEl.fadeIn(500);
                console.log('页面切换成功');
            });
        }, 10000)
    });
}
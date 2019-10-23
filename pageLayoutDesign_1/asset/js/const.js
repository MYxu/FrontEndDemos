// 项目根路径
const baseUrl = window.location.href.slice(0, window.location.href.lastIndexOf('/'));

// 项目静态资源根路径
const assetBaseUrl = baseUrl + '/asset';
const cssBaseUrl = assetBaseUrl + '/css';
const jsBaseUrl = assetBaseUrl + '/js';


// 静态资源文件的更新版本
const version = 2;
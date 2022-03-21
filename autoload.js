// 注意：live2d_path 参数应使用绝对路径 https://akilar.top/posts/5b8f515f/
//const live2d_path = "https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/";
//const live2d_path = "/live2d-widget/";
const live2d_path = "https://cdn.jsdelivr.net/gh/hgez6/live2d-widget@master/"; //jsdelivr无效使用npm的CDN
// const live2d_path = "https://unpkg.zhimg.com/live2d-widget_hge@1.0.3/";    //锁定版本


// 封装异步加载资源的方法
function loadExternalResource(url, type) {
	return new Promise((resolve, reject) => {
		let tag;

		if (type === "css") {
			tag = document.createElement("link");
			tag.rel = "stylesheet";
			tag.href = url;
		}
		else if (type === "js") {
			tag = document.createElement("script");
			tag.src = url;
		}
		if (tag) {
			tag.onload = () => resolve(url);
			tag.onerror = () => reject(url);
			document.head.appendChild(tag);
		}
	});
}

// 加载 waifu.css live2d.min.js waifu-tips.js
if (screen.width >= 768) {
	Promise.all([
		loadExternalResource(live2d_path + "waifu.css", "css"),
		loadExternalResource(live2d_path + "live2d.min.js", "js"),
		loadExternalResource(live2d_path + "waifu-tips.js", "js")
	]).then(() => {
		initWidget({
			waifuPath: live2d_path + "waifu-tips.json",
			//apiPath: "https://live2d.fghrsh.net/api/",
			//cdnPath: "https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/"
			//cdnPath: "https://unpkg.zhimg.com/akilar-live2dapi@latest/"  //修复两个模型无法换装 可以考虑clone我配置好的live2d_api仓库自己部署到其他更快的cdn服务上
			cdnPath: "https://npm.elemecdn.com/akilar-live2dapi@latest/"

		});
	});
}
// initWidget 第一个参数为 waifu-tips.json 的路径，第二个参数为 API 地址
// API 后端可自行搭建，参考 https://github.com/fghrsh/live2d_api
// 初始化看板娘会自动加载指定目录下的 waifu-tips.json



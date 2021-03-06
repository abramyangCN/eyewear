import axios from 'axios'
const getWechatJsConfig = (params) => {
  return axios.get(`/wuhan/api/getWechatJsConfig`,{params})
}

export const setWechatConfig = () => {
	getWechatJsConfig ({"url": window.location.href.split('#')[0]}).then(res => {
		try{
      res = res.data;
	    wx.config({
	      debug: false,
	      appId: res.appId,
	      timestamp: res.timestamp,
	      nonceStr: res.nonceStr,
	      signature: res.signature,
	      jsApiList: [
	        'onMenuShareTimeline',
	        'onMenuShareAppMessage',
          'openLocation'
	      ]
	    });
		}catch(err) {
			return false
		}
    const shareData = { title: '', desc: '', img: '', link: '' };
    shareData.title = 'GM华为眼镜';
    shareData.desc = 'Gentle Monster Huawei Eyewear';
    shareData.img = 'https://site.fphis.com/huaweieyewear/img/fx1.jpg';
    shareData.link = window.location.href.split('#')[0];
    wx.ready(function () {
      //分享到朋友圈
      wx.onMenuShareTimeline({
        title: shareData.title, // 分享标题fxtitle
        link: shareData.link, // 分享链接
        imgUrl: shareData.img, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () { 
        },
        cancel: function () { 
        }
      });
    	//分享给单个朋友
      wx.onMenuShareAppMessage({
        title: shareData.title, // 分享标题
        desc: shareData.desc, // 分享描述
        link: shareData.link, // 分享链接
        imgUrl: shareData.img, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
        },
        cancel: function () {
        	// alert('123')
        }
      });
    });
  })
}
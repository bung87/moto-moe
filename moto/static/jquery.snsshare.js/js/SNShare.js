/*!
 * SNShare.js
 * Author:bung
 * Summary:
 * License:MIT
 * Version: 0.1.2b
 *
 * URL:
 * https://github.com/bung87/SNShare.js
 * https://github.com/bung87/SNShare.js/blob/master/LICENSE
 *
 */

(function (global,factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals
    factory(global.jQuery);
  }
})(this,function($){

		var defaultOptions={
			title:document.title,
			images:'',
			url:document.location.href,
			site_url:document.location.origin,
			windowWidth:800,
			widnowHeight:500,
			site_name:'sitename',
			summary:'summarysummarysummarysummary',
			empty:'',
			reason:'reasonreasonreasonreason',
			pengyou:'pengyou',
			cb:$.noop
		}
		,sns_args={
			tsina:{
				_shareUrl:"http://service.weibo.com/share/share.php?",
				_images_sep:'||',
				kwargs:{
					title:'summary',
					url:'url',
					pic:'images'
				}
			},
			tqq:{
				_shareUrl:"http://v.t.qq.com/share/share.php?",
				_images_sep:'|',
				kwargs:{
					title:'summary',
					url:'url',
					pic:'images'
				}
			},
			qzone:{
				_shareUrl:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?",
				kwargs:{
					title:'title',
					url:'url',
					summary:'summary',
					desc:'reason',
					pics:'images',
					site:'site_name'
				}

			},
			renren:{
				_shareUrl:"http://share.renren.com/share/buttonshare.do?",
				kwargs:{
					title:'title',
					link:'url'
				}
			},
			kaixin001:{
				_shareUrl:"http://www.kaixin001.com/repaste/share.php?",
				kwargs:{
					rtitle:'title',
					rurl:'url'
				}
			},
			txpengyou:{
				_shareUrl:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?",
				kwargs:{
					to:'pengyou',
					url:'url',
					pics:'images'
				}
			},
			douban:{
				_shareUrl:"http://shuo.douban.com/!service/share?",
				kwargs:{
					name:'title',
					href:'url',
					image:'images'
				}
			}
		};
		function url_generate(which){
			var s = []
			,a=sns_args[which]
			,u=a['_shareUrl']
			,v;
			for(var i in a['kwargs']){
				if(a['kwargs'][i]=="images"){
					v=encodeURIComponent(typeof this.images=="object" ? this.images.join(a['_images_sep']) : this.images)
				}else{
					v=encodeURIComponent(this[a['kwargs'][i]]||'');
				}
				s.push(i + '=' + v);
			}
			return u+s.join('&');
		}
		
	function open(which,_opts){
		var iHeight=_opts.widnowHeight
        ,iWidth=_opts.windowWidth
        ,iTop = (window.screen.availHeight-iHeight)/2 
        ,iLeft = (window.screen.availWidth-iWidth)/2 
    	,href=url_generate.call(_opts,which)
    	,win = window.open(href, name,'top='+ iTop +',left=' + iLeft + ',height= '+iHeight+',width='+iWidth+',resizable=yes,scrollbars=yes');
    	return win;
	};
	function bind($selector,options){
		$selector.on('snsshare',function(e,$target,args){
			e.stopImmediatePropagation();
			var opts = $.extend(true,{},defaultOptions,options,args)
			var $this=$target.find('.snsshare'),c=$this.attr('class'),reg=/snsshare-(\w+)/,m=[];
			if(reg.test(c)){
				m=c.match(reg);
				var win=open(m[1],opts);
				if($.isFunction(opts.cb))
				opts.cb.call(win);
			}
		});
	}
	window.snsshare=function(opts){
		bind($(document),opts)
	}
	$.fn.snsshare = function(opts){
		bind(this,opts);
	}

	
});

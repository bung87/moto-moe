requirejs.config({
//    urlArgs: "bust=v2",
   "map": {
        "*": {
            "underscore" : "lodash"
        }
    },
    paths: {
        "jquery": "jquery.min",
        // "underscore": "underscore-1.8.3/underscore.min",
        "backbone": "backbone-min",
        "masonry": "masonry.min",
        "imagesloaded": "imagesloaded.pkgd.min",
        // "materialize": "../materialize/js/materialize.min",
        'semantic':'semantic.min',
        'hammerjs': 'hammer.min',
        'velocity':'velocity.min',
        'resumable':'resumable.min',
        'selectize':'../selectize/js/standalone/selectize.min',
        'timeago':'jquery-timeago/jquery.timeago.min',
        'snsshare':'../jquery.snsshare.js/js/SNShare.min',
        'jcolor':'jquery.color.min',
        'jcrop':'jquery.Jcrop.min',
        'iscroll':'myScroller.min',
        'waves':'waves.min',
        'jstz':'jstz.min',
        'lodash':'lodash.min',
        'easing':'jquery.easing.min',
        'editable':'jquery.editable.min'
        // 'mustache':'mustache'
    },
    //Remember: only use shim config for non-AMD scripts,
    //scripts that do not already call define(). The shim
    //config will not work correctly if used on AMD scripts,
    //in particular, the exports and init config will not
    //be triggered, and the deps config will be confusing
    //for those cases.
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['lodash'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'iscroll':{
            exports:'IScroll'
        },
        'lodash': {
            exports: '_'
        },
        'jquery': {
            exports: ['jQuery','$']
        },
         "jcolor": {
            deps: [ "jquery" ],
             exports:'jQuery.Color'
        },
         "jcrop": {
            deps: [ "jcolor" ],
            exports:'jQuery.fn.Jcrop'
        },
        "velocity": {
            deps: [ "jquery" ]
        },
        'timeago':{
          deps:['jquery']
        },
        'editable':{
          deps:['jquery']
        },
//        'backbone-tastypie': {
//            deps: ['backbone'],
//            exports: 'Backbone'
//        },
//        'materialize': {
//            deps: ['jquery','hammerjs'],
//            exports: 'Materialize'
//        },
        'imagesloaded': {
            deps: ['jquery'],
            exports: 'jQuery.fn.imagesloaded'
        },
        'snsshare':{
            deps: ['jquery'],
            exports:'jQuery.fn.snsshare'
        },
        'semantic':{
            deps:['jquery']
        },
        'masonry': {
            deps: ['jquery'],
            exports: 'Masonry'
        },
        'jstz':{
            exports:'jstz'
        },
        'easing':{
            deps: ['jquery']
        }

    }
});;require(['jquery'],function($){

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};
    function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
function sameOrigin(url) {
    // test that a given url is a same-origin URL
    // url could be relative or scheme relative or absolute
    var host = document.location.host, protocol = document.location.protocol, sr_origin = '//' + host, origin = protocol + sr_origin;
    // Allow absolute or scheme relative URLs to same origin
    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        // or any other URL that isn't scheme relative or absolute i.e relative.
        !(/^(\/\/|http:|https:).*/.test(url));
}
//    var csrftoken = getCookie('csrftoken');
$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
            // Send the token to same-origin, relative URLs only.
            // Send the token only if the method warrants CSRF protection
            // Using the CSRFToken value acquired earlier
            xhr.setRequestHeader("X-CSRFToken", $.cookie('csrftoken'));
        }
    }
});

});;if (!HTMLCanvasElement.prototype.toBlob) {
     Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
      value: function (callback, type, quality) {

        var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
            len = binStr.length,
            arr = new Uint8Array(len);

        for (var i=0; i<len; i++ ) {
         arr[i] = binStr.charCodeAt(i);
        }

        callback( new Blob( [arr], {type: type || 'image/png'} ) );
      }
     });
    }
 function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
            }
        }
     return false;
        console.log('Query variable %s not found', variable);
    }
 function getQueryVariables() {
        var query = window.location.search.substring(1);
        if(!query){return false}
        var vars = query.split('&'),data={};
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');

            data[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
     return data;
        console.log('Query variable %s not found', variable);
    }
var User = function(init){
    for (var k in init) {
        this[k] = init[k]
    }
};
User.prototype = {
    is_authenticated:function(){
        return this._is_authenticated;
    }

};
var SRequest = function(init){
  this.user = new User(init['user']);
};
SRequest.prototype = {

};
window.request=new SRequest(requestData);
var App = function (init) {
    for (var k in init) {
        this[k] = init[k]
    }
};
App.prototype = {
    _inited:0,
    has_next: function () {
        return !!this.next
    },
    set_next:function(next){
        this.next=next
    },
/*    reset_pager:function(force){
        if(force){
           this.pager.page=1;
           this.pager.page_size=24;

        }else{
            var data= app.get_query_args();
            for (var k in data ){
                 this.pager[k] = data[k]
            }


        }


    },*/
    inited:function(){
        return this._inited;
    },
    initVariables:function(){
//        this.reset_pager();
                   this.pager.page=site.pager.page;
           this.pager.page_size=site.pager.page_size;
        this.start_loading=0;
        this.next = site.initial_data.next;
    },
    get_pager: function () {
        return {page:this.pager.page||1,page_size:this.pager.page_size||site.pager.page_size}
    },
    update_pager:function(){
        for (var e in this.pager){
            delete  this.pager[e]
        }
        var qs= getQueryVariables();
        var args = qs ? qs:{page:1,page_size:site.pager.page_size} ;

        for(var k in args ){
            this.pager[k] = args[k];
        }
        this.pager.page = parseInt(this.pager.page)
        this.pager.page_size = parseInt(this.pager.page_size)
    },
    extro_arg_keys:['q','page','page_size'],
    get_query_args:function(arg_keys){
       var args={},keys = arg_keys||this.extro_arg_keys;

        /*    for (var k in this.pager) {
            args[k] = this.pager[k]
        }*/
        for(var i=0;i<keys.length;i++){
            var v= getQueryVariable(keys[i]);
            if (v)
            args[keys[i]] = v
        }
        return args;
    },
    posts_fetch_success : function (collection, response, options) {
        var self = this;
//        if (!self.has_next())return;

        self.start_loading = 0;
        self.pager.page += 1;
        console.info(self.pager)
        self.router.navigate(Urls[this.router.current().route]() + '?' + $.param(self.get_pager()),{trigger:false});
        self.router.history.push(app.router.current().fragment);
//        self.collection.add(collection.models,{flag:'tail'});
//        console.log(self.collection)
        self.collection.trigger('loadMore',collection.models);



    }
    ,posts_fetch_error : function (collection, response, options) {
        if (response.status == 404) {
             this.start_loading = 0;
            app.next=null
            console.log(response.statusText)
        }
    }
}

var app = new App({


    start_loading: 0,
    next: null,
    pager: {
        page: 1,
        page_size: 12
    },

    // Main:{ },
    Models: {
        // Project:{}
    },
    Collections: {},
    Views: {}

});
// try{
//     document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
// }catch (e){}
require(['jquery','jstz'],function($,jstz){
var timezone = jstz.determine(),timezone_name=timezone.name();
    console.info(timezone_name);
    $.cookie('timezone',timezone_name,{expires:30})
});

require(["jquery", 'selectize','waves','easing'], function ($, Selectize,Waves,easing) {


    $(document).ready(function () {

        Waves.attach('.btn-floating','waves-light');
        Waves.init();
        $('.tags').selectize({
            delimiter: ',',
            persist: false,
            create: function (input) {
                return {
                    value: input,
                    text: input
                }
            }
        });
    });
    var $window=$(window);

     window.onIScroll =onIScroll= function () {
//          document.getElementById('container').transform = 'translateY( -'+this.y+')';
        //    loadingobj = $(".loading");
//        var break_point = $('#container').height() - ($('#wrapper').height() * 1.875),
/*          app.msnry.layout();
            app.myScroll.refresh();*/

        var $navBar= $('.navbar-fixed')
            ,nav_height=$navBar.height()
            ,break_point = site.flavour!='mobile' ?
                app.myScroll.scrollerHeight - app.myScroll.wrapperHeight * Math.PI
                : $(document).height() - ($window.height() * 2.02)
            ,y=site.flavour!='mobile' ? Math.abs(this.y) : $window.scrollTop()
            ,slideDownProps = {
                top:-nav_height
//                        height: "hide"
//                        marginBottom: "hide",
//                        marginTop: "hide",
//                        paddingBottom: "hide"
            },slideUpProps={};
            $.each(slideDownProps,function(k,v){
                    slideUpProps[k] = 0;
                        });//$(window).scrollTop()

        if(!app['lastY']){ app.lastY =0;}
        if(y-app.lastY>= nav_height){
             $navBar.animate($.extend({opacity:0},slideDownProps),{duration:300,easing:'easeInOutQuint'});
        }else if(app.lastY-y>=nav_height ) {
              $navBar.animate($.extend({opacity:1},slideUpProps),{duration:300,easing:'easeInOutQuint'});
        }
          app.lastY = y||0;
        if (y >= break_point /*&& this.y!==0*/) {
            if (!app.has_next()) {
                console.log('no mores!',break_point,y)
                return;
            }
            //        var next_page = $('#feed span:last').attr('data-next');
            //        console.log(next_page);
            if (app.start_loading == 0) {
                app.start_loading = 1;
                //            loadingobj.show();
                var query_args;
                if(app.inited()){
                    query_args =  app.get_pager();
                }else{
                    query_args = app.get_query_args();
                }
                data = query_args;//current page
                console.log('pager:',data)
                data['page']+=1;//next page
                app.collection.fetch({
                    data: data,
                    success: $.proxy(app.posts_fetch_success,app),
                    error: $.proxy(app.posts_fetch_error,app),
                    remove: false
                });



            }
        }
    };
    if(site.flavour == 'mobile'){
        document.body.style.height='auto';
        document.body.style.overflow = 'scroll';
       $window.on('scroll',onIScroll);
    }
    // jQuery reverse
    $.fn.reverse = [].reverse;

});;define([ "lodash", "backbone", "jquery", "semantic",  "timeago", "imagesloaded", "masonry" ], function(_, Backbone, $, semantic, a, imagesLoaded, c) {
    var timeago_langmap={
    'zh-cn':'zh-CN',
    'zh-TW':'zh-tw'
    }
    , site = window.site
    , lang =  (!!timeago_langmap[site.lang])?timeago_langmap[site.lang]:site.lang
    , timeago_lang = site.static_url+'js/jquery-timeago/locales/jquery.timeago.'+lang+'.js';
    function likeit(a) {
        a.preventDefault();
        a.stopImmediatePropagation();
        var b = this,func=arguments.callee;
        if(!request.user.is_authenticated()){
            var modal = new app.Views.LoginModal();
             modal.$el.modal('show');
             modal.once('login.success',function(){
                func.call(b,a);
            });
            return false;
        }


        var c = this.model.attributes.liked ? "DELETE" : "POST";
        $.ajax({
            method: c,
            url: Urls["api:likeit"](b.model.attributes.key)
        }).done(function(a, c, d) {
            201 == d.status ? b.model.set({
                liked: 1
            }) : 204 == d.status && b.model.set({
                liked: 0
            })
        });
    }
    var f = $.extend(!0, {}, window.site);
    $.extend(app.pager, window.site.pager), $.fn.serializeObject = function() {
        var a = {}, b = this.serializeArray();
        return $.each(b, function() {
            a[this.name] ? (a[this.name].push || (a[this.name] = [ a[this.name] ]), 
            a[this.name].push(this.value || "")) : a[this.name] = this.value || "";
        }), a;
    }, formError = function(data,view){
        $.each(data,function(k,v){
            var $el=view.$el.find('[name='+k+']');
            $el.popup('destroy').popup({
            position : 'right center',
            content  : v
          }).popup('show').on('change',function(){
                $el.popup('destroy');
            })
        });

    },

        app.Models.Post = Backbone.Model.extend({
        defaults: {
            "source":    "",
            id:0,
            comment_url:null,
            liked:null
        },
        url: function() {
            return Urls["api:post_detail"](this.attributes.key);
        },
        detail_url: function() {
            return Urls.post_detail(this.attributes.key);
        },
        is_liked:function(){
            return this.attributes.liked;
        }
    }), app.Collections.Posts = Backbone.Collection.extend({
        url: function(){
            var router = app.router.current();
            if(router.route == 'home'){
                 return Urls["api:posts"]()
            }else if(router.route == 'search'){
               return Urls["api:search"]()
            }
            return Urls["api:posts"]()
        },
        model: app.Models.Post,
        parse: function(a) {
            return app.next = a.next, a.results;
        }
    }), app.Collections.PostSearch = app.Collections.Posts.extend({
        url: Urls["api:search"]
    }), app.Models.Comment = Backbone.Model.extend({
        url: function() {
            return Urls.api_reply(this.attributes.id);
        }
    }), app.Collections.Comments = Backbone.Collection.extend({
        url: function() {
            return Urls.api_list_create("post", this.attributes.id);
        },
        model: app.Models.Comment,
        parse: function(a) {
            return a.results;
        }
    }), app.Views.PostView = Backbone.View.extend({
        initialize: function() {
            this.listenTo(this.model, 'change:liked', this.likedChanged);
        },
        likedChanged:function(model,value){
            console.log('post view changed:',model,value)
            var $ilike = this.$el.find('i.like')
            if(this.model.attributes.liked){
                $ilike.addClass('red-text').removeClass('grey-text');
            }else{
                $ilike.removeClass('red-text').addClass('grey-text');
            }
        },
        template: _.template(' <div class="card"> <div class="card-image"> <div class="post"><img width="189" src="<%= image_url %>"> <div class="extra"> <span class="left floated like btn-like"> <i class="like <% if(liked) {%>red-text<% }else {%><% } %> icon"></i> '+gettext("Like")+' </span>  </div> </div> </div> <% if(typeof(description) !== "undefined") {%> <div class="card-content"> <p><%= description %></p> </div> <% } %> <ul class="collection collector"> <li class="collection-item avatar"> <img src="<%= author.avatar %>" alt="<%= author.username %>" width="42" height="42" class="circle"> <p><a href="/user/<%= author.username %>"><%= author.username %></a><br> <time class="timeago" datetime="<%= date_posted %>"><%= date_posted2 %></time> </p> </li> </ul> </div> '),
        tagName: "div",
        className: "brick col xl2 l3 m4 s6",
        events: {
            "click .post": "postDetail",
            "click .btn-like": "like"
        },
        id: function() {
            return this.model.attributes.key;
        },
        like: likeit,
        postDetail: function(a) {
            a.preventDefault(), a.stopImmediatePropagation(), app.router.navigate(this.model.detail_url(), {
                trigger: !0
            });
        },
        render: function() {
            this.$el.html(this.template(this.model.attributes));
            var $el = this.$el;
             require([timeago_lang],function(){
                 $el.find(".timeago").timeago();
            });

            return this;
        }
    }), app.Views.ReplyView = Backbone.View.extend({
        className: "comment-reply",
        template: _.template(' <form method="POST" action="<%= comment_url %>" class="ui reply form"> <div class="field"> <textarea></textarea> </div> <div class="ui blue labeled submit icon button"> <i class="icon edit"></i> '+gettext('Reply')+' </div> </form>'),
        render: function(a) {
            return this.$el.html(this.template({
                comment_url: Urls.api_reply(a)
            })), this;
        }
    }), app.Views.CommentView = Backbone.View.extend({
        template: _.template(' <a class="avatar"> <img src="<%= author.avatar %>"> </a> <div class="content"> <a class="author"><%= author.username %></a> <div class="metadata"> <span class="date"> <time class="timeago" datetime="<%= date_created %>"></time></span> </div> <div class="text"> <%= message %> </div> <div class="actions"> <a class="reply">'+gettext('Reply')+'</a> </div> <div id="comment-<%= id %>-reply-form"></div> </div>'),
        tagName: "div",
        className: "comment",
        id: function() {
            return "comment-" + this.model.attributes.id;
        },
        events: {
            "click a.reply": "reply"
        },
        reply: function(a) {
            if (a.stopPropagation(), this.commentsView.$el.find(".comment-reply").hide(), 
                this.replyView) this.replyView.$el.toggle(); else {
                this.replyView = new app.Views.ReplyView({
                    el: "#" + this.id() + "-reply-form"
                });
                this.replyView.render(this.model.attributes.id).$el;
            }
        },
        render: function() {
            var $el =this.$el;
            return this.$el.html(this.template(this.model.toJSON())), 
             require([timeago_lang],function(){
                 $el.find(".timeago").timeago();
            }), this;
        }
    }), app.Views.CommentsView = Backbone.View.extend({
        render: function() {
            var a = this;
            return this.collection.each(function(b) {
                if (0 === this.$el.find("#comment-" + b.attributes.id).length) {
                    var c = new app.Views.CommentView({
                        model: b
                    });
                    c.commentsView = a, b.attributes.parent ? ($c = this.$el.find("#comment-" + b.attributes.parent), 
                    $cc = $c.find(".comments"), 0 === $cc.length && ($cc = $("<div>", {
                        "class": "comments"
                    }), $c.append($cc)), $cc.append(c.render().el)) : this.$el.append(c.render().el);
                }
            }, this), this;
        }
    }), app.Views.PostDetailModal = Backbone.View.extend({
        initialize: function() {
            this.listenTo(this.model, 'change:liked', this.likedChanged);
        },
        template: _.template(' <i class="close icon"></i> <div class="content"> <div class="ui grid"> <div class="ten wide column"> <div class="ui basic button top left pointing labeled like btn-like icon"> <i class="icon like alternate<% if(liked) {%>red-text<% }else {%>grey-text<% } %> "></i> '+gettext("Like")+'</div> <div class="ui top left pointing labeled icon dropdown basic button share"> <i class="share alternate icon"></i> '+gettext("Share")+' <!--i class="dropdown icon"></i--> <div class="menu"> <div class="item" data-value="snsshare-tsina"> <a title="分享到新浪微博" href="#" class="snsshare snsshare-tsina"></a> 新浪微博</div> <div class="item" data-value="snsshare-tqq"> <a title="分享到腾讯微博" href="#" class="snsshare snsshare-tqq"></a> 腾讯微博</div> <div class="item" data-value="snsshare-qzone"> <a title="分享到QQ空间" href="#" class="snsshare snsshare-qzone"></a> QQ空间</div> <div class="item" data-value="snsshare-renren"> <a title="分享到人人网" href="#" class="snsshare snsshare-renren"></a> 人人网</div> <div class="item" data-value="snsshare-kaixin001"> <a title="分享到开心网" href="#" class="snsshare snsshare-kaixin001"></a> 开心网</div> <div class="item" data-value="snsshare-txpengyou"> <a title="分享到腾讯朋友" href="#" class="snsshare snsshare-txpengyou"></a> 腾讯朋友</div> <div class="item" data-value="snsshare-douban"> <a title="分享到豆瓣" href="#" class="snsshare snsshare-douban"></a> 豆瓣</div> </div> </div> </div> <div class="twelve wide column"> <div class="ui fluid card"> <div class="image"><img src="<%= image_large_url %>" /></div> <div class="extra"> <% if (source){ %> <a href="<%= source %>" class="left floated" rel="nofollow">'+gettext('Found on')+' <%= source_host %></a> <% } %> <div class="right floated"><i class="download icon"></i><a href="<%= image_large_url %>" download="<%= file_name %>">'+gettext('Download')+'</a></div> </div> <div class="extra"> <time class="timeago" datetime="<%= date_posted %>"><%= date_posted2 %></time> </div> </div> </div> <div class="four wide column"> <div class="ui fluid card"> <div class="content"> <div class="meta">via</div> <img class="ui avatar middle aligned floated" src="<%= author.avatar %>"> <span><%= author.username %></span> <% if (request.user.is_authenticated() && author.username!=request.user.username ) {%> <div class="ui right floated button pink-text"> <i class="add icon"></i> Follow </div> <% } %> </div> </div> </div> </div> <div class="ui grid"> <div class="twelve wide column"> <div class="ui fluid card"> <div class="content comments-wrapper"> <div class="ui minimal comments" id="post-<%= id %>-comments"> <h3 class="ui dividing header">'+gettext('Comments')+'</h3> </div> </div> <div class="content"> <% if (request.user.is_authenticated()) {%> <form method="POST" action="<%= comment_url %>" class="ui comments-form form"> <div class="field"> <textarea></textarea> </div> <div class="ui blue labeled submit icon button"> <i class="icon edit"></i> '+gettext('Comment')+' </div> </form> </div> <% }else{ %> {% blocktrans %}Please <a href="#" class="logintocomment">Login</a> first!{% endblocktrans %} <% } %> </div> </div></div></div>'),
        comments: null,
        comments_view: null,
        className: "ui detail modal basic",
        tagName: "div",
        events: {
            "click .btn-like": "like",
            "click button.visit": "visit",
            "click button.send": "send",
            "keyup [name=search]": "search",
            "click .reply.form .submit": "reply",
            'click .logintocomment':'logintocomment',
            'click .comments-form .submit':'comment'
        },
        likedChanged:function(model,value){
            this.render()
        },
        logintocomment:function(){
            var view=this,modal = new app.Views.LoginModal();
             modal.$el.modal('show');
            modal.once('login.success',function(){
                view.render().$el.modal('show');
            });
        },
        like: likeit,
        comment:function(a){
            var b = this, c = $(a.target).parents("form").get(0), d = c.action,$form=$(c),$textarea=$form.find("textarea"), e = $textarea.val();
            $.post(d, {
                message: e
            }).done(function(a, c, d) {
                $textarea.val('');

                b.comments.add(a);
                b.comments_view.render();
            });
        },
        reply: function(a) {
            var b = this, c = $(a.target).parents("form").get(0), d = c.action,$form=$(c),$textarea=$form.find("textarea"), e = $textarea.val();
            $.post(d, {
                message: e
            }).done(function(a, c, d) {
                $textarea.val('');
                $form.parent().hide();
                b.comments.add(a);
                b.comments_view.render();
            });
        },
        search: function(a) {
            var b = a.target.value;
            b.length >= 2 ? (this.$el.find(".header").hide(), 
            $(a.target).parents(".menu").find(".item").show()) : (this.$el.find(".header").show(), 
            $(a.target).parents(".menu").find(".item").hide());
        },
        share: function(a) {
            var $el = this.$el;
            $el.trigger("snsshare", [ $(a.target), {} ]);
        },
        render: function(a) {
            var view = this;
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.modal({
                autofocus: !1
                    ,onHidden: function() {
                    app.router.previous();

                       try{

                           if(site.flavour!='mobile'){
                                view['myScroll'].destroy();
                                view['myScroll']=null;
                           }

                          $(".ui.dimmer.modals").find('.iScrollVerticalScrollbar').remove();
                           view.el.style= '';
                       }catch (e){
                           //do nothing
                           console.error(e)
                       }
                }
                ,onVisible:function(){
                   site.flavour!='mobile'&& require(['iscroll'],function(IScroll){

                         view.myScroll = new IScroll('.ui.dimmer.modals',{
                            scroller: view.el
                            ,scrollbars:true
                            ,scrollY:true
                            ,probeType: 2, mouseWheel: true
                            ,eventPassthrough:'horizontal'
                        });

                    })
                }
            });

            require([timeago_lang],function(){
                 view.$el.find(".timeago").timeago();
            }),

                view.$el.find(".ui.dropdown").dropdown({
                 action: function(text, value) {
                     var $choice=view.$el.find('.'+value).parent();
                     view.$el.trigger("snsshare", [ $choice, {} ]);
                    }
            }), require([ "snsshare" ], function(a) {
                var title = " 我在［元萌］捕获萌妹一只，邀你一起来把玩！";
                view.$el.snsshare({
                    title: title,
                    images: window.location.protocol+'//'+window.location.hostname+view.model.attributes.image_url,
                    url: document.location.href,
                    site_url: document.location.origin,
                    windowWidth: 800,
                    widnowHeight: 500,
                    site_name: "moto.moe",
                    summary: view.model.attributes.description || title,
                    empty: "",
                    reason: title,
                    pengyou: "pengyou",
                    cb: function() {}
                });
            });
            if(this.model.attributes.id){
            $.get(Urls.api_list_create("post", this.model.attributes.id)).done(function(a, c, d) {
                view.comments = new app.Collections.Comments(a.results),
                view.comments_view = new app.Views.CommentsView({
                    collection: view.comments,
                    el: view.$el.find(".comments-wrapper .comments").get(0)
                });
                view.comments_view.render();

            })
            }
            return this;
        }
    }), app.Views.PostsView = Backbone.View.extend({
        initialize:function(){
             this.listenTo(this.collection,"reset", function(models,options) {
                 console.log('reset with:',models)
                 var view = this;
                 if(this.hasDifference())
                 imagesLoaded( view.render().$el.find(".card-image img").toArray(),function(){
                     console.log('has difference')
                      app.msnry = new c(view.el, {
                            itemSelector: ".brick",
                            initLayout: false
                        });

                      site.flavour!='mobile'&& app.myScroll.refresh();

                 });

            }),this.listenTo(this.collection,"remove", function(b) {
                console.log('remove :',b)
                 app.msnry.layout();

            }), this.listenTo(this.collection,"add", function(c, d, e) {
                if ("head" == e.flag) {
                    var view = new app.Views.PostView({
                        model: c
                    });
                    this.$el.prepend(view.render().el), imagesLoaded(view.el, function() {
                        app.msnry.prepended(view.el);
                        site.flavour!='mobile' && app.myScroll.refresh();
                    });
                } else if(e.flag=='tailer'){
                    console.log('add:else')
                    var f = new app.Views.PostView({
                        model: c
                    });
                    this.$el.append(f.render().el), imagesLoaded(this.el, function() {
                        app.msnry.appended(f.el);
                       site.flavour!='mobile' && app.myScroll.refresh();
//                            app.myScroll.resetPosition();
                    });
                }else{
                    console.log('fetch from somewhere,do nothing')
                }


            }),this.listenTo(this.collection,'loadMore',this.loadMore);
        },
        loadMore:function(ms){
            var view=this, views=[],
                a = this.$el.find(".brick"),
                b = _.pluck(a, "id"),
                c = view.collection.pluck( "key"),
               // d = _.difference(b, c),//need remove
                models = _.difference(c, b); // need add
                _.each(models,function(m){
                         var f = new app.Views.PostView({
                            model: view.collection.findWhere({key:m})
                        });
                    views.push(f.render().el)

                });


            imagesLoaded(views, function() {
                 view.$el.append(views);
                        app.msnry.appended(views);
                        site.flavour!='mobile' && app.myScroll.refresh();
                    });
        },
        el: "#container",
        events: {
            "mouseenter .card": "showActions",
            "mouseleave .card": "hideActions"
        },
        showActions: function() {
            return !1;
        },
        hideActions: function() {
            return !1;
        },
        hasDifference:function(){
                var a = this.$el.find(".brick"),
                b = _.pluck(a, "id"),
                c = this.collection.pluck( "key"),
                d = _.difference(b, c),//need remove
                e = _.difference(c, b); // need add
            return (d.length || e.length)
        },
        render: function() {
            var a = this.$el.find(".brick"),
                b = _.pluck(a, "id"),
                c = this.collection.pluck( "key"),
                d = _.difference(b, c),//need remove
                e = _.difference(c, b); // need add

             a.each(function(i, e) {
                -1 !== d.indexOf(e.id) && e.remove();
            });
            var needAdd = this.collection.filter(function(m){return _.contains(e, m.get('key'))});
            console.log('need add',needAdd)
            _.each(needAdd,function(m) {

                var f = new app.Views.PostView({
                        model: m
                    });
                this.$el.append(f.render().$el)

            }, this);

            return this;

        }
    }), app.Views.PostModal = Backbone.View.extend({
        el: "#post-modal",
        events: {
            "click #upload_image_button": "upload"
        },
        serializeForm: function() {
            return $(this.el).find("form").serializeObject();
        },
        initResumable: function() {
             var a = $(this.el);
            require(['resumable'],function(Resumable){
                 app.resumable || (app.resumable = new Resumable({
                    maxFiles: 1,
                    fileType: [ "jpg", "jpeg", "png", "gif" ],
                    target: Urls["api:post"](),
                    headers: {
                        "X-CSRFToken": $.cookie("csrftoken")
                    },
                    withCredentials: !0
                }), app.resumable.on("fileAdded", function(b, c) {
                    app.resumable.upload(), a.find("#browse").fadeOut(),
                    a.find("p").fadeOut(), a.find("form").fadeIn();
                }), app.resumable.on("fileSuccess", function(a, b) {

                    app.collection.add($.parseJSON (b), {
                        flag: "head"
                    });
                }), app.resumable.on("fileError", function(a, b) {
                    console.log(b);
                }), app.resumable.assignBrowse(document.getElementById("browse")),
                app.resumable.assignDrop(document.getElementById("post-modal")));
            });


        },
        reset:function(){
            var view = $(this.el);
                view.find("form").get(0).reset(), view.find(".tags").get(0).selectize.clear()
                , view.find("#browse").fadeIn(), view.find("p").fadeIn(),
                view.find("form").fadeOut();
        },
        upload: function() {
            var view = $(this.el);
            $.post(Urls["api:post"](), this.serializeForm()).done(function(b, c, d) {
                var model=app.collection.findWhere({id: b.id});
                model.set(b);
                view.modal("hide");
            });
        }
    }), app.Views.AvatarModal = Backbone.View.extend({
        template: _.template(' <i class="close icon"></i> <div class="header"> '+gettext('Profile Picture')+' </div> <div class="content"> <div class="ui medium image"><canvas id="avatar-preview"></canvas> </div> <input type="file" id="avatar_file_input" name="file"/> <output id="target"></output> <div class="description">  </div> </div> <div class="actions"> <div class="ui black deny button"> Nope </div> <div class="ui positive right labeled icon button"> Upload <i class="checkmark icon"></i> </div> </div>'),
        className: "ui modal basic",
        tagName: "div",
        events: {
            "change #avatar_file_input": "avatar_file_input_change",
            "click .positive": "upload"
        },
        upload: function() {
            var a = new FormData(), b = $("#avatar-preview");
            b.get(0).getContext("2d");
            b.get(0).toBlob(function(b) {
                a.append("avatar", b), $.ajax({
                    url: Urls["api:avatar"](),
                    data: a,
                    cache: !1,
                    contentType: !1,
                    processData: !1,
                    type: "POST",
                    success: function(a) {
                        var b = $("#top_menu").find(".avatar"), c = b.attr("src"), d = c.indexOf("?dummy="),/* c = -1 != d ? c.substring(0, d) : c,*/ e = new Date();
                        b.attr("src", a.avatar + "?dummy=" + e.getTime());
                    }
                });
            });
        },
        avatar_crop: function(a) {
            var b, c, d = a, e = $("#avatar-preview"), f = e[0].getContext("2d"), g = 1, h = 500, i = 500;
            d.w > h ? g = h / d.w : d.h > i && (g = i / d.h), 
            b = d.w * g, c = d.h * g, e.attr("width", b).attr("height", c), 
            f.drawImage($("#target>img").get(0), d.x, d.y, d.w, d.h, 0, 0, b, c);
        },
        avatar_file_input_change: function(a) {
        var view = this;
            require(['jcrop'],function(jCrop){
                // view.avatar_file_input_change = function(a){
                      var b = a.target.files[0];
                    if (!b.type.match("image.*")) return !1;
                    var d = new FileReader();
                    d.onload = function(c) {
                        // return function(e) {
                            var b = $("<img>").attr("src", c.target.result);
                            $("#avatar-preview").attr("src", c.target.result),
                            $("#target").html(b), $("#target>img").Jcrop({
                                onChange: view.avatar_crop,
                                onSelect: view.avatar_crop,
                                aspectRatio: 1
                            });
                        // };
                    }, d.readAsDataURL(b);
                // }
            });

        },
        render: function() {
            
            return this.$el.html(this.template()), this;
        }
    });
    var g = new app.Views.PostModal();
    app.Views.PushPin = Backbone.View.extend({
        initialize:function(){
            this.showed = false;
        },
        showed:false,
        entered:false,
        el: ".fixed-action-btn",
        events: {
            "click #post-btn": "postModalShow",
            'click #page-top':'pageTop',
            'click #catch-btn':'catch1',
            'mouseenter #fixed-actions':'mouseenter',
            'mouseleave':'mouseleave',
            'touchstart #fixed-actions':'toggle'
        },
        toggle:function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            var view = this,action = view.showed ? 'mouseleave': 'mouseenter';
            view[action].call(view,e)
        },
        showStep2:function(e){
            var view=this;
             view.toSecondStep.call(view,e);
        },
        catch1:function(e){
            e.stopImmediatePropagation();
            this.mouseleave(e);
            var positive_func=function(){
                $('#catch-modal-1').modal('show');
            };
            if(!request.user.is_authenticated()){
                var modal = new app.Views.LoginModal();
                modal.$el.modal('show');
                modal.once('login.success',function(){
                    positive_func()
                });
                return
            }
            positive_func()

        },
        toSecondStep:function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
             $(e.target).addClass('loading');
            var view = this
                ,$modal = $('#catch-modal-1')
                ,url = $modal.find('input').val()
                ,template=_.template(' <div class="ui card" data-src="<%= url %>"> <div class="blurring dimmable image"> <div class="ui dimmer"> <div class="content"> <div class="center"> <div class="ui pink button">'+gettext('Select')+'</div> </div> </div> </div> <img src="<%= url %>" class="image"> <!--<p>Type:<%= type %></p>--> <!--<p>Length:<%= len %></p>--> </div> <div class="extra content"> <div class="ui large transparent left icon input"> <!--<i class="heart outline icon"></i>--> <input type="text" placeholder="'+gettext('Add Description...')+'"> </div> <span class="left floated"> Type:<%= type %> </span> <span class="right floated"> Length:<%= len %> </span> </div> </div>')
                ,$modal2=$('#catch-modal-2')
                ;
            $.post(Urls['api:catch'](),{url:url}).done(function(data){
//            var data={"urls":[{"len":"204.7 KB","url":"http://i4.pixiv.net/c/600x600/img-master/img/2015/07/30/22/40/27/51691867_p0_master1200.jpg","type":"image/jpeg"},{"len":"200.7 KB","url":"http://i4.pixiv.net/img-original/img/2015/07/30/22/40/27/51691867_p0.jpg","type":"image/jpeg"}]};
                var imgs='';
                $.each(data['urls'],function(i,v){
                    imgs += template(v);

                });
                $modal2.find('.content .cards').html(imgs).end().modal('show')
                    .find('div.image').dimmer({
                      on: 'hover'
                    }).end().on('click','.content .button',function(e){

                        e.preventDefault();
                        e.stopImmediatePropagation();
                        var $this = $(this)
                            ,$card = $this.parents('.card');
                        if($this.text()=='Pin'){
                            $card.data('selected',true);
                            $this.text('Unpin')
                        }else{
                             $this.text('Pin');
                            $card.data('selected',false);
                        }

                       $card.toggleClass('pink')
                    }).on('click','#image_confirmed',function(e){
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        var images=[];
                        $modal2.find('.card').each(function(i,ele){
                            var $card=$(ele);
                            if($card.data('selected')){
                                 var url = $card.data('src');
                                images.push({url:url});
                            }

                        });
                        view.toThirdStep(url,images);
                    });
                $(e.target).removeClass('loading')
            });
        },
        toThirdStep:function(url,images){
            var $modal2=$('#catch-modal-2');
            $.post('/api/download/',{url:url,images:JSON.stringify(images)}).done(function(data){

                $modal2.modal('hide');
                  app.collection.add(data, {
                    flag: "head"
                });
            });
        },
        mouseleave:function(e){
            e.stopPropagation();
            var $this = this.$el,self=this;
            require(['velocity'],function(Velocity){

                (
                    
                    function($this,self){
                        
                         setTimeout(function(){
                        if (self.entered) return;
                        $this.find('ul .btn-floating').velocity("stop", true);
                        $this.find('ul .btn-floating').velocity(
                            { opacity: "0", scaleX: ".4", scaleY: ".4", translateY: "40px"},
                            { duration: 80 ,delay:80,complete:function(){
                                $this.find('ul').hide();
                                $this.find('ul li').each(function(){
                                    $(this).popup('hide',{duration:80});// cause Transition: There is no css animation matching the one you specified. scale out

                                });
                            }});


                    self.showed = false;
                    self.entered = false;
                        },1000)
                    }
                )($this,self);
                 
//                    var time = 0;
                   
                });
            
        },
        mouseenter:function(e){
            this.entered = true;
            var self = this;
            (
                    function(self){
                         setTimeout(function(){
                            self.entered = false;
                        },500);
                    }
                )(self);
            if(this.showed) {
               
                return true;}
                
                
            //  e.stopPropagation();
             var $this = this.$el,self=this;
             require(['velocity'],function(Velocity){
                 
                      $this.find('ul').show();
                    var time = 0;
                    $this.find('ul .btn-floating').reverse().each(function () {
                        $(this).velocity(
                            { opacity: "1", scaleX: "1", scaleY: "1", translateY: "0"},
                            { duration: 80, delay: time });

                        $(this).parent().popup('show',{duration:80,delay:{show:time}});
                        time += 40;
                    });
            
                    self.showed = true;
             });
             
        },
        pageTop:function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            this.mouseleave(e);
            try{site.flavour!='mobile' && app.myScroll.scrollTo(0,0)}catch(e){}
            return false;
        },
        postModalShow: function(e) {
            e.stopImmediatePropagation();
            this.mouseleave(e);
            var positive_func=function(){
                  g.$el.modal({
                onHide: function() {
                    g.reset();
                    window.history.back();
                }
                }).modal("show"), g.initResumable();
            };
             if(!request.user.is_authenticated()){
                var modal = new app.Views.LoginModal();
                modal.$el.modal('show');
                modal.once('login.success',function(){
                    positive_func()
                });
                return
            }
            positive_func();

        },
        render:function(){
            var $this = this.$el;
             $('#catch-modal-1').on('click','.button', $.proxy(this.showStep2,this));
            $(document).ready(function(){
                 $this.find('ul li').popup({
                     preserve:true
                     ,transition:'scale'
                 });
            });
        }
    }), app.Views.TopSearch = Backbone.View.extend({
        el: "#top_search",
        events: {
            "keyup input[name=q]": "search",
            "focus .search input": "bindKey",
            "click .icon.remove": "unbindKey"
        },
        bindKey: function(a) {
            a.target.value.length && this.$el.find("i.icon").removeClass("search").addClass("remove");
        },
        unbindKey: function() {
            this.$el.find("i.icon").removeClass("remove").addClass("search"), 
            this.$el.find(".search input").val("");
        },
        search: function(a) {
            if (13 === a.which) {
                var b = this.$el.find(".search input");
                app.pager.page =1;
                app.pager.page_size =site.pager.page_size;
                app.router.navigate("search?q=" + b.val(), {
                    trigger: !0
                }), this.$el.find("i.icon").removeClass("search").addClass("remove");
            }
        }
    }), app.Views.MobileSearch = Backbone.View.extend({
        el: "#mobile-search",
        events: {
            "click .search.icon": "expand",
            "click .remove.icon": "collapse",
            "keyup input[name=q]": "search"
        },
        search: function(a) {
            return app.Views.TopSearch.prototype.search(a);
        },
        expand: function() {
            this.$el.zIndex = 1000;
            this.$el.find(".search.icon").removeClass("search").addClass("remove"), 
            this.$el.find("input").css({
                width: "100%"
            });

        },
        collapse: function() {
            this.$el.zIndex = 998;
            this.$el.find(".remove.icon").removeClass("remove").addClass("search"), 
            this.$el.find("input").css({
                width: "0",
                padding: "inherit 0"
            });
        }
    }), $.extend(User.prototype,{
            login:function(init){
                for (var k in init) {
                this[k] = init[k];
                }
                this._is_authenticated=1;
                $(document).trigger('auth.statusChange');
            },
            logout:function(){
                this._is_authenticated=0;
                $(document).trigger('auth.statusChange');
            }
    }) ,app.Views.TopMenu = Backbone.View.extend({
        el: "#top_menu",
        template: _.template(' <% if (request.user.is_authenticated()){%> <li class="user ui combo top right pointing dropdown"> <a href="#"><img class="avatar" src="<%= request.user.avatar %>" /><i class="dropdown icon"></i></a> <div class="menu"> <div class="header"><%= request.user.username %></div> <!--<div class="ui divider"></div>--> <div class="item" id="avatar_update"><i class="photo icon"></i>'+gettext('Avatar')+'</div> <div class="item" id="logout"><i class="sign out icon"></i>'+gettext('Sign Out')+'</div> </div> </li> <% }else{ %> <li> <div class="ui dropdown combo top right pointing"> <a class="btn-flat modal-trigger" id="register" href="#">'+gettext("Sign Up")+'</a> <div class="menu transition"> <form class="ui form registration_form" action="" > <h4 class="ui fluid dividing header">'+gettext("Sign Up")+'</h4> <div class="field"> <label>'+gettext("Username")+'</label> <div class="ui icon input"> <input type="text" name="username"> <i class="user icon"></i> </div> </div> <div class="field"> <label>'+gettext("Email")+'</label> <div class="ui icon input"> <input type="email" name="email"> <i class="mail icon"></i> </div> </div> <div class="field"> <label>'+gettext("Password")+'</label> <div class="ui icon input"> <input type="password" name="password1"> <i class="lock icon"></i> </div> </div> <div class="field"> <label>'+gettext('Confirm password')+'</label> <div class="ui icon input"> <input type="password" name="password2"> <i class="lock icon"></i> </div> </div> <div class="ui submit primary button">'+gettext("Sign Up")+'</div> </form> </div> </div> </li> <li> <div class="ui dropdown combo top right pointing"> <a class="btn-flat modal-trigger " id="login" href="#">'+gettext("Sign In")+'</a> <div class="menu transition"> <form class="ui form login_form" action=""> <h4 class="ui fluid dividing header">'+gettext("Sign In")+'</h4> <div class="field"> <label>'+gettext("Username")+'</label> <div class="ui icon input"> <input type="text" name="username"> <i class="user icon"></i> </div> </div> <div class="field"> <label>'+gettext("Password")+'</label> <div class="ui icon input"> <input type="password" name="password"> <i class="lock icon"></i> </div> </div> <button class="ui submit primary button">'+gettext("Sign In")+'</button> </form> </div> </div> </li> <% } %> '),
        events: {
            "click .registration_form .submit": "registration",
            "submit .login_form": "login",
            "click #logout": "logout",
            'click #register':'register',
            'click #login':'login2',
            "click #avatar_update": "avatar"
        },
        login2:function(){
             var modal = new app.Views.LoginModal();
             modal.$el.modal('show')
        },
        register:function(){
            var modal =new app.Views.RegistrationModal();
             modal.$el.modal('show')
        },
        avatar: function(a) {
            var b = new app.Views.AvatarModal();
            b.render().$el.modal("show");
        },
        login: function(a) {
            a.preventDefault();
            var  c = Urls["api:rest_login"]();
            $.post(c, this.$el.find(".login_form").serialize()).done(function(a, c, d) {

                request.user.login(a), $("#login").parent().dropdown("hide");
            }).fail(function(a, b, c) {
                console.log(a, b, c);
            });
        },
        logout: function() {
            var a = this;
            return $.post(Urls["api:rest_logout"]()).done(function(b, c, d) {
            request.user.logout();
            }), !1;
        },
        registration: function() {
            var a = Urls["api:rest_register"](),view=this;
            $.post(a, this.$el.find(".registration_form").serialize(), function(a, b, c) {
                $("#register").parent().dropdown("hide");
            }).error(function(a,b,c){
                formError(a.responseJSON,view);
            });
        },
        render: function() {
            var view = this;
            return this.$el.html(this.template(f.user)), this.$el.find(".combo.dropdown").dropdown({
                action: "combo"
            }),  $(document).on('auth.statusChange',function(){
                    view.render();
                }),this.$el.find(".dropdown").dropdown({
                on: "hover"
            }), this;
        }
    }),message = function(xhr,b){
            var data = {
                status:xhr.status
                ,statusText:xhr.statusText
                ,responseJSON:xhr.responseJSON
            }
        new app.Views.Message({attributes:data}).renderTo(b)
    },
        app.Views.Message = Backbone.View.extend({
            template: _.template(' <i class="close icon"></i><div class="header"></div> <ul class="list"> <% _.each(data, function(d) { %> <li><%= d %></li> <% }); %> </ul>'),
            className:'ui message',
            render:function(){
                this.$el.html(this.template({data:this.attributes.responseJSON}));
                if (this.attributes.status >= 400){
                    this.$el.addClass('warning');
                }
                this.$el.find('.close')
                      .on('click', function() {
                        $(this)
                          .closest('.message')
                          .transition('fade');
                      });
                return this;
            },
            renderTo:function(view){
                if (!!view){
                      var $messages = view.$el.find('.messages');
                      if($messages.length){
                         this.render().$el.prependTo($messages);
                      }
                }

            }
        }),
        app.Views.LoginModal = Backbone.View.extend({
            el:'#login-modal',
            events:{
                 "submit .login_form": "login"
                ,'click a':'registration_modal'
            },
            registration_modal:function(){
                var modal = new app.Views.RegistrationModal();
                    modal.$el.modal('show');
            },
            login:function(a){
                a.preventDefault();
                if(request.user.is_authenticated()) return false;
                a.stopImmediatePropagation();
                var b = this, c = Urls["api:rest_login"]();
                $.post(c, this.$el.find(".login_form").serialize()).done(function(a, c, d) {
                    request.user.login(a),  b.$el.modal('hide');
                    b.trigger('login.success')
                }).fail(function(a, b, c) {
                     formError(a.responseJSON,b);
                }).complete(function(a){
                    if(!!a.responseJSON['non_field_errors']){
                         message(a,b)
                    }else{

                    }

                });
              }
        });
        app.Views.RegistrationModal = Backbone.View.extend({
            el:'#registration-modal',
            events:{
                 "click .registration_form .submit": "registration",
                'click a':'login_modal'
            },
            login_modal:function(){
                   var modal = new app.Views.LoginModal();
                    modal.$el.modal('show');
            },
            registration:function() {
                    var view = this,a = Urls["api:rest_register"]();
                    $.post(a, this.$el.find(".registration_form").serialize(), function(a, b, c) {
                        request.user.login(a);
                        view.$el.find('.message').show().delay(function(){ view.$el.find('.message').hide().end().modal('hide');},1200);

                    }).error(function(a,b,c){
                        formError(a.responseJSON,view);

                    }).complete(function(a){
                        if(!!a.responseJSON['non_field_errors']){
                             message(a,b)
                        }else{

                        }

                });
                }
        });
        app.Views.UserBanner = Backbone.View.extend({
            el:"#wrapper",
            template: _.template('<div class="container" id="user-banner"> <div class="card pf_header "> <div class="cover_wrap banner_transition"> </div> <div class="pf_shadow"> <div class="pf_photo"> <div class="photo_wrap"> <a href="javascript:void(0);" title="更换头像"><img width="100" height="100" src="<%= request.user.avatar %>" alt="<%= request.user.username %>" class="photo"></a> </div> </div> <div class="pf_username"> <h1 class="username"><%= request.user.username %></h1> <span class="icon_bed"><a><i class="W_icon icon_pf_male"></i></a></span><span class="icon_bed"><a><i class="W_icon icon_pf_male"></i></a></span> </div> <div class="pf_intro"> <p class="tlink"><span id="signature">一句话介绍一下自己吧，让别人更了解你</span><i class="write square icon"></i></p> </div> </div></div></div>'),
            remove:function(){
                $("#user-banner").remove();
            },
            render:function(){
                if($("#user-banner").length===0)
                this.$el.before(this.template(f));
            }
        });
        app.Views.MobileNav = Backbone.View.extend({
        el: "#mobile-nav",
        template: _.template('<i id="mobile-nav-btn" class="mdi-navigation-menu"></i> <ul id="mobile-nav-menu" class="side-nav menu"> <% if (request.user.is_authenticated()){%> <li> <img class="avatar" src="<%= request.user.avatar %>" /> <div class="menu"> <div class="header"><%= request.user.username %></div> <!--<div class="ui divider"></div>--> <a href="#" class="item" id="avatar_update"> <i class="user icon"></i>Avatar</a> <a href="#" class="item" id="logout"><i class="sign out icon"></i>'+gettext('Sign Out')+'</a> </div> </li> <% }else{ %> <li> <a class="btn-flat modal-trigger" id="register" href="#">'+gettext("Sign Up")+'</a> </li> <li> <a class="btn-flat modal-trigger " id="login" href="#">'+gettext("Sign In")+'</a> </li> <% } %> </ul>'),
        events: {
            "click #mobile-nav-btn": "expand",
            'click #register':'register',
            'click #login':'login_modal',
            "click #logout": "logout",
            "click #avatar_update": "avatar",
            'touchstart #mobile-nav-menu':'collapse'
        },
        login_modal:function(){
            var modal = new app.Views.LoginModal();
             modal.$el.modal('show');
        },
        logout:app.Views.TopMenu.prototype.logout,
        avatar:app.Views.TopMenu.prototype.avatar,
        register:function(){
            var modal = new app.Views.RegistrationModal();
            modal.$el.modal('show');
        },
        expand: function() {
            var a = this.$el.find("#mobile-nav-menu");
             parseInt(a.css("left")) ? a.css({
                left: 0
            }) : a.css({
                left: ""
            });
        },
        render: function() {
            this.$el.html(this.template(f.user));
            var view= this,menu = this.$el.find("#mobile-nav-menu");
            if($(window).width()<=601){
              require(['hammerjs'],function(Hammer){
                var hammertime = new Hammer(document.body,{
                    recognizers: [
                        [Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL ,threshold:20,velocity:0.75}]
                    ]
                });
                hammertime.on('swipeleft', function(ev) {
                    console.log(ev)
                    menu.css({left:""});
                });
                hammertime.on('swiperight',function(ev){
                    menu.css({left:0});
                     console.log(ev)
                });
            });
            }
            return  this.$el.find(".combo.dropdown").dropdown({
                action: "combo"
            }),  $(document).on('auth.statusChange',function(){
                    view.render();
                }),this;
        }
    }),app.Views.Logo = Backbone.View.extend({
        el: "#logo-container",
        events: {
            click: "home"
        },
        home: function(a) {
            a.preventDefault(), app.router.navigate("", {
                trigger: true
            });
        }
    }), $.extend(App.prototype, {
        initGlobalElements: function() {
            var a = new this.Views.TopMenu(), b = new this.Views.Logo();
            b.render(), a.render();
            var c = (new this.Views.TopSearch(), new this.Views.MobileSearch(), 
            new this.Views.MobileNav());
            c.render();
            var d = new this.Views.PushPin();
            d.render();
        },
        init: function() {
            this._inited=true;

            this.initVariables(), this.initGlobalElements();
        },reset:function(reset,force_reset_pager){

            data = app.get_query_args();//current page
            app.collection.fetch({
            reset: reset||false,
            data: data,
            error: $.proxy(app.posts_fetch_error,app)
            });
                $('.modals').modal('hide all');// while modal is shown ,but user click browser forward button
            }
    }), app.Router = Backbone.Router.extend({
         initialize: function(options) {
            console.log('router initialize');
            this.history = [];

           },
             execute: function(callback, args, name) {
               this.history.push(Backbone.history.fragment);//just add while route triggered ,so...
                if (callback) callback.apply(this, args);
           },

            previous: function () {

                var hislen = app.router.history.length,
                    cur = this.history.pop(),
                    prev = this.history.pop()
                    , trigger = false;
                this.history = [];//empty history ,prevent it grow huge
                this.history.push(cur)
                if (typeof prev === 'undefined' && hislen === 1) {
                    trigger = true
                }// while post detail as first page or...
                this.navigate(prev, {trigger: trigger});
                this.history.push(prev)
                console.log('prev:', prev)
            },
        routes: $.extend({
            "search?*querystring": "search"
        }, Urls.routes),
        current: function() {
            var a, b = this, c = Backbone.history.fragment, d = _.pairs(b.routes), e = null, f = null;
            return a = _.find(d, function(a) {
                return e = _.isRegExp(a[0]) ? a[0] : b._routeToRegExp(a[0]), 
                e.test(c);
            }), a && (f = b._extractParameters(e, c), e = a[1]), 
            console.log("route:", e), {
                route: e,
                fragment: c,
                params: f
            };
        },
        search: function() {
            if(!app.inited()){
                app.collection = new app.Collections.Posts(f.initial_data.results);
                app.init();
            }else{
                 app.update_pager();
                app.reset(true)
                return
            }
            var a = new app.Views.PostsView({
                    collection: app.collection
                });
                app.msnry = new c(a.render().el, {
                    itemSelector: ".brick",
                    initLayout: false
//                    isAnimated: 1  otherwise pic will flow from top to bottom
                });
                imagesLoaded(a.el, function () {
                    app.msnry.layout();
                    site.flavour!='mobile' && require(['iscroll'], function (IScroll) {
                    $('#wrapper').height($(window).height() - $('.navbar-fixed').height())
                    app.myScroll = new IScroll('#wrapper', {
                        scroller: '#wrapper>.container'
                        , scrollY: true
                        , probeType: 2
                        , mouseWheel: true
//                      ,useTransform:false //otherwise all post image have 1px white right border while mouse enter
                        //but it will make #container position relative and incorect change top
                        //so change scroller from #container to #wrapper>container
                        , eventPassthrough: 'horizontal'
                    });

                    app.myScroll.on('scrollEnd', window.onIScroll);
                });

                });

        },
            home: function () {
                delete app.pager.q;
                console.log(app.router.history);
                if (!app.inited()) {
                    app.init();
                    app.collection = new app.Collections.Posts(f.initial_data.results);
                } else {
                     app.update_pager();
                    app.reset(true)
                    console.info('reset home');
                    return
                }

                var a = new app.Views.PostsView({
                    collection: app.collection
                });
                app.msnry = new c(a.render().el, {
                    itemSelector: ".brick",
                    columnWidth: '.brick',
                    percentPosition: true,
                    horizontalOrder: true,
                    transitionDuration: 0,
                    initLayout: false,
                    // isAnimated: false,
                });
                imagesLoaded(a.el, function () {
                    app.msnry.layout();
                site.flavour!='mobile' && require(['iscroll'], function (IScroll) {
//                    if(!app['myScroll']){
                    $('#wrapper').height($(window).height() - $('.navbar-fixed').height())
                    app.myScroll = new IScroll('#wrapper', {
                        scroller: '#wrapper>.container'
//                        , scrollbars: true
                        , scrollY: true
                        , probeType: 2
                        , mouseWheel: true
//                      ,useTransform:false //otherwise all post image have 1px white right border while mouse enter
                        //but it will make #container position relative and incorect change top
                        //so change scroller from #container to #wrapper>container
                        , eventPassthrough: 'horizontal'
                    });

                    app.myScroll.on('scrollEnd', window.onIScroll);

                });
                });

            },
        post_detail: function(a) {
            var c, d;
            try {
                c = app.collection.findWhere({
                    key: a
                });
                console.info("exist:", c)
            } catch (e) {
                console.error(e);
                c = new app.Models.Post({
                    key: a
                });
            }
            d = new app.Views.PostDetailModal({
                model: c
            });
            if(!c.has('image_large_url')) {
                $(".global.dimmer").dimmer("show");
                c.fetch({
                success: function(a, c, e) {
//                    d.render();
                    imagesLoaded(d.render().el, function() {
                        d.$el.modal("show");
//                        d.bindEvents();
                    });
                }
            }).always(function(a, b, c) {
                $(".global.dimmer").dimmer("hide");
            });
             }else{
                d.render().$el.modal('show');
            }
        },
        user_detail: function(a) {
            var userBanner = new app.Views.UserBanner();
                userBanner.render();
             app.router.once("route",function( route, params){
                 console.log("route1:", route, params);
                    if (route!== "user_detail")
                    userBanner.remove();
                });    
            delete app.pager.q;
                console.log(app.router.history);
                if (!app.inited()) {
                    app.init();
                    app.collection = new app.Collections.Posts(f.initial_data.results);
                } else {
                     app.update_pager();
                    app.reset(true)
                    console.info('reset home');
                    return
                }
                require(['editable'],function(){
                    var option = {trigger : $(".pf_intro .write"), action : "click"};
                        $("#signature").editable(option, function(e){
                            $.ajax({
                                url:Urls["api:user_profile"](requestData.user.username),
                                method:"PUT",
                                data:{
                                username:requestData.user.username,
                                   signature:e.value 
                                }
                            }).done(function(){

                            });
                        
                    });
                });
                var a = new app.Views.PostsView({
                    collection: app.collection
                });
                app.msnry = new c(a.render().el, {
                    itemSelector: ".brick",
                    initLayout: false,
                    isAnimated: !1
                });
                imagesLoaded(a.el, function () {
                    app.msnry.layout();
                site.flavour!='mobile' && require(['iscroll'], function (IScroll) {
//                    if(!app['myScroll']){
                    $('#wrapper').height($(window).height() - $('.navbar-fixed').height()-$("#user-banner").height())
                    app.myScroll = new IScroll('#wrapper', {
                        scroller: '#wrapper>.container'
//                        , scrollbars: true
                        , scrollY: true
                        , probeType: 2
                        , mouseWheel: true
//                      ,useTransform:false //otherwise all post image have 1px white right border while mouse enter
                        //but it will make #container position relative and incorect change top
                        //so change scroller from #container to #wrapper>container
                        , eventPassthrough: 'horizontal'
                    });

                    app.myScroll.on('scrollEnd', window.onIScroll);

                });
                });
        },
        fourOfour: function(a) {}
    }), $(document).ready(function() {
        app.router = new app.Router(), Backbone.history.start({
            pushState: !0
        });
    });
});
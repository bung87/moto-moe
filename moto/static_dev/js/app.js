/*!
 * motomoe
 * Author:bung
 * Summary:motomoe ===================
 * License:MIT
 * Version: 0.1.0
 *
 * URL:
 * 
 * /blob/master/LICENSE
 *
 */
function getQueryVariable(a) {
    for (var b = window.location.search.substring(1), c = b.split("&"), d = 0; d < c.length; d++) {
        var e = c[d].split("=");
        if (decodeURIComponent(e[0]) == a) return decodeURIComponent(e[1]);
    }
    return !1;
}

function getQueryVariables() {
    var a = window.location.search.substring(1);
    if (!a) return !1;
    for (var b = a.split("&"), c = {}, d = 0; d < b.length; d++) {
        var e = b[d].split("=");
        c[decodeURIComponent(e[0])] = decodeURIComponent(e[1]);
    }
    return c;
}

requirejs.config({
    map: {
        "*": {
            underscore: "lodash"
        }
    },
    paths: {
        jquery: "jquery.min",
        backbone: "backbone-min",
        masonry: "masonry.min",
        imagesloaded: "imagesloaded.pkgd.min",
        semantic: "semantic.min",
        hammerjs: "hammer.min",
        velocity: "velocity.min",
        resumable: "resumable.min",
        selectize: "../selectize/js/standalone/selectize.min",
        timeago: "jquery-timeago/jquery.timeago.min",
        snsshare: "../jquery.snsshare.js/js/SNShare.min",
        jcolor: "jquery.color.min",
        jcrop: "jquery.Jcrop.min",
        iscroll: "myScroller.min",
        waves: "waves.min",
        jstz: "jstz.min",
        lodash: "lodash.min",
        easing: "jquery.easing.min",
        editable: "jquery.editable.min"
    },
    shim: {
        backbone: {
            deps: [ "lodash" ],
            exports: "Backbone"
        },
        iscroll: {
            exports: "IScroll"
        },
        lodash: {
            exports: "_"
        },
        jquery: {
            exports: [ "jQuery", "$" ]
        },
        jcolor: {
            deps: [ "jquery" ],
            exports: "jQuery.Color"
        },
        jcrop: {
            deps: [ "jcolor" ],
            exports: "jQuery.fn.Jcrop"
        },
        velocity: {
            deps: [ "jquery" ]
        },
        timeago: {
            deps: [ "jquery" ]
        },
        editable: {
            deps: [ "jquery" ]
        },
        imagesloaded: {
            deps: [ "jquery" ],
            exports: "jQuery.fn.imagesloaded"
        },
        snsshare: {
            deps: [ "jquery" ],
            exports: "jQuery.fn.snsshare"
        },
        semantic: {
            deps: [ "jquery" ]
        },
        masonry: {
            deps: [ "jquery" ],
            exports: "Masonry"
        },
        jstz: {
            exports: "jstz"
        },
        easing: {
            deps: [ "jquery" ]
        }
    }
}), require([ "jquery" ], function($) {
    function a(a) {
        return i.raw ? a : encodeURIComponent(a);
    }
    function b(a) {
        return i.raw ? a : decodeURIComponent(a);
    }
    function c(b) {
        return a(i.json ? JSON.stringify(b) : String(b));
    }
    function d(a) {
        0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return a = decodeURIComponent(a.replace(h, " ")), 
            i.json ? JSON.parse(a) : a;
        } catch (a) {}
    }
    function e(a, b) {
        var c = i.raw ? a : d(a);
        return $.isFunction(b) ? b(c) : c;
    }
    function f(a) {
        return /^(GET|HEAD|OPTIONS|TRACE)$/.test(a);
    }
    function g(a) {
        var b = document.location.host, c = document.location.protocol, d = "//" + b, e = c + d;
        return a == e || a.slice(0, e.length + 1) == e + "/" || a == d || a.slice(0, d.length + 1) == d + "/" || !/^(\/\/|http:|https:).*/.test(a);
    }
    var h = /\+/g, i = $.cookie = function(d, f, g) {
        if (arguments.length > 1 && !$.isFunction(f)) {
            if (g = $.extend({}, i.defaults, g), "number" == typeof g.expires) {
                var h = g.expires, j = g.expires = new Date();
                j.setMilliseconds(j.getMilliseconds() + 864e5 * h);
            }
            return document.cookie = [ a(d), "=", c(f), g.expires ? "; expires=" + g.expires.toUTCString() : "", g.path ? "; path=" + g.path : "", g.domain ? "; domain=" + g.domain : "", g.secure ? "; secure" : "" ].join("");
        }
        for (var k = d ? void 0 : {}, l = document.cookie ? document.cookie.split("; ") : [], m = 0, n = l.length; m < n; m++) {
            var o = l[m].split("="), p = b(o.shift()), q = o.join("=");
            if (d === p) {
                k = e(q, f);
                break;
            }
            d || void 0 === (q = e(q)) || (k[p] = q);
        }
        return k;
    };
    i.defaults = {}, $.removeCookie = function(a, b) {
        return $.cookie(a, "", $.extend({}, b, {
            expires: -1
        })), !$.cookie(a);
    }, $.ajaxSetup({
        beforeSend: function(a, b) {
            !f(b.type) && g(b.url) && a.setRequestHeader("X-CSRFToken", $.cookie("csrftoken"));
        }
    });
}), HTMLCanvasElement.prototype.toBlob || Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
    value: function(a, b, c) {
        for (var d = atob(this.toDataURL(b, c).split(",")[1]), e = d.length, f = new Uint8Array(e), g = 0; g < e; g++) f[g] = d.charCodeAt(g);
        a(new Blob([ f ], {
            type: b || "image/png"
        }));
    }
});

var User = function(a) {
    for (var b in a) this[b] = a[b];
};

User.prototype = {
    is_authenticated: function() {
        return this._is_authenticated;
    }
};

var SRequest = function(a) {
    this.user = new User(a.user);
};

SRequest.prototype = {}, window.request = new SRequest(requestData);

var App = function(a) {
    for (var b in a) this[b] = a[b];
};

App.prototype = {
    _inited: 0,
    has_next: function() {
        return !!this.next;
    },
    set_next: function(a) {
        this.next = a;
    },
    inited: function() {
        return this._inited;
    },
    initVariables: function() {
        this.pager.page = site.pager.page, this.pager.page_size = site.pager.page_size, 
        this.start_loading = 0, this.next = site.initial_data.next;
    },
    get_pager: function() {
        return {
            page: this.pager.page || 1,
            page_size: this.pager.page_size || site.pager.page_size
        };
    },
    update_pager: function() {
        for (var a in this.pager) delete this.pager[a];
        var b = getQueryVariables(), c = b ? b : {
            page: 1,
            page_size: site.pager.page_size
        };
        for (var d in c) this.pager[d] = c[d];
        this.pager.page = parseInt(this.pager.page), this.pager.page_size = parseInt(this.pager.page_size);
    },
    extro_arg_keys: [ "q", "page", "page_size" ],
    get_query_args: function(a) {
        for (var b = {}, c = a || this.extro_arg_keys, d = 0; d < c.length; d++) {
            var e = getQueryVariable(c[d]);
            e && (b[c[d]] = e);
        }
        return b;
    },
    posts_fetch_success: function(a, b, c) {
        var d = this;
        d.start_loading = 0, d.pager.page += 1, console.info(d.pager), 
        d.router.navigate(Urls[this.router.current().route]() + "?" + $.param(d.get_pager()), {
            trigger: !1
        }), d.router.history.push(app.router.current().fragment), 
        d.collection.trigger("loadMore", a.models);
    },
    posts_fetch_error: function(a, b, c) {
        404 == b.status && (this.start_loading = 0, app.next = null, 
        console.log(b.statusText));
    }
};

var app = new App({
    start_loading: 0,
    next: null,
    pager: {
        page: 1,
        page_size: 12
    },
    Models: {},
    Collections: {},
    Views: {}
});

require([ "jquery", "jstz" ], function($, a) {
    var b = a.determine(), c = b.name();
    console.info(c), $.cookie("timezone", c, {
        expires: 30
    });
}), require([ "jquery", "selectize", "waves", "easing" ], function($, a, b, c) {
    $(document).ready(function() {
        b.attach(".btn-floating", "waves-light"), b.init(), 
        $(".tags").selectize({
            delimiter: ",",
            persist: !1,
            create: function(a) {
                return {
                    value: a,
                    text: a
                };
            }
        });
    });
    var d = $(window);
    window.onIScroll = onIScroll = function() {
        var a = $(".navbar-fixed"), b = a.height(), c = "mobile" != site.flavour ? app.myScroll.scrollerHeight - app.myScroll.wrapperHeight * Math.PI : $(document).height() - 2.02 * d.height(), e = "mobile" != site.flavour ? Math.abs(this.y) : d.scrollTop(), f = {
            top: -b
        }, g = {};
        if ($.each(f, function(a, b) {
            g[a] = 0;
        }), app.lastY || (app.lastY = 0), e - app.lastY >= b ? a.animate($.extend({
            opacity: 0
        }, f), {
            duration: 300,
            easing: "easeInOutQuint"
        }) : app.lastY - e >= b && a.animate($.extend({
            opacity: 1
        }, g), {
            duration: 300,
            easing: "easeInOutQuint"
        }), app.lastY = e || 0, e >= c) {
            if (!app.has_next()) return void console.log("no mores!", c, e);
            if (0 == app.start_loading) {
                app.start_loading = 1;
                var h;
                h = app.inited() ? app.get_pager() : app.get_query_args(), 
                data = h, console.log("pager:", data), data.page += 1, 
                app.collection.fetch({
                    data: data,
                    success: $.proxy(app.posts_fetch_success, app),
                    error: $.proxy(app.posts_fetch_error, app),
                    remove: !1
                });
            }
        }
    }, "mobile" == site.flavour && (document.body.style.height = "auto", 
    document.body.style.overflow = "scroll", d.on("scroll", onIScroll)), 
    $.fn.reverse = [].reverse;
}), define([ "lodash", "backbone", "jquery", "semantic", "timeago", "imagesloaded", "masonry" ], function(_, Backbone, $, semantic, a, c, d) {
    function e(a) {
        a.preventDefault(), a.stopImmediatePropagation();
        var b = this, c = arguments.callee;
        if (!request.user.is_authenticated()) {
            var d = new app.Views.LoginModal();
            return d.$el.modal("show"), d.once("login.success", function() {
                c.call(b, a);
            }), !1;
        }
        var e = this.model.attributes.liked ? "DELETE" : "POST";
        $.ajax({
            method: e,
            url: Urls["api:likeit"](b.model.attributes.key)
        }).done(function(a, c, d) {
            201 == d.status ? b.model.set({
                liked: 1
            }) : 204 == d.status && b.model.set({
                liked: 0
            });
        });
    }
    var f = {
        "zh-cn": "zh-CN",
        "zh-TW": "zh-tw"
    }, g = window.site, h = f[g.lang] ? f[g.lang] : g.lang, i = g.static_url + "js/jquery-timeago/locales/jquery.timeago." + h + ".js", j = $.extend(!0, {}, window.site);
    $.extend(app.pager, window.site.pager), $.fn.serializeObject = function() {
        var a = {}, b = this.serializeArray();
        return $.each(b, function() {
            a[this.name] ? (a[this.name].push || (a[this.name] = [ a[this.name] ]), 
            a[this.name].push(this.value || "")) : a[this.name] = this.value || "";
        }), a;
    }, formError = function(a, b) {
        $.each(a, function(a, c) {
            var d = b.$el.find("[name=" + a + "]");
            d.popup("destroy").popup({
                position: "right center",
                content: c
            }).popup("show").on("change", function() {
                d.popup("destroy");
            });
        });
    }, app.Models.Post = Backbone.Model.extend({
        defaults: {
            source: "",
            id: 0,
            comment_url: null,
            liked: null
        },
        url: function() {
            return Urls["api:post_detail"](this.attributes.key);
        },
        detail_url: function() {
            return Urls.post_detail(this.attributes.key);
        },
        is_liked: function() {
            return this.attributes.liked;
        }
    }), app.Collections.Posts = Backbone.Collection.extend({
        url: function() {
            var a = app.router.current();
            return "home" == a.route ? Urls["api:posts"]() : "search" == a.route ? Urls["api:search"]() : Urls["api:posts"]();
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
            this.listenTo(this.model, "change:liked", this.likedChanged);
        },
        likedChanged: function(a, b) {
            console.log("post view changed:", a, b);
            var c = this.$el.find("i.like");
            this.model.attributes.liked ? c.addClass("red-text").removeClass("grey-text") : c.removeClass("red-text").addClass("grey-text");
        },
        template: _.template(' <div class="card"> <div class="card-image"> <div class="post"><img width="189" src="<%= image_url %>"> <div class="extra"> <span class="left floated like btn-like"> <i class="like <% if(liked) {%>red-text<% }else {%><% } %> icon"></i> ' + gettext("Like") + ' </span>  </div> </div> </div> <% if(typeof(description) !== "undefined") {%> <div class="card-content"> <p><%= description %></p> </div> <% } %> <ul class="collection collector"> <li class="collection-item avatar"> <img src="<%= author.avatar %>" alt="<%= author.username %>" width="42" height="42" class="circle"> <p><a href="/user/<%= author.username %>"><%= author.username %></a><br> <time class="timeago" datetime="<%= date_posted %>"><%= date_posted2 %></time> </p> </li> </ul> </div> '),
        tagName: "div",
        className: "brick col xl2 l3 m4 s6",
        events: {
            "click .post": "postDetail",
            "click .btn-like": "like"
        },
        id: function() {
            return this.model.attributes.key;
        },
        like: e,
        postDetail: function(a) {
            "post_detail" == app.router.current().route || document.body.className.indexOf("dimmed") > -1 || (a.stopImmediatePropagation(), 
            app.router.navigate(this.model.detail_url(), {
                trigger: !0
            }));
        },
        render: function() {
            this.$el.html(this.template(this.model.attributes));
            var a = this.$el;
            return require([ i ], function() {
                a.find(".timeago").timeago();
            }), this;
        }
    }), app.Views.ReplyView = Backbone.View.extend({
        className: "comment-reply",
        template: _.template(' <form method="POST" action="<%= comment_url %>" class="ui reply form"> <div class="field"> <textarea></textarea> </div> <div class="ui blue labeled submit icon button"> <i class="icon edit"></i> ' + gettext("Reply") + " </div> </form>"),
        render: function(a) {
            return this.$el.html(this.template({
                comment_url: Urls.api_reply(a)
            })), this;
        }
    }), app.Views.CommentView = Backbone.View.extend({
        template: _.template(' <a class="avatar"> <img src="<%= author.avatar %>"> </a> <div class="content"> <a class="author"><%= author.username %></a> <div class="metadata"> <span class="date"> <time class="timeago" datetime="<%= date_created %>"></time></span> </div> <div class="text"> <%= message %> </div> <div class="actions"> <a class="reply">' + gettext("Reply") + '</a> </div> <div id="comment-<%= id %>-reply-form"></div> </div>'),
        tagName: "div",
        className: "comment",
        id: function() {
            return "comment-" + this.model.attributes.id;
        },
        events: {
            "click a.reply": "reply"
        },
        reply: function(a) {
            a.stopPropagation(), this.commentsView.$el.find(".comment-reply").hide(), 
            this.replyView ? this.replyView.$el.toggle() : (this.replyView = new app.Views.ReplyView({
                el: "#" + this.id() + "-reply-form"
            }), this.replyView.render(this.model.attributes.id).$el);
        },
        render: function() {
            var a = this.$el;
            return this.$el.html(this.template(this.model.toJSON())), 
            require([ i ], function() {
                a.find(".timeago").timeago();
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
                        class: "comments"
                    }), $c.append($cc)), $cc.append(c.render().el)) : this.$el.append(c.render().el);
                }
            }, this), this;
        }
    }), app.Views.PostDetailModal = Backbone.View.extend({
        initialize: function() {
            this.listenTo(this.model, "change:liked", this.likedChanged);
        },
        template: _.template(' <i class="close icon"></i> <div class="content"> <div class="ui grid"> <div class="ten wide column"> <div class="ui basic button top left pointing labeled like btn-like icon"> <i class="icon like alternate<% if(liked) {%>red-text<% }else {%>grey-text<% } %> "></i> ' + gettext("Like") + '</div> <div class="ui top left pointing labeled icon dropdown basic button share"> <i class="share alternate icon"></i> ' + gettext("Share") + ' <!--i class="dropdown icon"></i--> <div class="menu"> <div class="item" data-value="snsshare-tsina"> <a title="分享到新浪微博" href="#" class="snsshare snsshare-tsina"></a> 新浪微博</div> <div class="item" data-value="snsshare-tqq"> <a title="分享到腾讯微博" href="#" class="snsshare snsshare-tqq"></a> 腾讯微博</div> <div class="item" data-value="snsshare-qzone"> <a title="分享到QQ空间" href="#" class="snsshare snsshare-qzone"></a> QQ空间</div> <div class="item" data-value="snsshare-renren"> <a title="分享到人人网" href="#" class="snsshare snsshare-renren"></a> 人人网</div> <div class="item" data-value="snsshare-kaixin001"> <a title="分享到开心网" href="#" class="snsshare snsshare-kaixin001"></a> 开心网</div> <div class="item" data-value="snsshare-txpengyou"> <a title="分享到腾讯朋友" href="#" class="snsshare snsshare-txpengyou"></a> 腾讯朋友</div> <div class="item" data-value="snsshare-douban"> <a title="分享到豆瓣" href="#" class="snsshare snsshare-douban"></a> 豆瓣</div> </div> </div> </div> <div class="twelve wide column"> <div class="ui fluid card"> <div class="image"><img src="<%= image_large_url %>" /></div> <div class="extra"> <% if (source){ %> <a href="<%= source %>" class="left floated" rel="nofollow">' + gettext("Found on") + ' <%= source_host %></a> <% } %> <div class="right floated"><i class="download icon"></i><a href="<%= image_large_url %>" download="<%= file_name %>">' + gettext("Download") + '</a></div> </div> <div class="extra"> <time class="timeago" datetime="<%= date_posted %>"><%= date_posted2 %></time> </div> </div> </div> <div class="four wide column"> <div class="ui fluid card"> <div class="content"> <div class="meta">via</div> <img class="ui avatar middle aligned floated" src="<%= author.avatar %>"> <span><%= author.username %></span> <% if (request.user.is_authenticated() && author.username!=request.user.username ) {%> <div class="ui right floated button pink-text"> <i class="add icon"></i> Follow </div> <% } %> </div> </div> </div> </div> <div class="ui grid"> <div class="twelve wide column"> <div class="ui fluid card"> <div class="content comments-wrapper"> <div class="ui minimal comments" id="post-<%= id %>-comments"> <h3 class="ui dividing header">' + gettext("Comments") + '</h3> </div> </div> <div class="content"> <% if (request.user.is_authenticated()) {%> <form method="POST" action="<%= comment_url %>" class="ui comments-form form"> <div class="field"> <textarea></textarea> </div> <div class="ui blue labeled submit icon button"> <i class="icon edit"></i> ' + gettext("Comment") + ' </div> </form> </div> <% }else{ %> {% blocktrans %}Please <a href="#" class="logintocomment">Login</a> first!{% endblocktrans %} <% } %> </div> </div></div></div>'),
        comments: null,
        comments_view: null,
        className: "ui detail modal basic",
        tagName: "div",
        id: function() {
            return "post-detail-" + this.model.attributes.id;
        },
        events: {
            "click .btn-like": "like",
            "click button.visit": "visit",
            "click button.send": "send",
            "keyup [name=search]": "search",
            "click .reply.form .submit": "reply",
            "click .logintocomment": "logintocomment",
            "click .comments-form .submit": "comment"
        },
        likedChanged: function(a, b) {
            this.render();
        },
        logintocomment: function() {
            var a = this, b = new app.Views.LoginModal();
            b.$el.modal("show"), b.once("login.success", function() {
                a.render().$el.modal("show");
            });
        },
        like: e,
        comment: function(a) {
            var b = this, c = $(a.target).parents("form").get(0), d = c.action, e = $(c), f = e.find("textarea"), g = f.val();
            $.post(d, {
                message: g
            }).done(function(a, c, d) {
                f.val(""), b.comments.add(a), b.comments_view.render();
            });
        },
        reply: function(a) {
            var b = this, c = $(a.target).parents("form").get(0), d = c.action, e = $(c), f = e.find("textarea"), g = f.val();
            $.post(d, {
                message: g
            }).done(function(a, c, d) {
                f.val(""), e.parent().hide(), b.comments.add(a), b.comments_view.render();
            });
        },
        search: function(a) {
            var b = a.target.value;
            b.length >= 2 ? (this.$el.find(".header").hide(), 
            $(a.target).parents(".menu").find(".item").show()) : (this.$el.find(".header").show(), 
            $(a.target).parents(".menu").find(".item").hide());
        },
        share: function(a) {
            var b = this.$el;
            b.trigger("snsshare", [ $(a.target), {} ]);
        },
        render: function(a) {
            var b = this;
            return this.$el.html(this.template(this.model.toJSON())), 
            this.$el.modal({
                autofocus: !1,
                onHidden: function() {
                    app.router.previous();
                    try {
                        "mobile" != g.flavour && (b.myScroll.destroy(), b.myScroll = null), 
                        $(".ui.dimmer.modals").find(".iScrollVerticalScrollbar").remove(), 
                        b.el.style = "";
                    } catch (a) {
                        console.error(a);
                    }
                },
                onVisible: function() {
                    "mobile" != g.flavour && require([ "iscroll" ], function(a) {
                        b.myScroll = new a(".ui.dimmer.modals", {
                            scroller: b.el,
                            scrollbars: !0,
                            scrollY: !0,
                            probeType: 2,
                            mouseWheel: !0,
                            eventPassthrough: "horizontal"
                        });
                    });
                }
            }), require([ i ], function() {
                b.$el.find(".timeago").timeago();
            }), b.$el.find(".ui.dropdown").dropdown({
                action: function(a, c) {
                    var d = b.$el.find("." + c).parent();
                    b.$el.trigger("snsshare", [ d, {} ]);
                }
            }), require([ "snsshare" ], function(a) {
                var c = " 我在［元萌］捕获萌妹一只，邀你一起来把玩！";
                b.$el.snsshare({
                    title: c,
                    images: b.model.attributes.image_url,
                    url: document.location.href,
                    site_url: document.location.origin,
                    windowWidth: 800,
                    widnowHeight: 500,
                    site_name: "moto.moe",
                    summary: b.model.attributes.description || c,
                    empty: "",
                    reason: c,
                    pengyou: "pengyou",
                    cb: function() {}
                });
            }), this.model.attributes.id && $.get(Urls.api_list_create("post", this.model.attributes.id)).done(function(a, c, d) {
                b.comments = new app.Collections.Comments(a.results), 
                b.comments_view = new app.Views.CommentsView({
                    collection: b.comments,
                    el: b.$el.find(".comments-wrapper .comments").get(0)
                }), b.comments_view.render();
            }), this;
        }
    }), app.Views.PostsView = Backbone.View.extend({
        initialize: function() {
            this.listenTo(this.collection, "reset", function(a, b) {
                console.log("reset with:", a);
                var e = this;
                this.hasDifference() && c(e.render().$el.find(".card-image img").toArray(), function() {
                    console.log("has difference"), app.msnry = new d(e.el, {
                        itemSelector: ".brick",
                        initLayout: !1
                    }), "mobile" != g.flavour && app.myScroll.refresh();
                });
            }), this.listenTo(this.collection, "remove", function(a) {
                console.log("remove :", a), app.msnry.layout();
            }), this.listenTo(this.collection, "add", function(a, b, d) {
                if ("head" == d.flag) {
                    var e = new app.Views.PostView({
                        model: a
                    });
                    this.$el.prepend(e.render().el), c(e.el, function() {
                        app.msnry.prepended(e.el), "mobile" != g.flavour && app.myScroll.refresh();
                    });
                } else if ("tailer" == d.flag) {
                    console.log("add:else");
                    var f = new app.Views.PostView({
                        model: a
                    });
                    this.$el.append(f.render().el), c(this.el, function() {
                        app.msnry.appended(f.el), "mobile" != g.flavour && app.myScroll.refresh();
                    });
                } else console.log("fetch from somewhere,do nothing");
            }), this.listenTo(this.collection, "loadMore", this.loadMore);
        },
        loadMore: function(a) {
            var b = this, d = [], e = this.$el.find(".brick"), f = _.pluck(e, "id"), h = b.collection.pluck("key"), i = _.difference(h, f);
            _.each(i, function(a) {
                var c = new app.Views.PostView({
                    model: b.collection.findWhere({
                        key: a
                    })
                });
                d.push(c.render().el);
            }), c(d, function() {
                b.$el.append(d), app.msnry.appended(d), "mobile" != g.flavour && app.myScroll.refresh();
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
        hasDifference: function() {
            var a = this.$el.find(".brick"), b = _.pluck(a, "id"), c = this.collection.pluck("key"), d = _.difference(b, c), e = _.difference(c, b);
            return d.length || e.length;
        },
        render: function() {
            var a = this.$el.find(".brick"), b = _.pluck(a, "id"), c = this.collection.pluck("key"), d = _.difference(b, c), e = _.difference(c, b);
            a.each(function(a, b) {
                -1 !== d.indexOf(b.id) && b.remove();
            });
            var f = this.collection.filter(function(a) {
                return _.contains(e, a.get("key"));
            });
            return console.log("need add", f), _.each(f, function(a) {
                var b = new app.Views.PostView({
                    model: a
                });
                this.$el.append(b.render().$el);
            }, this), this;
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
            require([ "resumable" ], function(Resumable) {
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
                    app.collection.add($.parseJSON(b), {
                        flag: "head"
                    });
                }), app.resumable.on("fileError", function(a, b) {
                    console.log(b);
                }), app.resumable.assignBrowse(document.getElementById("browse")), 
                app.resumable.assignDrop(document.getElementById("post-modal")));
            });
        },
        reset: function() {
            var a = $(this.el);
            a.find("form").get(0).reset(), a.find(".tags").get(0).selectize.clear(), 
            a.find("#browse").fadeIn(), a.find("p").fadeIn(), 
            a.find("form").fadeOut();
        },
        upload: function() {
            var a = $(this.el);
            $.post(Urls["api:post"](), this.serializeForm()).done(function(b, c, d) {
                var e = app.collection.findWhere({
                    id: b.id
                });
                e.set(b), a.modal("hide");
            });
        }
    }), app.Views.AvatarModal = Backbone.View.extend({
        template: _.template(' <i class="close icon"></i> <div class="header"> ' + gettext("Profile Picture") + ' </div> <div class="content"> <div class="ui medium image"><canvas id="avatar-preview"></canvas> </div> <input type="file" id="avatar_file_input" name="file"/> <output id="target"></output> <div class="description">  </div> </div> <div class="actions"> <div class="ui black deny button"> Nope </div> <div class="ui positive right labeled icon button"> Upload <i class="checkmark icon"></i> </div> </div>'),
        className: "ui modal basic",
        tagName: "div",
        events: {
            "change #avatar_file_input": "avatar_file_input_change",
            "click .positive": "upload"
        },
        upload: function() {
            var a = new FormData(), b = $("#avatar-preview");
            b.get(0).getContext("2d"), b.get(0).toBlob(function(b) {
                a.append("avatar", b), $.ajax({
                    url: Urls["api:avatar"](),
                    data: a,
                    cache: !1,
                    contentType: !1,
                    processData: !1,
                    type: "POST",
                    success: function(a) {
                        var b = $("#top_menu").find(".avatar"), c = b.attr("src"), d = (c.indexOf("?dummy="), 
                        new Date());
                        b.attr("src", a.avatar + "?dummy=" + d.getTime());
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
            var b = this;
            require([ "jcrop" ], function(c) {
                var d = a.target.files[0];
                if (!d.type.match("image.*")) return !1;
                var e = new FileReader();
                e.onload = function(a) {
                    var c = $("<img>").attr("src", a.target.result);
                    $("#avatar-preview").attr("src", a.target.result), 
                    $("#target").html(c), $("#target>img").Jcrop({
                        onChange: b.avatar_crop,
                        onSelect: b.avatar_crop,
                        aspectRatio: 1
                    });
                }, e.readAsDataURL(d);
            });
        },
        render: function() {
            return this.$el.html(this.template()), this;
        }
    });
    var k = new app.Views.PostModal();
    app.Views.PushPin = Backbone.View.extend({
        initialize: function() {
            this.showed = !1;
        },
        showed: !1,
        entered: !1,
        el: ".fixed-action-btn",
        events: {
            "click #post-btn": "postModalShow",
            "click #page-top": "pageTop",
            "click #catch-btn": "catch1",
            "mouseenter #fixed-actions": "mouseenter",
            mouseleave: "mouseleave",
            "touchstart #fixed-actions": "toggle"
        },
        toggle: function(a) {
            a.preventDefault(), a.stopImmediatePropagation();
            var b = this, c = b.showed ? "mouseleave" : "mouseenter";
            b[c].call(b, a);
        },
        showStep2: function(a) {
            var b = this;
            b.toSecondStep.call(b, a);
        },
        catch1: function(a) {
            a.stopImmediatePropagation(), this.mouseleave(a);
            var b = function() {
                $("#catch-modal-1").modal("show");
            };
            if (!request.user.is_authenticated()) {
                var c = new app.Views.LoginModal();
                return c.$el.modal("show"), void c.once("login.success", function() {
                    b();
                });
            }
            b();
        },
        toSecondStep: function(a) {
            a.preventDefault(), a.stopImmediatePropagation(), 
            $(a.target).addClass("loading");
            var b = this, c = $("#catch-modal-1"), d = c.find("input").val(), e = _.template(' <div class="ui card" data-src="<%= url %>"> <div class="blurring dimmable image"> <div class="ui dimmer"> <div class="content"> <div class="center"> <div class="ui pink button">' + gettext("Select") + '</div> </div> </div> </div> <img src="<%= url %>" class="image"> <!--<p>Type:<%= type %></p>--> <!--<p>Length:<%= len %></p>--> </div> <div class="extra content"> <div class="ui large transparent left icon input"> <!--<i class="heart outline icon"></i>--> <input type="text" placeholder="' + gettext("Add Description...") + '"> </div> <span class="left floated"> Type:<%= type %> </span> <span class="right floated"> Length:<%= len %> </span> </div> </div>'), f = $("#catch-modal-2");
            $.post(Urls["api:catch"](), {
                url: d
            }).done(function(c) {
                var g = "";
                $.each(c.urls, function(a, b) {
                    g += e(b);
                }), f.find(".content .cards").html(g).end().modal("show").find("div.image").dimmer({
                    on: "hover"
                }).end().on("click", ".content .button", function(a) {
                    a.preventDefault(), a.stopImmediatePropagation();
                    var b = $(this), c = b.parents(".card");
                    "Pin" == b.text() ? (c.data("selected", !0), b.text("Unpin")) : (b.text("Pin"), 
                    c.data("selected", !1)), c.toggleClass("pink");
                }).on("click", "#image_confirmed", function(a) {
                    a.preventDefault(), a.stopImmediatePropagation();
                    var c = [];
                    f.find(".card").each(function(a, b) {
                        var d = $(b);
                        if (d.data("selected")) {
                            var e = d.data("src");
                            c.push({
                                url: e
                            });
                        }
                    }), b.toThirdStep(d, c);
                }), $(a.target).removeClass("loading");
            });
        },
        toThirdStep: function(a, b) {
            var c = $("#catch-modal-2");
            $.post("/api/download/", {
                url: a,
                images: JSON.stringify(b)
            }).done(function(a) {
                c.modal("hide"), app.collection.add(a, {
                    flag: "head"
                });
            });
        },
        mouseleave: function(a) {
            a.stopPropagation();
            var b = this.$el, c = this;
            require([ "velocity" ], function(a) {
                !function(a, b) {
                    setTimeout(function() {
                        b.entered || (a.find("ul .btn-floating").velocity("stop", !0), 
                        a.find("ul .btn-floating").velocity({
                            opacity: "0",
                            scaleX: ".4",
                            scaleY: ".4",
                            translateY: "40px"
                        }, {
                            duration: 80,
                            delay: 80,
                            complete: function() {
                                a.find("ul").hide(), a.find("ul li").each(function() {
                                    $(this).popup("hide", {
                                        duration: 80
                                    });
                                });
                            }
                        }), b.showed = !1, b.entered = !1);
                    }, 1e3);
                }(b, c);
            });
        },
        mouseenter: function(a) {
            this.entered = !0;
            var b = this;
            if (function(a) {
                setTimeout(function() {
                    a.entered = !1;
                }, 500);
            }(b), this.showed) return !0;
            var c = this.$el, b = this;
            require([ "velocity" ], function(a) {
                c.find("ul").show();
                var d = 0;
                c.find("ul .btn-floating").reverse().each(function() {
                    $(this).velocity({
                        opacity: "1",
                        scaleX: "1",
                        scaleY: "1",
                        translateY: "0"
                    }, {
                        duration: 80,
                        delay: d
                    }), $(this).parent().popup("show", {
                        duration: 80,
                        delay: {
                            show: d
                        }
                    }), d += 40;
                }), b.showed = !0;
            });
        },
        pageTop: function(a) {
            a.preventDefault(), a.stopImmediatePropagation(), 
            this.mouseleave(a);
            try {
                "mobile" != g.flavour && app.myScroll.scrollTo(0, 0);
            } catch (a) {}
            return !1;
        },
        postModalShow: function(a) {
            a.stopImmediatePropagation(), this.mouseleave(a);
            var b = function() {
                k.$el.modal({
                    onHide: function() {
                        k.reset(), window.history.back();
                    }
                }).modal("show"), k.initResumable();
            };
            if (!request.user.is_authenticated()) {
                var c = new app.Views.LoginModal();
                return c.$el.modal("show"), void c.once("login.success", function() {
                    b();
                });
            }
            b();
        },
        render: function() {
            var a = this.$el;
            $("#catch-modal-1").on("click", ".button", $.proxy(this.showStep2, this)), 
            $(document).ready(function() {
                a.find("ul li").popup({
                    preserve: !0,
                    transition: "scale"
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
                app.pager.page = 1, app.pager.page_size = g.pager.page_size, 
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
            this.$el.zIndex = 1e3, this.$el.find(".search.icon").removeClass("search").addClass("remove"), 
            this.$el.find("input").css({
                width: "100%"
            });
        },
        collapse: function() {
            this.$el.zIndex = 998, this.$el.find(".remove.icon").removeClass("remove").addClass("search"), 
            this.$el.find("input").css({
                width: "0",
                padding: "inherit 0"
            });
        }
    }), $.extend(User.prototype, {
        login: function(a) {
            for (var b in a) this[b] = a[b];
            this._is_authenticated = 1, $(document).trigger("auth.statusChange");
        },
        logout: function() {
            this._is_authenticated = 0, $(document).trigger("auth.statusChange");
        }
    }), app.Views.TopMenu = Backbone.View.extend({
        el: "#top_menu",
        template: _.template(' <% if (request.user.is_authenticated()){%> <li class="user ui combo top right pointing dropdown"> <a href="#"><img class="avatar" src="<%= request.user.avatar %>" /><i class="dropdown icon"></i></a> <div class="menu"> <div class="header"><%= request.user.username %></div> <!--<div class="ui divider"></div>--> <div class="item" id="avatar_update"><i class="photo icon"></i>' + gettext("Avatar") + '</div> <div class="item" id="logout"><i class="sign out icon"></i>' + gettext("Sign Out") + '</div> </div> </li> <% }else{ %> <li> <div class="ui dropdown combo top right pointing"> <a class="btn-flat modal-trigger" id="register" href="#">' + gettext("Sign Up") + '</a> <div class="menu transition"> <form class="ui form registration_form" action="" > <h4 class="ui fluid dividing header">' + gettext("Sign Up") + '</h4> <div class="field"> <label>' + gettext("Username") + '</label> <div class="ui icon input"> <input type="text" name="username"> <i class="user icon"></i> </div> </div> <div class="field"> <label>' + gettext("Email") + '</label> <div class="ui icon input"> <input type="email" name="email"> <i class="mail icon"></i> </div> </div> <div class="field"> <label>' + gettext("Password") + '</label> <div class="ui icon input"> <input type="password" name="password1"> <i class="lock icon"></i> </div> </div> <div class="field"> <label>' + gettext("Confirm password") + '</label> <div class="ui icon input"> <input type="password" name="password2"> <i class="lock icon"></i> </div> </div> <div class="ui submit primary button">' + gettext("Sign Up") + '</div> </form> </div> </div> </li> <li> <div class="ui dropdown combo top right pointing"> <a class="btn-flat modal-trigger " id="login" href="#">' + gettext("Sign In") + '</a> <div class="menu transition"> <form class="ui form login_form" action=""> <h4 class="ui fluid dividing header">' + gettext("Sign In") + '</h4> <div class="field"> <label>' + gettext("Username") + '</label> <div class="ui icon input"> <input type="text" name="username"> <i class="user icon"></i> </div> </div> <div class="field"> <label>' + gettext("Password") + '</label> <div class="ui icon input"> <input type="password" name="password"> <i class="lock icon"></i> </div> </div> <button class="ui submit primary button">' + gettext("Sign In") + "</button> </form> </div> </div> </li> <% } %> "),
        events: {
            "click .registration_form .submit": "registration",
            "submit .login_form": "login",
            "click #logout": "logout",
            "click #register": "register",
            "click #login": "login2",
            "click #avatar_update": "avatar"
        },
        login2: function() {
            var a = new app.Views.LoginModal();
            a.$el.modal("show");
        },
        register: function() {
            var a = new app.Views.RegistrationModal();
            a.$el.modal("show");
        },
        avatar: function(a) {
            var b = new app.Views.AvatarModal();
            b.render().$el.modal("show");
        },
        login: function(a) {
            a.preventDefault();
            var b = Urls["api:rest_login"]();
            $.post(b, this.$el.find(".login_form").serialize()).done(function(a, b, c) {
                request.user.login(a), $("#login").parent().dropdown("hide");
            }).fail(function(a, b, c) {
                console.log(a, b, c);
            });
        },
        logout: function() {
            return $.post(Urls["api:rest_logout"]()).done(function(a, b, c) {
                request.user.logout();
            }), !1;
        },
        registration: function() {
            var a = Urls["api:rest_register"](), b = this;
            $.post(a, this.$el.find(".registration_form").serialize(), function(a, b, c) {
                $("#register").parent().dropdown("hide");
            }).error(function(a, c, d) {
                formError(a.responseJSON, b);
            });
        },
        render: function() {
            var a = this;
            return this.$el.html(this.template(j.user)), this.$el.find(".combo.dropdown").dropdown({
                action: "combo"
            }), $(document).on("auth.statusChange", function() {
                a.render();
            }), this.$el.find(".dropdown").dropdown({
                on: "hover"
            }), this;
        }
    }), message = function(a, b) {
        var c = {
            status: a.status,
            statusText: a.statusText,
            responseJSON: a.responseJSON
        };
        new app.Views.Message({
            attributes: c
        }).renderTo(b);
    }, app.Views.Message = Backbone.View.extend({
        template: _.template(' <i class="close icon"></i><div class="header"></div> <ul class="list"> <% _.each(data, function(d) { %> <li><%= d %></li> <% }); %> </ul>'),
        className: "ui message",
        render: function() {
            return this.$el.html(this.template({
                data: this.attributes.responseJSON
            })), this.attributes.status >= 400 && this.$el.addClass("warning"), 
            this.$el.find(".close").on("click", function() {
                $(this).closest(".message").transition("fade");
            }), this;
        },
        renderTo: function(a) {
            if (a) {
                var b = a.$el.find(".messages");
                b.length && this.render().$el.prependTo(b);
            }
        }
    }), app.Views.LoginModal = Backbone.View.extend({
        el: "#login-modal",
        events: {
            "submit .login_form": "login",
            "click a": "registration_modal"
        },
        registration_modal: function() {
            var a = new app.Views.RegistrationModal();
            a.$el.modal("show");
        },
        login: function(a) {
            if (a.preventDefault(), request.user.is_authenticated()) return !1;
            a.stopImmediatePropagation();
            var b = this, c = Urls["api:rest_login"]();
            $.post(c, this.$el.find(".login_form").serialize()).done(function(a, c, d) {
                request.user.login(a), b.$el.modal("hide"), b.trigger("login.success");
            }).fail(function(a, b, c) {
                formError(a.responseJSON, b);
            }).complete(function(a) {
                a.responseJSON.non_field_errors && message(a, b);
            });
        }
    }), app.Views.RegistrationModal = Backbone.View.extend({
        el: "#registration-modal",
        events: {
            "click .registration_form .submit": "registration",
            "click a": "login_modal"
        },
        login_modal: function() {
            var a = new app.Views.LoginModal();
            a.$el.modal("show");
        },
        registration: function() {
            var a = this, c = Urls["api:rest_register"]();
            $.post(c, this.$el.find(".registration_form").serialize(), function(b, c, d) {
                request.user.login(b), a.$el.find(".message").show().delay(function() {
                    a.$el.find(".message").hide().end().modal("hide");
                }, 1200);
            }).error(function(b, c, d) {
                formError(b.responseJSON, a);
            }).complete(function(a) {
                a.responseJSON.non_field_errors && message(a, b);
            });
        }
    }), app.Views.UserBanner = Backbone.View.extend({
        el: "#wrapper",
        template: _.template('<div class="container" id="user-banner"> <div class="card pf_header "> <div class="cover_wrap banner_transition"> </div> <div class="pf_shadow"> <div class="pf_photo"> <div class="photo_wrap"> <a href="javascript:void(0);" title="更换头像"><img width="100" height="100" src="<%= request.user.avatar %>" alt="<%= request.user.username %>" class="photo"></a> </div> </div> <div class="pf_username"> <h1 class="username"><%= request.user.username %></h1> <span class="icon_bed"><a><i class="W_icon icon_pf_male"></i></a></span><span class="icon_bed"><a><i class="W_icon icon_pf_male"></i></a></span> </div> <div class="pf_intro"> <p class="tlink"><span id="signature">一句话介绍一下自己吧，让别人更了解你</span><i class="write square icon"></i></p> </div> </div></div></div>'),
        remove: function() {
            $("#user-banner").remove();
        },
        render: function() {
            0 === $("#user-banner").length && this.$el.before(this.template(j));
        }
    }), app.Views.MobileNav = Backbone.View.extend({
        el: "#mobile-nav",
        template: _.template('<i id="mobile-nav-btn" class="mdi-navigation-menu"></i> <ul id="mobile-nav-menu" class="side-nav menu"> <% if (request.user.is_authenticated()){%> <li> <img class="avatar" src="<%= request.user.avatar %>" /> <div class="menu"> <div class="header"><%= request.user.username %></div> <!--<div class="ui divider"></div>--> <a href="#" class="item" id="avatar_update"> <i class="user icon"></i>Avatar</a> <a href="#" class="item" id="logout"><i class="sign out icon"></i>' + gettext("Sign Out") + '</a> </div> </li> <% }else{ %> <li> <a class="btn-flat modal-trigger" id="register" href="#">' + gettext("Sign Up") + '</a> </li> <li> <a class="btn-flat modal-trigger " id="login" href="#">' + gettext("Sign In") + "</a> </li> <% } %> </ul>"),
        events: {
            "click #mobile-nav-btn": "expand",
            "click #register": "register",
            "click #login": "login_modal",
            "click #logout": "logout",
            "click #avatar_update": "avatar",
            "touchstart #mobile-nav-menu": "collapse"
        },
        login_modal: function() {
            var a = new app.Views.LoginModal();
            a.$el.modal("show");
        },
        logout: app.Views.TopMenu.prototype.logout,
        avatar: app.Views.TopMenu.prototype.avatar,
        register: function() {
            var a = new app.Views.RegistrationModal();
            a.$el.modal("show");
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
            this.$el.html(this.template(j.user));
            var a = this, b = this.$el.find("#mobile-nav-menu");
            return $(window).width() <= 601 && require([ "hammerjs" ], function(a) {
                var c = new a(document.body, {
                    recognizers: [ [ a.Swipe, {
                        direction: a.DIRECTION_HORIZONTAL,
                        threshold: 20,
                        velocity: .75
                    } ] ]
                });
                c.on("swipeleft", function(a) {
                    console.log(a), b.css({
                        left: ""
                    });
                }), c.on("swiperight", function(a) {
                    b.css({
                        left: 0
                    }), console.log(a);
                });
            }), this.$el.find(".combo.dropdown").dropdown({
                action: "combo"
            }), $(document).on("auth.statusChange", function() {
                a.render();
            }), this;
        }
    }), app.Views.Logo = Backbone.View.extend({
        el: "#logo-container",
        events: {
            click: "home"
        },
        home: function(a) {
            a.preventDefault(), app.router.navigate("", {
                trigger: !0
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
            this._inited = !0, this.initVariables(), this.initGlobalElements();
        },
        reset: function(a, b) {
            data = app.get_query_args(), app.collection.fetch({
                reset: a || !1,
                data: data,
                error: $.proxy(app.posts_fetch_error, app)
            }), $(".modals").modal("hide all");
        }
    }), app.Router = Backbone.Router.extend({
        initialize: function(a) {
            console.log("router initialize"), this.history = [];
        },
        execute: function(a, b, c) {
            this.history.push(Backbone.history.fragment), a && a.apply(this, b);
        },
        previous: function() {
            var a = app.router.history.length, b = this.history.pop(), c = this.history.pop(), d = !1;
            this.history = [], this.history.push(b), "undefined" == typeof c && 1 === a && (d = !0), 
            this.navigate(c, {
                trigger: d
            }), this.history.push(c), console.log("prev:", c);
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
            if (app.inited()) return app.update_pager(), void app.reset(!0);
            app.collection = new app.Collections.Posts(j.initial_data.results), 
            app.init();
            var a = new app.Views.PostsView({
                collection: app.collection
            });
            app.msnry = new d(a.render().el, {
                itemSelector: ".brick",
                initLayout: !1
            }), c(a.el, function() {
                app.msnry.layout(), "mobile" != g.flavour && require([ "iscroll" ], function(a) {
                    $("#wrapper").height($(window).height() - $(".navbar-fixed").height()), 
                    app.myScroll = new a("#wrapper", {
                        scroller: "#wrapper>.container",
                        scrollY: !0,
                        probeType: 2,
                        mouseWheel: !0,
                        eventPassthrough: "horizontal"
                    }), app.myScroll.on("scrollEnd", window.onIScroll);
                });
            });
        },
        home: function() {
            if (delete app.pager.q, console.log(app.router.history), 
            app.inited()) return app.update_pager(), app.reset(!0), 
            void console.info("reset home");
            app.init(), app.collection = new app.Collections.Posts(j.initial_data.results);
            var a = new app.Views.PostsView({
                collection: app.collection
            });
            app.msnry = new d(a.render().el, {
                itemSelector: ".brick",
                columnWidth: ".brick",
                percentPosition: !0,
                horizontalOrder: !0,
                transitionDuration: 0,
                initLayout: !1
            }), c(a.el, function() {
                app.msnry.layout(), "mobile" != g.flavour && require([ "iscroll" ], function(a) {
                    $("#wrapper").height($(window).height() - $(".navbar-fixed").height()), 
                    app.myScroll = new a("#wrapper", {
                        scroller: "#wrapper>.container",
                        scrollY: !0,
                        probeType: 2,
                        mouseWheel: !0,
                        eventPassthrough: "horizontal"
                    }), app.myScroll.on("scrollEnd", window.onIScroll);
                });
            });
        },
        post_detail: function(a) {
            var b, d;
            try {
                b = app.collection.findWhere({
                    key: a
                }), console.info("exist:", b);
            } catch (c) {
                console.error(c), b = new app.Models.Post({
                    key: a
                });
            }
            d = new app.Views.PostDetailModal({
                model: b
            }), b.has("image_large_url") ? d.render().$el.modal("show") : ($(".global.dimmer").dimmer("show"), 
            b.fetch({
                success: function(a, b, e) {
                    c(d.render().el, function() {
                        d.$el.modal("show");
                    });
                }
            }).always(function(a, b, c) {
                $(".global.dimmer").dimmer("hide");
            }));
        },
        user_detail: function(a) {
            var b = new app.Views.UserBanner();
            if (b.render(), app.router.once("route", function(a, c) {
                console.log("route1:", a, c), "user_detail" !== a && b.remove();
            }), delete app.pager.q, console.log(app.router.history), 
            app.inited()) return app.update_pager(), app.reset(!0), 
            void console.info("reset home");
            app.init(), app.collection = new app.Collections.Posts(j.initial_data.results), 
            require([ "editable" ], function() {
                var a = {
                    trigger: $(".pf_intro .write"),
                    action: "click"
                };
                $("#signature").editable(a, function(a) {
                    $.ajax({
                        url: Urls["api:user_profile"](requestData.user.username),
                        method: "PUT",
                        data: {
                            username: requestData.user.username,
                            signature: a.value
                        }
                    }).done(function() {});
                });
            });
            var a = new app.Views.PostsView({
                collection: app.collection
            });
            app.msnry = new d(a.render().el, {
                itemSelector: ".brick",
                initLayout: !1,
                isAnimated: !1
            }), c(a.el, function() {
                app.msnry.layout(), "mobile" != g.flavour && require([ "iscroll" ], function(a) {
                    $("#wrapper").height($(window).height() - $(".navbar-fixed").height() - $("#user-banner").height()), 
                    app.myScroll = new a("#wrapper", {
                        scroller: "#wrapper>.container",
                        scrollY: !0,
                        probeType: 2,
                        mouseWheel: !0,
                        eventPassthrough: "horizontal"
                    }), app.myScroll.on("scrollEnd", window.onIScroll);
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
if (!HTMLCanvasElement.prototype.toBlob) {
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

});
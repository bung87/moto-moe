requirejs.config({
//    urlArgs: "bust=v2",
    paths: {
        "jquery": "jquery-2.1.3.min",
        // "underscore": "underscore-1.8.3/underscore.min",
        "backbone": "backbone.min",
        "masonry": "masonry-3.2.3/dist/masonry.pkgd.min",
        "imagesloaded": "imagesloaded-3.1.8/imagesloaded.pkgd.min",
        "materialize": "../materialize/js/materialize.min",
        'semantic':'../semantic/semantic.min',
        'hammerjs': 'hammer.js-2.0.4/hammer.min',
        'velocity':'velocity.min',
        'resumable':'resumable.min',
        'selectize':'../selectize.js-0.12.1/dist/js/standalone/selectize.min',
        'timeago':'../jquery-timeago-1.4.1/jquery.timeago.min',
        'snsshare':'../jquery.snsshare.js/js/SNShare.min',
        'jcolor':'jquery.color.min',
        'jcrop':'jquery.Jcrop.min',
        'iscroll':'myScroller.min',
        'waves':'waves.min',
        'jstz':'jstz.min',
        'lodash':'lodash.min'
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
        'underscore': {
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
        }

    }
});
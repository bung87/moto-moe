$(document).on('ready',function(){
    var fn=function(){
        
        happen.click(this);
        
    };
 $('.snsshare').each(function(i){
    var self=this;
    setTimeout(function(){fn.call(self)},1000*(i));
 
    });
});
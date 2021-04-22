(function($){$.fn.picture=function(args){var defaults={container:null,ignorePixelRatio:false};var settings=$.extend({},defaults,args);this.each(function(){var breakpoints=new Array();var windowWidth,currentMedia,element,timeoutOffset;var PixelRatio=1;if(!settings.ignorePixelRatio&&window.devicePixelRatio!==undefined)PixelRatio=window.devicePixelRatio;element=$(this);getCurrentMedia(true);timeoutOffset=false;$(window).resize(function(){if(timeoutOffset!==false)
clearTimeout(timeoutOffset);timeoutOffset=setTimeout(getCurrentMedia,200);});function getCurrentMedia(init){if(init){if(element.get(0).tagName.toLowerCase()=='figure'){var mediaObj=element.data();$.each(mediaObj,function(media){var num;num=media.replace(/[^\d.]/g,'');if(num)
breakpoints.push(num);});}else{element.find('source').each(function(){var media,num;media=$(this).attr('media');if(media){num=media.replace(/[^\d.]/g,'');breakpoints.push(num);}});}}
var c=0;if(settings.container==null){windowWidth=($(window).width())*PixelRatio;}else{windowWidth=($(settings.container).width())*PixelRatio;}
$.each(breakpoints,function(i,v){if(parseInt(windowWidth)>=parseInt(v)&&parseInt(c)<=parseInt(v))
c=v;});if(currentMedia!==c){currentMedia=c;if(element.get(0).tagName.toLowerCase()=='figure')
setFigure();else
setPicture();}}
function setPicture(){var sizes=new Object();element.find('source').each(function(){var media,path,num;media=$(this).attr('media');path=$(this).attr('src');if(media)
num=media.replace(/[^\d.]/g,'');else
num=0;sizes[num]=path;});if(element.find('img').length==0){var prep='<img src="'+sizes[currentMedia]+'" style="'+element.attr('style')+'" alt="'+element.attr('alt')+'">';if($('>a',element).length==0){element.append(prep);}else{$('>a',element).append(prep);}}else{element.find('img').attr('src',sizes[currentMedia]);}}
function setFigure(){var sizes=new Object();var mediaObj=element.data();$.each(mediaObj,function(media,path){var num;num=media.replace(/[^\d.]/g,'');if(!num)
num=0;sizes[num]=path;});if(element.find('img').length==0){var prep='<img src="'+sizes[currentMedia]+'" alt="'+element.attr('title')+'">';if($('>a',element).length==0){element.append(prep);}else{$('>a',element).append(prep);}}else{element.find('img').attr('src',sizes[currentMedia]);}}});};})(jQuery);
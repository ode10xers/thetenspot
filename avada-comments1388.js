jQuery(document).ready(function(){var t,e,n,a,i=jQuery(".comment-respond .comment-reply-title");if(i.length&&!i.parents(".fusion-comments-tb").length&&!i.parents(".fusion-woo-reviews-tb").length&&!i.parents(".woocommerce-tabs").length){for(t=avadaCommentVars.title_style_type.split(" "),e="",a=0;a<t.length;a++)e+=" sep-"+t[a];jQuery("body").hasClass("rtl")?i.addClass("title-heading-right"):i.addClass("title-heading-left"),n=' style="margin-top:'+avadaCommentVars.title_margin_top+";margin-bottom:"+avadaCommentVars.title_margin_bottom+';"',i.wrap('<div class="fusion-title title fusion-title-size-three'+e+'"'+n+"></div>"),-1===e.indexOf("underline")&&i.parent().append('<span class="awb-title-spacer"></span><div class="title-sep-container"><div class="title-sep'+e+' "></div></div>')}jQuery(".textarea-comment").each(function(){jQuery(this).css("max-width",jQuery("#content").width())}),jQuery(window).on("fusion-resize-horizontal",function(){jQuery(".textarea-comment").each(function(){jQuery(this).css("max-width",jQuery("#content").width())})})});
var RichPluginsOld=RichPluginsOld||{Instances:{TagsOld:{},SlidersOld:{}},Utils:{__:function(b,f){return f[b]||b},ajax:function(b,f){const g=new XMLHttpRequest;g.open("POST",b,!0);g.setRequestHeader("Content-Type","application/json");g.onreadystatechange=function(){g.readyState===XMLHttpRequest.DONE&&200===g.status&&f(JSON.parse(g.responseText))};g.send()},time:function(b,f){return f?b:WPacTime.getTimeAgo(1E3*parseInt(b),_rplg_lang())},trimtext:function(b,f,g){if(b&&f&&b.length>f){var h=b.substring(0,
f).indexOf(" ")+1;if(1>h||f-h>f/2)h=f;var l=f="";0<h&&(f=b.substring(0,h-1),l=b.substring(h-1,b.length));return f+(l?"<rp-s>... </rp-s><rp-h>"+l+"</rp-h><rp-readmore>"+this.__("read more",g)+"</rp-readmore>":"")}return b},opentext:function(){var b=this.previousSibling.previousSibling,f="RP-S"==b.tagName?!0:!1,g=document.createElement(f?"rp-h":"rp-s");g.innerHTML=b.innerHTML;b.replaceWith(g);b=this.previousSibling;f=document.createElement(f?"rp-s":"rp-h");f.innerHTML=b.innerHTML;b.replaceWith(f);RichPluginsOld.Utils.rm(this)},
anchor:function(b,f,g){let h=[];g.open_link&&h.push("noopener");g.nofollow_link&&h.push("nofollow");h=h.length?'rel="'+h.join(" ")+'"':"";return'<a href="'+b+'" '+(g.open_link?'target="_blank"':"")+" "+h+">"+f+"</a>"},media:function(b){var f=document.createElement("rp-media");for(let h=0;h<b.length;h++){var g=document.createElement("rp-thumb");g.setAttribute("onclick","_rplg_popup('"+b[h].googleUrl+"', 800, 600)");g.setAttribute("style","background-image:url("+b[h].thumbnailUrl+")");g.className="rplg-clickable";
f.appendChild(g)}return f},reply:function(b){var f=document.createElement("rp-reply");f.className="rplg-scroll";f.innerHTML="<rp-b>Response from the owner</rp-b>"+b;return f},rm:function(b){b&&b.parentNode.removeChild(b)},brsCompare:function(b,f){return parseInt(b.split(":")[0])>parseInt(f.split(":")[0])?1:-1},reviewsInit:function(b,f){b=b.querySelectorAll("rp-review");for(let g=0;g<b.length;g++)RichPluginsOld.Utils.reviewInit(b[g],f)},reviewInit:function(b,f){let g=b.querySelector("rp-review-time"),
h=b.querySelector("rp-review-text"),l=b.querySelector("rp-stars");b=b.querySelector("rp-logo");RichPluginsOld.Utils.starsInit(l);b.innerHTML=render_logo(b.getAttribute("data-provider"));g&&(g.innerHTML=RichPluginsOld.Utils.time(g.getAttribute("data-time"),f.time_format));h.innerHTML&&(h.innerHTML=RichPluginsOld.Utils.trimtext(h.innerHTML,f.text_size,f.trans),f=h.querySelector("rp-readmore"))&&(f.onclick=RichPluginsOld.Utils.opentext)},starsInit:function(b){let f=b.getAttribute("data-info").split(",");
b.innerHTML=render_stars(f[0],f[1],f[2])}},TagOld:function(b){const f=b.getAttribute("data-id"),g=JSON.parse(b.getAttribute("data-opts"));var h=RichPluginsOld.Instances.TagsOld[f];return h={init:function(){_rplg_add_svg();let l=b.querySelectorAll("rp-logo");var p=b.querySelector("rp-stars");let t=b.querySelector("rp-stars[data-reviewus]");p&&RichPluginsOld.Utils.starsInit(p);t&&(RichPluginsOld.Utils.starsInit(t),t.onclick=function(e){e="svg"==e.target.tagName?e.target:e.target.parentNode;e=[...e.parentNode.children].indexOf(e);
_rplg_popup(2<e?this.getAttribute("data-reviewus"):"https://app.richplugins.com/feedback?s="+e,800,600)});for(p=0;p<l.length;p++)l[p].innerHTML=render_logo(l[p].getAttribute("data-provider"));0<g.tag_popup&&setTimeout(function(){b.className+=" rplg-pop-up"},1E3*g.tag_popup);if("sidebar"==g.tag_click){let e=b.parentNode.querySelector("rp-sb");e.querySelector("rp-sbx").onclick=function(c){e.style.display="none"==e.style.display?"block":"none"};b.onclick=function(c){e.style.display="none"==e.style.display?
"block":"none";let q=e.querySelector("rp-sbci");""==q.innerHTML&&RichPluginsOld.Utils.ajax(brb_vars.ajaxurl+"?action=brb_embed&brb_collection_id="+f+"&brb_view_mode="+g.tag_sidebar,function(u){q.innerHTML=u.data;u=q.querySelector("rp-slider");u.setAttribute("data-exec",1);RichPluginsOld.Slider(u).init()})}}h.stylesInit();RichPluginsOld.Instances.TagsOld[f]=h;console.log("RichPluginsOld slider initialized")},stylesInit:function(){let l="",p=document.getElementById("rplg-style")||document.createElement("style");
p.id="rplg-style";g.tag_color&&(l+="r-p rp-tag-inner{background:"+g.tag_color+"!important}");g.tag_color_text&&(l+="r-p rp-tag rp-tag-text{color:"+g.tag_color_text+"!important}");g.tag_color_rating&&(l+="r-p rp-tag-inner rp-rating{color:"+g.tag_color_rating+"!important}");g.tag_size_logo&&(l+="r-p rp-tag rp-logo svg{width:"+g.tag_size_logo+"!important;height:"+g.tag_size_logo+"!important}");g.tag_size_star&&(l+="r-p rp-tag rp-stars svg{width:"+g.tag_size_star+"!important;height:"+g.tag_size_star+
"!important}");g.tag_size_rating&&(l+="r-p rp-tag rp-rating{font-size:"+g.tag_size_rating+"!important}");p.innerHTML=l;document.head.appendChild(p)}}},SliderOld:function(b){const f=b.getAttribute("data-id"),g=b.querySelector("rp-content"),h=b.querySelector("rp-reviews"),l=b.querySelector("rp-controls"),p=b.querySelector("rp-dots"),t=parseInt(b.getAttribute("data-count")),e=JSON.parse(b.getAttribute("data-opts"));var c=RichPluginsOld.Instances.SlidersOld[f],q=b.querySelectorAll("rp-review"),u="",z=
null,x=null,w=null,A=null,B=!1,y=!1,C=0,D=0;null!=c&&c.clear();return c={init:function(){c.isVisible(b)?(setTimeout(function(){c.resize();c.actions()},1),q.length&&c.swipeAutoStart()):setTimeout(c.init,300);RichPluginsOld.Instances.SlidersOld[f]=c;console.log("RichPluginsOld slider initialized")},isVisible:function(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)&&"hidden"!==window.getComputedStyle(a).visibility},resize:function(a){var d=b.offsetWidth,k=b.getAttribute("data-col");
var m=510>d?"xs":750>d?"x":1100>d?"s":1450>d?"m":1800>d?"l":"xl";b.className="rp-col-"+m;if(e.slider_breakpoints){var n=e.slider_breakpoints.split(",");n.sort(RichPluginsOld.Utils.brsCompare);for(var r=0;r<n.length;r++){var v=n[r].split(":");if(d<parseInt(v[0])){b.setAttribute("data-col",v[1]);break}}}!q.length||u==m&&k==b.getAttribute("data-col")||setTimeout(function(){h.scrollLeft!=a*c.reviewWidth()&&(h.scrollLeft=a*c.reviewWidth());c.dotsInit();c.setActiveDot();u=m},200);l&&(l.style.top=parseInt(c.reviewHeight()/
2)+"px")},actions:function(){_rplg_add_svg();c.stylesInit();c.headerInit();RichPluginsOld.Utils.reviewsInit(b,e);e.mousestop&&c.addMouseEvents();window.addEventListener("resize",c.resizeListener);h&&(h.addEventListener("scroll",c.scrollListener,!1),e.wheelscroll&&g.addEventListener("wheel",c.wheelListener,!1));var a=b.querySelector("rp-btn-prev");a&&(a.onclick=function(){c.btnClick(-1)});if(a=b.querySelector("rp-btn-next"))a.onclick=function(){c.btnClick(1)}},resizeListener:function(){var a=D;clearTimeout(z);
z=setTimeout(c.resize,150,a)},scrollListener:function(){clearTimeout(x);clearTimeout(w);w=setTimeout(c.scrollEnd,150);c.setActiveDot()},wheelListener:function(a){var d=a.target;if((d="RP-REVIEW-TEXT"==d.tagName?d:"RP-REVIEW-TEXT"==d.parentNode.tagName?d.parentNode:null)&&d.scrollHeight>d.clientHeight)return!0;a.preventDefault();C++;clearTimeout(A);A=setTimeout(c.wheelEnd,150,a)},stylesInit:function(){let a="",d=document.getElementById("rplg-style")||document.createElement("style");d.id="rplg-style";
e.color_review&&(a+="r-p rp-review rp-review-inner{background:"+e.color_review+"!important}");e.color_border&&(a+="r-p rp-review rp-review-inner{box-shadow:none!important;border:1px solid "+e.color_border+"!important}");e.color_text&&(a+="r-p rp-review rp-review-inner{color:"+e.color_text+"!important}");e.slider_space_between&&(a+="r-p rp-review rp-review-inner{margin:0 "+e.slider_space_between+"!important}");e.slider_review_height&&(a+="r-p [data-rs] rp-review rp-body{height:"+e.slider_review_height+
"!important}");e.color_scale&&(a+="r-p rp-header rp-scale{color:"+e.color_scale+"!important}");e.color_based&&(a+="r-p rp-header rp-based{color:"+e.color_based+"!important}");e.color_name&&(a+="r-p rp-review rp-review-name,r-p rp-review rp-review-name a{color:"+e.color_name+"!important}");e.color_time&&(a+="r-p rp-review rp-review-time{color:"+e.color_time+"!important}");e.color_stars&&(a+="r-p rp-header rp-rating{color:"+e.color_stars+"!important}");e.color_btn&&(a+="r-p rp-header rp-review_us,r-p rp-header rp-review_us:hover,r-p rp-header rp-review_us:active{background:"+
e.color_btn+"!important}");e.color_prev_next&&(a+="r-p rp-slider rp-btn-prev svg path,r-p rp-slider rp-btn-next svg path{fill:"+e.color_prev_next+"}");e.color_dot&&(a+="r-p rp-dot.active {background:"+e.color_dot+"}");d.innerHTML=a;document.head.appendChild(d)},headerInit:function(){var a=b.querySelector("rp-header rp-stars");let d=b.querySelectorAll("rp-header rp-logo");a&&RichPluginsOld.Utils.starsInit(a);for(a=0;a<d.length;a++)d[a].innerHTML=render_logo(d[a].getAttribute("data-provider"))},addMouseEvents:function(){b.addEventListener("mouseover",
c.mouseOver,!1);b.addEventListener("mouseleave",c.mouseLeave,!1)},delMouseEvents:function(){b.removeEventListener("mouseover",c.mouseOver);b.removeEventListener("mouseleave",c.mouseLeave)},mouseOver:function(){B=1;c.swipeAutoStop()},mouseLeave:function(){B=0;c.swipeAutoStart()},btnClick:function(a){c.swipeHand(a*c.swipePerBtn())},wheelEnd:function(a){c.swipeHand(Math.sign(a.wheelDelta)*C*c.swipeStep());C=0},swipeHand:function(a){y=!0;c.loadNextReviews();c.scroll(a);e.clickstop&&(c.swipeAutoStop(),
c.delMouseEvents())},scroll:function(a){h.scrollBy(c.reviewWidth()*a,0)},scrollEnd:function(){D=c.reviewsBack();y?y=!1:c.loadNextReviews();(!e.mousestop||B)&&e.mousestop||(!e.clickstop||y)&&e.clickstop||c.swipeAutoStart()},loadNextReviews:function(){let a=parseInt(b.getAttribute("data-offset"));var d=b.querySelector("rp-dot.active");d=d?parseInt(d.getAttribute("data-index"))*c.swipePerDot():c.reviewsBack();d=c.getAjaxSize(d);if(0<d){let k=[];c.preloadReviews(k,a,d);c.loadAjaxReviews(k,a,d)}},getAjaxSize:function(a){let d=
0;const k=parseInt(b.getAttribute("data-offset")),m=parseInt(e.pagination);if(t>k){let n=a-k;Math.abs(n)<3*c.swipePerDot()?d=m:n&&(d=Math.ceil(a/m)*m-k)}a=k+d-t;return 0<a?d-a:d},preloadReviews:function(a,d,k){var m=q.length-1;b.setAttribute("data-offset",d+k);for(d=0;d<k;d++){let n=q[Math.round(Math.random()*m)].cloneNode(!0);n.style="filter: blur(4px);";h.appendChild(n);a.push(n)}q=b.querySelectorAll("rp-review")},loadAjaxReviews:function(a,d,k){RichPluginsOld.Utils.ajax(brb_vars.ajaxurl+"?action=brb_get_reviews&id="+
f+"&offset="+d+"&size="+k,function(m){let n=m.reviews.length;for(var r=0;r<n;r++){let v=a.shift();RichPluginsOld.Utils.reviewInit(c.convertReviewEl(v,m.reviews[r]),e)}for(;a.length;)m=a.shift(),RichPluginsOld.Utils.rm(m);d+k!=d+n&&b.setAttribute("data-offset",d+n)})},convertReviewEl:function(a,d){let k=a.querySelector("rp-body"),m=a.querySelector("img"),n=a.querySelector("rp-review-name"),r=a.querySelector("rp-review-time"),v=a.querySelector("rp-stars"),E=a.querySelector("rp-review-text"),F=a.querySelector("rp-media"),
G=a.querySelector("rp-reply"),H=a.querySelector("rp-logo");a.style="";m&&(m.src=d.author_avatar,m.alt=d.author_name);n&&(n.outerHTML=c.reviewName(d));r&&r.setAttribute("data-time",d.time);RichPluginsOld.Utils.rm(F);d.media&&k.appendChild(RichPluginsOld.Utils.media(d.media));RichPluginsOld.Utils.rm(G);d.reply&&k.appendChild(RichPluginsOld.Utils.reply(d.reply));E.innerHTML=d.text;H.setAttribute("data-provider",d.provider);v.setAttribute("data-info",[d.rating,d.provider,e.color_stars].join());return a},
dotsInit:function(){if(p){var a=Math.round(t/c.swipePerDot());p.innerHTML="";for(let d=1;d<=a;d++){let k=document.createElement("rp-dot");k.setAttribute("data-index",d);k.setAttribute("title",d);k.onclick=c.dotClick;p.appendChild(k)}a=p.getBoundingClientRect().height;b.style.paddingBottom=a+"px"}},dotClick:function(){let a=parseInt(this.getAttribute("data-index")),d=b.querySelector("rp-dot.active"),k=parseInt(d.getAttribute("data-index")),m=Math.abs(a-k);d.className="";this.className="active";c.swipeHand(m*
c.swipePerDot()*Math.sign(a-k))},setActiveDot:function(){var a=Math.round(c.reviewsBack()/c.swipePerDot())+1;a=b.querySelector('rp-dot[data-index="'+a+'"]');let d=b.querySelector("rp-dot.active");d&&(d.className="");a&&(a.className="active")},swipeAuto:function(){if(c.isScrollEnd())c.scroll(-(t-c.reviewsPerView()));else{let a=c.swipeStep()<c.reviewsAhead()?c.swipeStep():c.reviewsAhead();c.scroll(a)}c.swipeAutoStart()},swipeAutoStart:function(){e.autoplay&&(x=setTimeout(c.swipeAuto,1E3*parseInt(e.speed)))},
swipeAutoStop:function(){clearTimeout(x);w&&setTimeout(function(){clearTimeout(w)},100)},isScrollEnd:function(){var a=h.querySelector("rp-review:last-child"),d=a.getBoundingClientRect();a=a.parentNode.getBoundingClientRect();return(2>Math.abs(a.left-d.left)||a.left<=d.left)&&d.left<a.right&&(2>Math.abs(a.right-d.right)||a.right>=d.right)&&d.right>a.left},swipeStep:function(){return e.swipe_step||c.reviewsPerView()},swipePerBtn:function(){return e.swipe_per_btn||c.reviewsPerView()},swipePerDot:function(){return e.swipe_per_dot||
c.reviewsPerView()},reviewWidth:function(){return q[0].offsetWidth},reviewHeight:function(){return q[0].offsetHeight},reviewsPerView:function(){return Math.round(h.offsetWidth/c.reviewWidth())},reviewsBack:function(){return Math.round(h.scrollLeft/c.reviewWidth())},reviewsAhead:function(){return q.length-(c.reviewsBack()+c.reviewsPerView())},reviewName:function(a){return'<rp-review-name title="'+a.author_name+'">'+(a.author_url?RichPluginsOld.Utils.anchor(a.author_url,a.author_name,e):a.author_name)+
"</rp-review-name>"},clear:function(){clearTimeout(z);clearTimeout(x);clearTimeout(w);clearTimeout(A);window.removeEventListener("resize",c.resizeListener);h.removeEventListener("scroll",c.scrollListener);g.removeEventListener("wheel",c.wheelListener)}}}};document.addEventListener("DOMContentLoaded",function(){const b=document.querySelectorAll('rp-slider[data-exec=""]');for(var f=0;f<b.length;f++)RichPluginsOld.SliderOld(b[f]).init(),b[f].setAttribute("data-exec","1")});

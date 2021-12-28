
// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

$(document).ready(function() {
  console.log("hello")

  $('.animoji').on('onclick', function() {
      $(this).html('<img src="images/animoji hover.png" height=220px>');
    });

});

//smooth anchor link

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


/****************************
* JavaScript Bubble Cursor  *
*(c)2010-13 mf2fm web-design*
*  http://www.mf2fm.com/rv  *
* DON'T EDIT BELOW THIS BOX *
****************************/

// <![CDATA[
var colours=new Array("#a6f", "#60f", "#60f", "#a6f", "#ccc"); // colours for top, right, bottom and left borders and background of bubbles
var bubbles=26; // maximum number of bubbles on screen
var over_or_under="over"; // set to "over" for bubbles to always be on top, or "under" to allow them to float behind other objects

var x=ox=400;
var y=oy=300;
var swide=800;
var shigh=600;
var sleft=sdown=0;
var bubb=new Array();
var bubbx=new Array();
var bubby=new Array();
var bubbs=new Array();
var sploosh=false;

function addLoadEvent(funky) {
  var oldonload=window.onload;
  if (typeof(oldonload)!='function') window.onload=funky;
  else window.onload=function() {
    if (oldonload) oldonload();
    funky();
  }
}

addLoadEvent(buble);

function buble() { if (document.getElementById) {
  var i, rats, div;
  for (i=0; i<bubbles; i++) {
    rats=createDiv("3px", "3px");
    rats.style.visibility="hidden";
  rats.style.zIndex=(over_or_under=="over")?"1001":"0";

    div=createDiv("auto", "auto");
    rats.appendChild(div);
    div=div.style;
    div.top="1px";
    div.left="0px";
    div.bottom="1px";
    div.right="0px";
    div.borderLeft="1px solid "+colours[3];
    div.borderRight="1px solid "+colours[1];

    div=createDiv("auto", "auto");
    rats.appendChild(div);
    div=div.style;
    div.top="0px";
    div.left="1px";
    div.right="1px";
    div.bottom="0px"
    div.borderTop="1px solid "+colours[0];
    div.borderBottom="1px solid "+colours[2];

    div=createDiv("auto", "auto");
    rats.appendChild(div);
    div=div.style;
    div.left="1px";
    div.right="1px";
    div.bottom="1px";
    div.top="1px";
    div.backgroundColor=colours[4];
    if (navigator.appName=="Microsoft Internet Explorer") div.filter="alpha(opacity=50)";
    else div.opacity=0.5;
    document.body.appendChild(rats);
    bubb[i]=rats.style;
  }
  set_scroll();
  set_width();
  bubble();
}}

function bubble() {
  var c;
  if (Math.abs(x-ox)>1 || Math.abs(y-oy)>1) {
    ox=x;
    oy=y;
    for (c=0; c<bubbles; c++) if (!bubby[c]) {
      bubb[c].left=(bubbx[c]=x)+"px";
      bubb[c].top=(bubby[c]=y-3)+"px";
      bubb[c].width="3px";
      bubb[c].height="3px"
      bubb[c].visibility="visible";
      bubbs[c]=3;
      break;
    }
  }
  for (c=0; c<bubbles; c++) if (bubby[c]) update_bubb(c);
  setTimeout("bubble()", 40);
}

document.onmousedown=splash;
document.onmouseup=function(){clearTimeout(sploosh);};

function splash() {
  ox=-1;
  oy=-1;
  sploosh=setTimeout('splash()', 100);
}

function update_bubb(i) {
  if (bubby[i]) {
    bubby[i]-=bubbs[i]/2+i%2;
    bubbx[i]+=(i%5-2)/5;
    if (bubby[i]>sdown && bubbx[i]>sleft && bubbx[i]<sleft+swide+bubbs[i]) {
    if (Math.random()<bubbs[i]/shigh*2 && bubbs[i]++<8) {
    bubb[i].width=bubbs[i]+"px";
    bubb[i].height=bubbs[i]+"px";
    }
      bubb[i].top=bubby[i]+"px";
      bubb[i].left=bubbx[i]+"px";
    }
    else {
      bubb[i].visibility="hidden";
      bubby[i]=0;
      return;
    }
  }
}

document.onmousemove=mouse;
function mouse(e) {
  if (e) {
    y=e.pageY;
    x=e.pageX;
  }
  else {
    set_scroll();
    y=event.y+sdown;
    x=event.x+sleft;
  }
}

window.onresize=set_width;
function set_width() {
  var sw_min=999999;
  var sh_min=999999;
  if (document.documentElement && document.documentElement.clientWidth) {
    if (document.documentElement.clientWidth>0) sw_min=document.documentElement.clientWidth;
    if (document.documentElement.clientHeight>0) sh_min=document.documentElement.clientHeight;
  }
  if (typeof(self.innerWidth)=='number' && self.innerWidth) {
    if (self.innerWidth>0 && self.innerWidth<sw_min) sw_min=self.innerWidth;
    if (self.innerHeight>0 && self.innerHeight<sh_min) sh_min=self.innerHeight;
  }
  if (document.body.clientWidth) {
    if (document.body.clientWidth>0 && document.body.clientWidth<sw_min) sw_min=document.body.clientWidth;
    if (document.body.clientHeight>0 && document.body.clientHeight<sh_min) sh_min=document.body.clientHeight;
  }
  if (sw_min==999999 || sh_min==999999) {
    sw_min=800;
    sh_min=600;
  }
  swide=sw_min;
  shigh=sh_min;
}

window.onscroll=set_scroll;
function set_scroll() {
  if (typeof(self.pageYOffset)=='number') {
    sdown=self.pageYOffset;
    sleft=self.pageXOffset;
  }
  else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
    sdown=document.body.scrollTop;
    sleft=document.body.scrollLeft;
  }
  else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
    sleft=document.documentElement.scrollLeft;
    sdown=document.documentElement.scrollTop;
  }
  else {
    sdown=0;
    sleft=0;
  }
}

function createDiv(height, width) {
  var div=document.createElement("div");
  div.style.position="absolute";
  div.style.height=height;
  div.style.width=width;
  div.style.overflow="hidden";
  div.style.backgroundColor="transparent";
  return (div);
}
// ]]>

// <![CDATA[
var news=Array("🦋 product designer/ux engineer", "💡 first-gen student at barnard", "📍 located in nyc");
var cursor="_"; // set cursor
var delay=7; // seconds between each news item

/***************************\
* News Ticker Text Effect   *
*(c)2004-14 mf2fm web-design*
*  http://www.mf2fm.com/rv  *
* DON'T EDIT BELOW THIS BOX *
\***************************/
var newsp, cursp, flash, item=0;

if (typeof('addRVLoadEvent')!='function') function addRVLoadEvent(funky) {
  var oldonload=window.onload;
  if (typeof(oldonload)!='function') window.onload=funky;
  else window.onload=function() {
    if (oldonload) oldonload();
    funky();
  }
}

addRVLoadEvent(teleprint);

function teleprint () { if (document.getElementById) {
  var span=document.getElementById("news");
  while (span.childNodes.length) span.removeChild(span.childNodes[0]);
  delay*=1000;
  newsp=document.createElement("span");
  cursp=document.createElement("span");
  cursp.appendChild(document.createTextNode(String.fromCharCode(160)+cursor));
  span.appendChild(newsp);
  span.appendChild(cursp);
  ticker();
}}

function ticker() {
  var i;
  while (newsp.childNodes.length) newsp.removeChild(newsp.childNodes[0]);
  newsp.appendChild(document.createTextNode(news[item].substring(0,1)));
  for (i=1; i<news[item].length; i++) setTimeout('newsp.firstChild.nodeValue="'+news[item].substring(0, i+1)+'"', 100*i);
  if (news[item].indexOf("www")!=-1) setTimeout('linkit('+item+')', 100*i);
  setTimeout('flash=setInterval("cursp.style.visibility=(cursp.style.visibility==\'visible\')?\'hidden\':\'visible\'", 234)', 100*i)
  setTimeout('clearInterval(flash)', delay);
  setTimeout('cursp.style.visibility="visible"', delay);
  setTimeout('ticker()', delay);
  item=++item%news.length;
}

function linkit(q) {
  var a,p,e,l;
  p=news[q].indexOf("www");
  e=news[q].indexOf(" ", p);
  if (e==-1) e=news[q].length;
  l=news[q].substring(p, e);
  while (newsp.childNodes.length) newsp.removeChild(newsp.childNodes[0]);
  newsp.appendChild(document.createTextNode(news[q].substring(0, p)));
  a=document.createElement("a");
  a.href="http://"+l;
  a.appendChild(document.createTextNode(l));
  newsp.appendChild(a);
  newsp.appendChild(document.createTextNode(news[q].substring(e)));
}
// ]]>


// SCROLLING UNDERLINE 

(function (document) {
  const markers = [...document.querySelectorAll('mark')];
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.8
  });
  
  markers.forEach(mark => {
    observer.observe(mark);
  });
})(document);


$(document).ready(function () {
    var i, ilen;
    v_center = function (el,wrt_el) {
        var ph, eh;
        wrt_el = wrt_el || el.offsetParent();
        ph = wrt_el.height();
        eh = el.height();
        el.css({top: (ph - eh) / 2});
    };

    h_center = function (el,wrt_el) {
        var ph, eh;
        wrt_el = wrt_el || el.offsetParent();
        ph = wrt_el.width();
        eh = el.width();
        el.css({left: (ph - eh) / 2});
    };
    
    
    //Generate Background Divs
    divs={}
    $('body').append(divs.divContainer = $('<div>', {id: 'divContainer'}));
    divs.divContainer.append(divs.planet = $('<div>', {id: 'planet_tr'}));
    divs.divContainer.append(divs.exoplanetsText = $('<div>', {id: 'exoplanetsFlareText'}));
    
    divs.divContainer.append(divs.containerTop = $('<div>', {id: 'containerTop'}))
    divs.containerTop.append(divs.containerTL = $('<div>', {id: 'containerTL'}))
    divs.containerTop.append(divs.containerTM = $('<div>', {id: 'containerTM'}))
    divs.containerTop.append(divs.containerTR = $('<div>', {id: 'containerTR'}))        
    divs.divContainer.append(divs.containerMiddle = $('<div>', {id: 'containerMiddle'}))
    divs.containerMiddle.append(divs.containerTL = $('<div>', {id: 'containerML'}))
    divs.containerMiddle.append(divs.containerTM = $('<div>', {id: 'containerMM'}))
    divs.containerMiddle.append(divs.containerTR = $('<div>', {id: 'containerMR'}))
    divs.divContainer.append(divs.containerBottom = $('<div>', {id: 'containerBottom'}))
    divs.containerBottom.append(divs.containerTL = $('<div>', {id: 'containerBL'}))
    divs.containerBottom.append(divs.containerTM = $('<div>', {id: 'containerBM'}))
    divs.containerBottom.append(divs.containerTR = $('<div>', {id: 'containerBR'}))

    //Insert logos
    divs.containerBottom.append(divs.logoContainer = $('<div>', {id: 'logoContainer'}));
    var logoNames=['ucb', 'cips', 'penn', 'cehw', 'nsf', 'nasa'];
    var logoLinks=['http://www.berkeley.edu/', 'http://cips.berkeley.edu/', 'http://www.psu.edu/', 'http://exoplanets.astro.psu.edu/', 'http://www.nsf.gov/', 'http://www.nasa.gov/'];
    var logoDivs = [];
    var temp;
    for (i = 0, ilen = logoNames.length ; i < ilen ; i += 1) {
        divs.logoContainer.append(temp = $('<div>', {'class': 'logo ' + logoNames[i]}));
        temp.wrap($('<a>', {href: logoLinks[i]}));
        logoDivs.push(temp);
    }

    //IE Detector
    if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
        divs.divContainer.append(IEtest = $('<div>',{id: 'IE'}).html('You appear to be using Internet Explorer. The Exoplanet Data Explorer is not compatible with Internet Explorer. Please use an <a href="./exotable/exoTable.html">alternative browser</a>.'))
        IEtest.hide();
        IEtest.fadeIn(2000);
    }

    //Generate menu
    var menu = $('div#menu').children();
    divs.exoplanetsText.wrap('$<a>',{href: $(menu[0]).attr('linkto')});
    menu.each(function(i, el) {
        el = $(el);
        el.wrap($('<a>',{href: el.attr('linkto')}));
        el.html('<div class="menuItemContents">'+el.html()+'</div>')
        el.addClass('menuItem');
        if (i==0) {
            el.addClass('TL');
        } else if (i==menu.length-1) {
            el.addClass('B');                
        }
        if (el.attr('iscurrent')=='true') {
            el.addClass('current');
        }
        el.css({top: i*81})
        if (i<menu.length-1) {
            var sep=$('<div>',{'class': 'separator'})
            el.after(sep);
            sep.css({top: i*81+80})
        }
        v_center($(el.children()[0]));
    })

    //Process any rounded corner elements
    $('div.roundedContainer').each(function(i, el) {
        var rcc, rc;
        el = $(el);
        rcc = el.wrap($('<div>', {'class': 'rc_contents'})).parent();
        rc = rcc.wrap($('<div>', {'class': 'rc_container'})).parent();
        if (el.attr('rcclass')) {
            rc.addClass(el.attr('rcclass'));
        }
        rc.css({
            width: Math.max(parseInt(el.attr('width'), 10),100),
            height: Math.max(parseInt(el.attr('height'), 10),100)
        });
        rc.append(rc_top=$('<div>',{'class':'rc_top'}));
        rc_top.append($('<div>',{'class':'rc_tl'}));
        rc_top.append($('<div>',{'class':'rc_tm'}));
        rc_top.append($('<div>',{'class':'rc_tr'}));
        rc.append(rc_mid=$('<div>',{'class':'rc_mid'}));
        rc_mid.append($('<div>',{'class':'rc_ml'}));
        rc_mid.append($('<div>',{'class':'rc_mm'}));
        rc_mid.append($('<div>',{'class':'rc_mr'}));
        rc.append(rc_bottom=$('<div>',{'class':'rc_bottom'}));
        rc_bottom.append($('<div>',{'class':'rc_bl'}));
        rc_bottom.append($('<div>',{'class':'rc_bm'}));
        rc_bottom.append($('<div>',{'class':'rc_br'}));
        v_center(rcc);
        h_center(rcc);
        if (el.attr('linkto')) {
            rc.wrap($('<a>',{href:el.attr('linkto'),'class':'hiddenAnchor'}));
        }
    })

    resize = function (e) {
        var i, ilen;
        var w=divs.divContainer.width();
        var margin=Math.min((w-930)/2.,100);
        divs.exoplanetsText.css({left:margin-28});
        var widthStyle={left:margin,right:margin};
        divs.containerTop.css(widthStyle);
        divs.containerMiddle.css(widthStyle);
        divs.containerBottom.css(widthStyle);
        $('div#content').css({
            left: margin+280,
            width: w-margin-margin-30-280
        })
        $('div#menu').css({
            left: margin+15,
        })
        var h=Math.max($(window).height(),800);
        divs.divContainer.css({height:Math.max(115+$('div#content').height()+195,h)});
        //Logos
        h_center(divs.logoContainer);
        var lw=0;
        for (i = 0, ilen = logoDivs.length ; i < ilen ; i += 1) {
            v_center(logoDivs[i]);
            lw += logoDivs[i].width();
        }
        var pad=(divs.logoContainer.width()-lw)/(logoDivs.length+1);
        var x=pad;
        for (i = 0, ilen = logoDivs.length ; i < ilen ; i += 1) {
            logoDivs[i].css({left: x});
            x+=pad+logoDivs[i].width();
        }
        var el;
        $('.vcenter').each(function(i, el) {
            v_center($(el));
        })
        $('.hcenter').each(function(i, el) {
            h_center($(el));
        })
    };
    $(window).bind('resize', resize);
    resize();
    setTimeout(resize, 1);
    setTimeout(resize, 1000);
    setTimeout(resize, 10000);
    var _gaq = _gaq || [];
    //_gaq.push(['_setAccount', 'UA-9825700-3']);
    _gaq.push(['_setAccount', 'UA-9825700-1']);
    _gaq.push(['_trackPageview']);

    (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
    })();    
})


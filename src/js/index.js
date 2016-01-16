/**
 * Created by hc on 2016/1/13.
 */
 (function (j) {
    j.fn.extend({
        accordion: function () {
            return this.each(function () {
                function b(c, b) {
                    $(c).parent(d).siblings().removeClass(e).children(f).slideUp(g);
                    $(c).siblings(f)[b || h](b == "show" ? g : !1, function () {
                        $(c).siblings(f).is(":visible") ? $(c).parents(d).not(a.parents()).addClass(e) : $(c).parent(d).removeClass(e);
                        b == "show" && $(c).parents(d).not(a.parents()).addClass(e);
                        $(c).parents().show();
                    });
                }
                var a = $(this),
                    e = "current",
                    h = "slideToggle",
                    f = "ul, div",
                    g = "slow",
                    d = "li";
                if (a.data("accordiated")) return !1;
                $.each(a.find("ul, li>div"),function () {
                        $(this).data("accordiated", !0);
                        $(this).hide();
                    });
                $.each(a.find("a"), function () {
                    $(this).click(function () {
                        b(this, h);
                    });
                    $(this).bind("activate-node", function () {
                        a.find(f).not($(this).parents()).not($(this).siblings()).slideUp(g);
                        b(this, "slideDown");

                    });
                });
                var i = location.hash ? a.find("a[href=" + location.hash + "]")[0] : a.find("li.current a")[0];
                i && b(i, !1);
            });
        }
    });
})(jQuery);
$(function () {
    console.log('qweqweqwe');
    /* nav click
    * ------------*/
    $('ul.nav-list').accordion();
    $('ul.nav-list li a').on('click', function (e) {
        e.preventDefault();
        $('ul.nav-list li ').removeClass('active');
        $(this).parent().addClass('active');
        $(this).parents('.submenu').addClass('current').find('ul').css('display','block');

        var hasSub = $(this).parent().hasClass('submenu'),
            tabName = $(this).attr('title'),
            tabId = $(this).attr('href');
            hasTab = $('#tab-list').find('a[href="'+tabId+'"]').length;
        if ( !hasSub && !hasTab ) {
            tab.create(tabId,tabName);
            $('#tab-list li').children('a[href="'+tabId+'"]').tab('show');        
        } else if ( hasTab ) {
            $('#tab-list li').children('a[href="'+tabId+'"]').tab('show');
        }
    });
    
    $('#tab-list').on('click','.tab-del-btn',function(e){
        e.stopPropagation();
        var parentLi = $(this).parents('li'),
            parentA = $(this).parent(),
            hrefId = parentA.attr('href');
        if (parentLi.hasClass('active')) {
            var siblingA = parentLi.prev('li').find('a');
            siblingA.tab('show');
            $('ul.nav-list li a[href="'+siblingA.attr('href')+'"]').click();
        }
        parentLi.remove();
        $(hrefId).remove();
    });

    var count = true;
    var tab = {
        create: function(c,n){
            this.createNav($('#tab-list'),c,n);
            this.createContent($('#tab-content'),c);
            $('#tab-list a[href="#test"]').tab('show');
        },
        createNav: function(selector,c,n){
            selector.append('<li role="presentation"><a href="'+c+'" aria-controls="'+c.slice(1)+'" role="tab" data-toggle="tab">'+n+' <i class="glyphicon glyphicon-remove tab-del-btn"></i></a></li>');
        },  
        createContent: function(selector,c){
            selector.append('<div role="tabpanel" class="tab-pane" id="'+c.slice(1)+'"></div>');
            if (count) {
                $(c).load('/src/page/test.html');
                count = false;
            } else {
                // $(c).load('/src/page/test.html #table-w');
                $(c).load('/src/page/index-form.html');
                count = true;
            }
            
        }
    }
});
/**
 * Created by hc on 2016/1/13.
 */
 (function (j) {
    j.fn.extend({
        accordion: function () {
            return this.each(function () {
                function b(c, b) {
                    $(c).parent(d).siblings().removeClass(e).children(f).slideUp(g);
                    //$(c).parent(d).siblings().removeClass(e).find('.fa-chevron-right').addClass('fa-chevron-down');
                   // $(c).parent(d).find('.fa-chevron-right').addClass('fa-chevron-down');
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
                        //$(this).find(' .fa-chevron-right').removeClass('fa-chevron-down');
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

        tab.create('test');        
    });
    
    $('#deltest').on('click',function(){
        $('#tab-list li').find('a[href="#test"]').remove();
        $('#test').remove();
    });

    var tab = {
        create: function(c){
            this.createNav($('#tab-list'),c);
            this.createContent($('#tab-content'),c);
        },
        createNav: function(selector,c){
            selector.append('<li role="presentation"><a href="#'+c+'" aria-controls="'+c+'" role="tab" data-toggle="tab">'+c+'</a></li>');
        },  
        createContent: function(selector,c){
            // <div role="tabpanel" class="tab-pane" id="messages">contact</div>
            var srcUrl = '/src/js/test.js';
            selector.append('<div role="tabpanel" class="tab-pane" id="'+c+'">'+c+'</div>').parent().click();
            $('#'+c).load('/src/page/test.html');
        }
    }
});
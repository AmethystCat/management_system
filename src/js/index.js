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
    /* nav click
    * ------------*/
    $('ul.nav-list').accordion();
    $('ul.nav-list').on('click','li a', function (e) {
        e.preventDefault();
        $('ul.nav-list li ').removeClass('active');
        $(this).parent().addClass('active');
        $(this).parents('.submenu').addClass('current').find('ul').css('display','block');
    });

    /* logout
    * ------------*/
    $('#logout').on('click', function (e) {
        e.preventDefault();
        H.server.logout({}, function (res) {
            if (res.code == 0) {
                window.location.href = '/common/login';
            } else {
                H.Modal(res.message);
            }
        });
    });
});
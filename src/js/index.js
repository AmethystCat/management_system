/**
 * Created by john on 2016/1/13.
 */
$(function () {
    console.log('qweqweqwe');
    /* nav click
    * ------------*/
    $('ul.nav-list').on('click','li',function(){
        if ( $(this).hasClass('submenu') &&  ) {
            $(this).children('ul').show();
        } else {
            $(this).siblings('li').find('ul').hide();
        }
        $(this).addClass('active').parents('li').removeClass('active');
        //console.log('qweqweqwe');
        $(this).siblings('li').removeClass('active');
    })
});
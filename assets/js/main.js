(function ($) {
    "use strict";
    
    $(document).ready(function ($) {
        /*=========== Hamburger Button JS
      =============================================================================*/
        $('.header__toggler').on("click", function () {
            var target_menu = $(this).data("target");
            if ($(this).hasClass("is-open")) {
                $(this).removeClass('is-open');
                $(target_menu).slideUp(400);
              } else{
                $(this).addClass('is-open');
                $(target_menu).slideDown(400);
              }
        });

        
        // $(window).scroll(function(){
            // Hide header on scroll down
            // if ($(window).scrollTop() >= 80) {
            //     $('#header-sticky').addClass('sticky-menu');
            //     // $('nav div').addClass('visible-title');
            // }
            // else {
            //     $('#header-sticky').removeClass('sticky-menu');
            //     // $('nav div').removeClass('visible-title');
            // }
        });

    // });

    // // Hide header on scroll down
    
        var doc = document.documentElement;
        var w   = window;

        /*
        define four variables: curScroll, prevScroll, curDirection, prevDirection
        */

        var curScroll;
        var prevScroll = w.scrollY || doc.scrollTop;
        var curDirection = 0;
        var prevDirection = 0;

        /*
        how it works:
        -------------
        create a scroll event listener
        create function to check scroll position on each scroll event,
        compare curScroll and prevScroll values to find the scroll direction
        scroll up - 1, scroll down - 2, initial - 0
        then set the direction value to curDirection
        compare curDirection and prevDirection
        if it is different, call a function to show or hide the header
        example:
        step 1: user scrolls down: curDirection 2, prevDirection 0 > hide header
        step 2: user scrolls down again: curDirection 2, prevDirection 2 > already hidden, do nothing
        step 3: user scrolls up: curDirection 1, prevDirection 2 > show header
        */

        var header = document.getElementById('header-sticky');
        var toggled;
        var threshold = 80;

        var checkScroll = function() {
        curScroll = w.scrollY || doc.scrollTop;
        if(curScroll > prevScroll) {
            // scrolled down
            curDirection = 2;
        }
        else {
            //scrolled up
            curDirection = 1;
        }

        if(curDirection !== prevDirection) {
            toggled = toggleHeader();
        }

        prevScroll = curScroll;
        if(toggled) {
            prevDirection = curDirection;
        }
        };

        var toggleHeader = function() { 
        toggled = true;
        // On scroll
        $(w).scroll(function(){
            // Hide header on scroll down
            if (curScroll >= threshold) {
                header.classList.add('sticky-fixed');
            }
            else {
                header.classList.remove('sticky-fixed');
            }
        });

        if(curDirection === 2 && curScroll > threshold) {
            header.classList.add('sticky-menu');
        }
        else if (curDirection === 1) {
            header.classList.remove('sticky-menu');
        }
        else {
            header.classList.add('sticky-fixed');
            toggled = false;
        }
        return toggled;
        };

        window.addEventListener('scroll', checkScroll);

})(jQuery);

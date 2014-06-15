$(window).load(function () {

    "use strict";

    // Set Heights

    var galleryHeight = $('.active-gallery').innerHeight();
    $('#gallery-holder').css('height', galleryHeight);

    var featureHeight = $('.active-feature-detail').innerHeight() + 88;
    $('#feature-detail-holder').css('min-height', featureHeight);

});

$(document).ready(function () {

    "use strict";

    // Initialize Sliders

   /* $('#home-slider').flexslider({
        controlNav: false
    });*/

    // Mobile Menu Toggle

    $('#mobile-toggle').click(function () {
        if ($('#main-nav').hasClass('open-nav')) {
            $('#main-nav').removeClass('open-nav');
        } else {
            $('#main-nav').addClass('open-nav');
        }
    });

    // Initialize Smooth Scroll

    $('.scroll').smoothScroll({
        offset: -80,
        speed: 700
    });


    // Feature Panels

    $('.feature-selection').click(function () {
        if (!$(this).hasClass('active-feature')) {
            var featureID = '#' + $(this).attr('data-feature-id');

            $('.active-feature').removeClass('active-feature');
            $(this).addClass('active-feature');

            $('.active-feature-detail').addClass('fadeOutLeftBig');
            setTimeout(function () {
                $('.fadeOutLeftBig').removeClass('active-feature-detail');
            }, 500);
            setTimeout(function () {
                $('.fadeOutLeftBig').removeClass('fadeOutLeftBig');
            }, 600);
            $(featureID).addClass('fadeInRightBig');
            var that = featureID;
            setTimeout(function () {
                $(that).removeClass('fadeInRightBig');
            }, 1000);
            $(featureID).addClass('active-feature-detail');

            var newFeatureHeight = $(featureID).height() + 88;

            $('#feature-detail-holder').css('min-height', newFeatureHeight);
        }
    });


    // Gallery Tabs

    $('.gallery-filter li a').click(function () {

        var galleryID = '#' + $(this).attr('data-gallery-id') + '-gallery';
        $('.active-filter').removeClass('active-filter');
        $(this).parent().addClass('active-filter');

        $('.active-gallery').addClass('fadeOutLeftBig');
        setTimeout(function () {
            $('.fadeOutLeftBig').removeClass('active-gallery');
        }, 500);
        setTimeout(function () {
            $('.fadeOutLeftBig').removeClass('fadeOutLeftBig');
        }, 600);

        $(galleryID).addClass('fadeInRightBig');
        var that2 = galleryID;
        setTimeout(function () {
            $(that2).removeClass('fadeInRightBig');
        }, 1000);
        $(galleryID).addClass('active-gallery');

        var newGalleryHeight = $(galleryID).outerHeight();
        $('#gallery-holder').css('height', newGalleryHeight);


        return false;

    });

    // FAQ Widths

    var faqWidth = $('.question').outerWidth();

    $('.answer-wrapper').css('width', faqWidth);

    // FAQ Toggles

    $('.question').click(function () {
        if ($(this).parent().hasClass('open-question')) {
            $(this).parent().removeClass('open-question');
        } else {
            $(this).parent().addClass('open-question');
        }

    });

    // FAQ Contact Form

    $('#question-ask').click(function () {

        var name = $('#faq-form').children('#name').val();
        var email = $('#faq-form').children('#email').val();
        var question = $('#faq-form').children('#question-text').val();
        var error = 0;

        if (name === '' || email === '' || question === '') {
            error = 1;
        }

        if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(email))) {
            error = 1;
        }

        if (error === 1) {
            $('#details-error').fadeIn(1000);
        } else {
            $('#details-error').fadeOut(1000);
        }

        var dataString = 'name=' + name + '&email=' + email + '&text=' + question;

        if (error === 0) {
            $.ajax({
                type: "POST",
                url: "mail.php",
                data: dataString,
                success: function () {
                    $('#details-error').fadeOut(1000);
                    $('#form-sent').fadeIn(1000);
                }
            });
            return false;
        }

    

    });


});
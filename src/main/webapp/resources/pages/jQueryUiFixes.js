
$(document).ready(function () {
    //$('.button-collapse').sideNav();

    $('.dropdown-button-hover').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });

    //$('.dropdown-button').dropdown({
    //    inDuration: 300,
    //    outDuration: 225,
    //    constrain_width: false, // Does not change width of dropdown to that of the activator
    //    hover: false, // Activate on hover
    //    gutter: 0, // Spacing from edge
    //    belowOrigin: true, // Displays dropdown below the button
    //    alignment: 'left' // Displays dropdown with edge aligned to the left of button
    //});

    //$(window).bind('mousewheel', function (event) {
    //    if (event.originalEvent.wheelDelta >= 0) {
    //        console.log('Scroll up');
    //        $("#navigation-Menu").removeClass('nav-small');
    //    }
    //    else {
    //        console.log('Scroll down');
    //        $("#navigation-Menu").addClass('nav-small');
    //    }

    //});

    //var fixDetailHeightHandler = function() {
    //    $.each($('.presentation-item'), function (i, v) {
    //        $(v).height($(v).width());
    //    })
    //}

    //$(window).resize(function () {
    //    fixDetailHeightHandler();
    //});
    //fixDetailHeightHandler();
})
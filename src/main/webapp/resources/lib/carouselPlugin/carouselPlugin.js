$.fn.attachDragger = function () {
    var attachment = false, lastPosition, position, difference;

    //prevent select events from childrens
    var _preventDefault = function (evt) { evt.preventDefault(); };
    $.each($($(this).selector).find('*'), function (i, v) {
        $(v).bind("dragstart", _preventDefault).bind("selectstart", _preventDefault);
    });

    //add mouse events
    $($(this).selector).on("mousedown mouseup mousemove", function (e) {
        if (e.type == "mousedown") attachment = true, lastPosition = [e.clientX, e.clientY];
        if (e.type == "mouseup") attachment = false;
        if (e.type == "mousemove" && attachment == true) {
            var isMouseLeftButtonClicked = false;
            if ('buttons' in event) { isMouseLeftButtonClicked = event.buttons === 1; }
            else if ('which' in event) { isMouseLeftButtonClicked = event.which === 1; }
            else { isMouseLeftButtonClicked = event.button === 1; };

            if (isMouseLeftButtonClicked) {
                position = [e.clientX, e.clientY];
                difference = [(position[0] - lastPosition[0]), (position[1] - lastPosition[1])];
                $(this).scrollLeft($(this).scrollLeft() - difference[0]);
                $(this).scrollTop($(this).scrollTop() - difference[1]);
                lastPosition = [e.clientX, e.clientY];
            }
        }
    });

    $(window).on("mouseup", function () {
        attachment = false;
    });
};


$.fn.slideCarousel = function (options) {
    var carouselId = '98d90571-0fa9-4eaf-b879-113c7e6f4817';
    var leftSideId = 'fc9d6928-63c8-4792-a20a-09d8ef19da19';
    var rightSideId = 'aa44c095-3ac9-4307-8663-646220f56f81';

    var carousel = "";
    carousel += "<div id=\"98d90571-0fa9-4eaf-b879-113c7e6f4817\" class=\"modal\">";
    carousel += "    <div class=\"modal-content\">";
    carousel += "        <div class=\"row\">";
    carousel += "           <div class=\"right\">";
    carousel += "               <a class=\"modal-action modal-close\" data-trigger-close=\"close\" href=\"javascript:void(0)\"><i class=\"material-icons\">close<\/i><\/a>"
    carousel += "           <\/div>";
    carousel += "        <\/div>";
    carousel += "        <div class=\"slider-content\">";
    carousel += "            <div class=\"row\">";

    var carouselLeftSide = "<div id=\"fc9d6928-63c8-4792-a20a-09d8ef19da19\" class=\"col s12 m10 l9\">";
    var carouselRightSide = "<div id=\"aa44c095-3ac9-4307-8663-646220f56f81\" class=\"col s12 m2 l3\">";

    var carouselLeftSideButton = ""; //"<div class=\"hover-left-efect\"><\/div>"
    carouselLeftSideButton += "<div class=\"go-to-left-btn-container\">"
    carouselLeftSideButton += "<div class=\"btn-inner-relative-container\">"
    carouselLeftSideButton += "<div class=\"vertical-middle-inner\">"
    carouselLeftSideButton += "<div class=\"vertical-table-cell\">"
    carouselLeftSideButton += "<a data-navigat=\"back\" class=\"btn-floating btn-large waves-effect waves-light black\"><i class=\"material-icons\">keyboard_arrow_left<\/i><\/a>";
    carouselLeftSideButton += "<\/div>";
    carouselLeftSideButton += "<\/div>";
    carouselLeftSideButton += "<\/div>";
    carouselLeftSideButton += "<\/div>";

    var carouselRightSideButton = "";//"<div class=\"hover-right-efect\"><\/div>"
    carouselRightSideButton += "<div class=\"go-to-right-btn-container\">"
    carouselRightSideButton += "<div class=\"btn-inner-relative-container\">"
    carouselRightSideButton += "<div class=\"vertical-middle-inner\">"
    carouselRightSideButton += "<div class=\"vertical-table-cell\">"
    carouselRightSideButton += "<a data-navigat=\"foreward\" class=\"btn-floating btn-large waves-effect waves-light black\"><i class=\"material-icons\">keyboard_arrow_right<\/i><\/a>";
    carouselRightSideButton += "<\/div>";
    carouselRightSideButton += "<\/div>";
    carouselRightSideButton += "<\/div>";
    carouselRightSideButton += "<\/div>";

    carouselLeftSide += carouselLeftSideButton;
    carouselLeftSide += carouselRightSideButton;

    $.each(options.images, function (index, image) {
        if (index === 0) {
            carouselLeftSide += "<div class=\"slider-image-container slider-current-image\">";
        } else {
            carouselLeftSide += "<div class=\"slider-image-container\">";
        }
        carouselLeftSide += "<img class=\"slider-image unselectable\" data-left-index=\"" + index + "\" src=\"" + image.bigImageSrc + "\"/>";
        carouselLeftSide += "<\/div>";

        carouselRightSide += "<div class=\"unselectable\" style=\"width:100%\">";
        carouselRightSide += "<img class=\"slider-image unselectable\"  data-right-index=\"" + index + "\" src=\"" + image.smallImageSrc + "\"/>";
        carouselRightSide += "<\/div>";
    });

    carouselLeftSide += "<\/div>";
    carouselRightSide += "<\/div>";

    carousel += carouselLeftSide + carouselRightSide;

    carousel += "           <\/div>";
    carousel += "        <\/div>";
    carousel += "    <\/div>";
    carousel += "<\/div>";

    $(this).append(carousel);

    $("#" + rightSideId).attachDragger();
    var leftSideImages = $("#" + leftSideId).find('img');

    var showImageOnIndex = function (parameters) {
        $('.slider-current-image').removeClass('slider-current-image').css('opacity', 0);
        $(leftSideImages[parameters.index]).parent().addClass('slider-current-image');

        setTimeout(function () {
            $('.slider-current-image').css('opacity', 1);
            if (options.animate) {
                var mobileBrowser = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent.toLowerCase());

                if (!mobileBrowser) {
                    $("#" + carouselId).animate({
                        height: $('.slider-current-image :first-child').height() + 90
                    });

                    $("#" + rightSideId).animate({
                        height: $('.slider-current-image :first-child').height() + 70
                    });
                } else {
                    viewPortHeight = window.innerHeight
                    var elementHeight = $('.slider-current-image :first-child').height() + 20 > viewPortHeight / 2 ? viewPortHeight / 2 : $('.slider-current-image :first-child').height() + 20;
                    $('.slider-current-image').animate({
                        height: elementHeight
                    });
                    $('.slider-current-image').css('margin-bottom', '5px');
                }
            }
        }, 100);
    };

    var smallImageEventHandler = function (event) {
        showImageOnIndex({ parentContext: this, index: parseInt($(this).attr('data-right-index')) });
    }

    $.each($("#" + rightSideId).find('img'), function (index, image) {
        $(image).click(smallImageEventHandler);
    });

    $("#" + leftSideId + " a[data-navigat='foreward']").click(function (event) {
        var nextIndex = parseInt($('.slider-current-image :first-child').attr('data-left-index')) + 1;
        if (nextIndex < leftSideImages.length) {
            showImageOnIndex({ parentContext: this, index: nextIndex });
        } else {
            showImageOnIndex({ parentContext: this, index: 0 });
        }
    });

    $("#" + leftSideId + " a[data-navigat='back']").click(function (event) {
        var nextIndex = parseInt($('.slider-current-image :first-child').attr('data-left-index')) - 1;
        if (nextIndex > -1) {
            showImageOnIndex({ parentContext: this, index: nextIndex });
        }
        else {
            showImageOnIndex({ parentContext: this, index: leftSideImages.length - 1 });
        }
    });

    var me = this;

    $("#" + carouselId).openModal({
        ready: function () {
            $('.slider-current-image').css('opacity', 1);

            var mobileBrowser = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent.toLowerCase());

            if (mobileBrowser) {
                $("#" + carouselId).animate({
                    height: '90vh'
                });
            }

            if (options.animate) {
                if (!mobileBrowser) {
					$('.slider-current-image :first-child').imagesLoaded(function(){
						$("#" + carouselId).animate({
							height: $('.slider-current-image :first-child').height() + 90
						});

						$("#" + rightSideId).animate({
							height: $('.slider-current-image :first-child').height() + 70
						});
					});

                } else {
                    viewPortHeight = window.innerHeight
                    var elementHeight = $('.slider-current-image :first-child').height() + 20 > viewPortHeight / 2 ? viewPortHeight / 2 : $('.slider-current-image :first-child').height() + 20;
                    $('.slider-current-image').css('height', elementHeight);
                    $('.slider-current-image').css('margin-bottom', '5px');
                }
            } else {
                $("#" + carouselId).height('88vh');
                $("#" + carouselId).css('top', '7%');
                $("#" + rightSideId).height('85vh');
            }
        },
        complete: function () {
            $("#" + carouselId).remove();
        }
    });
}

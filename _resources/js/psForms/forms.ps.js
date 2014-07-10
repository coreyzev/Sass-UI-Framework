
function includeJS(incFile) {
    document.write('<script type="text/javascript" src="'
                   + incFile + '"></scr' + 'ipt>');
}

includeJS("http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js");
includeJS("_resources/js/psForms/ps.Password.js");
includeJS("_resources/js/scrollTo.js");


//************ Bring it all together ******************************************/
$(document).ready(function () {
    //super sexy phone standard
    /*
    * After focus leaves textbox
    * 1. Strip out non-digit characters (,-.' '
    * 2. If 10 digits, okay
    * 3. If 11 digits and first digit is '1', okay
    * 4. Show stripped down response in box
    */
    // 
    $('.psPhone').blur(function (e) {
        console.log('trig');
        if ($(this).val().length > 0) {
            $phone = $(this);
            //strip out everything but numbers
            var phoneVal = $(this).val().replace(/\D/g, '').replace(/\ /g, "");
            if (phoneVal.length > 10) {
                if (phoneVal.length == 11 && phoneVal.charAt(0) == '1')
                    phoneVal = phoneVal.substring(1);
                else
                    phoneVal = $(this).val();
            }
            if (phoneVal.length == 10)
                $(this).val(phoneVal.slice(0, 3) + "-" + phoneVal.slice(3, 6) + "-" + phoneVal.slice(6));
            else
                phoneVal = $(this).val();
        }
    });

    //password schtuff
    var ps_minLength = 2;
    var ps_maxLength = 5;
    var ps_allowSpecial = false;
    var ps_allowSpace = false;
    //first textbox, second textbox, int min, int max, bool, bool
    ps_setupPassword('#txtPassword', '#txtPassword2', 2, 5, false, false);

    //click to toggle labels
    var ACflag = true;
    $('#spRevealLabel').click(function (e) {
        if (ACflag) {
            $('label.visuallyhidden').css('left', '0px');
            $('label.visuallyhidden').css('position', 'relative');
            $(this).text('Hide Labels');
            ACflag = false;
        } else {
            $('label.visuallyhidden').css('left', '-10000px');
            $('label.visuallyhidden').css('position', 'absolute');
            $(this).text('Reveal Labels');
            ACflag = true;
        }
    });
    var reqErrorMsgBase = "is required";
    var reqErrorMsg = "";
    var messager = function () {
        return reqErrorMsg;
    };

    $("#commentForm").validate({
        errorPlacement: function (error, element) {
            error.prependTo(element.prev().prev());
            $('.errorContainer').show();
        },
        errorContainer: $(".error-group-text"),
        submitHandler: function () {
            $("div.errorContainer").hide();
            alert("submit! use link below to go to the other step");
        },
    });

    $("#frmLongInput").validate({
        errorPlacement: function (error, element) {
            error.prependTo(element.prev().prev());
            $('.errorContainer').show();
        },
        errorContainer: $(".error-group-text"),
        submitHandler: function () {
            $("div.errorContainer").hide();
            alert("submit! use link below to go to the other step");
        },
        invalidHandler: function () {
            //scroll to error panel
            $('html, body').animate({
                scrollTop: $(this).find("h2").offset().top
            }, 2000);
        }
    });

    $.validator.addMethod("req", function (value, element) {
        if (value === undefined || value === '' || value === $(element).attr('placeholder')) {
            reqErrorMsg = "";
            reqErrorMsg = $(element).attr('placeholder') + " " + reqErrorMsgBase;
            return false;
        }
        return true;
    }, messager);


});//end of doc ready
/*default msg for errors
jQuery.extend(jQuery.validator.messages, {
    email: "Please enter a valid email address.",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});*/
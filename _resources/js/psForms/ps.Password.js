﻿//password checklist
/* OPTIONS
* don't add to the password function call unless you wish to overwrite
* doubleType -> if you have a re-enter password field; set this with the re-enter textbox id selector
* minLength -> minimum length for the password; default = 6; 
* maxLength -> maximum length for the password; default = 20; 
* allowSpecial -> are special characters allowed; default = true;  
* allowSpace -> are spaces allowed; default = false;
* allowNumbers -> is at least one number required; default=true;
* requireUpperandLower -> is at least one uppercase and one lower case letter required; default=true; 
*/

    function ps_setupPassword(ps_input1, ps_input2, ps_minLength, ps_maxLength, ps_allowSpecial, ps_allowSpace) {
        $(ps_input1).password({

            checklist: $('#checklist'), 
            doubleType: $(ps_input2),
            minLength: ps_minLength,
            maxLength: ps_maxLength,
            allowSpecial: ps_allowSpecial,
            allowSpace: ps_allowSpace
        });

        $(ps_input1).blur(function () {
            if ($(this).val() != null && $(this).val().length > 0)
                $('#checklist').show();
            else
                $('#checklist').hide();
        }).keypress(function () {
            if ($(this).val() != null && $(this).val().length > 0)
                $('#checklist').show();
            else
                $('#checklist').hide();
        });


        //toggle password from hidden to not by changing input type
        $(".showPW").each(function (index, input) {
            var $input = $(input);
            $(this).next(".btnShowPW").click(function () {
                if ($input.val().length > 0) {
                    var change = "";
                    if ($(this).html() === "Show") {
                        $(this).html("Hide")
                        change = "text";
                    } else {
                        $(this).html("Show");
                        change = "password";
                    }
                    var rep = $("<input type='" + change + "' />")
                      .attr("id", $input.attr("id"))
                      .attr("name", $input.attr("name"))
                      .attr('class', $input.attr('class'))
                      .attr('placeholder', $input.attr('placeholder'))
                      .val($input.val())
                      .insertBefore($input);
                    $input.remove();
                    $input = rep;

                    $('#checklist').empty();
                    if ($input.attr('id') == "txtPassword") {
                        $input.password({
                            checklist: $('#checklist'),
                            doubleType: $(ps_input2),
                            minLength: ps_minLength,
                            maxLength: ps_maxLength,
                            allowSpecial: ps_allowSpecial,
                            allowSpace: ps_allowSpace
                        });
                    } else {
                        $(ps_input1).password({
                            checklist: $('#checklist'), 
                            doubleType: $(ps_input2),
                            minLength: ps_minLength,
                            maxLength: ps_maxLength,
                            allowSpecial: ps_allowSpecial,
                            allowSpace: ps_allowSpace
                        });
                    }
                    /**/
                }
            }).insertAfter($input);

        });

        //end of password section
    }

    //modified from jquery.password.js 
    //does not utilized the password strength meter, nor checks against a list of common
    (function ($) {
        var methods = {
            init: function (options) {
                var settings = $.extend({
                    minLength: 6,
                    maxLength: 20,
                    allowSpace: false,
                    allowNumbers: true,
                    requireUpperandLower: true,
                    allowSpecial: true,
                    change: function () { },
                    strengthIndicator: null,
                    personalInformation: [],
                    checklist: null,
                    dictionary: null,
                    doubleType: null
                }, options);
                this.each(function () {
                    var t = $(this);
                    var si = null;
                    var cl = null;
                    var dt = null;
                    $.each(settings.personalInformation, function (index, value) {
                        if (typeof (value) == 'string') {
                            if ($(value).length > 0) {
                                settings.personalInformation[index] = $(value);
                            }
                        }
                    });
                    var score = $.fn.password('calculateScore', t, settings);
                    if (settings.strengthIndicator != null) {
                        if (typeof (settings.strengthIndicator) == 'string') {
                            si = $(settings.strengthIndicator);
                        } else {
                            si = settings.strengthIndicator;
                        }
                        si.html('<div class="pw_strengthIndicator"><div class="strength weak">Weak</div><div class="strength medium">Medium</div><div class="strength strong">Strong</div></div>');
                        if (score[2]) {
                            si.find('.weak').addClass('pass');
                            if (score[0] >= 50) {
                                si.find('.medium').addClass('pass');
                            }
                            if (score[0] >= 80) {
                                si.find('.strong').addClass('pass');
                            }
                        }
                    }
                    if (settings.doubleType != null) {
                        if (typeof (settings.doubleType) == 'string') {
                            dt = $(settings.doubleType);
                        } else {
                            dt = settings.doubleType;
                        }
                        dt.keyup(function () {
                            if (cl != null) {
                                cl.find('.pw_check_match').removeClass('pass');
                                if (t.val() == dt.val()) {
                                    cl.find('.pw_check_match').addClass('pass');
                                }
                            }
                        });
                    }
                    if (settings.checklist != null) {
                        if (typeof (settings.checklist) == 'string') {
                            cl = $(settings.checklist);
                        } else {
                            cl = settings.checklist;
                        }
                        cl.html('<div class="pw_checklist"><ul><li class="pw_check_length">Length of at least ' + settings.minLength + ' characters</li><li class="pw_check_maxlength">Length less than ' + settings.maxLength + ' characters</li><li class="pw_check_uclc">Contains uppercase and lowercase letters</li><li class="pw_check_nums">Contains numbers</li><li class="pw_check_special">Contains special characters</li><li class="pw_check_special_no">Doesn\'t contain special characters</li><li class="pw_check_spaces">Doesn\'t contain spaces</li><li class="pw_check_personal">Doesn\'t contain personal information</li><li class="pw_check_dictionary">Doesn\'t contain common password words</li><li class="pw_check_match">Passwords match</li></ul></div>');
                        if (settings.personalInformation.length == 0) {
                            cl.find('.pw_check_personal').remove();
                        }
                        if (!settings.requireUpperandLower)
                            cl.find('.pw_check_uclc').remove();
                        if (!settings.allowNumbers)
                            cl.find('.pw_check_nums').remove();
                        if (!settings.allowSpecial) {
                            cl.find('.pw_check_special').remove();
                        } else {
                            cl.find('.pw_check_special_no').remove();
                        }
                        if (!settings.allowSpace) {
                            cl.find('.pw_check_spaces').remove();
                        }
                        if (settings.minLength < 1) {
                            cl.find('.pw_check_length').remove();
                        }
                        if (settings.maxLength < 1) {
                            cl.find('.pw_check_maxlength').remove();
                        }
                        if (settings.dictionary == null) {
                            cl.find('.pw_check_dictionary').remove();
                        }
                        if (dt == null) {
                            cl.find('.pw_check_match').remove();
                        }

                        if (jQuery.inArray('TOO_SHORT', score[1]) == -1) {
                            cl.find('.pw_check_length').addClass('pass');
                        }
                        if (jQuery.inArray('TOO_LONG', score[1]) == -1) {
                            cl.find('.pw_check_maxlength').addClass('pass');
                        }
                        if (jQuery.inArray('NO_UPPERCASE_LETTERS', score[1] == -1) && jQuery.inArray('NO_LOWERCASE_LETTERS', score[1]) == -1) {
                            cl.find('.pw_check_uclc').addClass('pass');
                        }
                        if (jQuery.inArray('NO_NUMBERS', score[1]) == -1) {
                            cl.find('.pw_check_nums').addClass('pass');
                        }
                        if (jQuery.inArray('NO_SPECIAL_CHARACTERS', score[1]) == -1) {
                            cl.find('.pw_check_special').addClass('pass');
                        }
                        if (jQuery.inArray('SPECIAL_CHARACTERS', score[1]) == -1) {
                            cl.find('.pw_check_special_no').addClass('pass');
                        }
                        if (jQuery.inArray('CONTAINS_SPACE', score[1]) == -1) {
                            cl.find('.pw_check_spaces').addClass('pass');
                        }
                        if (jQuery.inArray('CONTAINS_PERSONAL_INFO', score[1]) == -1) {
                            cl.find('.pw_check_personal').addClass('pass');
                        }
                        if (jQuery.inArray('CONTAINS_COMMON_WORD', score[1]) == -1) {
                            cl.find('.pw_check_dictionary').addClass('pass');
                        }
                        if (t.val() == dt.val()) {
                            cl.find('.pw_check_match').addClass('pass');
                        }
                    }
                    if (settings.dictionary != null) {
                        $.getJSON(settings.dictionary, function (json) {
                            settings.dictionaryWords = json;
                        });
                    }
                    t.keyup(function () {
                        var score = $.fn.password('calculateScore', t, settings);
                        if (si != null) {
                            si.find('.pass').removeClass('pass');
                            if (score[2]) {
                                si.find('.weak').addClass('pass');
                                if (score[0] >= 50) {
                                    si.find('.medium').addClass('pass');
                                }
                                if (score[0] >= 80) {
                                    si.find('.strong').addClass('pass');
                                }
                            }
                        }
                        if (cl != null) {
                            cl.find('.pass').removeClass('pass');
                            if (jQuery.inArray('TOO_SHORT', score[1]) == -1) {
                                cl.find('.pw_check_length').addClass('pass');
                            }
                            if (jQuery.inArray('TOO_LONG', score[1]) == -1) {
                                cl.find('.pw_check_maxlength').addClass('pass');
                            }
                            if (jQuery.inArray('NO_UPPERCASE_LETTERS', score[1]) == -1 && jQuery.inArray('NO_LOWERCASE_LETTERS', score[1]) == -1) {
                                cl.find('.pw_check_uclc').addClass('pass');
                            }
                            if (jQuery.inArray('NO_NUMBERS', score[1]) == -1) {
                                cl.find('.pw_check_nums').addClass('pass');
                            }
                            if (jQuery.inArray('NO_SPECIAL_CHARACTERS', score[1]) == -1) {
                                cl.find('.pw_check_special').addClass('pass');
                            }
                            if (jQuery.inArray('SPECIAL_CHARACTERS', score[1]) == -1) {
                                cl.find('.pw_check_special_no').addClass('pass');
                            }
                            if (jQuery.inArray('CONTAINS_SPACE', score[1]) == -1) {
                                cl.find('.pw_check_spaces').addClass('pass');
                            }
                            if (jQuery.inArray('CONTAINS_PERSONAL_INFO', score[1]) == -1) {
                                cl.find('.pw_check_personal').addClass('pass');
                            }
                            if (jQuery.inArray('CONTAINS_COMMON_WORD', score[1]) == -1) {
                                cl.find('.pw_check_dictionary').addClass('pass');
                            }
                            if (t.val() == dt.val()) {
                                cl.find('.pw_check_match').addClass('pass');
                            }
                        }
                        settings.change.call(this, score[0], score[1], score[2]);
                    });
                });
            },
            calculateScore: function (elem, settings) {
                var s = elem.val();
                var score = 0;
                var max_score = 90;
                var pass = true;
                var errors = [];
                if (s.length >= settings.minLength) {
                    score += 10;
                } else {
                    errors.push('TOO_SHORT');
                    pass = false;
                }
                if (s.length <= settings.maxLength) {
                    score += 10;
                } else {
                    errors.push('TOO_LONG');
                    pass = false;
                }
                if (s.match(/[A-Z]/g) != null) {
                    score += 10;
                } else {
                    errors.push('NO_UPPERCASE_LETTERS');
                }
                if (s.match(/[a-z]/g) != null) {
                    score += 10;
                } else {
                    errors.push('NO_LOWERCASE_LETTERS');
                }
                if (s.match(/[0-9]/g) != null) {
                    score += 10;
                } else {
                    errors.push('NO_NUMBERS');
                }
                if (!settings.allowSpace && s.match(/ /g) != null) {
                    errors.push('CONTAINS_SPACE');
                    pass = false;
                }
                if (s.match(/(\W|_)/g) != null) {
                    score += 10;
                    errors.push('SPECIAL_CHARACTERS');
                } else {
                    errors.push('NO_SPECIAL_CHARACTERS');
                }
                //check personal information
                var pi = [];
                $.each(settings.personalInformation, function (index, value) {
                    if (typeof (value) != 'string') {
                        value = value.val();
                    }
                    if (value.length > 0) {
                        var v = value.toLowerCase().split(' ');
                        $.each(v, function (p, q) {
                            pi.push(q);
                            var n = q.match(/[1-2][0-9]{3}/g);
                            if (n) {
                                pi.push(n[0].substring(2, 4));
                            }
                        });
                    }
                });
                var slc = s.toLowerCase();
                var fpi = false;
                $.each(pi, function (index, value) {
                    var regex = new RegExp(value, "g");
                    if (slc.match(regex) != null) {
                        fpi = true;
                    }
                });
                if (fpi) {
                    errors.push('CONTAINS_PERSONAL_INFO');
                } else if (s.length > 5) {
                    score += 20;
                }
                var fdi = false;
                if (settings.dictionaryWords !== undefined) {
                    $.each(settings.dictionaryWords, function (index, value) {
                        var regex = new RegExp(value, "g");
                        if (slc.match(regex) != null) {
                            fdi = true;
                        }
                    });
                }
                if (fdi) {
                    errors.push('CONTAINS_COMMON_WORD');
                } else if (s.length > 5) {
                    score += 20;
                }
                if ((score / max_score) < 0.3) {
                    pass = false;
                }
                if (s.length == 0) {
                    pass = false;
                    errors.push('EMPTY');
                }
                return [(score / max_score) * 100, errors, pass];
            }
        };
        $.fn.password = function (method) {
            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + method + ' does not exist on jQuery.password');
            }
        };
    })(jQuery);
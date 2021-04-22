var BOOKING_TYPE="air";

var countInf=1;
var firstTime = 0;
var firstClick = false;
function changeLang(lang){
    document.selfy.lang.value=lang;
    document.selfy.submit();
}

/* dropdowns */
function initialize_ddls(ddls) {
	ddls.each(function(){
		var me = $(this);
		var hidden = me.find('input');
		var selected_one = me.find('.selected-one');
		var value = hidden.val();
		var choices = me.find('.select-choices div');
		var selected_choice = null;
		selected_one.html(choices.filter('[data-value="' + value + '"]').text());
		choices.each(function(){
			var me = $(this);
			var data = me.data('value');
			if (typeof data !== 'undefined'){
				if (data == value) {
					me.addClass('selected');
					selected_choice = me;
					return;
				}
			}
		});
		choices.on('click', function(){
			var me = $(this);
			var new_value = me.data('value');
            if (selected_choice != null){
                selected_choice.removeClass('selected');
            }
            selected_choice = me;			
			selected_choice.addClass('selected');
			hidden.val(new_value);
			selected_one.html(me.text());
            if ($('.selected .ui-state-default').length>0) {$('.selected .ui-state-default').popover('destroy');}
		});
	});
}

function adjust_promo_box_height() {
    $('#promos-box, #promo-list').height('auto');
    $('#promos-box').height($(document).height());
    $('#promo-list').height($('#promos-box').height());
}

function push_out_promos() {
    $('.show-promos-text,.gray-overlay').hide();
    $('#promos-box').animate({ left: 0 }, { duration: 400, queue: false});
    $('.top-nav').animate({ left: 222 }, { duration: 400, queue: false });
    $('.all-wrap:not(.fixed-width)').animate({ left: 222 }, { duration: 400, queue: false});
    // we may not want to keep the width fixed if the screen is too small
    if ($('.all-wrap:not(.fixed-width)').width() > 930) {
        $('.all-wrap:not(.fixed-width)').animate({ width: $(window).outerWidth() - 222 }, { duration: 400, queue: false});
    }
    $('#promo-list').addClass('active');
    $('.ui-datepicker-prev,.long-prev').css({ top: 0, left: '15px' });
    $('.ui-datepicker-next,.long-next').css({ top: 0, right: '15px' });
}

function push_in_promos() {
    $('.show-promos-text,.gray-overlay').show();
    $('#promo-list').removeClass('active');
    $('.top-nav').animate({ left: $('.promos-present').length > 0 ? 36 : 0 }, { duration: 400, queue: false });
    $('#promos-box').animate({ left: -186 }, { duration: 400, queue: false});
    $('.all-wrap:not(.fixed-width)').animate({ left: 36 }, { duration: 400, queue: false});
    $('.all-wrap:not(.fixed-width)').animate({ width: $(window).outerWidth() - 36 }, { duration: 400, queue: false }, 'swing', function(){ $(this).css('width', ''); });
    //$('.tag-icon').fadeIn();
    $('#promo-list ul li').popover('hide');
    $('.ui-datepicker-prev,.long-prev').css({ top: '', left: '' });
    $('.ui-datepicker-next,.long-next').css({ top: '', right: '' });
}

function showItin() {
        $.fancybox({
            href: '#check-itinerary_alt',
            fitToView  : false,
            autoSize: true,
            wrapCSS    : "custom-pop-up",
            padding    : 0,
            maxWidth: "90%",
            margin     : 15,
            closeClick  : false,
            'closeBtn' : true,
            'hideOnOverlayClick':true,
            'hideOnContentClick':false
        });
}

function showCancel() {
        $.fancybox({
            href: '#modifications',
            fitToView  : false,
            autoSize: true,
            wrapCSS    : "custom-pop-up",
            padding    : 0,
            maxWidth: "90%",
            margin     : 15,
            closeClick  : false,
            'closeBtn' : true,
            'hideOnOverlayClick':true,
            'hideOnContentClick':false
        });
}


function validateConf(){
    $.ajax({
        type: "GET",
        url: "ibe5_ext.CHECK_RES",
        dataType: "html",
        data: {
             hotel: "10304",
             conf: $("#conf").val(),
             lastname: $("#lastname").val(),
             firstname: $("#firstname").val(),
             aYear: $("#aYear").val(),
             aMon: $("#aMon").val(),
             aDay: $("#aDay").val(),
             dYear: $("#dYear").val(),
             dMon: $("#dMon").val(),
             dDay: $("#dDay").val(),
             cc: $("#cc4").val()
        },
        success: function( response ) {                                       
            if (response == -1){
                $('#error_message_content').empty().append('<p class="center a95f5f">Sorry that reservation does not match our records.  Please check and try again.</p>');
                $.fancybox({
                    href: '#error-pop-up',
                    fitToView  : false,
                    autoSize: true,
                    closeClick  : true,
                    wrapCSS    : 'custom-pop-up',
                    padding    : 0,
                    maxWidth: "90%",
                    margin     : 15
                });
            } else {
                location.href= "/win/owa/ibe5_ext.check_itin?hotel=10304&lang=1&conf=" + response;
            }
        }
    });
    return false;
}

function validateCheck(){

    if ($("#lastname3").val() == ""){
        $("#lastname3").css("border", "1px solid red");
        return false;
    }

    $.ajax({
        type: "GET",
        url: "ibe5_ext.CHECK_RES",
        dataType: "html",
        data: {
             hotel: "10304",
             conf: $("#confCheck3").val(),
             lastname: $("#lastname3").val(),
             firstname: $("#firstname1").val(),
             aYear: $("#aYear1").val(),
             aMon: $("#aMon1").val(),
             aDay: $("#aDay1").val(),
             dYear: $("#dYear1").val(),
             dMon: $("#dMon1").val(),
             dDay: $("#dDay1").val(),
             cc: $("#cc41").val()
        },
        success: function( response ) {                                       
            if (response == -1){
                $('#error_message_content').empty().append('<p class="center a95f5f">Sorry that reservation does not match our records.  Please check and try again.</p>');
                $.fancybox({
                    href: '#error-pop-up',
                    fitToView  : false,
                    autoSize: true,
                    closeClick  : true,
                    wrapCSS    : 'custom-pop-up',
                    padding    : 0,
                    maxWidth: "90%",
                    margin     : 15
                });
            } else {
                location.href= "/win/owa/ibe5_ext.check_itin?hotel=10304&lang=1&conf=" + response + "&lastname=" + $("#lastname3").val();
            }
        }
    });
    return false;
}

function validateCancel(){

    if ($("#lastname2").val() == ""){
        $("#lastname2").css("border", "1px solid red");
        return false;
    }

    $.ajax({
        type: "GET",
        url: "ibe5_ext.CHECK_RES",
        dataType: "html",
        data: {
             hotel: "10304",
             conf: $("#confCancel").val(),
             lastname: $("#lastname2").val(),
             firstname: $("#firstname1").val(),
             aYear: $("#aYear1").val(),
             aMon: $("#aMon1").val(),
             aDay: $("#aDay1").val(),
             dYear: $("#dYear1").val(),
             dMon: $("#dMon1").val(),
             dDay: $("#dDay1").val(),
             cc: $("#cc41").val()
        },
        success: function( response ) {                                       
            if (response == -1){
                $('#error_message_content').empty().append('<p class="center a95f5f">Sorry that reservation does not match our records.  Please check and try again.</p>');
                $.fancybox({
                    href: '#error-pop-up',
                    fitToView  : false,
                    autoSize: true,
                    closeClick  : true,
                    wrapCSS    : 'custom-pop-up',
                    padding    : 0,
                    maxWidth: "90%",
                    margin     : 15
                });
            } else {
                location.href= "/win/owa/ibe5_ext.check_itin?hotel=10304&lang=1&conf=" + response + "&lastname=" + $("#lastname2").val();
            }
        }
    });
    return false;
}

function selectTab(xtype, object){
    if (xtype == "H"){
        BOOKING_TYPE = "hotel";
        $( ".step-1 > li > a" ).removeClass('selectedTab');
        $(object).addClass('selectedTab');
        $('#dep_airport_div, #arr_airport_div').hide();
        $( "#airport, #airportTo" ).prop( "disabled", true ).prop( "readonly", true );
        $('#h_only_link').hide();
        $('.datepicker').datepicker('refresh');
        $('.with-airport, .with-port').hide();
        $('.book-hotel-only').html('Book Hotel + Air');
        $('.book-hotel-only').attr('onclick', 'selectTab("A",$("#A"));');
        $('.advanced_search, #cruise_and_ferry').hide();
        $('.advanced_search').hide();
        $('#port').html("");
        $(".agency_hotel").show();
    } else if (xtype == "F"){
        BOOKING_TYPE = "ferry";
        $( ".step-1 > li > a" ).removeClass('selectedTab');
        $(object).addClass('selectedTab');    
        $("#airport,.airport-input").val("");
        $('#dep_airport_div, #arr_airport_div').show();
        $( "#airport, #airportTo" ).prop( "disabled", false ).prop( "readonly", false );
        $('#h_only_link, .with-port').show();
        $('.datepicker').datepicker('refresh');
        $('.with-airport, .advanced_search, #cruise_and_ferry').hide();
        $('.book-hotel-only').html('Book Hotel Only');
        $('.book-hotel-only').attr('onclick', 'selectTab("H",$("#H"));');
        $('.advanced_search').hide();
        $(".agency_hotel").hide();
        $('#port').html('<strong>Port:</strong> Fort Lauderdale (FLL) <input class="airport-input" type="hidden" name="portfrom" id="portfrom" value="FLL"/>');
    } else if (xtype == "C"){
        BOOKING_TYPE = "cruise";
        $( ".step-1 > li > a" ).removeClass('selectedTab');
        $(object).addClass('selectedTab');    
        $("#airport,.airport-input").val("");
        $('#dep_airport_div, #arr_airport_div, #cruise_and_ferry').show();
        $( "#airport, #airportTo" ).prop( "disabled", false ).prop( "readonly", false );
        $('#h_only_link, .with-port').show();
        $('.datepicker').datepicker('refresh');
        $('.with-airport, .advanced_search').hide();
        $('.book-hotel-only').html('Book Hotel Only');
        $('.book-hotel-only').attr('onclick', 'selectTab("H",$("#H"));');
        $('.advanced_search').hide();
        $(".agency_hotel").hide();

            $('#port-only').hide();
            $('#port').html('<strong>Port:</strong> Fort Lauderdale (FLL) <input class="airport-input" type="hidden" name="portfrom" id="portfrom" value="MFW"/>');
       
    } else if (xtype == "AO"){
        BOOKING_TYPE = "air";
        $( ".step-1 > li > a" ).removeClass('selectedTab');
        $( ".step-1 > li > a" ).hide();
        $(object).addClass('selectedTab');
        $('#dep_airport_div, #arr_airport_div').show();
        $( "#airport, #airportTo" ).prop( "disabled", false ).prop( "readonly", false );
        $('#h_only_link').show();
        $('.datepicker').datepicker('refresh');
        $('.with-airport').show();
        $('.with-port').hide();
        $('.book-hotel-only').html('Book Hotel Only');
        $('.book-hotel-only').attr('onclick', 'selectTab("H",$("#H"));');
        $('.advanced_search').show();
        $('#port').html("");
        $(".agency_hotel, #cruise_and_ferry").hide();
    } else {
        BOOKING_TYPE = "air";
        $( ".step-1 > li > a" ).removeClass('selectedTab');
        $(object).addClass('selectedTab');
        $('#dep_airport_div, #arr_airport_div').show();
        $( "#airport, #airportTo" ).prop( "disabled", false ).prop( "readonly", false );
        $('#h_only_link').show();
        $('.datepicker').datepicker('refresh');
        $('.with-airport').show();
        $('.with-port').hide();
        $('.book-hotel-only').html('Book Hotel Only');
        $('.book-hotel-only').attr('onclick', 'selectTab("H",$("#H"));');
        $('.advanced_search').show();
        $('#port').html("");
        $(".agency_hotel, #cruise_and_ferry").hide();
    }
}


function isMobile() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

$(document).ready(function(){

            $( ".pop-up-link-logout" ).click(function() {
                $.removeCookie('valid_usr_crm', { path: '/' });
                location.reload();
            });

            if ($.cookie("valid_usr_crm")){
                $(".logout").show();
            }


setTimeout(function(){
    if($(".lowest-rate").length == 0){
        $(".promos-legend").hide();
    }
}, 300);



if (document.referrer != ""){
    try {
        if (document.referrer.indexOf("html/airlink/transition.php") > 0){
            $("#r").val("facebook.com");             
        }else{
            $("#r").val(document.referrer.replace(/&/g, '_').substring(0,120)); 
        }
    }
    catch(err) {
    }
}

    
var cur_conv = 1;


    
    if ($(window).width() < 480 || isMobile()) {
        $("<input>").attr({
            type: "hidden",
            name: "m",
            value: "Y",
            id: "xmobile"
        }).appendTo("#stg1_form");
    }

    $('#advanced_search').on('click', function(){
        if ($(".advanced_search").is(":hidden")) {
            $('.advanced_search').show();
            $('.advanced_search').css('display', 'block');
        } else {
            $('.advanced_search').hide();
        }
    });

    
    $( "#cur_change" ).click(function () {
        $("#currency_hidden").val( $("#fromCurr").val() );
         document.selfy.submit();
    });

    $( ".full-select, .small-select" ).click(function () {
        var it = $( this ).find(".select-choices");
        if (it.is(":visible")){
            it.hide();
        } else {
            it.show();
        }
    });

    $( ".full-select, .small-select" ).mouseenter(function () {
        var it = $( this ).find(".select-choices");
        it.show();
    });

    $( ".full-select, .small-select" ).mouseleave(function () {
        var it = $( this ).find(".select-choices");
        it.hide();
    });

	if ($('input[type="text"]').length > 0) {
		$('input[type="text"]').on('click', function(e){
			$(this).select();
		})
	}

    $(".defaultText").focus(function(srcc){
        if ($(this).val() == $(this)[0].title){
            $(this).removeClass("defaultTextActive");
            $(this).val("");
        }
    });
    
    $(".defaultText").blur(function(){
        if ($(this).val() == "")        {
            $(this).addClass("defaultTextActive");
            $(this).val($(this)[0].title);
        }
    });
    
    $(".defaultText").blur(); 


    $('.promo-input').on('click', function(){
        if ($('.selected .ui-state-default').length>0) {$('.selected .ui-state-default').popover('destroy');}
    });
    $('#airportTo').on('change', function(){
        if ($('.selected .ui-state-default').length>0) {$('.selected .ui-state-default').popover('destroy');}
    });
    $('.cruiseoptions').change(function(){
        $("#portfrom").val($(this).val());
    });
   
    $('.all-wrap').on('click', function(){
        if ($('#promo-list').hasClass('active')) {
            push_in_promos();
        }
    });


                selectTab("A",$('#A'));
            
                
    //Add Modernizr test for box sizing
    Modernizr.addTest("boxsizing", function(){ return Modernizr.testAllProps("boxSizing") && (document.documentMode === undefined || document.documentMode > 7); });

    // Change the width of all elements to account for no border-box, damn IE
    if(!($('html').hasClass('boxsizing'))){
        $('*').each(function(){
            if($(this).css('display')=='block'){
                var f, a, n;
                f = $(this).outerWidth();
                a = $(this).width();
                n = a-(f-a);
                $(this).css('width', n);
            }
        });
    }
    
    if ($('.mobile-see-more-rooms').length > 0 && $('.hotel-list-box').length > 0) {
        $('.mobile-see-more-rooms').on('click', function(){
            $('.hotel-list-box').slideDown();
            $(this).hide();
            $('.hotel-details-box').hide();
        });
    }

    
    // validation onclick Next step button
    $('#next-step').on('click', function(event){
        event.preventDefault();

        var ARRIVAL=$('#aDate').val();
        var DEPART=$('#dDate').val();
        var ADULTS=$('#adults').val();
        var ROOMS=$('#rooms').val();  

        $("#close_ok").val("P");
        
        var message='';
        var ageBox='';
        var ageOption='';
        var today = new Date(2021,3,22);
        var aD = new Date(2021,4,13);
        var aD_date = $.datepicker.parseDate( "dd-M-y", ARRIVAL);

        if (ARRIVAL == null || DEPART == null || ARRIVAL == "" || DEPART == "" || ARRIVAL == '01-JAN-70'){
            message+="Please select an arrival date and a departure date.";        
        }else if (ARRIVAL == null && DEPART == null && aD < today) {
            message+="Your selection is unavailable. Please choose another date or call";
        }else if (parseInt(ADULTS) < parseInt(ROOMS)){
            message+="Please select at least  " + ROOMS + " adults for " + ROOMS + " rooms.";
        }else if (BOOKING_TYPE == "air" && document.getElementById("airport") && (document.getElementById("airport").value == "" || document.getElementById("airport").value == "Departing Airport")){
            message+="Please select your departure airport for a packages or select room only.";
            $(".airport-input").addClass("invalid");
        }else if (BOOKING_TYPE == "air" && ((ARRIVAL != null && aD_date < today) || (ARRIVAL == null && aD < today)) && $("#airport").val() != ""){
            message+="Packages must be selected at least 3 days from today.";
        }else if (BOOKING_TYPE == "air" && ($("#airport").val().length > 3 || $("#airport").val().length < 3)){
            message+="Please select your departure airport for a packages or select room only.";
            $(".airport-input").addClass("invalid");
        }else if (BOOKING_TYPE == "ferry"){
            $("#airport").val("");
        }

        // show if there is message
        if (message != '') { 
            $('#error_message_content').empty();                              
            $('#error_message_content').append('<p class="center a95f5f">'+message+'</p>');
            $.fancybox({
                href: '#error-pop-up',
                fitToView  : false,
                autoSize: true,
                closeClick  : true,
                wrapCSS    : 'custom-pop-up',
                padding    : 0,
                maxWidth: "90%",
                margin     : 15
            }); 
        } else {
            // or show children age dialog
            if ($('#child').val()>0) {
                ageOption += '<select class="select-choices save full-select change_select childages" name="childages">';
ageOption+='<option value="0">00</option>';
ageOption+='<option value="1">01</option>';
ageOption+='<option value="2">02</option>';
ageOption+='<option value="3">03</option>';
ageOption+='<option value="4">04</option>';
ageOption+='<option value="5">05</option>';
ageOption+='<option value="6">06</option>';
ageOption+='<option value="7">07</option>';
ageOption+='<option value="8">08</option>';
ageOption+='<option value="9">09</option>';
ageOption+='<option value="10">10</option>';
ageOption+='<option value="11">11</option>';
ageOption+='<option value="12">12</option>';
ageOption+='<option value="13">13</option>';
ageOption+='<option value="14">14</option>';
ageOption+='<option value="15">15</option>';
ageOption+='<option value="16">16</option>';
ageOption+='<option value="17">17</option>';

                ageOption += '</select>';
                // show number of dropdowns depending on number of children selected
                for (i=1; i<=$('#child').val(); i++) {
                    ageBox+='<div class="row" style="margin-left: 33%;width:35%;"><div class="row-inner"><div class="first-col"><span class="childages_font">Child '+i+'</span></div>'+ageOption+'</div></div></div><br />';                    
                }
                ageBox+='<p class="center"><input type="submit" value="Submit" id="ch_submit"></p>';                    

                $('#children_content').empty().append(ageBox);

                for (i=0; i<=6; i++) {
                    if ($.cookie("childage"+i)){
                        var selector = ".childages:eq("+i+")";
                        $(selector).val($.cookie("childage"+i));
                    }
                }

                $.fancybox({
                        href: '#children',
                        fitToView	: false,
                        autoSize: true,
                        autoWidth: true,
                        autoHeight: true,
                        closeClick  : false,
                        wrapCSS		: 'custom-pop-up',
                        padding		: 0,
                        maxWidth: "90%",
                        margin 		: 15,
                        closeBtn : true,
                        hideOnOverlayClick : false,                        
                        helpers : { 
                            overlay : {closeClick: false}
                        }
                    });

              $(document).on('click', '#ch_submit', function(){
                     $.fancybox.close();

                     $(".childages").each(function(k,v){
                        $("#stg1_form").append("<input type='hidden' name='childages' value='"+$(this).val()+"' />");
                        $.cookie("childage"+k, $(this).val(), { path: '/', expires: 1 });
                    });
                   

                     if ($("#aDate").val() == $("#dDate").val() || $("#aDate").val() == "31-DEC-69") {
                        $('#error_message_content').empty();                              
                        $('#error_message_content').append('<p class="center a95f5f">Please select your departure date</p>');
                        $.fancybox({
                            href: '#error-pop-up',
                            fitToView  : false,
                            autoSize: true,
                            closeClick  : true,
                            wrapCSS    : 'custom-pop-up',
                            padding    : 0,
                            maxWidth: "90%",
                            margin     : 15
                        }); 
                        return false;
                    } 

                  if ($("#AFF").prop("class")){
                      if ($("#AFF").prop("class").indexOf("defaultTextActive") >= 0) {
                        $("#AFF").val('');
                      } 
                  }
                  if ($("#PC").prop("class")){
                      if ($("#PC").prop("class").indexOf("defaultTextActive") >= 0) { 
                        $("#PC").val('');
                      } else {
                        var pc_temp = encodeURIComponent($("#PC").val());
                        $("#PC").val(pc_temp);
                      }
                  }
                  $('#stg1_form').submit();
               });
                
            } else {

                if ($("#aDate").val() == $("#dDate").val() || $("#aDate").val() == "31-DEC-69") {
                        $('#error_message_content').empty();                              
                        $('#error_message_content').append('<p class="center a95f5f">Please select your departure date</p>');
                        $.fancybox({
                            href: '#error-pop-up',
                            fitToView  : false,
                            autoSize: true,
                            closeClick  : true,
                            wrapCSS    : 'custom-pop-up',
                            padding    : 0,
                            maxWidth: "90%",
                            margin     : 15
                        }); 
                        return false;
                  }

                if ($("#AFF").prop("class")){
                  if ($("#AFF").prop("class").indexOf("defaultTextActive") >= 0) {
                    $("#AFF").val('');
                  }
              }
              if ($("#PC").prop("class")){
                  if ($("#PC").prop("class").indexOf("defaultTextActive") >= 0) { 
                    $("#PC").val('');
                  } else {
                        var pc_temp = encodeURIComponent($("#PC").val());
                        $("#PC").val(pc_temp);
                  }
              }

              
                
              $('#stg1_form').submit();
            }
        }      
    });

    $('.travel-summary-box').on('click', function(){
        var me = $(this);
        var width = me.outerWidth();
        if ($('.all-wrap').outerWidth() <= 361) {
            var width = $('.all-wrap').outerWidth();
        }
        var offset = me.offset();
        var summary = $('.travel-summary-stuff');
        var all_wrap = $('.all-wrap');
        if (!me.hasClass('active')) {
            me.addClass('active');
            summary.css({
                display: 'block', 
                right: -width + 'px', 
                width: width + 'px', 
                top: $('.top-nav').height() + 'px',
                position: 'absolute'
            }).animate({ 
                right: 0
            }, { 
                duration: 250
            });
        } else {
            me.removeClass('active');
            summary.hide(250, function(){ $(this).css('position', 'fixed'); });
        }
    });
    
    $('.travel-summary-box-close').on('click', function(){
        $('.travel-summary-box').removeClass('active');
        $('.travel-summary-stuff').hide(250, function(){ $(this).css('position', 'fixed'); });
    });

   
    /* Creating promotions functionality */
    // airport selection autocomplete; start search after 3 letter put in    
    if ($('.airport-input').length > 0) {
        // using jquery ui's autocomplete plugin: http://jqueryui.com/autocomplete/
        $('.airport-input').autocomplete({
            minLength: 3,
            html:true,
            source: function( request, response ) {
                $.ajax({
                    type: "POST",
                    url: "ibe5.get_airport_json",
                    dataType: "json",
                    data: {
                        p_search: request.term
                    },
                    success: function( data ) {                                       
                        response(data);
                    }
                });
            },            
            open: function() {
                $('.ui-autocomplete').width($(this).outerWidth() + 100);
            },
            select: function(event, ui) {
                event.preventDefault();
                $(".airport-input").val(ui.item.label);
                $("#airport").val(ui.item.value);
                if ($('.selected .ui-state-default').length>0) {$('.selected .ui-state-default').popover('destroy');}
            }
        }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
            if (item.value == "QDF"){
                return $( "<li>" )
                    .append( '<a>' + item.label + '</a>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> Dallas/Fort Worth Love Field,  US (DAL)</h5>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> Dallas/Fort Worth Intl Apt, TX US (DFW)</h5>' )
                    .prependTo( ul );
            } else if (item.value == "WAS"){
                return $( "<li>" )
                    .append( '<a>' + item.label + '</a>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> Washington Ronald Reagan National Apt,  US (DCA)</h5>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> Washington Dulles International Apt,  US (IAD)</h5>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> Baltimore Washington International Apt, MD US (BWI)</h5>' )
                    .prependTo( ul );
            } else if (item.value == "CHI"){               
                return $( "<li>" )
                    .append( '<a>' + item.label + '</a>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> Chicago OHare International Apt,  US (ORD)</h5>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> Chicago Midway Apt,  US (MDW)</h5>' )
                    .prependTo( ul );
            } else if (item.value == "YTO"){
                return $( "<li>" )
                    .append( '<a>' + item.label + '</a>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> Toronto Lester B Pearson Intl Apt,  CA (YYZ)</h5>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> Toronto City Centre Apt,  CA (YTZ)</h5>' )
                    .prependTo( ul );
            } else if (item.value == "QHO"){
                return $( "<li>" )
                    .append( '<a>' + item.label + '</a>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> Houston Hobby Apt, TX US (HOU)</h5>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> Houston George Bush Intercontinental Ap,  US (IAH)</h5>' )
                    .prependTo( ul );
            } else if (item.value == "LON"){
                return $( "<li>" )
                    .append( '<a>' + item.label + '</a>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> London Heathrow Apt,  GB (LHR)</h5>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> London Gatwick Apt,  GB (LGW)</h5>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> London Stansted Apt,  GB (STN))</h5>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> London Luton Apt,  GB (LTN)</h5>' )                    
                    .prependTo( ul );
            } else if (item.value == "AEJ"){
                return $( "<li>" )
                    .append( '<a>' + item.label + '</a>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> San Francisco International Apt, CA US (SFO)</h5>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> Oakland International Apt, CA US (OAK)</h5>' )                  
                    .prependTo( ul );
            } else if (item.value == "ZLA"){
                return $( "<li>" )
                    .append( '<a>' + item.label + '</a>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> Los Angeles International Apt, CA US (LAX)</h5>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> Burbank, CA US (BUR)</h5>' )                  
                    .prependTo( ul );
            } else if (item.value == "ZDR"){ 
                return $( "<li>" )
                    .append( '<a>' + item.label + '</a>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> Punta Cana,  DO (PUJ)</h5>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> Santo Domingo,  DO (SDQ)</h5>' )                  
                    .append( '<h5><i class="fa fa-arrow-right"></i> La Romana,  DO (LRM)</h5>' )                  
                    .prependTo( ul );
            } else if (item.value == "AED"){ 
                return $( "<li>" )
                    .append( '<a>' + item.label + '</a>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> Miami International, FL US (MIA)</h5>' )
                    .append( '<h5><i class="fa fa-arrow-right"></i> Fort Lauderdale, FL US (FLL)</h5>' )                  
                    .append( '<h5><i class="fa fa-arrow-right"></i> West Palm Beach, FL US (PBI)</h5>' )                  
                    .prependTo( ul );
            } else {
                return $( "<li>" ).append( '<a>' + item.label + '</a>' ).appendTo( ul );
            }
        };
    }

	if ($(".datepicker").length > 0) {
		var resize_12 = null;
		$(window).resize(function(){
			// using this to make sure it only triggers when the person has stopped dragging the screen
			// otherwise it will trigger way too much, you will see me using this a lot for any other resizing event handlers
			if (resize_12 !== null) {
				clearTimeout(resize_12);
			}
			// this is to properly position the promotions popover positions to either pop to the right of bottom
			resize_12 = setTimeout(function(){
				//var months_showing = $(".datepicker").datepicker("option", "numberOfMonths");
				if ($(".all-wrap").width() < 676) {
					$(".datepicker").addClass("went-to-one");
				} else {
					$(".datepicker").removeClass("went-to-one");
				}
			}, 100);
		});
		$(window).trigger("resize");
	}

    if ($("#promos-box").length > 0) {
        var resize_1 = null;
        $(window).resize(function(){
            // using this to make sure it only triggers when the person has stopped dragging the screen
            // otherwise it will trigger way too much, you will see me using this a lot for any other resizing event handlers
            if (resize_1 !== null) {
                clearTimeout(resize_1);
            }
            resize_1 = setTimeout(function(){
                // this adjusts the height for the "Show Promotions" overlay to work properly
                // adjust_promo_box_height();
                $('.all-wrap:not(.fixed-width)').width($(window).outerWidth() - 36);
                if ($('.all-wrap').width() < 676) {
                    //$('.datepicker').addClass('went-to-one');
                    $('#promo-list ul li').each(function(){
                        $(this).data('popover').options.placement = 'bottom';
                    });
                } else {
                    //$('.datepicker').removeClass('went-to-one');
                    $('#promo-list ul li').each(function(){
                        $(this).data('popover').options.placement = 'right';
                    });
                }
            }, 100);
        });
        // triggers the above event handler once on page load
        $(window).trigger('resize');
        // this is the event handler that does the promotions hiding or showing on the top button only
        $('#promos-btn').on('click', function(){
            if (!$('#promo-list').hasClass('active')) {
                push_out_promos();
            } else {
                push_in_promos();
            }
        });
        var bye_promos; // used to delay the hiding of promos on mouseout
		// this makes it so that you can click anywhere on the left bar to make the promotions show up
		// and not just the top left button
        $('#promo-list').on('click mouseenter', function(){
            if (!$(this).hasClass('active')) {
                clearTimeout(bye_promos);
                push_out_promos();
            }
        });
		// this is what sets up the promotion details to come out, NOT the actual popping out
		// notice the trigger is manual, so im actually making another event handler to actually make it pop out below on line 299
        $('#promo-list ul li').popover({
            html: true,
            placement: $(window).width() < 481 ? 'bottom' : 'right',
            animation: false,
            trigger: 'manual',
            //container: 'body',
            content: function(){ return $(this).find('.promo-content').html(); },
            delay: { show: 1, hide: 0 }
        });
        // this event handler is used in order for the promotion details to not come off the screen
        $(document).on('shown.bs.popover', '#promo-list.active ul li', function(){
            //console.log($(this).next().css('top'));
            var thepopover = $(this).next();
            var placement = $(this).data('popover').options.placement;
            // this is to account for that top popover that gets cut off at the top -_-
            var top = parseInt(thepopover.css('top').replace('px', ''));
            if (top < 0) {
                thepopover.css('top', '10px');
                thepopover.find('.arrow').css('top', '35%');
            }
            if (placement == 'bottom') {
                thepopover.css('left', '30px');
                //thepopover.find('.arrow').css('left', '35%');
            }
        });
        // this creates the appropriate event handling to make the promotion details come out
        $(document).on(!($('html').hasClass('touch')) ? 'mouseover' : 'touchstart', '#promo-list.active ul li', function(e){
            $('#promo-list.active ul li').popover('hide');
            $(this).popover('show');
        });
    } else {
        
        $('.all-wrap').css("left","0px");

    }

    if ($('.children-picker').length > 0) {
        $('.children-picker').popover({
            html: true,
            placement: 'bottom',
            animation: false,
            trigger: 'click',
            //container: 'body',
            content: function(){ return $('.children-stuff-inner').show(); }
        }).on('hide.bs.popover', function(){
            // gotta do this to preserve the data selected
            $('.children-stuff').append($('.children-stuff-inner'));
        });
        $(document).on('click', 'a.children-complete', function(e){
            e.preventDefault();
            $('.children-picker').popover('hide');
        });
    }

    
    var unavailable_dates = [];
    var no_arrivals = [];
    var unavail_v2 = [];
    var promotions = [];    
    var rates = {};
    var prev_date = null;
    var last_avail_date = null;
    var has_xml = false;

    // get the rates from xml
    function parse_rates(xml) {   
        var unavailable = [];               
        var nonarrivale = [];                                
        var promotion = [];  
        var unavail_v = [];
        var rate = {};

        $( xml ).find('RS').each(function(){
            $(this).find('R').each(function(){

                  var date = new Date($(this).attr("D").substr(0,4), $(this).attr("D").substr(4,2)-1, $(this).attr("D").substr(6,2));
                  last_avail_date = date;
                  var d = $.datepicker.formatDate( "yy-mm-dd", date);  
                  var a = Math.round($(this).attr("A") * cur_conv);
                  var c = $(this).attr("C");
                  var p = $(this).attr("P");  
                              
                  if (c==='Y') {
                      if (prev_date != null && (prev_date == "O" || prev_date == "Y")){
                          unavail_v.push(d); 
                          unavailable.push(d);
                          prev_date = "A";  
                      } else {
                        unavailable.push(d);
                        prev_date = "C";
                      } 
                  } else if (c==='A') {
                      nonarrivale.push(d);   
                      prev_date = "A";
                  } else if (p==='Y') {       
                      promotion.push(d);
                      prev_date = "Y";
                  } else {
                     prev_date = "O";
                  }

                                             

                  rate[d]=a;     
            });
        });
        
        unavailable_dates = unavailable;
        no_arrivals = nonarrivale;
        promotions = promotion;  
        unavail_v2 = unavail_v;
        rates = rate;
    }

        /*var xml = null;        
        $.ajax({
            type: "GET",            
            async: false,
            url: "/hotel_fastlink_js/10304.xml",
            dataType: "xml",
            success: function(res){
                xml =  res;
                has_xml = true;
                parse_rates(xml);
            },
            error: function(res, textStatus, errorThrown){
                get_data('30-APR-21','31-OCT-21', textStatus + errorThrown.substring(0, 20));
            }
        });  */

        
        if(typeof CAL_XML === "undefined"){
            get_data('30-APR-21','31-OCT-21', "File Not Found");
        } else {
            try{
                var xmlDoc = jQuery.parseXML(CAL_XML);
                parse_rates(xmlDoc);
            }catch(e){
                $.ajax({
                    type: "POST",            
                    async: false,
                    url: "ibe5.get_xml_data_backup",
                    data: {},
                    dataType: "xml",
                    success: function(xml1){      
                        parse_rates(xml1);
                    }                       
                }); 
            }
        }


                
               
        function get_data(startDate,endDate, errorText) {                
        var unavailable = [];               
        var nonarrivale = [];                                
        var promotion = [];   
        var unavail_v = [];
        var rate = {};

        $.ajax({
            type: "POST",            
            async: false,
            url: "ibe5.get_xml_data",
            data: {
                xHotelCode:'10304',
                xRoomCode: '',
                xRateCode: '',
                xPackageRestriction: 'H',
                xStartDate: startDate?startDate:'22-APR-21',
                xEndDate: endDate?endDate:'31-MAY-21',
                xAdults: '2',
                xChild: '0',
                xInfants: '0',
                xRooms: '1',
                xSource: '',
                xError: errorText,
                xCountry: '',
                xDebug: '',

                date_format: 'DD-MON-YY',
                currency: ''},
            dataType: "xml",
            success: function(xml1){      
                parse_rates(xml1);
            }                       
        });        
    }      
    
    function showRate (date) {
        return rates[date]?rates[date]:'';        
    }    

    function parse_promo_dates(xml) {   
        var promotion = [];                                                  

        $( xml ).find('RS').each(function(){
            $(this).find('R').each(function(){
                                                  var date = new Date($(this).attr("D").substr(0,4), $(this).attr("D").substr(4,2)-1, $(this).attr("D").substr(6,2));
                  var d = $.datepicker.formatDate( "yy-mm-dd", date);  
                              
                  promotion.push(d);                        
            });
        });
        
        promotions = promotion;    
    }
   
    function check_the_date(needle, hay){
        for (var i = 0; i < hay.length; i++) {
            if (needle == hay[i]) {
                return true;
            }
        }
        return false;
    }  


    /* Travel calendar functionality */
    if ($('.travel-calendar').length > 0) {
                var curX, curY;
        var _moving = null;
		var _selected_date = null;
				$(document).on('mousemove', function(e){
			if (_moving != null) {
				clearTimeout(_moving);
			}
			_moving = setTimeout(function(){
				curX = e.pageX;				
				curY = e.pageY;				                
			}, 100);
		});		
			
		$(document).on('click', 'a.date-cell-promo-btn', function(e){
		        e.stopPropagation();
			    $('.datepicker .popover').remove();
		});

        var now = new Date();
        var dT1 = -1, dT2 = -1;
        
        var temp1 = new Date(2021,4,13);
        var temp2 = new Date(2021,4,20);
var temp3 = new Date();

        var temp4 = new Date(2021,5,22);
        var d1 = temp1?temp1.getTime():-1, d2 = temp2?temp2.getTime():-1;
        var firstDay;
        var lastDay;

        $( "#reset-calendar" ).on('click', function(){            
            $('.selected .ui-state-default').popover('destroy');
            d1=-1;
            d2=-1;
            $('.datepicker').datepicker('refresh');            
        });
        

            firstDay = new Date(temp1.getFullYear(), temp1.getMonth(), 1);
            var minD = firstDay;
            
        
var showPrice=1;
showPrice=0;
                       
        var stopDate = -1;
        var curDate = new Date((new Date()).setHours(0, 0, 0, 0)); 
        $('.datepicker').datepicker({ 
            numberOfMonths: 2, 
            minDate: minD,
            prevText: '',
            nextText: '',

            dayNamesMin: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
            showLowestRate: function(date) {
                var cur = $.datepicker.formatDate( "yy-mm-dd", date);               
                if (showPrice && showPrice==1) {
                    var price = showRate(cur);                                    
                    return price!=0?price:'';
                } else {
                    if (true) {
                        var price = showRate(cur);                                    
                        return price!=0?price:'';
                    } else {
                        var price = showRate(cur);                                    
                        return '';
                    }   
                }                               
            

                            },
            beforeShowDay: function(date){
                var curL = $.datepicker.formatDate( "yy-mm-dd", date);
                var classDate = $.datepicker.formatDate( "dd-M-y", date);
                var available = true;
                var classn = '';
                var d = new Date(); // today!\
                d.setDate(d.getDate() - 1);
                if (date < d) {
                    classn = 'unavail';
                    available = false;  
                } else if (check_the_date(curL, promotions)){
                    classn = 'promos';
                } else if (check_the_date(curL, unavail_v2)){
                    classn = 'unavail2' + " " + classDate;
                    available = false;    
                } else if (check_the_date(curL, unavailable_dates)){
                    classn = 'unavail' + " " + classDate;
                    available = false;                        
                } else if (check_the_date(curL, no_arrivals)){
                    classn = 'no-arrive';            
                    available = false;
                } else if (date > last_avail_date && has_xml == true) {
                    classn = 'unavail';
                    available = false;  
                } else {
                    classn = 'reg';
                }
                

                    if (( d1 == -1 && d2 != -1 && d2 === date.getTime()) || ( d2 == -1 && d1 != -1 && d1 === date.getTime())) {
                        classn = 'date-range-selected';                        }

                if (d1 != -1 && d2 != -1 && date.getTime() >= Math.min(d1, d2) && date.getTime() <= Math.max(d1, d2)) {                                   
                    if ( classn != 'unavail'  + " " + classDate && classn != 'unavail2'  + " " + classDate ) {                        
                        if (stopDate != -1 ) {                                                                        
                            if ( stopDate >= date.getTime() ) {                                                    
                                classn = 'date-range-selected';                                
                            } else {
                                if (check_the_date(curL, no_arrivals)){
                                    classn = 'no-arrive';                                                                                                           
                                } else if (check_the_date(curL, promotions)){
                                    classn = 'promos';
                                } else {
                                    classn = ' ';                                                                                         
                                }
                            }
                        } else {
                            if (+_selected_date == +date) {
                                classn = 'date-range-selected selected';                                                        
                            } else {
                                classn = 'date-range-selected';
                            }        
                        }
                    } else {
                        
                        if (check_the_date(curL, unavail_v2)){
                            g = curL.split("-");
                            cur = new Date(g[0], g[1] - 1, g[2]);
                            if (+cur === +_selected_date) {

                                classn = 'date-range-selected';
                                available = true;
                                  
                            } else if  ( classn.toUpperCase().indexOf($( "#dDate" ).val().toUpperCase()) > 0 ) {
                                 classn = 'date-range-selected';
                                 available = true;
                            } else {
                                classn = 'unavail';
                                stopDate = date.getTime();                                

                                if (stopDate!=curDate.getTime()) {
                                    if (firstTime >= 0){
$('#error_message_content').empty().append('<p class="center a95f5f">Your selection is unavailable. Please choose another date or call +52 619 9557763 for possible limited inventory.</p>');

                                            var OK = false;  
                                            var show = false;
                                            var resp = "";
                                            $('.suggest_available').remove();


                                            OK = false;  
                                            show = false;
                                            $.ajax({
                                                type: "POST",            
                                                async: false,
                                                url: "ibe5.get_xml_data",
                                                data: {
                                                    xHotelCode:'10226',
                                                    xRoomCode: '',
                                                    xRateCode: '',
                                                    xPackageRestriction: 'H',
                                                    xStartDate: $( "#aDate" ).val(),
                                                    xEndDate: $( "#dDate" ).val(),
                                                    xAdults: '2',
                                                    xChild: '0',
                                                    xInfants: '0',
                                                    xRooms: '1',
                                                    xSource: '',
                                                    xError: 'N',
                                                    xCountry: '',
                                                    xDebug: '',

                                                    currency: ''},
                                                dataType: "xml",
                                                success: function(xml1){      
                                                    $( xml1 ).find('RS').each(function(){
                                                        $(this).find('R').each(function(){
                                                            if ($(this).attr("C") == "Y"){
                                                                OK = false;
                                                                return false;
                                                            } else {
                                                                OK = true;
                                                            }
                                                        });
                                                        
                                                        if (OK == true){
                                                            show = true;
                                                            resp += '<a class="suggest_available" style="color: white;" href="ibe5.main?hotel=10226&aDate='+$( "#aDate" ).val()+'&dDate='+$( "#dDate" ).val()+'&showcalendar=Y"><p class="center compare-btn" id="error-pop-up-msg" style="font-weight: bold;  background: #00529c;display: block; padding: 7px; text-align: center; border-radius: 3px;">PUEBLO BONITO ROSE RESORT & SPA</p></a>';
                                                            
                                                        }

                                                    });
                                                }                       
                                            });    

                                        


                                            OK = false;  
                                            show = false;
                                            $.ajax({
                                                type: "POST",            
                                                async: false,
                                                url: "ibe5.get_xml_data",
                                                data: {
                                                    xHotelCode:'10224',
                                                    xRoomCode: '',
                                                    xRateCode: '',
                                                    xPackageRestriction: 'H',
                                                    xStartDate: $( "#aDate" ).val(),
                                                    xEndDate: $( "#dDate" ).val(),
                                                    xAdults: '2',
                                                    xChild: '0',
                                                    xInfants: '0',
                                                    xRooms: '1',
                                                    xSource: '',
                                                    xError: 'N',
                                                    xCountry: '',
                                                    xDebug: '',

                                                    currency: ''},
                                                dataType: "xml",
                                                success: function(xml1){      
                                                    $( xml1 ).find('RS').each(function(){
                                                        $(this).find('R').each(function(){
                                                            if ($(this).attr("C") == "Y"){
                                                                OK = false;
                                                                return false;
                                                            } else {
                                                                OK = true;
                                                            }
                                                        });
                                                        
                                                        if (OK == true){
                                                            show = true;
                                                            resp += '<a class="suggest_available" style="color: white;" href="ibe5.main?hotel=10224&aDate='+$( "#aDate" ).val()+'&dDate='+$( "#dDate" ).val()+'&showcalendar=Y"><p class="center compare-btn" id="error-pop-up-msg" style="font-weight: bold;  background: #00529c;display: block; padding: 7px; text-align: center; border-radius: 3px;">PUEBLO BONITO SUNSET BEACH GOLF & SPA RESORT</p></a>';
                                                            
                                                        }

                                                    });
                                                }                       
                                            });    

                                        


                                            OK = false;  
                                            show = false;
                                            $.ajax({
                                                type: "POST",            
                                                async: false,
                                                url: "ibe5.get_xml_data",
                                                data: {
                                                    xHotelCode:'10227',
                                                    xRoomCode: '',
                                                    xRateCode: '',
                                                    xPackageRestriction: 'H',
                                                    xStartDate: $( "#aDate" ).val(),
                                                    xEndDate: $( "#dDate" ).val(),
                                                    xAdults: '2',
                                                    xChild: '0',
                                                    xInfants: '0',
                                                    xRooms: '1',
                                                    xSource: '',
                                                    xError: 'N',
                                                    xCountry: '',
                                                    xDebug: '',

                                                    currency: ''},
                                                dataType: "xml",
                                                success: function(xml1){      
                                                    $( xml1 ).find('RS').each(function(){
                                                        $(this).find('R').each(function(){
                                                            if ($(this).attr("C") == "Y"){
                                                                OK = false;
                                                                return false;
                                                            } else {
                                                                OK = true;
                                                            }
                                                        });
                                                        
                                                        if (OK == true){
                                                            show = true;
                                                            resp += '<a class="suggest_available" style="color: white;" href="ibe5.main?hotel=10227&aDate='+$( "#aDate" ).val()+'&dDate='+$( "#dDate" ).val()+'&showcalendar=Y"><p class="center compare-btn" id="error-pop-up-msg" style="font-weight: bold;  background: #00529c;display: block; padding: 7px; text-align: center; border-radius: 3px;">PUEBLO BONITO LOS CABOS</p></a>';
                                                            
                                                        }

                                                    });
                                                }                       
                                            });    

                                        


                                            OK = false;  
                                            show = false;
                                            $.ajax({
                                                type: "POST",            
                                                async: false,
                                                url: "ibe5.get_xml_data",
                                                data: {
                                                    xHotelCode:'10225',
                                                    xRoomCode: '',
                                                    xRateCode: '',
                                                    xPackageRestriction: 'H',
                                                    xStartDate: $( "#aDate" ).val(),
                                                    xEndDate: $( "#dDate" ).val(),
                                                    xAdults: '2',
                                                    xChild: '0',
                                                    xInfants: '0',
                                                    xRooms: '1',
                                                    xSource: '',
                                                    xError: 'N',
                                                    xCountry: '',
                                                    xDebug: '',

                                                    currency: ''},
                                                dataType: "xml",
                                                success: function(xml1){      
                                                    $( xml1 ).find('RS').each(function(){
                                                        $(this).find('R').each(function(){
                                                            if ($(this).attr("C") == "Y"){
                                                                OK = false;
                                                                return false;
                                                            } else {
                                                                OK = true;
                                                            }
                                                        });
                                                        
                                                        if (OK == true){
                                                            show = true;
                                                            resp += '<a class="suggest_available" style="color: white;" href="ibe5.main?hotel=10225&aDate='+$( "#aDate" ).val()+'&dDate='+$( "#dDate" ).val()+'&showcalendar=Y"><p class="center compare-btn" id="error-pop-up-msg" style="font-weight: bold;  background: #00529c;display: block; padding: 7px; text-align: center; border-radius: 3px;">PUEBLO BONITO PACIFICA GOLF & SPA RESORT</p></a>';
                                                            
                                                        }

                                                    });
                                                }                       
                                            });    

                                        


                                            OK = false;  
                                            show = false;
                                            $.ajax({
                                                type: "POST",            
                                                async: false,
                                                url: "ibe5.get_xml_data",
                                                data: {
                                                    xHotelCode:'10427',
                                                    xRoomCode: '',
                                                    xRateCode: '',
                                                    xPackageRestriction: 'H',
                                                    xStartDate: $( "#aDate" ).val(),
                                                    xEndDate: $( "#dDate" ).val(),
                                                    xAdults: '2',
                                                    xChild: '0',
                                                    xInfants: '0',
                                                    xRooms: '1',
                                                    xSource: '',
                                                    xError: 'N',
                                                    xCountry: '',
                                                    xDebug: '',

                                                    currency: ''},
                                                dataType: "xml",
                                                success: function(xml1){      
                                                    $( xml1 ).find('RS').each(function(){
                                                        $(this).find('R').each(function(){
                                                            if ($(this).attr("C") == "Y"){
                                                                OK = false;
                                                                return false;
                                                            } else {
                                                                OK = true;
                                                            }
                                                        });
                                                        
                                                        if (OK == true){
                                                            show = true;
                                                            resp += '<a class="suggest_available" style="color: white;" href="ibe5.main?hotel=10427&aDate='+$( "#aDate" ).val()+'&dDate='+$( "#dDate" ).val()+'&showcalendar=Y"><p class="center compare-btn" id="error-pop-up-msg" style="font-weight: bold;  background: #00529c;display: block; padding: 7px; text-align: center; border-radius: 3px;">THE TOWERS AT PUEBLO BONITO PACIFICA</p></a>';
                                                            
                                                        }

                                                    });
                                                }                       
                                            });    

                                        
$('#suggest_hotels_content').append(resp);

                                    if ($('.suggest_available').text() != "") {
                                        $.fancybox({
                                            href: '#suggest_hotels',
                                            fitToView  : false,
                                            autoSize: true,
                                            closeClick  : true,
                                            wrapCSS    : 'custom-pop-up',
                                            padding    : 0,
                                            maxWidth: "90%",
                                            margin     : 15
                                        });
                                    } else {
                                    $.fancybox({
                                            href: '#error-pop-up',
                                            fitToView  : false,
                                            autoSize: true,
                                            closeClick  : true,
                                            wrapCSS    : 'custom-pop-up',
                                            padding    : 0,
                                            maxWidth: "90%",
                                            margin     : 15
                                        });
                                    }

                                 } else if ($("#suggest_hotels") && $("#suggest_hotels").is(":hidden")) {
                                        $.fancybox({
                                            href: '#error-pop-up',
                                            fitToView  : false,
                                            autoSize: true,
                                            closeClick  : true,
                                            wrapCSS    : 'custom-pop-up',
                                            padding    : 0,
                                            maxWidth: "90%",
                                            margin     : 15
                                        });
                                        firstTime++;
                                    }
                                } 
                            }
                        } else if (check_the_date(curL, unavailable_dates)){
                            classn = 'unavail';
                            stopDate = date.getTime();                                
                            if ($("#suggest_hotels") && $("#suggest_hotels").is(":hidden")) {
                            if (stopDate!=curDate.getTime()) {            
                                $.fancybox({
                                    href: '#error-pop-up',
                                    fitToView  : false,
                                    autoSize: true,
                                    closeClick  : true,
                                    wrapCSS    : 'custom-pop-up',
                                    padding    : 0,
                                    maxWidth: "90%",
                                    margin     : 15
                                });
                            }
                            }                                                                
                        } else if (check_the_date(curL, no_arrivals)){
                            classn = 'no-arrive';
                            available = true;    
                        }                      
                    }                     
                } else if (d1 != -1 && d2 == -1 && (classn == 'no-arrive' || classn == 'unavail2'  + " " + classDate) && d1 <= date.getTime() ) {
                    available = true;
                }                

                                                                return [available, classn];
            },
            onSelect: function(selected, dp){      
                
                         
                                cur = (new Date(dp.selectedYear, dp.selectedMonth, dp.selectedDay)).getTime();

                                cir=new Date(dp.selectedYear, dp.selectedMonth, dp.selectedDay);

                    var p =new Date(cir.getFullYear() || new Date().getFullYear(), cir.getMonth()+1, 0).getDate();
                    var x = p - 7;
                    if(firstClick == false)
                    {
                        if (dp.currentMonth != dp.drawMonth) {
                        
                            if (dp.selectedDay >= x && dp.selectedDay <= p) {
                                
                                
                                    $('.datepicker').datepicker('setDate', new Date(selected));
                                    firstDay = $.datepicker.formatDate("dd-M-y", new Date(dp.selectedYear, dp.selectedMonth, 1), {}).toUpperCase();
                                    lastDay = $.datepicker.formatDate("dd-M-y", new Date(dp.selectedYear, dp.selectedMonth + 2, 0), {}).toUpperCase();


                                    $('.datepicker').datepicker('option', 'minDate', firstDay);
                                    $('.datepicker').datepicker('setDate', new Date(selected));

                                    $('.datepicker').datepicker('refresh');
                                    
                                    firstClick = true;
                            }
                            firstClick = true;
                            //console.log(firstClick);
                        
                        }
                        firstClick = true;
                    }else if(firstClick == true){
                            //console.log("Seleccionar");
                            //console.log(firstClick);
                            firstClick = false;
                        }
                        //console.log(firstClick);


                if (dT1 == -1 && dT2 == -1) {
                    d1 = -1;
                    d2 = -1;    
                    dT1 = cur;
                    d1 = dT1;
                    $('td .ui-state-default').popover('destroy');
                    //var fn = parent.disabled_btn;
                    //if(fn!=undefined){parent.disabled_btn()}   
                } else if (dT1 != -1) {
                    dT2 = cur;
                    d2 = dT2;
                    dT1 = -1;
                    dT2 = -1;
                    stopDate = -1;
                    var start_date = new Date(Math.min(d1,d2));                            
                    _selected_date = new Date(Math.max(d1,d2));

                                        $.ajax({
                        type: "POST",            
                        async: false,
                        url: "ibe5.promos_popup",
                        data: {
                            xHotelCode: '10304',
                            xStartDate: $.datepicker.formatDate( 'dd-M-y', new Date(Math.min(d1,d2)), {} ).toUpperCase(),
                            xEndDate: $.datepicker.formatDate( 'dd-M-y', new Date(Math.max(d1,d2)), {} ).toUpperCase(),
                            xAdults: $('#adults').val(),
                            xChild: $('#child').val(),
                            xInfants: '0',
                            xRooms: $('#rooms').val(),
                            xCountry: 'PE',
                            xLang: 1,
                            xMobile: $('#xmobile').val(),
                            currency: 'US$'
                        },
                        dataType: "html",
                        success: function(response){
                            
                            setTimeout(function(){
                                var placement = 'right';
                                var page_width = $(document).outerWidth();
                                var popover_width = 296;
                        					
                                if (curX + popover_width > page_width) {
                                    placement = 'left';
                                }
                        					
                                if (page_width < (popover_width * 2)) {
                                    if (curX + popover_width > page_width && curX - popover_width < 0) {
                                        placement = 'top';
                                    }
                                }
                        			
                                $('.datepicker .popover').remove();
                                
                                $('.selected .ui-state-default').addClass("last-day-calendar");
                                $('.selected .ui-state-default').popover({                
                                    html: true,
                                    placement: placement,
                                    animation: false,
                                    trigger: 'click',
                                    container: '.datepicker',                    
                                    content: function(){ 
                                        
                                        return response; 
                                    },
                                    delay: { show: 1, hide: 1 }
                                }).popover('show');			            
                            }, 100);
                        }
                    });
                }                             

                $('#aDate').val($.datepicker.formatDate( 'dd-M-y', new Date(Math.min(d1,d2)), {} ).toUpperCase());
                $('#dDate').val($.datepicker.formatDate( 'dd-M-y', new Date(Math.max(d1,d2)), {} ).toUpperCase());

            }
        }).prepend('<a href="javascript:;" class="long-prev dp-pag-pop-up-link"></a><a href="javascript:;" class="long-next dp-pag-pop-up-link"></a>');
        
                $(document).on('click', 'a.dp-pag-pop-up-link', function(){
            $('#aDate').val(null);
            $('#dDate').val(null);
            d1 = -1;
            dT1 = -1
            
            $.fancybox({
                href: '#long-range-datepicker'
            },
            {
                wrapCSS: 'long-range-fb',
                maxWidth: "90%",
                closeClick  : true,
                afterShow: function(){
                    $('#long-range-datepicker').css('display', 'table');
                    $('.fancybox-inner').css('overflow', 'visible');
                },
                afterClose: function(){
                    $('#long-range-datepicker').css('display', 'none');
                },
                closeEffect: 'none',
                fitToView: false,
                openEffect: 'none',
                margin: 3
            });
        });
        /*$(document).on('datepickerLoaded', function(){
            $('.travel-calendar td.promos').popover({
                placement: 'top',
                trigger: 'hover',
                animation: false,
                html: true,
                container: 'body',
                delay: { show: 1, hide: 1 },
                content: function(){
                    return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, sint nemo accusamus odit accusantium ipsum quidem deserunt vel repellendus quia fugiat ipsam fuga pariatur laborum earum molestias similique magnam aperiam!';
                }
            });
        });*/
    }

    /* long-range-datepicker fancybox  */
    if ($('#long-range-datepicker').length > 0) {
        $('#long-range-datepicker').datepicker({
            numberOfMonths: 5, 
            minDate: 0,
            maxDate: "+20m", 
            prevText: '',
            nextText: '',
            firstDay: 0,
            dayNamesMin: [ "S", "M", "T", "W", "T", "F", "S" ],
            beforeShowDay: function(date){
                var cur = $.datepicker.formatDate( "yy-mm-dd", date);                                
                var available = true;
                var classn = '';
                var d = new Date(); // today!\
                d.setDate(d.getDate() - 1);
                if (date < d) {
                    classn = 'unavail';
                    available = false;  
                } else if (check_the_date(cur, unavailable_dates)){
                    classn = 'unavail';
                    available = false;
                } else if (check_the_date(cur, no_arrivals)){
                    classn = 'no-arrive';
                } else if (check_the_date(cur, promotions)){
                    classn = 'promos';
                } else if (date > last_avail_date && has_xml == true) {
                    classn = 'unavail';
                    available = false;  
                } else {
                    classn = 'promos';
                }
                return [available, classn];
            },
            onSelect: function(selected, dp){
                $('.datepicker').datepicker('setDate', new Date(selected));
                firstDay=$.datepicker.formatDate( "dd-M-y", new Date(dp.selectedYear, dp.selectedMonth, 1),{}).toUpperCase();
                lastDay=$.datepicker.formatDate( "dd-M-y", new Date(dp.selectedYear, dp.selectedMonth+2, 0),{}).toUpperCase();

                $('.datepicker').datepicker('option', 'minDate', firstDay);
                $('.datepicker').datepicker('setDate', new Date(selected));

                $('.datepicker').datepicker('refresh');

                $.fancybox.close();
            }
        });
        $(document).on('click', '#long-range-datepicker .ui-datepicker-group', function(e){
            if (e.target.innerText === 'Prev') {
                return false;
            }
            var me = $(this);
            var month = me.find('.ui-datepicker-month').text();
            var year = me.find('.ui-datepicker-year').text();
            var new_date = new Date(month + ' 1, ' + year);
            $('.datepicker').datepicker('setDate', new_date);

            firstDay=$.datepicker.formatDate( "dd-M-y", new_date ,{}).toUpperCase();
            lastDay=$.datepicker.formatDate( "dd-M-y", new Date(year, new_date.getMonth() + 2, 0),{}).toUpperCase();

            $('.datepicker').datepicker('option', 'minDate', firstDay);
            $('.datepicker').datepicker('setDate', new Date(firstDay));
            
            $('.datepicker').datepicker('refresh');
        
            $.fancybox.close();
        });
        $(document).on('click', '.ui-datepicker-unselectable', function(e){
            /*e.stopPropagation();             return false;*/

            if (firstTime > 0){
$('#error_message_content').empty().append('<p class="center a95f5f">Your selection is unavailable. Please choose another date or call +52 619 9557763 for possible limited inventory.</p>');
}
 var OK = false;  
                                            var show = false;
                                            var temp_arr = $(this).attr("class").split(" ");
                                            var temp_date = temp_arr[temp_arr.length-1];
                                            var adate = "";
                                            var edate = "";
                                            var resp = "";


                                             OK = false;  
                                             show = false;
                                             temp_arr = $(this).attr("class").split(" ");
                                             temp_date = temp_arr[temp_arr.length-1];
                                             adate = "";
                                             edate = "";
                                            if (temp_date == "ui-state-disabled" || temp_date == "unavail" || temp_date == "date-range-selected" || temp_date == "ui-datepicker-today" || temp_date == "ui-datepicker-current-day" || temp_date == "promos" || temp_date == "no-arrive"){
$('#error_message_content').empty().append('<p class="center a95f5f">Your selection is unavailable. Please choose another date or call +52 619 9557763 for possible limited inventory.</p>');
		
												$.fancybox({
						                            href: '#error-pop-up',
						                            fitToView	: false,
						                            autoSize: true,
						                            closeClick  : true,
						                            wrapCSS		: 'custom-pop-up',
						                            padding		: 0,
						                            maxWidth: "90%",
						                            margin 		: 15
						                        });
						                        firstTime++;
												return false;
											} else if ($( "#aDate" ).val() == ""){
                                                adate = temp_date;
                                                edate = temp_date;
                                            } else {
                                                var arr1 = $( "#dDate" ).val().toUpperCase().split("-");
                                                var arr2 = temp_date.toUpperCase().split("-");
                                                if (arr1[1] == arr2[1]){
                                                    if (parseInt(arr1[0]) < parseInt(arr2[0])){
                                                        adate = $( "#dDate" ).val();
                                                        edate = temp_date;
                                                    } else {
                                                        adate = temp_date;
                                                        edate = $( "#dDate" ).val();
                                                    }
                                                } else {
                                                    if (parseInt(arr1[0]) < parseInt(arr2[0])){
                                                        adate = temp_date;
                                                        edate = $( "#dDate" ).val();
                                                    } else {
                                                        adate = $( "#dDate" ).val();
                                                        edate = temp_date;
                                                    }
                                                }
                                            }

                                            $('.suggest_available').remove();
                                            $.ajax({
                                                type: "POST",            
                                                async: false,
                                                url: "ibe5.get_xml_data",
                                                data: {
                                                    xHotelCode:'10226',
                                                    xRoomCode: '',
                                                    xRateCode: '',
                                                    xPackageRestriction: 'H',
                                                    xStartDate: adate,
                                                    xEndDate: edate,
                                                    xAdults: '2',
                                                    xChild: '0',
                                                    xInfants: '0',
                                                    xRooms: '1',
                                                    xSource: '',
                                                    xError: 'N',
                                                    xCountry: '',
                                                    xDebug: '',

                                                    currency: ''},
                                                dataType: "xml",
                                                success: function(xml1){      
                                                    $( xml1 ).find('RS').each(function(){
                                                        $(this).find('R').each(function(){
                                                            if ($(this).attr("C") == "Y"){
                                                                OK = false;
                                                                return false;
                                                            } else {
                                                                OK = true;
                                                            }
                                                        });
                                                        
                                                        if (OK == true){
                                                            show = true;
                                                            resp += '<a class="suggest_available" style="color: white;" href="ibe5.main?hotel=10226&aDate='+adate+'&dDate='+edate+'&showcalendar=Y"><p class="center compare-btn" id="error-pop-up-msg" style="font-weight: bold;  background: #00529c;display: block; padding: 7px; text-align: center; border-radius: 3px;">PUEBLO BONITO ROSE RESORT & SPA</p></a>';
                                                            
                                                        }

                                                    });
                                                }                       
                                            });    

                                        


                                             OK = false;  
                                             show = false;
                                             temp_arr = $(this).attr("class").split(" ");
                                             temp_date = temp_arr[temp_arr.length-1];
                                             adate = "";
                                             edate = "";
                                            if (temp_date == "ui-state-disabled" || temp_date == "unavail" || temp_date == "date-range-selected" || temp_date == "ui-datepicker-today" || temp_date == "ui-datepicker-current-day" || temp_date == "promos" || temp_date == "no-arrive"){
$('#error_message_content').empty().append('<p class="center a95f5f">Your selection is unavailable. Please choose another date or call +52 619 9557763 for possible limited inventory.</p>');
		
												$.fancybox({
						                            href: '#error-pop-up',
						                            fitToView	: false,
						                            autoSize: true,
						                            closeClick  : true,
						                            wrapCSS		: 'custom-pop-up',
						                            padding		: 0,
						                            maxWidth: "90%",
						                            margin 		: 15
						                        });
						                        firstTime++;
												return false;
											} else if ($( "#aDate" ).val() == ""){
                                                adate = temp_date;
                                                edate = temp_date;
                                            } else {
                                                var arr1 = $( "#dDate" ).val().toUpperCase().split("-");
                                                var arr2 = temp_date.toUpperCase().split("-");
                                                if (arr1[1] == arr2[1]){
                                                    if (parseInt(arr1[0]) < parseInt(arr2[0])){
                                                        adate = $( "#dDate" ).val();
                                                        edate = temp_date;
                                                    } else {
                                                        adate = temp_date;
                                                        edate = $( "#dDate" ).val();
                                                    }
                                                } else {
                                                    if (parseInt(arr1[0]) < parseInt(arr2[0])){
                                                        adate = temp_date;
                                                        edate = $( "#dDate" ).val();
                                                    } else {
                                                        adate = $( "#dDate" ).val();
                                                        edate = temp_date;
                                                    }
                                                }
                                            }

                                            $('.suggest_available').remove();
                                            $.ajax({
                                                type: "POST",            
                                                async: false,
                                                url: "ibe5.get_xml_data",
                                                data: {
                                                    xHotelCode:'10224',
                                                    xRoomCode: '',
                                                    xRateCode: '',
                                                    xPackageRestriction: 'H',
                                                    xStartDate: adate,
                                                    xEndDate: edate,
                                                    xAdults: '2',
                                                    xChild: '0',
                                                    xInfants: '0',
                                                    xRooms: '1',
                                                    xSource: '',
                                                    xError: 'N',
                                                    xCountry: '',
                                                    xDebug: '',

                                                    currency: ''},
                                                dataType: "xml",
                                                success: function(xml1){      
                                                    $( xml1 ).find('RS').each(function(){
                                                        $(this).find('R').each(function(){
                                                            if ($(this).attr("C") == "Y"){
                                                                OK = false;
                                                                return false;
                                                            } else {
                                                                OK = true;
                                                            }
                                                        });
                                                        
                                                        if (OK == true){
                                                            show = true;
                                                            resp += '<a class="suggest_available" style="color: white;" href="ibe5.main?hotel=10224&aDate='+adate+'&dDate='+edate+'&showcalendar=Y"><p class="center compare-btn" id="error-pop-up-msg" style="font-weight: bold;  background: #00529c;display: block; padding: 7px; text-align: center; border-radius: 3px;">PUEBLO BONITO SUNSET BEACH GOLF & SPA RESORT</p></a>';
                                                            
                                                        }

                                                    });
                                                }                       
                                            });    

                                        


                                             OK = false;  
                                             show = false;
                                             temp_arr = $(this).attr("class").split(" ");
                                             temp_date = temp_arr[temp_arr.length-1];
                                             adate = "";
                                             edate = "";
                                            if (temp_date == "ui-state-disabled" || temp_date == "unavail" || temp_date == "date-range-selected" || temp_date == "ui-datepicker-today" || temp_date == "ui-datepicker-current-day" || temp_date == "promos" || temp_date == "no-arrive"){
$('#error_message_content').empty().append('<p class="center a95f5f">Your selection is unavailable. Please choose another date or call +52 619 9557763 for possible limited inventory.</p>');
		
												$.fancybox({
						                            href: '#error-pop-up',
						                            fitToView	: false,
						                            autoSize: true,
						                            closeClick  : true,
						                            wrapCSS		: 'custom-pop-up',
						                            padding		: 0,
						                            maxWidth: "90%",
						                            margin 		: 15
						                        });
						                        firstTime++;
												return false;
											} else if ($( "#aDate" ).val() == ""){
                                                adate = temp_date;
                                                edate = temp_date;
                                            } else {
                                                var arr1 = $( "#dDate" ).val().toUpperCase().split("-");
                                                var arr2 = temp_date.toUpperCase().split("-");
                                                if (arr1[1] == arr2[1]){
                                                    if (parseInt(arr1[0]) < parseInt(arr2[0])){
                                                        adate = $( "#dDate" ).val();
                                                        edate = temp_date;
                                                    } else {
                                                        adate = temp_date;
                                                        edate = $( "#dDate" ).val();
                                                    }
                                                } else {
                                                    if (parseInt(arr1[0]) < parseInt(arr2[0])){
                                                        adate = temp_date;
                                                        edate = $( "#dDate" ).val();
                                                    } else {
                                                        adate = $( "#dDate" ).val();
                                                        edate = temp_date;
                                                    }
                                                }
                                            }

                                            $('.suggest_available').remove();
                                            $.ajax({
                                                type: "POST",            
                                                async: false,
                                                url: "ibe5.get_xml_data",
                                                data: {
                                                    xHotelCode:'10227',
                                                    xRoomCode: '',
                                                    xRateCode: '',
                                                    xPackageRestriction: 'H',
                                                    xStartDate: adate,
                                                    xEndDate: edate,
                                                    xAdults: '2',
                                                    xChild: '0',
                                                    xInfants: '0',
                                                    xRooms: '1',
                                                    xSource: '',
                                                    xError: 'N',
                                                    xCountry: '',
                                                    xDebug: '',

                                                    currency: ''},
                                                dataType: "xml",
                                                success: function(xml1){      
                                                    $( xml1 ).find('RS').each(function(){
                                                        $(this).find('R').each(function(){
                                                            if ($(this).attr("C") == "Y"){
                                                                OK = false;
                                                                return false;
                                                            } else {
                                                                OK = true;
                                                            }
                                                        });
                                                        
                                                        if (OK == true){
                                                            show = true;
                                                            resp += '<a class="suggest_available" style="color: white;" href="ibe5.main?hotel=10227&aDate='+adate+'&dDate='+edate+'&showcalendar=Y"><p class="center compare-btn" id="error-pop-up-msg" style="font-weight: bold;  background: #00529c;display: block; padding: 7px; text-align: center; border-radius: 3px;">PUEBLO BONITO LOS CABOS</p></a>';
                                                            
                                                        }

                                                    });
                                                }                       
                                            });    

                                        


                                             OK = false;  
                                             show = false;
                                             temp_arr = $(this).attr("class").split(" ");
                                             temp_date = temp_arr[temp_arr.length-1];
                                             adate = "";
                                             edate = "";
                                            if (temp_date == "ui-state-disabled" || temp_date == "unavail" || temp_date == "date-range-selected" || temp_date == "ui-datepicker-today" || temp_date == "ui-datepicker-current-day" || temp_date == "promos" || temp_date == "no-arrive"){
$('#error_message_content').empty().append('<p class="center a95f5f">Your selection is unavailable. Please choose another date or call +52 619 9557763 for possible limited inventory.</p>');
		
												$.fancybox({
						                            href: '#error-pop-up',
						                            fitToView	: false,
						                            autoSize: true,
						                            closeClick  : true,
						                            wrapCSS		: 'custom-pop-up',
						                            padding		: 0,
						                            maxWidth: "90%",
						                            margin 		: 15
						                        });
						                        firstTime++;
												return false;
											} else if ($( "#aDate" ).val() == ""){
                                                adate = temp_date;
                                                edate = temp_date;
                                            } else {
                                                var arr1 = $( "#dDate" ).val().toUpperCase().split("-");
                                                var arr2 = temp_date.toUpperCase().split("-");
                                                if (arr1[1] == arr2[1]){
                                                    if (parseInt(arr1[0]) < parseInt(arr2[0])){
                                                        adate = $( "#dDate" ).val();
                                                        edate = temp_date;
                                                    } else {
                                                        adate = temp_date;
                                                        edate = $( "#dDate" ).val();
                                                    }
                                                } else {
                                                    if (parseInt(arr1[0]) < parseInt(arr2[0])){
                                                        adate = temp_date;
                                                        edate = $( "#dDate" ).val();
                                                    } else {
                                                        adate = $( "#dDate" ).val();
                                                        edate = temp_date;
                                                    }
                                                }
                                            }

                                            $('.suggest_available').remove();
                                            $.ajax({
                                                type: "POST",            
                                                async: false,
                                                url: "ibe5.get_xml_data",
                                                data: {
                                                    xHotelCode:'10225',
                                                    xRoomCode: '',
                                                    xRateCode: '',
                                                    xPackageRestriction: 'H',
                                                    xStartDate: adate,
                                                    xEndDate: edate,
                                                    xAdults: '2',
                                                    xChild: '0',
                                                    xInfants: '0',
                                                    xRooms: '1',
                                                    xSource: '',
                                                    xError: 'N',
                                                    xCountry: '',
                                                    xDebug: '',

                                                    currency: ''},
                                                dataType: "xml",
                                                success: function(xml1){      
                                                    $( xml1 ).find('RS').each(function(){
                                                        $(this).find('R').each(function(){
                                                            if ($(this).attr("C") == "Y"){
                                                                OK = false;
                                                                return false;
                                                            } else {
                                                                OK = true;
                                                            }
                                                        });
                                                        
                                                        if (OK == true){
                                                            show = true;
                                                            resp += '<a class="suggest_available" style="color: white;" href="ibe5.main?hotel=10225&aDate='+adate+'&dDate='+edate+'&showcalendar=Y"><p class="center compare-btn" id="error-pop-up-msg" style="font-weight: bold;  background: #00529c;display: block; padding: 7px; text-align: center; border-radius: 3px;">PUEBLO BONITO PACIFICA GOLF & SPA RESORT</p></a>';
                                                            
                                                        }

                                                    });
                                                }                       
                                            });    

                                        


                                             OK = false;  
                                             show = false;
                                             temp_arr = $(this).attr("class").split(" ");
                                             temp_date = temp_arr[temp_arr.length-1];
                                             adate = "";
                                             edate = "";
                                            if (temp_date == "ui-state-disabled" || temp_date == "unavail" || temp_date == "date-range-selected" || temp_date == "ui-datepicker-today" || temp_date == "ui-datepicker-current-day" || temp_date == "promos" || temp_date == "no-arrive"){
$('#error_message_content').empty().append('<p class="center a95f5f">Your selection is unavailable. Please choose another date or call +52 619 9557763 for possible limited inventory.</p>');
		
												$.fancybox({
						                            href: '#error-pop-up',
						                            fitToView	: false,
						                            autoSize: true,
						                            closeClick  : true,
						                            wrapCSS		: 'custom-pop-up',
						                            padding		: 0,
						                            maxWidth: "90%",
						                            margin 		: 15
						                        });
						                        firstTime++;
												return false;
											} else if ($( "#aDate" ).val() == ""){
                                                adate = temp_date;
                                                edate = temp_date;
                                            } else {
                                                var arr1 = $( "#dDate" ).val().toUpperCase().split("-");
                                                var arr2 = temp_date.toUpperCase().split("-");
                                                if (arr1[1] == arr2[1]){
                                                    if (parseInt(arr1[0]) < parseInt(arr2[0])){
                                                        adate = $( "#dDate" ).val();
                                                        edate = temp_date;
                                                    } else {
                                                        adate = temp_date;
                                                        edate = $( "#dDate" ).val();
                                                    }
                                                } else {
                                                    if (parseInt(arr1[0]) < parseInt(arr2[0])){
                                                        adate = temp_date;
                                                        edate = $( "#dDate" ).val();
                                                    } else {
                                                        adate = $( "#dDate" ).val();
                                                        edate = temp_date;
                                                    }
                                                }
                                            }

                                            $('.suggest_available').remove();
                                            $.ajax({
                                                type: "POST",            
                                                async: false,
                                                url: "ibe5.get_xml_data",
                                                data: {
                                                    xHotelCode:'10427',
                                                    xRoomCode: '',
                                                    xRateCode: '',
                                                    xPackageRestriction: 'H',
                                                    xStartDate: adate,
                                                    xEndDate: edate,
                                                    xAdults: '2',
                                                    xChild: '0',
                                                    xInfants: '0',
                                                    xRooms: '1',
                                                    xSource: '',
                                                    xError: 'N',
                                                    xCountry: '',
                                                    xDebug: '',

                                                    currency: ''},
                                                dataType: "xml",
                                                success: function(xml1){      
                                                    $( xml1 ).find('RS').each(function(){
                                                        $(this).find('R').each(function(){
                                                            if ($(this).attr("C") == "Y"){
                                                                OK = false;
                                                                return false;
                                                            } else {
                                                                OK = true;
                                                            }
                                                        });
                                                        
                                                        if (OK == true){
                                                            show = true;
                                                            resp += '<a class="suggest_available" style="color: white;" href="ibe5.main?hotel=10427&aDate='+adate+'&dDate='+edate+'&showcalendar=Y"><p class="center compare-btn" id="error-pop-up-msg" style="font-weight: bold;  background: #00529c;display: block; padding: 7px; text-align: center; border-radius: 3px;">THE TOWERS AT PUEBLO BONITO PACIFICA</p></a>';
                                                            
                                                        }

                                                    });
                                                }                       
                                            });    

                                        
$('#suggest_hotels_content').append(resp);

            if ($('.suggest_available').text() != "") {
                    $.fancybox({
                        href: '#suggest_hotels',
                        fitToView  : false,
                        autoSize: true,
                        closeClick  : true,
                        wrapCSS    : 'custom-pop-up',
                        padding    : 0,
                        maxWidth: "90%",
                        margin     : 15
                    });
           } else {
                $.fancybox({
                            href: '#error-pop-up',
                            fitToView	: false,
                            autoSize: true,
                            closeClick  : true,
                            wrapCSS		: 'custom-pop-up',
                            padding		: 0,
                            maxWidth: "90%",
                            margin 		: 15
                        });
                        firstTime++;
                }
        });

    }
    
    /*
        setting up mobile menu button
    */
    if ($('.mob-menu').length > 0) {
        $('.mob-menu').on('click', function(){
            if ($('.top-nav ul.top-nav-ul:hidden').length > 0) {
                $(this).html('&equiv; Hide Menu');
                $('.top-nav ul.top-nav-ul').slideDown();
            } else {
                $(this).html('&equiv; Menu');
                $('.top-nav ul.top-nav-ul').slideUp(400, function(){
                    $(this).css('display', '');
                });
            }
        });
    }

    

    /* custom dropdown select menu functionality */
    if ($('.that-select').length > 0) {
        initialize_ddls($('.that-select'));
    }

    /* pop ups */
    if ($('.pop-up-list li a').length > 0) {
        $('.pop-up-list li a').on('click', function(e){
            e.preventDefault();
        }).fancybox({
            fitToView    : false,
            autoSize: true,
            closeClick  : true,
            wrapCSS        : 'custom-pop-up',
            padding        : 0,
            maxWidth: "90%",
            margin         : 15
        });
    }

    if ($("a.pop-up-link-cur").length > 0) {
		$("a.pop-up-link-cur").on("click", function(e){
			e.preventDefault();
		}).fancybox({
            href: '#currency-converter',
            fitToView  : false,
            autoSize: true,
            wrapCSS    : 'custom-pop-up',
            padding    : 0,
            maxWidth: "90%",
            margin     : 15,
            closeClick  : false,   
            'hideOnOverlayClick':false,
            'hideOnContentClick':false,
            helpers     : { 
                overlay : {closeClick: false}             }
		});
	}


    if ($("a.pop-up-link-call").length > 0) {
		$("a.pop-up-link-call").on("click", function(e){
			e.preventDefault();
		}).fancybox({
            href: '#call-me',
            fitToView  : false,
            autoSize: true,
            wrapCSS    : 'custom-pop-up',
            padding    : 0,
            maxWidth: "90%",
            margin     : 15,
            closeClick  : false,   
            'hideOnOverlayClick':false,
            'hideOnContentClick':false,
            helpers     : { 
                overlay : {closeClick: false}             }
		});
	}

    /* real pop ups */
    if ($('a.pop-up-link').length > 0) {
        $('a.pop-up-link').on('click', function(e){
            e.preventDefault();
        }).fancybox({
            fitToView    : false,
            closeClick  : true,
            wrapCSS        : 'custom-pop-up',
            maxWidth: "90%",
            padding        : 0
        });
    }


     $("#cur_conv").click(function() {
            var curFrom = $( "#fromCurr" ).val();
            var curTo = $( "#toCurr" ).val();
            var amt = $( "#amt" ).val();
            var hotel_c = $( "#hotel_cur" ).val();
            $.get( "/win/owa/AIRLINK_EXT.CURRENCY_CALC1", { fromAmt: amt, toCurr: curTo, fromCurr: curFrom, hotel: hotel_c } )
              .done(function( data ) {
                $( "#to_cur" ).val(data);
            });
     });

     $("#call_me_btn").click(function() {
            var call_me_name = $( "#call_me_name" ).val();
            var call_me_phone = $( "#call_me_phone" ).val();
            var hotel_c = $( "#hotel_cur" ).val();
            var contry_code = $( "#contry_code" ).val();
            
            $.get( "/win/owa/ibe5.save_call_me", { 
                    call_me_name: call_me_name, 
                    call_me_phone: call_me_phone, 
                    contry_code: contry_code, 
                    adate: "13-MAY-21", 
                    ddate: "20-MAY-21",
                    adults: "2", 
                    child: "0", 
                    hotel: hotel_c } )
              .done(function( data ) {
                $(".call_me_response").html("<div class='col-md-12 text-center'><h4>Thank you! We will contact you shortly</h4></div>");
                $("#call_me_btn").hide();
            });
     });

     

     if ($.cookie('chat')){
         $( "#chat" ).val("Y");
     }


});    
    

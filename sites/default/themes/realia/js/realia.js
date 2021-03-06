Drupal.behaviors.languageSwitch = {
    attach: function (context, settings) {
        // var languageSwitch = jQuery('#block-realia-blocks-realia-language', context);
        // jQuery('.expand', languageSwitch).hide();

        // languageSwitch.hover(
        //     function () {
        //         jQuery('.expand', languageSwitch).show();
        //     },
        //     function () {
        //         jQuery('.expand', languageSwitch).hide();
        //     }
        // );

        // var min = parseInt(jQuery('#edit-field-price-value-min').val());
        // var max = parseInt(jQuery('#edit-field-price-value-max').val());

        // jQuery('#edit-field-price-value-wrapper label', context).append('<span class="price"><span class="value"><span class="from">' + min + '</span> - <span class="to">' + max + '</span></span></span>');
        // jQuery('#edit-field-price-value-wrapper .price .value .to', context).currency({ region: settings.theme.currency, thousands: ' ', decimal: ',', decimals: 0, prefix: settings.theme.prefix })
        // jQuery('#edit-field-price-value-wrapper .price .value .from', context).currency({ region: settings.theme.currency, thousands: ' ', decimal: ',', decimals: 0, prefix: settings.theme.prefix })

        // jQuery('#edit-field-price-value-wrapper .views-widget', context).slider({
        //     range: true,
        //     min: min,
        //     max: max,
        //     values: [ min, max],
        //     slide: function (event, ui) {
        //         jQuery('#edit-field-price-value-min').attr('value', ui.values[0]);
        //         jQuery('#edit-field-price-value-max').attr('value', ui.values[1]);

        //         jQuery('#edit-field-price-value-wrapper .price .value .from').text(ui.values[0]);
        //         jQuery('#edit-field-price-value-wrapper .price .value .from').currency({ region: settings.theme.currency, thousands: ' ', decimal: ',', decimals: 0, prefix: settings.theme.prefix_currency });

        //         jQuery('#edit-field-price-value-wrapper .price .value .to').text(ui.values[1]);
        //         jQuery('#edit-field-price-value-wrapper .price .value .to').currency({ region: settings.theme.currency, thousands: ' ', decimal: ',', decimals: 0, prefix: settings.theme.prefix_currency });
        //     }
        // });

        jQuery('#btn-nav', context).click(function (e) {
            jQuery('body').toggleClass('nav-open');
	    if(jQuery('#header-wrapper').hasClass('white'))
		jQuery('#header-wrapper').removeClass('white');
	    if(jQuery('#header-wrapper').hasClass('fixed'))
		jQuery('#header-wrapper').removeClass('fixed');
	    for(var i = 0; i < Opentip.tips.length; i ++) { 
		if(Opentip.tips[i].options.style == 'info') {
		    Opentip.tips[i].hide();
		} 
	    }
            e.preventDefault();
        });
	if(jQuery(window).width() <= 979 ) {
	    jQuery('div.inline-form').removeClass("container");
	} else {
	    jQuery('div.inline-form').addClass("container");
	}
        jQuery('input[type="checkbox"]', context).ezMark();
        jQuery('input[type="radio"]', context).ezMark();
        jQuery('select:visible', context).chosen({disable_search_threshold: 10});

        if (jQuery.cookie !== undefined) {
            if (jQuery.cookie('palette') == 'off') {
                jQuery('#aviators-palette').addClass('closed');
            }

            jQuery('#aviators-palette .toggle', context).live('click', function (e) {
                e.preventDefault();

                if (jQuery.cookie('palette') == 'off') {
                    jQuery.cookie('palette', 'on');
                } else {
                    jQuery.cookie('palette', 'off');
                }

                jQuery(this).parent().toggleClass('closed');
                jQuery('#aviators-palette').css({'margin-left': '0px'});
            });
        }
    }
}
jQuery(document).ready(function(){
    var backToTop = jQuery('<i id="backToTop" class="fa fa-angle-up fa-2x" aria-hidden="true"></i>')
    jQuery('body').append(backToTop);
    jQuery("body").on('click', '#backToTop',function(){
	    jQuery('html, body').animate({
		scrollTop: 0
	    }, 800);
	});
    
    //jQuery('#header-wrapper').addClass('dark');
    jQuery('#toggle-filters').click(function() {
        jQuery(this).next().slideToggle();
    });
    if(jQuery(window).width() <= 1105) {
	var promobtn = jQuery('.navigation-wrapper').find('a.highlighted').clone();
	jQuery('div.logo').parent().append( promobtn );
    }
    jQuery('#header-wrapper').addClass('white');
    var scrollHeight = 50;
    var scrollHeight2 = 50;
    if(jQuery('#map .banner').length == 1) {
	scrollHeight2 = jQuery('#map .banner').offset().top /*+ 500*/;
    }
    jQuery(window).bind('scroll', function () {
	if (jQuery(window).scrollTop() > 200) {
	    jQuery('#backToTop').fadeIn('600');
	} else {
	    jQuery('#backToTop').fadeOut('600');
	}
	if (jQuery(window).scrollTop() > scrollHeight) {
	    if(!jQuery('body').hasClass('nav-open'))
	    {
		jQuery('#header-wrapper').addClass('fixed');
	    }
	} else {
	    jQuery('#header-wrapper').removeClass('fixed');
	}
//	if (jQuery(window).scrollTop() > scrollHeight2) {
//	    jQuery('#header-wrapper').addClass('white').removeClass('dark');
//	} else {
//	    jQuery('#header-wrapper').removeClass('white').addClass('dark');
//	}
    if(jQuery(window).scrollTop() < 580 && jQuery(window).scrollTop() > 60)
        jQuery("#dragger").css("top",jQuery(window).scrollTop());
        //jQuery("#dragger").animate({top: jQuery(window).scrollTop()}, 200);
    });
jQuery('.form-item').each(function(){
	var $description = jQuery(this).find('div.description');
	
	if($description.length > 0) {
	$description.hide();
	new Opentip(jQuery(this), $description.text(),'',{target:true,tipJoint:'right'});
	}
	});
	
	if(jQuery(document).width() < 500) {
	    jQuery("a.add-it").addClass("ctools-modal-mermix-modal-res");
	}else{
	    jQuery("a.add-it").addClass("ctools-modal-mermix-modal-fix");
	}
	if(jQuery('#gmap-looking-for-map').length && jQuery(window).width() <= 979) {
	var mapdivoffset = jQuery('#gmap-looking-for-map').offset().top;
	var header_height = jQuery('#header-wrapper').height();
	//if(jQuery(window).height() <= 700) {
	    jQuery('#gmap-looking-for-map').css('height',jQuery(window).height() - header_height);
	//}
	}
	jQuery("body").on('click', '.scroll-down-map',function(){
	    jQuery('html, body').animate({
		scrollTop: jQuery(this).offset().top + 15
	    }, 800);
	});
	
	jQuery("body").on('click', '.scroll-to-map',function(){
	    jQuery('html, body').animate({
		scrollTop: jQuery('#block-views-looking-for-map-block').offset().top 
	    }, 800);
	});
	
	var scrolldown = jQuery('<div class="scroll-down-map"><span>Scroll down</span><i class="fa fa-angle-down fa-2x" aria-hidden="true"></i></div>');
	jQuery("#gmap-looking-for-map").append(scrolldown);
});

jQuery( window ).resize(function() {
    if(jQuery(window).width() <= 979 ) {
	    jQuery('div.inline-form').removeClass("container");
	} else {
	    jQuery('div.inline-form').addClass("container");
	}
    
    jQuery('.chzn-container-single').each(function(){
    var width = jQuery(this).prev().parent().width();
    jQuery(this).css("width", width);
    });
    
    var logocontainer = jQuery('div.logo').parent();
	if(jQuery(window).width() <= 1105 ) {
	    if( logocontainer.find('a.highlighted').length < 1 ) {
	    var promobtn = jQuery('.navigation-wrapper').find('a.highlighted').clone();
	    logocontainer.append( promobtn );
	    }
	} else {
	logocontainer.find('a.highlighted').remove();   
	}
    if(jQuery(document).width() < 500) {
	    jQuery("a.add-it").removeClass("ctools-modal-mermix-modal-fix").addClass("ctools-modal-mermix-modal-res");
	}else{
	    jQuery("a.add-it").removeClass("ctools-modal-mermix-modal-res").addClass("ctools-modal-mermix-modal-fix");
	}
	if(jQuery('#gmap-looking-for-map').length && jQuery(window).width() <= 979) {
	var mapdivoffset = jQuery('#gmap-looking-for-map').offset().top;
	var header_height = jQuery('#header-wrapper').height();
	//if(jQuery(window).height() <= 700) {
	    jQuery('#gmap-looking-for-map').css('height',jQuery(window).height() - header_height );
	//}
	}
    });
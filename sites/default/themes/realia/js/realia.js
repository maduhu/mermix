Drupal.behaviors.languageSwitch = {
    attach: function (context, settings) {
        var languageSwitch = jQuery('#block-realia-blocks-realia-language', context);
        jQuery('.expand', languageSwitch).hide();

        languageSwitch.hover(
            function () {
                jQuery('.expand', languageSwitch).show();
            },
            function () {
                jQuery('.expand', languageSwitch).hide();
            }
        );

        var min = parseInt(jQuery('#edit-field-price-value-min').val());
        var max = parseInt(jQuery('#edit-field-price-value-max').val());

        jQuery('#edit-field-price-value-wrapper label', context).append('<span class="price"><span class="value"><span class="from">' + min + '</span> - <span class="to">' + max + '</span></span></span>');
        jQuery('#edit-field-price-value-wrapper .price .value .to', context).currency({ region: settings.theme.currency, thousands: ' ', decimal: ',', decimals: 0, prefix: settings.theme.prefix })
        jQuery('#edit-field-price-value-wrapper .price .value .from', context).currency({ region: settings.theme.currency, thousands: ' ', decimal: ',', decimals: 0, prefix: settings.theme.prefix })

        jQuery('#edit-field-price-value-wrapper .views-widget', context).slider({
            range: true,
            min: min,
            max: max,
            values: [ min, max],
            slide: function (event, ui) {
                jQuery('#edit-field-price-value-min').attr('value', ui.values[0]);
                jQuery('#edit-field-price-value-max').attr('value', ui.values[1]);

                jQuery('#edit-field-price-value-wrapper .price .value .from').text(ui.values[0]);
                jQuery('#edit-field-price-value-wrapper .price .value .from').currency({ region: settings.theme.currency, thousands: ' ', decimal: ',', decimals: 0, prefix: settings.theme.prefix_currency });

                jQuery('#edit-field-price-value-wrapper .price .value .to').text(ui.values[1]);
                jQuery('#edit-field-price-value-wrapper .price .value .to').currency({ region: settings.theme.currency, thousands: ' ', decimal: ',', decimals: 0, prefix: settings.theme.prefix_currency });
            }
        });

        jQuery('#btn-nav', context).click(function (e) {
            jQuery('body').toggleClass('nav-open');
            e.preventDefault();
        });

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
    jQuery('#toggle-filters').click(function() {
        jQuery(this).next().slideToggle();
    });
    if(jQuery(window).width() <= 1105) {
	var promobtn = jQuery('.navigation-wrapper').find('a.highlighted').clone();
	jQuery('div.logo').parent().append( promobtn );
    }
    
    var scrollHeight = 200;
    if(jQuery('#map .banner').length == 1) {
	scrollHeight = jQuery('#map .banner').offset().top + 700;
    }
    jQuery(window).bind('scroll', function () {
	if (jQuery(window).scrollTop() > scrollHeight) {
	    jQuery('#header-wrapper').addClass('fixed');
	} else {
	    jQuery('#header-wrapper').removeClass('fixed');
	}
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
});

jQuery( window ).resize(function() {
    //console.log(jQuery(window).width());
    var logocontainer = jQuery('div.logo').parent();
	if(jQuery(window).width() <= 1105 ) {
	    if( logocontainer.find('a.highlighted').length < 1 ) {
	    var promobtn = jQuery('.navigation-wrapper').find('a.highlighted').clone();
	    logocontainer.append( promobtn );
	    }
	} else {
	logocontainer.find('a.highlighted').remove();   
	}
    });
/*
 * jQuery Plugin: Multi Row Checkbox Menu
 * Version 1.0
 *
 * Copyright (c) 2010 Tom Holder Simpleweb Ltd (http://simpleweb.co.uk)
 * Licensed jointly under the GPL and MIT licenses,
 * choose which one suits your project best!
 *
 * Built for our product ContactZilla (http://contactzilla.com/) - check it out!
 *
 * Please feel free to use this code in your projects, just respect the license and retain this header.
 */
(function($){
	function log() {
		if (window.console && console.log) {
			for (var i = 0, len = arguments.length; i < len; i++) {
				console.log(arguments[i]);
			}
		}
	};
	$.fn.checkboxMenu = function(options) {

		var defaults = {
			buttonSelector: ":submit",
			checkboxIDPrefix: "selectAll",
			checkboxClasses: "selectAll",
			semiSelectClass: "semiSelect",
			menuClass: "",
            menuLinkClass: "menu",
			downClass: "down",
			childCheckboxes: "input[type=checkbox]",
                        removeSelectedItem: true,
			menuItemClick: function() { return true; }
		};

		var opts = $.extend(defaults, options);
		var containerCount = 0;

		return this.each(function(){

			var checkboxMenuContainer = $(this);
			checkboxMenuContainer.addClass('jquery-multirow-checkbox-menu-container');

			//UL containing the menu.
			var dropdownMenu = $("<ul>")
                            .appendTo(checkboxMenuContainer)
                            .addClass(opts.menuClass)
                            .addClass('jquery-multirow-checkbox-menu');

                        var selectedItem = false;

			//If there are input buttons inside the container, these will become the menu items.
			if($(opts.buttonSelector, checkboxMenuContainer).length >0) {


				//Build the menu
				//Loop over each submit button in our container and change it in to an LI item.
				$(opts.buttonSelector, checkboxMenuContainer).each(function() {

					var submitButton = $(this);
					var buttonText = $(this).attr('value');
                                        var itemIsSelected = submitButton.hasClass('selected');
                                        if(itemIsSelected) {
                                            selectedItem = buttonText;
                                        }

                                        //If selected item, should it be included in menu?
                                        if(!itemIsSelected || !opts.removeSelectedItem) {

                                            var li = $("<li>")
                                                    .appendTo(dropdownMenu)
                                                    .text(buttonText)
                                                    .click(function() {

                                                            var clickReturn = false;
                                                            if(selectedItem) {
                                                                clickReturn = opts.menuItemClick.call(this, $(this).text());
                                                            } else {
                                                                clickReturn = opts.menuItemClick.call(this, $(this).text(), $(opts.childCheckboxes).filter(':checked').not(checkboxSelectAll).length);
                                                            }

                                                            if(clickReturn) {

                                                                    //Put hidden element in to the form that will provide the same value as if the button had been pushed.
                                                                    var hiddenVal = $('<input>').attr('type','hidden')
                                                                                                                    .attr('name', submitButton.attr('name'))
                                                                                                                    .attr('value',submitButton.attr('value'))
                                                                                                                    .appendTo($(this).parents('form'));
                                                                    $(this).parents('form').submit();
                                                            }
                                                            return false;

                                                    });

                                            //Copy over ID of button to LI.
                                            if(submitButton.attr('id')) {
                                                    li.attr('id',submitButton.attr('id'));
                                            }

                                            //Copy over Classes of button to LI.
                                            if(submitButton.attr('class')) {
                                                    li.attr('class',submitButton.attr('class'));
                                            }

                                        }

					submitButton.remove(); //Take out the submit button.
				});

				//Add the menu link to show the menu items.
				var menuLink = $('<a>').attr('href','#')
					.addClass(opts.menuLinkClass)
					.text('Menu')
					.insertBefore(dropdownMenu)
					.click(function() {

                                                //Hide any other menus from the same plugin that might not be hidden.
                                                $('.jquery-multirow-checkbox-menu').not(dropdownMenu).hide();
                                                $('.jquery-multirow-checkbox-menu-container').not(checkboxMenuContainer).removeClass(opts.downClass);
						dropdownMenu.toggle();
						checkboxMenuContainer.toggleClass(opts.downClass);

						//Must return false otherwise click bubbles to document click below.
						return false;
					});

				//Attach an event to document click that will hide the menu if anything else is clicked.
				$('body').click(function(){
                                    $('.jquery-multirow-checkbox-menu').hide();
                                    $('.jquery-multirow-checkbox-menu-container').removeClass(opts.downClass);
				});
			}

                        if(selectedItem) {

                            var selectedSpan = $('<span>').addClass('selectedItem').text(selectedItem).insertBefore(menuLink);

                        } else {

                            //Label around the checkbox.
                            var checkboxLabel = $('<label>').attr('for', opts.checkboxIDPrefix + containerCount)
									.insertBefore(menuLink);

                            //The select all checkbox.
                            var checkboxSelectAll = $('<input>').attr('id',opts.checkboxIDPrefix + containerCount)
                                                                                    .attr('type', 'checkbox')
                                                                                    .addClass(opts.checkboxClasses)
                                                                                    .appendTo(checkboxLabel);

                            //Attach the event to the main checkbox that will toggle All/None selected check boxes.
                            checkboxSelectAll.click(function() {

                                    $(opts.childCheckboxes).each(function() {
                                            $(this).attr('checked', checkboxSelectAll.attr('checked'));
                                    });
                                    checkboxSelectAll.removeClass(opts.semiSelectClass);
                            });

                            //Attach event to all child boxes which will set the semi-selected transparency on the main check box.
                            $(opts.childCheckboxes).not(checkboxSelectAll).click(function() {

                                    if($(opts.childCheckboxes).filter(':checked').not(checkboxSelectAll).length != $(opts.childCheckboxes).not(checkboxSelectAll).length && $(opts.childCheckboxes).filter(':checked').not(checkboxSelectAll).length != 0) {
                                            checkboxSelectAll.addClass(opts.semiSelectClass);
                                            checkboxSelectAll.attr('checked',false);
                                    } else {
                                            checkboxSelectAll.removeClass(opts.semiSelectClass);

                                            //If everything is checked, check the master as well.
                                            if($(opts.childCheckboxes).filter(':checked').not(checkboxSelectAll).length != 0) {
                                                    checkboxSelectAll.attr('checked',true);
                                            }
                                    }

                            });

                        }


		});
	};
})(jQuery);

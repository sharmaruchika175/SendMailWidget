(function (app, $) {
	var $cache;
	var emailRegEx = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
	function initializeCache() {
		$cache = {
			sendButton			:	$(".send-button"),
			subjectInput		:	$("input[name = 'subject']"),
			subjectError		:	$(".subject-message"),
			emailAddressInput	:	$("input[type = 'email']"),
			contactsError		:	$(".contact-message"),
			checkbox			:   $("input[type = 'checkbox']"),
			emailForm			:	$("#email-form"),
			sentMessage			:	$(".sent-message"),
			addIcon				:	$(".add-icon"),
			mainContactContainer:	$(".main-contact-container"),
			addedContacts		:	$(".main-contact-container .added-contacts"),
			emailAddresses		:	$("input[name = 'emailaddresses']"),
			messageInput		:	$("textarea[name = 'message']")
		};
	}
	function initializeEvents() {
		$cache.addIcon.on("click", function(e) {
			if ($cache.emailAddressInput.val() != "") {
				if (validEmail()) {
					addContactToList();
				}
			}
		});
		$cache.sendButton.on("click", function() {
			
			var contacts = $(".main-contact-container .contact");
			var contactsArr = [];
			//Go through all the contacts and create an array with email ids
			$.each(contacts, function(index, contact) {
				contactsArr.push($(contact).text());
			});
			var contactsStr = contactsArr.join(",");
			$cache.emailAddresses.val(contactsStr);			
			
			var isValidSubject = validSubject();
			var isValidEmail = true;
			if (contactsStr == "" || $cache.emailAddressInput.val() != "") {
				isValidEmail = validEmail();
			}
			if (isValidSubject && isValidEmail) {
				var data = $cache.emailForm.serialize();
				if ($cache.checkbox.is(':checked')){
					data = data + "&save=true";
			        senddata(data);
				}
				else{
					senddata(data);	
				}
			}
		});
		$cache.emailAddressInput.blur(function(){
			if ($(this).val() != "") {
				if (validEmail()) {
					addContactToList();
				}
			}
		})
		.on('keydown', function(e){
			var val = $(this).val();
			// if backspace is pressed and value is empty delete the last contact span
			if(e.keyCode == 8) {
				if (val == "") {
					$(this).prev().remove();
					adjustWidthAndAddIcon();
				}
			} else {
				var contactsCount = $(".main-contact-container .contact").length;
				if (contactsCount == 2) {
					return false;
				}
			}
		});
	}
	function addContactToList() {
		var contactsCount = $(".main-contact-container .contact").length;
		var oddEven = (contactsCount % 2 == 0) ? 'even' : 'odd';
		var newContactDiv = $('<div></div>').addClass("contact " + oddEven).text($cache.emailAddressInput.val());
		$cache.emailAddressInput.before(newContactDiv);
		$cache.emailAddressInput.val("");
		adjustWidthAndAddIcon();		
	}
	function adjustWidthAndAddIcon() {
		var mainContactContainerWidth = $cache.mainContactContainer.width();
		var contactsWidth = 0;
		var contacts = $(".main-contact-container .contact");
		$.each(contacts, function(index, contact) {
			contactsWidth = contactsWidth + $(contact).width();
		});
		var addIcon = $cache.addIcon.width();
		$cache.emailAddressInput.width(mainContactContainerWidth - contactsWidth - addIcon - 50);
		var contactsCount = $(".main-contact-container .contact").length;
		if (contactsCount == 2) {
			$cache.addIcon.addClass("disabled");
		}
		else{
			$cache.addIcon.removeClass("disabled");
		}
	}
	function validSubject () {
		if ( $cache.subjectInput.val() == "") {
			$cache.subjectError.text("Please enter subject");
			return false;
		} else {
			$cache.subjectError.text("");
		}
		return true;
	}
	function validEmail () {
		if ( $cache.emailAddressInput.val() == "" || !$cache.emailAddressInput.val().match(emailRegEx)) {
			$cache.contactsError.text("Please enter email address");
			return false;
		}
		else {
			$cache.contactsError.text("");
		}
		return true;
	}
	function senddata(data){
		var url = "www.dummyurl.com/sendmail";
		$.ajax({
			url: url,
			type: "post",
			data: data,
			success: function(response){
				$cache.sentMessage.text("Email sent");
				setTimeout(function(){ 
					$cache.sentMessage.text("");
				},2000);
				$(".main-contact-container .contact").remove();
				$cache.subjectInput.val("");
				$cache.messageInput.val("");
			},
			error: function(response){
				//This should handle error but as the AJAX URL is not valid it will always end up here
				//So handling success scenario here as well
				$cache.sentMessage.text("Email sent");
				setTimeout(function(){ 
					$cache.sentMessage.text("");
				},2000);
				$(".main-contact-container .contact").remove();
				$cache.subjectInput.val("");
				$cache.messageInput.val("");
			}
		})
		
	}
	
	/******* app.sendmail public object ********/
	app.sendmail = {
		init : function () {
			initializeCache();
			initializeEvents();
		
		}
	}
}(window.app = window.app || {}, jQuery));


jQuery(document).ready(function() {
	app.sendmail.init();
});

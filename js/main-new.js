
//Anon function that smoothly animates the page when clicking on sections in the navbar
$(function() {
  var topoffset = 70; //variable for menu height

  //Use smooth scrolling when clicking on navigation
  $('.navbar-nav a').click(function() {
    if (location.pathname.replace(/^\//,'') ===
      this.pathname.replace(/^\//,'') &&
      location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-topoffset
        }, 500);
        return false;
      } //target.length
    } //click function
  }); //smooth scrolling

});


$( document ).ready(function() {

  $('#organisation-field-wrapper').css('display', 'none');

  //Grab the login form submit even so we can handle it with AJAX
  $(function() {
    $('#loginForm').submit(function(event) {

      event.preventDefault();

      $.ajax({
          type: 'POST',
          url: $('#loginForm').attr('action'),
          data: $('#loginForm').serialize(),
          success: function(data) {

            if(! data.login_status) {
              $('#login-error-label').css('display', 'inline-block');
            }
            else {
              window.location.href = '/dashboard/home';
            }
          }
      });

    }); 
  });


  $(function() {
    $('#newsletterForm').submit(function(event) {
      event.preventDefault();
      $.ajax({
          type: 'POST',
          url: $('#newsletterForm').attr('action'),
          data: $('#newsletterForm').serialize(),
          success: function(data) {
            $('#newsletterModal').modal('show');
          }
      });

    }); 
  });


  $(function() {
    $('#demoForm').submit(function(event) {
      
      $('#contact-submit').prop('disabled', true);
      
      event.preventDefault();
      
      $.ajax({
          type: 'POST',
          url: $('#demoForm').attr('action'),
          data: $('#demoForm').serialize(),
          success: function(data) {
            
            $('#contact-submit').prop('disabled', false);

            if(data.success) {
              $('#newsletterModal').modal('show');
            }
            else {
              alert('Please provide reason for contacting');
            }
            
          }
      });

    }); 
  });


  $('#contact-reason').change(function() {
    if(this.value == 1) {
      $('#organisation-field-wrapper').css('display', 'inline-block');
    }
    else {
      $('#organisation-field-wrapper').css('display', 'none');
    }
  });

});
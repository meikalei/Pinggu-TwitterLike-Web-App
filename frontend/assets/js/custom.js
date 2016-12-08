$('.ui.dropdown').dropdown();

$('#ping').on('click', (function(){
    $('#ping-modal')
        .modal('show')
    ;
}));

$('#signup').on('click', (function(){
    $('#signup-modal')
        .modal('show')
    ;
}));

// $('#pings-btn').on('click', (function(){
//     $('#pings-modal')
//         .modal('show')
//     ;
// }));

// $('#edit-btn').on('click', (function(){
//     $('#edit-modal')
//         .modal('show')
//     ;
// }));

// $('#del-btn').on('click', (function(){
//     $('#del-modal')
//         .modal('show')
//     ;
// }));

// $(document).on('click', '.delete.button', function(){
//     console.log('DELETE BUTTON CLICKED!');
// });

// $('.ui.radio.checkbox')
//     .checkbox()
// ;

$('.ui.sticky').sticky();

// $(document).ready(function() {
//     // Show or hide the sticky footer button
//     $(window).scroll(function() {
//         if ($(this).scrollTop() > 200) {
//             $('.go-top').fadeIn(200);
//         } else {
//             $('.go-top').fadeOut(200);
//         }
//     });
    
//     // Animate the scroll to top
//     $('.go-top').click(function(event) {
//         event.preventDefault();
        
//         $('html, body').animate({scrollTop: 0}, 300);
//     })
// });

$('.menu .item')
  .tab({
    cache: false,
    // faking API request
    apiSettings: {
      loadingDuration : 300,
      mockResponse    : function(settings) {
        var response = {
          first  : 'pings',
          second : 'followers',
          third  : 'following'
        };
        return response[settings.urlData.tab];
      }
    }
  })
;

// $('.special.cards .image').dimmer({
//   on: 'hover'
// });


$('#sub').on('click', (function(){
    $('#ping-modal')
        .modal('hide')
    ;
}));

$('#edit').on('click', (function(){
    $('#edit-modal')
        .modal('hide')
    ;
}));

$('#followers-home').on('click', function() {
    $(document).ready(function() {
      $('#pings-p').removeClass('active');
      $('#pings-tab').removeClass('active');
      $('#followers-p').addClass('active');
      $('#followers-tab').addClass('active');
    });
});

$('#following-home').on('click', function() {
    $(document).ready(function() {
        $('#pings-p').removeClass('active');
        $('#pings-tab').removeClass('active');
        $('#following-p').addClass('active');
        $('#following-tab').addClass('active');
    });
});

var maxPingLength = 140;
$('#compose-ping').on('keyup', function() {
    var length = $(this).val().length;
    var length = maxPingLength-length;
    $('#charcount').text(length);
    if (length < 0) {
        $('#sub').addClass('disabled');
    } else {
        $('#sub').removeClass('disabled');
    }
});

$('#edit-ping').on('keyup', function() {
    var length = $(this).val().length;
    var length = maxPingLength-length;
    $('#charcount-edit').text(length);
    if (length < 0) {
        $('#edit').addClass('disabled');
    } else {
        $('#edit').removeClass('disabled');
    }
});

$('#signup-form')
  .form({
    fields: {
      username: {
        identifier : 'username',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a username'
          }
        ]
      },
      email: {
        identifier : 'email',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your email'
          },
          {
            type   : 'email',
            prompt : 'Please enter a valid email'
          }
        ]
      },
      password: {
        identifier : 'password',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a password'
          },
          {
            type   : 'minLength[6]',
            prompt : 'Your password must be at least {ruleValue} characters'
          }
        ]
      }
    }
  })
;

$('#login-form')
  .form({
    fields: {
      username: {
        identifier : 'username',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a username'
          }
        ]
      },
      password: {
        identifier : 'password',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a password'
          }
        ]
      }
    }
  })
;
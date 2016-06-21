$(document).ready(function(){

  /* GET 'CODE FOR BOULDER' MEETUP.COM MEETING INFORMATION
  ============================================================================
  *
  ========================================================================= */
  var CFB_UPCOMING_INFO_URL = 'https://api.meetup.com/CodeForBoulder/events?&sign=true&photo-host=public&page=20';





  /* MOBILE MENU - HAMBURGER, 'X' CLICK EVENT HANDLER
  ============================================================================
  * Animate menu icon from hambuger to an X shape, vice versa
  ========================================================================= */
  $(document).on('click', '#hamburger', function() {
    // Animate hamburger -> 'X'
    $(this).toggleClass('open MobileNavToggle');
	});






  /* PAGE SCROLLING EFFECTS
  ============================================================================
  * Hide 'TopBar' and '#hamburger' when user scrolls down, unhide when
  scroll up
  * Adjust height of 'TopBar' when user scrolls from top of page
  ========================================================================= */
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('#js-TopBar').outerHeight();
  //true if TopBar is hovered

  $(window).scroll(function(event) {
    didScroll = true;
  });

  /* =============================== NOTE ===================================
    Attaching functions to scroll events can be very expensive to performance.
    Remedy this by checking if the user has scrolled on an interval instead of
    executing functions for every pixel scrolled.
  */

  setInterval(function() {
    var topBarHovered = $('#js-TopBar').is(':hover');//true if TopBar is hovered
    if (didScroll === true && !topBarHovered) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  // Called every 250ms if user has scrolled
  var hasScrolled = function() {
    var wScroll = $(this).scrollTop();

    if (wScroll > 150) {
      $("#js-TopBar").css("height", "75px");
    }
    else if (wScroll < 151) {
      $("#js-TopBar").css("height", "100px");
    }

    // Check if user scrolled more than delta(5)
    if (Math.abs( lastScrollTop - wScroll ) <= delta) {
      return;
    }

    // If user scrolled down and are past the 'TopBar', add class 'TopBar--hide'
    // This is necessary so user can never see what is "behind" the 'TopBar'
    if (wScroll > lastScrollTop && wScroll > navbarHeight) {
        // Scroll Down
        $('#js-TopBar').removeClass('nav-down').addClass('TopBar--hide');
        if ($('#hamburger').hasClass('MobileNavToggle')) {
          $('#hamburger').removeClass('nav-down').addClass('TopBar--hide');
        }
    } else {
        // Scroll Up
        if (wScroll + $(window).height() < $(document).height()) {
          $('#js-TopBar').removeClass('TopBar--hide').addClass('nav-down');
          $('#hamburger').removeClass('TopBar--hide').addClass('nav-down');
        }
    }

    lastScrollTop = wScroll;
  };

  /* RESPONSIVE PROJECTS GRID
  ============================================================================
  * Initialize isotope.js plugin on .projects-grid
  * resize width of .projects-grid to keep it's content centered on page
  * set isotope filter to fade all other thumbnails when one is clicked
  ========================================================================= */
  $(window).load(function(){

    var $grid = $('.projects-grid'),
        $body = $('body'),
        colW = 375,
        columns = null;


    $grid.isotope({
      // disable window resizing
      resizable: true,
      masonry: {
        columnWidth: colW
      }
    });

    $(window).smartresize(function(){
      // check if columns has changed
      var currentColumns = Math.floor( ( $body.width() -30 ) / colW );
      if ( currentColumns !== columns ) {
        // set new column count
        columns = currentColumns;
        // apply width to container manually, then trigger relayout
        $grid.width( columns * colW )
          .isotope('reLayout');
      }

    }).smartresize(); // trigger resize to set container width

    $('.project').click(function(){
          $('.project').addClass('js-project--selected');
          $('.projects-grid').addClass('js-projects-grid--selected');
          $('#js-projects-grid__close-btn').removeClass('hidden');

          var selector = $(this).attr('data-filter');
          $grid.isotope({
              filter: selector,
           });
           return false;
      });

    $('#js-projects-grid__close-btn').click(function(){
          $('.project').removeClass('js-project--selected');
          $('.projects-grid').removeClass('js-projects-grid--selected');
          $(this).addClass('hidden');

          var selector = $(this).attr('data-filter');
          $grid.isotope({
              filter: selector,
           });
           return false;
      });

  });

  /* LOCAL LINK SCROLL ANIMATION
  ============================================================================
  * Uses localScroll.js plugin
  ========================================================================= */
  //offset scrollTo element location to account for height of TopBar
  $.extend($.scrollTo.defaults, {
    offset: -100
  });

  $('.TopBar__nav').localScroll({duration:800});
  $('.MobileNav').localScroll({duration:800});

});

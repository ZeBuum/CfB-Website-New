$(document).ready(function(){

  /* GET 'CODE FOR BOULDER' MEETUP.COM MEETING INFORMATION
  ============================================================================
  *
  ========================================================================= */
  var CFB_UPCOMING_INFO_URL = 'https://api.meetup.com/CodeForBoulder/events?&sign=true&photo-host=public&page=20';





  /* MOBILE MENU - HAMBURGER CLICK EVENT HANDLER
  ============================================================================
  * Animate menu icon from hambuger to an X shape
  * Disable scrolling
  ========================================================================= */
  $(document).on('click', '#hamburger', function() {
    // Animate hamburger -> 'X'
    $(this).toggleClass('open');

    // Disable scrolling
    $('body').addClass('noscroll');
	});





  /* MOBILE MENU - 'X' CLICK EVENT HANDLER
  ============================================================================
  * Renable scrolling
  ========================================================================= */
  $(document).on('click', '.open', function() {
    // Enable scrolling
    $('body').removeClass('noscroll');

    console.log("Hi");
  });





  /* PAGE SCROLLING EFFECTS
  ============================================================================
  * Hide 'TopBar' and 'MobileNavToggle' when user scrolls down, unhide when
  scroll up
  * Adjust height of 'TopBar' when user scrolls from top of page
  ========================================================================= */
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('.TopBar').outerHeight();

  $(window).scroll(function(event) {
    didScroll = true;
  });

  /* =============================== NOTE ===================================
    Attaching functions to scroll events can be very expensive to performance.
    Remedy this by checking if the user has scrolled on an interval instead of
    executing functions for every pixel scrolled.
  */
  setInterval(function() {
    if (didScroll === true) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  // Called every 250ms if user has scrolled
  var hasScrolled = function() {
    var wScroll = $(this).scrollTop();

    if (wScroll > 150) {
      $(".TopBar").css("height", "75px");
    }
    else if (wScroll < 151) {
      $(".TopBar").css("height", "100px");
    }

    // Check if user scrolled more than delta(5)
    if (Math.abs( lastScrollTop - wScroll ) <= delta) {
      return;
    }

    // If user scrolled down and are past the 'TopBar', add class 'TopBar--hide'
    // This is necessary so user can never see what is "behind" the 'TopBar'
    if (wScroll > lastScrollTop && wScroll > navbarHeight) {
        // Scroll Down
        $('.TopBar').removeClass('nav-down').addClass('TopBar--hide');
        $('.MobileNavToggle').removeClass('nav-down').addClass('TopBar--hide');
    } else {
        // Scroll Up
        if (wScroll + $(window).height() < $(document).height()) {
          $('.TopBar').removeClass('TopBar--hide').addClass('nav-down');
          $('.MobileNavToggle').removeClass('TopBar--hide').addClass('nav-down');
        }
    }

    lastScrollTop = wScroll;
  };

  /* RESPONSIVE PROJECTS GRID
  ============================================================================
  * Initialize isotope.js plugin on .projects-grid
  * resize width of .projects-grid to keep it's content centered on page
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

  });



});

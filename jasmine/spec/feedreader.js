/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe("RSS Feeds", function() {
      /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* This test checks that URLs for all entries in our
				 * allFeeds array are defined and not empty strings.
				 * Additionally, it also checks that it is not an empty
				 * object.
				 */
      it("all URLs are defined", function() {
        for (var index in allFeeds) {
          expect(allFeeds[index].url).toBeDefined();
          expect(allFeeds[index].url).not.toBe("");
          expect(allFeeds[index].url).not.toBe(null);
        }
      });

      /* This test checks that names for all entries in our
				 * allFeeds array are defined and not empty strings.
				 * Additionally, it also checks that it is not an empty
				 * object.
				 */
      it("all names are defined", function() {
        for (var index in allFeeds) {
          expect(allFeeds[index].name).toBeDefined();
          expect(allFeeds[index].name).not.toBe("");
          expect(allFeeds[index].name).not.toBe(null);
        }
      });

      /* This additional test checks that calling loadFeed
			 * inside the bounds of allFeeds doesn't throw any
			 * unexpected exception, as previous tests may still
			 * admit illegal `name` and `url` values.
			 * Note: this saves some time from manually clicking
			 * all menu items to check all feeds singularly.
			 */
      it("does not throw errors in-bounds", function() {
				// checks the loadFeed function from last to first index
				for(var i = allFeeds.length; i > 0; i--){
	        expect(function() {
	          loadFeed(i-1);
	        }).not.toThrow();
				}
      });
    });

    /* This suite is all about the Menu, its appearance
		 * and its updates.
     */
    describe("The menu", function() {
      /* This tests that on the first load of the page,
			 * the menu is hidden by default.
			 */
      it("is hidden by default", function() {
        expect($("body").hasClass("menu-hidden")).toBe(true);
      });

      /* This tests that two concecutive clicks on the menuIcon
				  * a) change the visibility at each click
					* b) toggle between visible and hidden
					* Note: this test is not dependent on the initial visibility
					* of the menu.
					*/
      it("changes visibility on click", function() {
				// testClass holds the visibility check prior to the click
				let testClass;

        for (var i = 0; i < 2; i++) {
					testClass = $("body").hasClass("menu-hidden");
					$(".menu-icon-link").click();

          switch (testClass) {
            case false:
              expect($("body").hasClass("menu-hidden")).toBe(true);
              break;
            case true:
              expect($("body").hasClass("menu-hidden")).toBe(false);
              break;
            default:
              expect(true).toBe(false);
          }
					// switches the visibility
          $("body").toggleClass("menu-hidden");
        }
      });
    });

    /* This suite is about the initial entries loaded. */
    describe("Initial Entries", function() {
      /* This tests that the feed contains at least one entry.
				 * It uses callbacks to ensure that the spec is asynchronous.
				 */
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });

      it("contains at least one entry", function(done) {
        expect($(".feed .entry").length).toBeGreaterThan(0);
        done();
      });
    });

    /* This suite is about the selection of a different feed. */
    describe("New Feed Selection", function() {
      /* This tests that changing the feed also changes the page's content.
			 * It uses two nested callbacks to ensure that the spec is asynchronous.
			 */

			// feedOne and feedTwo hold the feed elements before and after
			// changing feed
			let feedOne, feedTwo;

      beforeEach(function(done) {
        loadFeed(1, function() {
          feedOne = $(".feed").html();
          loadFeed(0, function() {
            feedTwo = $(".feed").html();
            done();
          });
        });
      });

      it("changes the actual content", function(done) {
        expect(feedOne).not.toBe(feedTwo);
        done();
      });
    });
  })()
);

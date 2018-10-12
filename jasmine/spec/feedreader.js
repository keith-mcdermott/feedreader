/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('should be defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('should contain defined URLs', function (){
            for(let eachFeed in allFeeds){
                expect(allFeeds[eachFeed].url).toBeDefined();
                expect(allFeeds[eachFeed].url.length).not.toBe(0);
            };
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('should contain names',function (){
            for(let eachFeed in allFeeds){
                expect(allFeeds[eachFeed].name).toBeDefined();
                expect(allFeeds[eachFeed].name).not.toBe(0);
            };
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('the menu', function(){

        const body = document.querySelector('body');
        const menu = document.querySelector('.menu-icon-link');
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden by default', function(){
            expect(body.className).toBe('menu-hidden');
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('should toggle visibility on menu click', function(){

            if (body.className == 'menu-hidden'){
                menu.click();
                expect(body.className).toBe('');
            } else if (body.className == ''){
                menu.click();
                expect(body.className).toBe('menu-hidden');
            }

          });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){
            loadFeed(0, done);
        });


        it('should load a new feed', function(){
           const feed = document.querySelector('.feed');
           const entry = feed.childNodes;
           expect(entry.length > 0).toBe(true);         
        });

    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
 
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        const feed = document.querySelector('.feed');
        const firstFeed = [];
        
        beforeEach(function(done){
    
            loadFeed(0, function(){

                Array.from(feed.children).forEach(function(entry){
                firstFeed.push(entry.innerText);  
                });
            });
            
            loadFeed(1, done);
        });

        it('should change content', function(){
            Array.from(feed.children).forEach(function(entry, index){
                console.log(entry.innerText, firstFeed[index], entry.innerText===firstFeed[index])
                expect(entry.innerText === firstFeed[index]).not.toBe(true);
            // // console.log(feed.innerText)
        
            });
        });        
    });   

}());

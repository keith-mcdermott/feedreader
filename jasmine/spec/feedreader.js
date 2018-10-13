/* feedreader.js

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {
        // This test makes sure that the allFeeds variable has been defined and that it is not empty. 

        it('should be defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // This test loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
         it('should contain defined URLs', function (){
            for(let eachFeed in allFeeds){
                expect(allFeeds[eachFeed].url).toBeDefined();
                expect(allFeeds[eachFeed].url.length).not.toBe(0);
            };
         });

        // This test loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
         it('should contain names',function (){
            for(let eachFeed in allFeeds){
                expect(allFeeds[eachFeed].name).toBeDefined();

                //Revised per reviewer comment: check whether the length of allFeeds[eachFeed].name is equal to 0.
                expect(allFeeds[eachFeed].name.length).not.toBe(0);
            };
         });
    });


    describe('the menu', function(){

        const body = document.querySelector('body');
        const menu = document.querySelector('.menu-icon-link');

        // This test ensures the menu element is hidden by default. 
        //Revised per reviewer comment: check whether class list includes menu-hidden, not that menu-hidden is the only class
        it('should be hidden by default', function(){
            expect(body.classList.contains('menu-hidden')).toBe(true);
         });

         //This test ensures the menu changes visibility when the menu icon is clicked.
         it('should toggle visibility on menu click', function(){

            if (body.classList.contains('menu-hidden')){
                menu.click();
                expect(body.classList.contains('menu-hidden')).toBe(false);
            } else {
                menu.click();
                console.log('click');
                expect(body.classList.contains('menu-hidden')).toBe(true);
            }

          });

    });

    describe('Initial Entries', function(){

        // This test loads a feed and verifies that text is present.
        // "beforeEach" approach for this and the next test developed with reference to Matthew Cranford at https://matthewcranford.com/feed-reader-walkthrough-part-4-async-tests/ and Stack Overflow at https://stackoverflow.com

        beforeEach(function(done){
            loadFeed(0, done);
        });

        it('should load a new feed', function(){

            //Revised per reviewer comment: validates that .feed has child .entry.
           const feed=document.querySelector('.feed').querySelectorAll('.entry');
           expect(feed.length).toBeGreaterThan(0);         
        });

    });

    describe('New Feed Selection', function(){

        //This test compares the text of two feeds and evaluates whether they are the same. Identical text would suggest that a new feed did not load properly. The first feed is stored in variable firstFeed.

        //Revised per reviewer comment:
        
        const feed = document.querySelector('.feed');
        let firstFeed,
            secondFeed;
        
        beforeEach(function(done){
    
            loadFeed(0, function(){
                firstFeed=feed.innerHTML;
                loadFeed(1, done);
            });
          
        });

        it('should change content', function(){
            secondFeed=feed.innerHTML;
            expect(firstFeed).not.toBe(secondFeed);
        });        
    });   
}());


#Assignment 3: Realtime stockquotes

Objective: You will make a JavaScript application that will retrieve live stock quotes.

Learning objectives: AJAX, XMLHttpRequest

Improve yourself with websockets, unit-tests with Jasmine


###Functionality required for a satisfactory result include:
1. Valid JavaScript. Use the static-analyzer settings as provided in this repo
1. Operates in at least 2 render engines
1. Summary companies with the current share value
1. AJAX implementation with XMLHttpRequest. Refresh the page every _t_ seconds
1. Websockets implementation
1. Start with an empty page
1. Single page. No page-refesh but eg a div with price-information always updated
1. The page must be built entirely in JavaScript, start with an empty page
1. Data transfer with JSON
1. Unit tests, at least one test per method
1. Document the uses concepts in the README.md in the client directory

###To show off
1. Use of the canvas (HTML5)
1. Implement the AJAX calls and handling (please note: the exam assumes that you know and understand the XMLHttpRequest)
1. Adding graphics such as the evolution of prices over time, with minimum and maximum
1. Hottest, fastest fallers
What else you can imagine.

###Tip
1. Make an init function
1. Read initial JSON data into series object
1. Retrieve live data
1. Generate fake / test data (optional, if yahoo is not available)
1. drawTable in DOM or on the canvas
1. Make a loop for updating data with a time function
1. Retrieve live data
1. Generate fake / test data (optional, if yahoo is not available)
1. updateTable in DOM

###Resources
- Live data
  - With AJAX, use http://server7.tezzt.nl/~theotheu/stockquotes
  - With websockets, use http://server7.tezzt.nl:1333
- Yahoo finance at http://finance.yahoo.com/
- Yahoo Online Query language http://developer.yahoo.com/yql/console/
- Yahoo return formats at http://www.gummy-stuff.org/Yahoo-data.htm
- Take for example the stock quotes from the capitalist network that runs the world
- API directory at http://www.programmableweb.com/apis/

More info at http://webdev.tezzt.nl/wordpress/?page_id=26

    (function () {
        window.stockquote = {
    
            stocks: [],
    
            init: function(){
                return true;
            }
        }
    }());
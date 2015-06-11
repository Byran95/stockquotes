/*jslint browser: true, plusplus:true*/

describe("html tests", function(){

    var properties, methods;

    beforeEach(function(){
        var propertyName;
        app.init();

        properties = [];
        methods = [];
        for (propertyName in app) {
            if (app.hasOwnProperty(propertyName)) {
                if (app[propertyName].constructor === Function) {
                    methods.push(app[propertyName].prototype);
                } else {
                    properties.push(propertyName);
                }
            }
        }
    });

    it("Should verify that the app has properties and methods.", function () {
        expect(properties.length).not.toBe(0);
        expect(methods.length).not.toBe(0);

    });

    it("Should verify that series is defined and is an object", function () {
        var actualValue = app.series;
        expect(actualValue).toBeDefined();
        expect(actualValue.constructor).toBe(Object);
    });

    it("Should verify that series is not empty after parseData has been executed", function(){
        expect(Object.keys(app.series).length).toBeGreaterThan(0);
    });

    it("should verify getDate returns a date only from given new Date", function(){
        var date = new Date("Wed Mar 18 2015 16:14:29 GMT+0100 (CET)");
        expect(app.getDate(date)).toBe("02/03/2015");
    });

    it("should verify getTime returns a time only", function(){
        var date = new Date("Wed Mar 18 2015 16:14:29 GMT+0100 (CET)");
        expect(app.getTime(date)).toBe("8:14 pm");
    });

    it("Should verify retrieving realtime data cannot be tested", function () {
        var actualValue = app.retrieveData();
        var expectedValue = undefined;
        expect(actualValue).toBe(expectedValue);
    });


    it("should create dom elements for container and page title", function(){
        var expected = "Real Time Stockquote App";
        var actual = app.initHTML().querySelector("h1").textContent;
        expect(actual).toBe(expected);
    });

    it("should verify that showData has 25 rows", function(){
        var actual = app.showData().querySelectorAll("tr").length;
        var expected = 25;
        expect(actual).toBe(expected);
    });

    it("should verify that app.series is not empty", function(){
       expect(app.series).not.toBe({});
    });

    it("should verify that ranges include min and max", function(){
        var input = 100, range = 5, hitMin = 0, hitMax = 0, r;

        while(hitMin < 1 || hitMax < 1){
            r = app.rand(input, range);
            if(r === input - range){
                hitMin++;
            }else if (r === input + range){
                hitMax++;
            }
        }

        expect(hitMin).toBeGreaterThan(0);
        expect(hitMax).toBeGreaterThan(0);
    });

    afterEach(function(){
        document.body.removeChild(document.querySelector("#container"));
    });


});

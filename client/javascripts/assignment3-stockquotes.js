/*global app, io, data*/
(function () {
    "use strict";

    window.app = {

        settings: {
            refresh: 1000,
            ajaxUrl: 'http://server7.tezzt.nl/~theotheu/stockquotes/index.php',
            dataPoints: 100
        },

        socket: io('http://server7.tezzt.nl:1333/'),

        series: {},

        rand: function (input, range) {
            var max = input + range,
                min = input - range;
            return Math.floor(
                Math.random() * (max - min + 1)
            ) + min;
        },

        generateTestData: function () {
            var company, quote, newQuote, date;
            date = new Date();

            for (company in app.series) {
                if (app.series.hasOwnProperty(company)) {
                    quote = app.series[company][0];
                    newQuote = Object.create(quote);
                    newQuote.col0 = company;
                    newQuote.col2 = app.getDate(date);
                    newQuote.col3 = app.getTime(date);
                    newQuote.col4 = app.rand(-10, 15); //price difference between current and last value
                    app.series[company].push(newQuote);
                }
            }
        },

        getDate: function (date) {
            var dateTime, month, day, year;

            month = date.getMonth()
                .toString();
            day = date.getDay()
                .toString();
            year = date.getFullYear()
                .toString();

            if (month.length < 2) {
                month = "0" + month;
            }
            if (day.length < 2) {
                day = "0" + day;
            }

            dateTime = month + "/" + day + "/" + year;

            return dateTime;
        },

        getTime: function (date) {
            var hours, minutes, strTime;
            hours = date.getHours()
                .toFixed();
            minutes = date.getMinutes()
                .toString();

            if (hours.length > 1) {
                if (minutes.length < 2) {
                    minutes = "0" + minutes.toString();
                }
                strTime = (24 - hours)
                    .toString() + ":" + minutes + " pm";
            } else {
                strTime = hours.toString() + ":" + minutes + " am";
            }

            return strTime;
        },

        getDataFromAjax: function () {
            var xhr;
            xhr = new XMLHttpRequest();
            xhr.open("GET", app.settings.ajaxUrl);
            xhr.addEventListener("load", app.retrieveJSON);
            xhr.send();
        },

        retrieveJSON: function (response) {
            var data;
            data = JSON.parse(response.target.responseText);
            app.parseData(data.query.results.row);
        },

        retrieveData: function () {
            app.socket.on('stockquotes', function (data) {
                app.parseData(data.query.results.row);
            });
        },

        parseData: function (rows) {
            var i, company;

            for (i = 0; i < rows.length; i++) {
                company = rows[i].col0;
                if (app.series[company] !== undefined) {
                    if (app.series[company].length >= app.settings.dataPoints) {
                        app.series[company].shift();
                    }
                    app.series[company].push(rows[i]);
                } else {
                    app.series[company] = [rows[i]];
                }
            }


        },

        showData: function () {
            var table, tableRow, tableColumn, company, companyObject, propertyName, propertyValue;

            table = document.createElement("table");

            for (company in app.series) {
                if (app.series.hasOwnProperty(company)) {
                    companyObject = app.series[company][app.series[company].length - 1];
                    tableRow = document.createElement("tr");

                    if (companyObject.col4 > 0) {
                        tableRow.className = 'winner';
                    } else if (companyObject.col4 < 0) {
                        tableRow.className = 'loser';
                    } else {
                        tableRow.className = '';
                    }

                    for (propertyName in companyObject) {
                        if (companyObject.hasOwnProperty(propertyName)) {
                            propertyValue = companyObject[propertyName];
                            tableColumn = document.createElement("td");
                            tableColumn.textContent = propertyValue;
                            tableRow.appendChild(tableColumn);
                        }
                    }

                    table.appendChild(tableRow);
                }
            }

            return table;

        },

        loop: function () {
            var container, table;
            container = document.querySelector("#container");
            if (container.querySelector("table") !== null) {
                container.removeChild(container.querySelector("table"));
            }

            app.generateTestData();
            //app.getDataFromAjax();
            table = app.showData(); //show
            container.appendChild(table);

            setTimeout(app.loop, app.settings.refresh);
        },

        initHTML: function () {
            var container, h1Node;

            container = document.createElement("div");
            container.id = "container";

            app.container = container;

            h1Node = document.createElement("h1");
            h1Node.textContent = "Real Time Stockquote App";

            app.container.appendChild(h1Node);

            return app.container;
        },

        init: function () {
            var container, bodyNode;

            container = app.initHTML();
            bodyNode = document.querySelector("body");
            bodyNode.appendChild(container);

            app.parseData(data.query.results.row);

            //app.retrieveData();
            app.loop();
        }
    };

}());

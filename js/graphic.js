//"data" refers to the column name with no spaces and no capitals
//punctuation or numbers in your column name
//"title" is the column name you want to appear in the published table
var columns = [{
        "data": "airport",
        "title": "Airport"
    }, {
        "data": "state",
        "title": "State"
    }, {
        "data": "rank",
        "title": "FAA Ranking"
    }, {
        "data": "personnel",
        "title": "Personnel Per Shift"
    },

    {
        "data": "leadership",
        "title": "leadership"
    }
];

var steelblue = chroma('steelblue').hex(),
    maroon = chroma('maroon').hex();

$(window).ready(function() {

    function writeTable(airports) {

        //initilize the DataTable object and put settings in
        $("#datatable").DataTable({
            "data": airports,
            "columns": columns,
            "order": [
                [3, "desc"]
            ], //order on 1st column
            "pagingType": "simple", //no page numbers
            //uncomment these options to simplify your table
            "paging": false,
            "searching": false
                //"info": false
        });
    }

    writeTable(airports);

    airports.sort(function(a, b) {
        return a.personnel - b.personnel;
    });

    // PERSONNEL CHART
    chart = c3.generate({
        bindto: '#personnel',
        padding: {
            left: 180
        },
        tooltip: {
            contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
                var index = d[0].index;
                return "<div class='d3-tip'>State: " + airports[index].state +
                    "</br>Rank: " + airports[index].rank +
                    "</br>Personnel/Shift: " + d[0].value + "</div>";
            }
        },
        data: {
            type: 'bar',
            json: airports,
            colors: {
                personnel: maroon
            },
            keys: {
                x: 'airport',
                value: ['personnel'],
            },
            labels: true
        },
        grid: {
            y: {
                show: true
            }
        },
        bar: {
            width: {
                ratio: 0.8
            }
        },
        axis: {
            rotated: true,
            x: {
                type: 'category',
                tick: {
                    multiline: false,
                    centered: true
                }
            },
            y: {
                show: false
            }
        },

        size: {
            width: 625,
            height: 450
        }

    });



// RANK CHART
    chart2 = c3.generate({
        bindto: '#rank-chart',
        padding: {
            left: 180
        },
        tooltip: {
            contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
                var index = d[0].index;
                return "<div class='d3-tip'>State: " + airports[index].state +
                    "</br>Rank: " + airports[index].rank +
                    "</br>Personnel/Shift: " + d[0].value + "</div>";
            }
        },
        data: {
            type: 'bar',
            json: airports,
            colors: {
                personnel: maroon
            },
            keys: {
                x: 'airport',
                value: ['personnel'],
            },
            labels: true
        },
        grid: {
            y: {
                show: true
            }
        },
        bar: {
            width: {
                ratio: 0.8
            }
        },
        axis: {
            rotated: true,
            x: {
                type: 'category',
                tick: {
                    multiline: false,
                    centered: true
                }
            },
            y: {
                show: false
            }
        },

        size: {
            width: 625,
            height: 450
        }

    });


    // BUTTONS
    $('#rank-tab').on('click', (function(e) {
        airports.sort(function(a, b) {
            return b.rank - a.rank;
        });

        chart2.load({
            unload: true,
            json: airports,
            keys: {
                x: 'airport',
                value: ['personnel'],
            }
        });
    }));

    // BUTTONS
    $('#personnel-tab').on('click', (function(e) {

        airports.sort(function(a, b) {
            return a.personnel - b.personnel;
        });

        chart.load({
            unload: true,
            json: airports,
            keys: {
                x: 'airport',
                value: ['personnel'],
            }
        });
    }));



}); //window.ready over
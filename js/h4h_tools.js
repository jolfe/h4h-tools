document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('go').addEventListener('click', function () {
        let redirect = document.getElementById('id');
        window.open("https://events.hotelsforhope.com/group-event?id=" + redirect.value, "_blank");
    });


    includeHTML();

    let results = document.querySelector('.results');
    let count;
    let search = document.getElementById('myInput');

    search.addEventListener("keyup", event => {
        count = 0;
        var input, filter, table, tr, td, i;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        console.log(table)
        tr = table.getElementsByTagName("tr"),
            th = table.getElementsByTagName("th");

        for (i = 0; i < tr.length; i++) {
            tr[i].style.display = "none";
            for (var j = 0; j < th.length; j++) {
                td = tr[i].getElementsByTagName("td")[j];
                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
                        tr[i].style.display = "";
                        count++;
                        break;
                    }
                }
            }
        }
        if (count === 1) {
            results.innerHTML = count + ' <a class="gray">result</a>';
        } else {
            results.innerHTML = count + ' <a class="gray">results</a>';
        }
    });

    function includeHTML() {
        var z, i, elmnt, file, xhttp;
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
            elmnt = z[i];
            file = elmnt.getAttribute("include-html");
            if (file) {
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            elmnt.innerHTML = this.responseText;
                        }
                        if (this.status == 404) {
                            elmnt.innerHTML = "Page not found.";
                        }
                        elmnt.removeAttribute("include-html");
                        includeHTML();
                    }
                }
                xhttp.open("GET", file, true);
                xhttp.send();
                return;
            }
        }
    }

    let url = 'https://spreadsheets.google.com/feeds/cells/1wFkbK95RwTFKsVzErkX75cnyWS93s8UdFt7kZa7bqsk/1/public/values?alt=json';

    function init_Table() {
        $.ajax({
            url: url,
            type: 'GET',
            success: function (resp) {
                output = resp;
                doData(output);
            },
            error: function (e) {
                alert('Error: ' + e);
            }
        });
    }

    var spData = null;

    function doData(json) {
        spData = json.feed.entry;
        readData($("#data"));
    }

    function drawHeader() {
        let trs = document.querySelectorAll('tr');
        let tr = trs[0];
        tr.classList.add('header');
        for (i = 1; i < trs.length; i++) {
            trs[i].classList.add('main');
        }
    }

    function drawCell(tr, val) {
        var td = $("<td/>");
        var th = $("<th/>");
        tr.append(td);
        td.append(val);
        return td;
    }

    function replaceNone() {
        let tds = document.querySelectorAll('td');
        tds.forEach(function (td) {
            if (td.innerHTML === 'N/A') {
                td.innerHTML = '';
            }
        })
    }

    function hyperlink() {
        let tds = document.querySelectorAll('td');
        tds.forEach(function (td) {
            if (td.innerHTML.includes('http')) {
                td.innerHTML = '<a href="' + td.innerHTML + '">Link</a>';
            }
        })
    }

    function drawRow(table, rowData) {
        if (rowData == null) return null;
        if (rowData.length == 0) return null;
        var tr = $("<tr/>");
        table.append(tr);
        for (var c = 0; c < rowData.length; c++) {
            drawCell(tr, rowData[c]);
        }
        return tr;
    }

    function drawTable(parent) {
        var table = $('<table id="myTable" />');
        parent.append(table);
        return table;
    }

    function readData(parent) {
        var data = spData;
        var table = drawTable(parent);
        var rowData = [];

        for (var r = 0; r < data.length; r++) {
            var cell = data[r]["gs$cell"];
            var val = cell["$t"];
            if (cell.col == 1) {
                drawRow(table, rowData);
                rowData = [];
            }
            rowData.push(val);
        }
        drawRow(table, rowData);
        drawHeader();
        replaceNone();
        hyperlink();
    }
    $(document).ready(function () {
        init_Table();
    });
});
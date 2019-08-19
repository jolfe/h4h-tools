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
});
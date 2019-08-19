document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('go').addEventListener('click', function() {
        let redirect = document.getElementById('id');

        window.open("https://events.hotelsforhope.com/group-event?id=" + redirect.value, "_blank");

    });

    // let select = document.getElementById('select');
    // let deploy = document.getElementById('deploy');
    // const developURL = "https://forge.laravel.com/servers/137842/sites/806322/deploy/http?token=sMUWfQdoftQ3Zj3ZtfCbiXp1pJIT6vPG65PeuVZv";

    // const masterURL = "https://forge.laravel.com/servers/137842/sites/697985/deploy/http?token=G8traj5bQRM75S5CVaqqFXmQ6lSVeGvqczhHvnPL";

    // deploy.addEventListener('click', function() {
    //     let server = select[select.selectedIndex].value;
    //     if (server === "Master") {
    //         curl(masterURL);
    //     } else {
    //         curl(developURL);
    //     }
    // });

    /* 
        Haven't figured out how to post the curl yet, take a look
    */

    let results = document.querySelector('.results');

    function curl(url) {
        const rawResponse = fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        });
        const response = rawResponse.json();
        console.log(response);
    }

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

        for (i = 1; i < tr.length; i++) {
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
        results.innerHTML = count + ' results';
    });

    includeHTML();

    function includeHTML() {
        var z, i, elmnt, file, xhttp;
        /* Loop through a collection of all HTML elements: */
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
            elmnt = z[i];
            /*search for elements with a certain atrribute:*/
            file = elmnt.getAttribute("w3-include-html");
            if (file) {
                /* Make an HTTP request using the attribute value as the file name: */
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4) {
                        if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                        if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                        /* Remove the attribute, and call this function once more: */
                        elmnt.removeAttribute("w3-include-html");
                        includeHTML();
                    }
                }
                xhttp.open("GET", file, true);
                xhttp.send();
                /* Exit the function: */
                return;
            }
        }
    }
});
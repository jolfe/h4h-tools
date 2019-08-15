document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('go').addEventListener('click', function () {
        let redirect = document.getElementById('id');

        window.open("https://events.hotelsforhope.com/v6?currency=USD&type=geo&siteid=" + redirect.value, "_blank");

    });

    let select = document.getElementById('select');
    let deploy = document.getElementById('deploy');
    const developURL = "https://forge.laravel.com/servers/137842/sites/806322/deploy/http?token=sMUWfQdoftQ3Zj3ZtfCbiXp1pJIT6vPG65PeuVZv";

    const masterURL = "https://forge.laravel.com/servers/137842/sites/697985/deploy/http?token=G8traj5bQRM75S5CVaqqFXmQ6lSVeGvqczhHvnPL";

    deploy.addEventListener('click', function () {
        let server = select[select.selectedIndex].value;
        if (server === "Master") {
            curl(masterURL);
        } else {
            curl(developURL);
        }
    });

    /* 
        Haven't figured out how to post the curl yet, take a look
    */

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

    let search = document.getElementById('myInput');
    search.addEventListener("keyup", event => {
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
                        break;
                    }
                }
            }
        }
    });
});
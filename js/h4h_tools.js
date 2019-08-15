document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('go').addEventListener('click', function () {
        let redirect = document.getElementById('id');

        window.open("https://events.hotelsforhope.com/v6?currency=USD&type=geo&siteid=" + redirect.value, "_blank");

    });

    let select = document.getElementById('select');
    let deploy = document.getElementById('deploy');
    const developURL = "curl https://forge.laravel.com/servers/137842/sites/806322/deploy/http?token=sMUWfQdoftQ3Zj3ZtfCbiXp1pJIT6vPG65PeuVZv";

    const masterURL = "curl https://forge.laravel.com/servers/137842/sites/697985/deploy/http?token=G8traj5bQRM75S5CVaqqFXmQ6lSVeGvqczhHvnPL";

    deploy.addEventListener('click', function () {
        let server = select[select.selectedIndex].value;
        if (server === "Master") {
            curl(masterURL);
        } else {
            curl(developURL);
        }
    });

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
});
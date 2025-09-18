const router = async () => {
    const routes = [
        { path: "/", view: () => console.log("View Mainmenu") },
        { path: "/game", view: () => console.log("View Game") },
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }
    console.log(match);
}


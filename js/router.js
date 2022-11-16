document.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches("nav a")) {
        return;
    }
    e.preventDefault();
    route();
});

const routes = {
    404: {
        template: "/templates/404.html",
        title: "404",
        description: "Page not found",
    },
    "/": {
        template: "/templates/index.html",
        title: "Home",
        description: "Evionics homepage",
    },
    "/terms-and-conditions": {
        template: "/templates/terms-and-conditions.html",
        title: "Evionics - Terms and Conditions",
        description: "Evionics - Terms and Conditions",
    },
    "/privacy-policy": {
        template: "/templates/privacy-policy.html",
        title: "Evionics - Privacy Policy",
        description: "Evionics - Privacy Policy",
    },
};

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    locationHandler();
};

const locationHandler = async () => {
    const location = window.location.pathname;
    if (location.length == 0) {
        location = "/";
    }
    const route = routes[location] || routes["404"];
    const html = await fetch(route.template).then((response) => response.text());
    document.getElementById("content").innerHTML = html;
    document.title = route.title;
    document
        .querySelector('meta[name="description"]')
        .setAttribute("content", route.description);
};

console.log("window.location.pathname: ", window.location.pathname);

window.onpopstate = locationHandler;
window.route = route;
locationHandler();
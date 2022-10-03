import * as Web from "./../lib/webstart.js";

new Web.Header({
    title: Web.Data.title,
    menu: [
        { name: "Home", src: "page:home" }
    ]
}).render();

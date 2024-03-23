import { createRoot } from "./core/react-dom.js";
import   app   from "./component/app.jsx";
// import   app   from "./component/app.js";

console.log({ app });
createRoot(document.getElementById("app")).render(app);

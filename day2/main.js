import { createRoot } from "./core/react-dom.js";
import   app   from "./component/app.jsx";


// console.time('react')
createRoot(document.getElementById("app")).render(app);
// console.timeEnd('react')

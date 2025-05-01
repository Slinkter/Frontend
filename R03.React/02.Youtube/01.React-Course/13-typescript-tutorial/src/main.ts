import logoTs from "./typescript.svg";
import logoVite from "/vite.svg";

import "./tutorial.ts";
import "./interface.ts";
/*  */
import "./tasks.css";
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="/tasks" target="_blank">
      <img src="${logoVite}" class="logo" alt="Vite logo" />
    </a>
    <a href="/tasks" target="_blank">
      <img src="${logoTs}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button class="btn btn-hipster" id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

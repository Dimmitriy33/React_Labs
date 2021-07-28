import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { StrictMode } from "react";
import ReactDom from "react-dom";

const AppContainer = () => (
  <StrictMode>
    <div color="{$basicColor}">Helo world!</div>
  </StrictMode>
);

ReactDom.render(<AppContainer />, document.getElementById("app"));

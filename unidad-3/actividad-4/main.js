import { WCModalDialog } from "./WCComponents/WCModalDialog.js";

function main()
{
    document.body.appendChild( new WCModalDialog() );
}

window.onload = main;
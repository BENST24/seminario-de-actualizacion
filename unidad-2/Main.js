import { APIModelAccess } from "./Backend.js";
import { Application  } from "./Application.js"

function main()
{
	let model = new APIModelAccess();
	let app = new Application(model);

	app.showMenuMain();

}

window.onload = main;
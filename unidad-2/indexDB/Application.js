import { APIModelAccess } from "./Backend.js";
import { ApplicationView } from "./Frontend.js";


class Application
{
	constructor()
	{
		this._api = new APIModelAccess();
		this._defaultView = new ApplicationView(this._api);		
	}

	init()
	{

	}

	run()
	{
		setTimeout(function () { this._defaultView.showMenuMain(); }.bind(this), 2000);
	}
}
export { Application };
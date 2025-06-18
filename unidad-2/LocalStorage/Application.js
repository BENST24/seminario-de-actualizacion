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
        this._defaultView.showMenuMain();
	}
}
export { Application };
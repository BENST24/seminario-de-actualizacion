import { ApplicationView } from "./Frontend.js";


class Application
{
	constructor( apiInstanceObject )
	{
		this._api = apiInstanceObject;
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
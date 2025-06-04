import { ApplicationView } from "./Frontend.js";


class Application
{
	constructor( apiInstanceObject )
	{
		this._api = apiInstanceObject;
		this._defaultView = new ApplicationView(this._api);		
		this._maxLoginFailedAttempts = this._api.getMaxLoginAttempts();
		this._attempts = 0;
		this._api_return = null;
		this._username = null;
	}

	init()
	{
		const loginResult = this._defaultView.show();
		this._api_return = loginResult.api_return;
		this._username = loginResult.username;
	}

	run()
	{
		while( this._api_return.result == 'USER_PASSWORD_FAILED' && this._attempts < this._maxLoginFailedAttempts )
		{
			const loginResult = this._defaultView.show();
			this._api_return = loginResult.api_return;
			this._username = loginResult.username;

			if ( this._api_return.result == 'USER_PASSWORD_FAILED' )
			{
				this._attempts++;
			}
		}
		if (this._api_return.status)
		{
			this.showUserMenu();
		}
	}

	showUserMenu()
	{
        let user = this._api.isValidUserGetData(this._username);

        if(user.category === 'administrador')
        {
            let option = window.prompt("Bienvenido " + this._username + "\n\nMenú:\n1. Cambiar contraseña\n2. Menu de Administrador\nx. Salir");

            switch (option)
            {
                case '1':
                    this._defaultView.ChangePasswordApplicationView(this._username);
                    this.showUserMenu();
                    break;
                case '2':
                    this._defaultView.menuAdmin();
                    this.showUserMenu();
                    break;
                case 'x':
                    this._attempts = 0; // resetear intentos
                    this._api_return = null;
                    this._username = null;
                    this.showMenuMain(); 
                    break;
                default:
                    alert('Opción inválida');
                    this.showUserMenu(); // volver a mostrar menú
            }
        }else if(user.category === 'cliente')
        {
            let option = window.prompt("Bienvenido " + this._username + "\n\nMenú:\n1. Cambiar contraseña\n2. Menu de Cliente\nx. Salir");

            switch (option)
            {
                case '1':
                    this._defaultView.ChangePasswordApplicationView(this._username);
                    this.showUserMenu();
                    break;
                case '2':
                    this._defaultView.menuCustomer();
                    this.showUserMenu();
                    break;
                case 'x':
                    this._attempts = 0; // resetear intentos
                    this._api_return = null;
                    this._username = null;
                    this.showMenuMain(); 
                    break;
                default:
                    alert('Opción inválida');
                    this.showUserMenu(); // volver a mostrar menú
            }
        }else if(user.category === 'vendedor')
        {
            let option = window.prompt("Bienvenido " + this._username + "\n\nMenú:\n1. Cambiar contraseña\n2. Menu de Vendedor\nx. Salir");

            switch (option)
            {
                case '1':
                    this._defaultView.ChangePasswordApplicationView(this._username);
                    this.showUserMenu();
                    break;
                case '2':
                    this._defaultView.menuSalesperson();
                    this.showUserMenu();
                    break;
                case 'x':
                    this._attempts = 0; // resetear intentos
                    this._api_return = null;
                    this._username = null;
                    this.showMenuMain(); 
                    break;
                default:
                    alert('Opción inválida');
                    this.showUserMenu(); // volver a mostrar menú
            }
        }else if(user.category === 'trabajador de deposito')
        {
            let option = window.prompt("Bienvenido " + this._username + "\n\nMenú:\n1. Cambiar contraseña\n2. Menu de Trabajador de depósito\nx. Salir");

            switch (option)
            {
                case '1':
                    this._defaultView.ChangePasswordApplicationView(this._username);
                    this.showUserMenu();
                    break;
                case '2':
                    this._defaultView.menuWarehouseWorker();
                    this.showUserMenu();
                    break;
                case 'x':
                    this._attempts = 0; // resetear intentos
                    this._api_return = null;
                    this._username = null;
                    this.showMenuMain();
                    break;
                default:
                    alert('Opción inválida');
                    this.showUserMenu(); // volver a mostrar menú
            }
        }
	}

    showMenuMain()
    {
        let option = window.prompt("\t\tMenu principal\n1. Iniciar Sesion\nx. Salir");

        switch (option)
        {
            case '1':
				this.init();
				this.run();
				break;
            case 'x':
                break;
            default:
                alert('Opción inválida');
                this.showMenuMain(); // volver a mostrar menú
        }
    }
}

export { Application };
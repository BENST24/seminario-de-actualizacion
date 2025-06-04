class ApplicationView
{
	constructor(apiInstanceObject)
	{
		this._api = apiInstanceObject;
	}

	show()
	{
		let username = window.prompt("Ingrese su nombre de usuario:");
		let password = window.prompt("Ingrese contraseña:");

		let api_return = this._api.authenticateUser( username, password );
		
		if ( api_return.status )
		{
			alert('Usuario autenticado exitosamente');
		}
		else if ( api_return.status == false )
		{
			switch ( api_return.result ) 
			{
				case 'BLOCKED_USER':
					alert('Usuario bloqueado. Contacte al administrador');
				break;

				case 'USER_PASSWORD_FAILED':
					alert('Usuario y/o contraseña incorrecta');
				break;

				default:
					alert('Error desconocido');
				break;
			}
		}

		return { api_return, username };
	}

    ChangePasswordApplicationView(username)
    {
        let newPassword = window.prompt("La contraseña debe tener entre 8 y 16 caracteres alfanuméricos, al menos una mayúscula y al menos 2 símbolos especiales.\n\nIngrese nueva contraseña:");
        if (this._api.validatePass(newPassword))
        {
            if (this._api.changePassword(username, newPassword))
            {
                alert("Contraseña modificada correctamente");
            }
            else
            {
                alert("Error al cambiar la contraseña");
            }
        }
        else
        {
            window.alert("Contraseña no valida!");
            this.show();
        }
    }

    selectCategory() 
    {
        let option = window.prompt("Seleccione su categoría de usuario:\n1. Administrador\n2. Cliente\n3. Vendedor\n4. Trabajador de depósito");

        switch (option) 
        {
            case '1': return "administrador";
            case '2': return "cliente";
            case '3': return "vendedor";
            case '4': return "trabajador de deposito";
            default:
                alert("Opción inválida. Intente nuevamente.");
                return this.selectCategory();
        }
    }

    AddUserApplicationView()
    {
        let username = window.prompt("Ingrese nombre de usuario:");
        let category = this.selectCategory(); 

        let password = window.prompt(
        "La contraseña debe tener entre 8 y 16 caracteres alfanuméricos, al menos una mayúscula y al menos 2 símbolos especiales.\n\n" + 
        "Ingrese la contraseña:");

        if (this._api.validatePass(password))
        {
            const api_return = this._api.addUser(username, password, category);

            if (api_return.status) {
                alert("Usuario creado exitosamente");
            } else {
                alert("El usuario ya existe");
            }

            return api_return;
        }
        else
        {
            alert("Contraseña no válida");
            return this.show();
        }
    }

    menuArticleView()
    {

        let exit = false;
        while (!exit) 
        {
            let option = window.prompt(
            "Gestión de artículos\n\n" +
            "1. Ver todos los artículos\n" +
            "2. Buscar artículo por ID\n" +
            "3. Crear artículo\n" +
            "4. Modificar artículo\n" +
            "5. Eliminar artículo\n" +
            "6. Volver al menú principal\n\n" +
            "Ingrese una opción:"
            );

            switch (option) 
            {
                case '1':
                let articles = this._api.getAllArticles();
                if (articles.length === 0) 
                {
                    alert("No hay artículos cargados.");
                } else 
                {
                    let message = "Lista de artículos:\n";
                    for (let [id, art] of articles) 
                    {
                        message += `ID: ${id}, Nombre: ${art.name}, Precio: ${art.price}, Stock: ${art.stock}\n`;
                    }
                    alert(message);
                }
                break;

                case '2':
                    let idBuscar = window.prompt("Ingrese ID del artículo:");
                    let result = this._api.getArticle(idBuscar);
                    if (result) 
                    {
                        alert(`ID: ${idBuscar}\nNombre: ${result.name}\nPrecio: ${result.price}\nStock: ${result.stock}`);
                    } else 
                    {
                        alert("Artículo no encontrado.");
                    }
                    break;

                case '3':
                    let newId = window.prompt("Ingrese nuevo ID:");
                    let newName = window.prompt("Ingrese nombre del artículo:");
                    
                    let newPrice = parseFloat(window.prompt("Ingrese precio:"));
                    if (isNaN(newPrice)) 
                    {
                        alert("Precio inválido");
                        this.show();
                        break;
                    }

                    let newStock = parseInt(window.prompt("Ingrese stock:"));
                    if (isNaN(newStock)) 
                    {
                        alert("Stock inválido");
                        this.show();
                        break;
                    }

                    let create = this._api.createArticle(newId, newName, newPrice, newStock);
                    alert(create.message);
                    break;

                case '4':
                    let editId = window.prompt("Ingrese ID del artículo a modificar:");
                    let editName = window.prompt("Ingrese nuevo nombre:");
                    let editPrice = parseFloat(window.prompt("Ingrese nuevo precio:"));
                    let editStock = parseInt(window.prompt("Ingrese nuevo stock:"));
                    let update = this._api.updateArticle(editId, editName, editPrice, editStock);
                    if (update) {
                        alert("Artículo modificado correctamente");
                    } else {
                        alert("Artículo no encontrado");
                    }
                    break;

                case '5':
                    let deleteId = window.prompt("Ingrese ID del artículo a eliminar:");
                    let deleted = this._api.deleteArticle(deleteId);
                    if (deleted) {
                        alert("Artículo eliminado correctamente");
                    } else {
                        alert("Artículo no encontrado");
                    }
                    break;

                case '6':
                    exit = true;
                    break;
                
                default:
                    alert("Opción inválida");
                    break;
            }
        }
    }

    menuAdmin() 
    {
        let exit = false;
        while (!exit) 
        {
            let option = window.prompt("Menú Administrador:\n1. Cargar nuevo usuario\n2. Ir al menú de artículos\nx. Salir");

            switch (option) 
            {
                case '1':
                    this.AddUserApplicationView();
                    break;
                case '2':
                    this.menuArticleView();
                    break;
                case 'x':
                    alert("Saliendo del sistema...");
                    exit = true;
                    break;
                default:
                    alert("Opción inválida");
                    break;
            }
        }
    }

    menuCustomer() 
    {
        let exit = false;
        while (!exit) 
        {
            let option = window.prompt("Menú Cliente:\n1. Listar artículos\n2. Buscar artículo\n3. Comprar artículo\nx. Salir");

            switch (option) 
            {
                case '1':
                    let articles = this._api.getAllArticles();
                    if (articles.length === 0) 
                    {
                        alert("No hay artículos cargados.");
                    } else 
                    {
                        let message = "Lista de artículos:\n";
                        for (let [id, art] of articles) 
                        {
                            message += `ID: ${id}, Nombre: ${art.name}, Precio: ${art.price}, Stock: ${art.stock}\n`;
                        }
                        alert(message);
                    }
                    break;
                case '2':
                    let idBuscar = window.prompt("Ingrese ID del artículo:");
                    let result = this._api.getArticle(idBuscar);
                    if (result) 
                    {
                        alert(`ID: ${idBuscar}\nNombre: ${result.name}\nPrecio: ${result.price}\nStock: ${result.stock}`);
                    } else 
                    {
                        alert("Artículo no encontrado.");
                    }
                    break;
                case '3':
                    let id = window.prompt("Ingrese ID del artículo que desea comprar:");
                    let quantity = parseInt(window.prompt("Ingrese la cantidad que desea comprar:"), 10);

                    if (isNaN(quantity) || quantity <= 0) 
                    {
                        alert("Cantidad inválida.");
                        return;
                    }

                    let resultBuy = this._api.buyArticle(id, quantity);
                    alert(resultBuy.message);
                    break;
                case 'x':
                    alert("Saliendo del sistema...");
                    exit = true;
                    break;
                default:
                    alert("Opción inválida");
                    break;
            }
        }
    }

    menuSalesperson() 
    {
        let exit = false;
        while (!exit) 
        {
            let option = window.prompt("Menú Vendedor:\n1. Buscar artículo\n2. Listar artículos\nx. Salir");

            switch (option) 
            {
                case '1':
                let idBuscar = window.prompt("Ingrese ID del artículo:");
                    let result = this._api.getArticle(idBuscar);
                    if (result) 
                    {
                        alert(`ID: ${idBuscar}\nNombre: ${result.name}\nPrecio: ${result.price}\nStock: ${result.stock}`);
                    } else 
                    {
                        alert("Artículo no encontrado.");
                    }
                    break;
                case '2':
                let articles = this._api.getAllArticles();
                    if (articles.length === 0) 
                    {
                        alert("No hay artículos cargados.");
                    } else 
                    {
                        let message = "Lista de artículos:\n";
                        for (let [id, art] of articles) 
                        {
                            message += `ID: ${id}, Nombre: ${art.name}, Precio: ${art.price}, Stock: ${art.stock}\n`;
                        }
                        alert(message);
                    }
                    break;
                case 'x':
                    alert("Saliendo del sistema...");
                    exit = true;
                    break;
                default:
                    alert("Opción inválida");
                    this.menuSalesperson();
                    break;
            }
        }
    }

    menuWarehouseWorker() 
    {
        this.menuArticleView();
    }
}

export { ApplicationView };
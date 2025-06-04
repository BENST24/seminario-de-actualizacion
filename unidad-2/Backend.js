class User 
{
	constructor(password, category) 
	{
		this.password = password;
		this.failedLoginCounter = 0;
		this.isLocked = false;
        this.category = category;
	}

	isPasswordCorrect(input) 
	{
		return this.password === input;
	}

	incrementFailedLogin(maxAttempts) 
	{
		this.failedLoginCounter++;
		if (this.failedLoginCounter >= maxAttempts) 
		{
			this.isLocked = true;
		}
	}

	changePassword(newPassword) 
	{
		this.password = newPassword;
		this.failedLoginCounter = 0;
		this.isLocked = false;
	}
}

class Article
{
	constructor(name, price, stock)
	{
		this.name = name;
		this.price = price;
		this.stock = stock;
	}
}

class APIModelAccess
{
	constructor()
	{
		this._userData = new Map();
		this._articleData = new Map();
		this._maxLoginFailedAttempts = 3;

		this._userData.set('administrador', new User('987654', 'administrador'));
		this._userData.set('cliente', new User('987654', 'cliente'));
		this._userData.set('vendedor', new User('987654', 'vendedor'));
		this._userData.set('deposito', new User('987654', 'trabajador de deposito'));
		this._articleData.set('1', new Article("Lavandina x 1L", 875.25, 3000));
		this._articleData.set('4', new Article("Detergente x 500mL", 1102.45, 2010));
		this._articleData.set('22', new Article("Jabón en polvo x 250g", 650.22, 407));
	}
	
	isValidUserGetData( username )
	{
		return this._userData.get(username);
	}

	authenticateUser(username, password) 
	{
		let api_return = 
		{
			status: false,
			result: null
		};

		if (username && password) 
		{
			let user = this._userData.get(username);

			if (user) {
				if (!user.isLocked) 
				{
					if (user.isPasswordCorrect(password))
					{
						api_return.status = true;
					} else 
					{
						user.incrementFailedLogin(this._maxLoginFailedAttempts);
						api_return.status = false;
						api_return.result = user.isLocked ? 'BLOCKED_USER' : 'USER_PASSWORD_FAILED';
					}
				} else 
				{
					api_return.result = 'BLOCKED_USER';
				}
			} else 
			{
				api_return.result = 'USER_NOT_FOUND';
			}
		}

		return api_return;
	}

	changePassword(username, newPassword) 
	{
		let user = this._userData.get(username);
		if (user) 
		{
			user.changePassword(newPassword);
			return true;
		}
		return false;
	}


    validatePass(pass) 
    {
        let specialCounter = 0;
        let hasUpper = false;
        let hasDigit = false;

        if (pass.length < 8 || pass.length > 16) 
        {
            return false;
        }

        for (let i = 0; i < pass.length; i++) 
        {
            const c = pass[i];

            if (c >= 'A' && c <= 'Z') hasUpper = true;
            if (c >= '0' && c <= '9') hasDigit = true;
            if (!/[a-zA-Z0-9]/.test(c)) specialCounter++;
        }

        return hasUpper && hasDigit && specialCounter >= 2;
    }

	addUser(username, password, category) 
	{
		if (!this._userData.has(username)) 
		{
			this._userData.set(username, new User(password, category));
			return { status: true };
		} else 
		{
			return { status: false, result: 'USER_ALREADY_EXISTS' };
		}
	}


	getMaxLoginAttempts()
	{
		return this._maxLoginFailedAttempts;
	}

    createArticle(id, name, price, stock) 
    {
        if (this._articleData.has(id)) 
        {
            return { success: false, message: "El ID ya existe." };
        }
        this._articleData.set(id, new Article(name, price, stock));
        return { success: true, message: "Artículo agregado con éxito." }; // ← agregado
    }

    getArticle(id) {
        return this._articleData.get(id);
    }

    updateArticle(id, name, price, stock) 
    {
        if (!this._articleData.has(id)) 
        {
            return { success: false, message: "Artículo no encontrado" };
        }
        this._articleData.set(id, new Article(name, price, stock));
        return { success: true };
    }

    deleteArticle(id) 
    {
        if (!this._articleData.has(id)) {
            return { success: false, message: "Artículo no encontrado" };
        }
        this._articleData.delete(id);
        return { success: true };
    }

    getAllArticles() 
    {
        return Array.from(this._articleData.entries());
    }

	buyArticle(id, quantity) 
	{
		const article = this._articleData.get(id);

		if (!article) 
		{
			return { success: false, message: "Artículo no encontrado." };
		}

		if (article.stock < quantity) 
		{
			return { success: false, message: "Stock insuficiente." };
		}

		article.stock -= quantity;

		return {
			success: true,
			message: `Compra realizada con éxito. Quedan ${article.stock} unidades de "${article.name}".`
		};
	}
}


export { APIModelAccess, User, Article };
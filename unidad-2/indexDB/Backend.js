import { DBHandler } from "./DB_Handler.js";

class User 
{
	constructor(password, category) 
	{
		this.password = password;
		this.failedLoginCounter = 0;
		this.isLocked = false;
        this.category = category;
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

		this._db = new DBHandler();
		this._db.connect();
		console.log(this._db);
	}

	isValidUserGetData(username, callback) 
	{
		this._db.getUser(username, function(user) 
		{
			callback(user);
		});
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
			const user = this._db.getCachedUser(username);

			if (user) 
			{
				if (!user.isLocked) 
				{
					if (this.isPasswordCorrect(user, password))
					{
						api_return.status = true;
					} else 
					{
						this.incrementFailedLogin(user, this._maxLoginFailedAttempts);
						this._db.saveUser(username, user);
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

		const user = this._db.getCachedUser(username);

		if (user) 
		{
			if(this.validatePass(newPassword))
			{
				user.password = newPassword;
				user.failedLoginCounter = 0;
				user.isLocked = false;
				this._db.saveUser(username, user);
				return { status: true };
			}
			else
			{
				return { status: false, result: 'INVALID_PASSWORD' };
			}
		}
		else
		{
			return { status: false, result: 'USER_DOES_NOT_EXIST' };
		}
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

	isPasswordCorrect(user, input) 
	{
		return user.password === input;
	}

	incrementFailedLogin(user, maxAttempts) 
	{
		user.failedLoginCounter++;
		if (user.failedLoginCounter >= maxAttempts) 
		{
			user.isLocked = true;
		}
	}

	addUser(username, password, category) 
	{
		if (!this._db.existsUser(username)) 
		{
			if(this.validatePass(password))
			{
				const newUser = new User(password, category);
				this._db.saveUser(username, newUser);
				return { status: true };
			}
			else
			{
				return { status: false, result: 'INVALID_PASSWORD' };
			}
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
        if (this._db.existsArticle(id)) 
        {
            return { success: false, message: "El ID ya existe." };
        }
		const newArticle = new Article(name, price, stock);
		this._db.saveArticle(id, newArticle);
        return { success: true, message: "Artículo agregado con éxito." }; // ← agregado
    }

    getArticle(id) 
	{
        return this._db.getCachedArticle(id);
    }

    updateArticle(id, name, price, stock) 
    {
        if (!this._db.existsArticle(id)) 
        {
            return { success: false, message: "Artículo no encontrado" };
        }
		const updatedArticle = new Article(name, price, stock);
		this._db.saveArticle(id, updatedArticle);
        return { success: true };
    }

    deleteArticle(id) 
    {
        if (!this._db.existsArticle(id)) 
		{
            return { success: false, message: "Artículo no encontrado" };
        }
		this._db.deleteArticle(id);
        return { success: true };
    }

    getAllArticles() 
    {
        return this._db.getAllCachedArticles();
    }

	buyArticle(id, quantity) 
	{
		const article = this._db.getCachedArticle(id);

		if (!article) 
		{
			return { success: false, message: "Artículo no encontrado." };
		}

		if (article.stock < quantity) 
		{
			return { success: false, message: "Stock insuficiente." };
		}

		article.stock -= quantity;
		this._db.saveArticle(id, article);

		return {
			success: true,
			message: `Compra realizada con éxito. Quedan ${article.stock} unidades de "${article.name}".`
		};
	}
}


export { APIModelAccess, User, Article };
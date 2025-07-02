import { User } from "./Backend.js";
import { Article } from "./Backend.js";


class DBHandler
{
    constructor()
    {
        this.dbInstance = null;
        this.userCache = new Map();
	    this.articleCache = new Map(); 
    }

    connect()
    {
        const request = indexedDB.open("DataBase", 1);
        request.onupgradeneeded = this.onUpgrade.bind(this);
        request.onsuccess = this.onSuccess.bind(this);
        request.onerror = this.onError.bind(this);
    }

    onUpgrade(event)
    {
        const db = event.target.result;
        if(!db.objectStoreNames.contains("users"))
        {
            db.createObjectStore("users", { keyPath: "username" });
        }
        if(!db.objectStoreNames.contains("articles"))
        {
            db.createObjectStore("articles", { keyPath: "id"});
        }
    }

    onSuccess(event)
    {
        this.dbInstance =  event.target.result;
        // this.dbInstance = event.result;
        console.log("IndexDB lista.");
        this.loadToModel();

        setTimeout(() => {
            console.log("Usuarios cargados:", Array.from(this.userCache.entries()));
            console.log("Artículos cargados:", Array.from(this.articleCache.entries()));
        }, 500);
    }

    onError(event)
    {
        console.error("Error al conectar IndexedDB", event);
    }

    getCachedUser(username) 
    {
        return this.userCache.get(username);
    }

    existsUser(username) 
    {
        return this.userCache.has(username);
    }

    getCachedArticle(id) 
    {
        return this.articleCache.get(id);
    }

    existsArticle(id) 
    {
        return this.articleCache.has(id);
    }

    getAllCachedArticles() 
    {
        return Array.from(this.articleCache.entries());
    }

    getUser(username, callback) 
    {
        if (!this.dbInstance) 
        {
            console.error("Base de datos no conectada");
            callback(null);
            return;
        }

        const tx = this.dbInstance.transaction("users", "readonly");
        const store = tx.objectStore("users");
        const request = store.get(username);

        request.onsuccess = function () 
        {
            if (request.result) 
            {
                const u = request.result;
                const user = new User(u.password, u.category);
                user.failedLoginCounter = u.failedLoginCounter;
                user.isLocked = u.isLocked;
                callback(user);
            } else 
            {
                callback(null); // usuario no encontrado
            }
        };

        request.onerror = function () 
        {
            console.error("Error al obtener el usuario");
            callback(null);
        };
    }


    saveUser(username, userObj)
    {
        if (!this.dbInstance) {
            console.error("Base de datos no conectada");
            return;
        }
        
        const tx = this.dbInstance.transaction("users", "readwrite");
		const store = tx.objectStore("users");
		store.put({
			username,
			password: userObj.password,
			failedLoginCounter: userObj.failedLoginCounter,
			isLocked: userObj.isLocked,
			category: userObj.category
		});

        this.userCache.set(username, userObj);
    }

    saveArticle(id, articleObj)
    {
        if (!this.dbInstance) 
        {
            console.error("Base de datos no conectada");
            return;
        }

        const tx = this.dbInstance.transaction("articles", "readwrite");
		const store = tx.objectStore("articles");
		store.put({
			id,
			name: articleObj.name,
			price: articleObj.price,
			stock: articleObj.stock
		});
    }

    deleteArticle(id)
    {
        if (!this.dbInstance) 
        {
            console.error("Base de datos no conectada");
            return;
        }

        const tx = this.dbInstance.transaction("articles", "readwrite");
		const store = tx.objectStore("articles");
		store.delete(id);
    }

    loadToModel() 
    {
        if (!this.dbInstance) 
        {
	        console.error("IndexedDB no está lista todavía. Abortando carga.");
	        return;
        }

		const tx = this.dbInstance.transaction(["users", "articles"], "readonly");
		const userStore = tx.objectStore("users");
		const articleStore = tx.objectStore("articles");

		const userRequest = userStore.getAll();
		userRequest.onsuccess = function (event) 
        {
			const users = event.target.result;
			for (let i = 0; i < users.length; i++) 
            {
				const u = users[i];
				const user = new User(u.password, u.category);
				user.failedLoginCounter = u.failedLoginCounter;
				user.isLocked = u.isLocked;
				this.userCache.set(u.username, user);
			}
		}.bind(this);

		const articleRequest = articleStore.getAll();
		articleRequest.onsuccess = function (event) 
        {
			const articles = event.target.result;
			for (let i = 0; i < articles.length; i++) 
            {
				const a = articles[i];
				const article = new Article(a.name, a.price, a.stock);
				this.articleCache.set(a.id, article);
			}
		}.bind(this);

		const userCountRequest = userStore.count();
		const articleCountRequest = articleStore.count();
		const self = this;

		userCountRequest.onsuccess = function () 
        {
			const userCount = userCountRequest.result;
			articleCountRequest.onsuccess = function () 
            {
				const articleCount = articleCountRequest.result;

				if (userCount === 0 && articleCount === 0) 
                {
					console.log("Base vacía: precargando datos iniciales...");

					const preloadUsers = [
						["administrador", new User("987654", "administrador")],
						["cliente", new User("987654", "cliente")],
						["vendedor", new User("987654", "vendedor")],
						["deposito", new User("987654", "trabajador de deposito")]
					];

					const preloadArticles = [
						["1", new Article("Lavandina x 1L", 875.25, 3000)],
						["4", new Article("Detergente x 500mL", 1102.45, 2010)],
						["22", new Article("Jabón en polvo x 250g", 650.22, 407)]
					];

					for (let i = 0; i < preloadUsers.length; i++) 
                    {
						self.saveUser(preloadUsers[i][0], preloadUsers[i][1]);
					}
					for (let j = 0; j < preloadArticles.length; j++) 
                    {
						self.saveArticle(preloadArticles[j][0], preloadArticles[j][1]);
					}
				}
			};
		};
    }   
}
export { DBHandler };
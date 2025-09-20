class WCModalDialogWindow extends HTMLElement 
{
    constructor() 
    {
        super();

        this.data = null;
        this.dialog = document.createElement('dialog');
        this.dialog.classList.add( "wc-modal");

        this.btnClose = document.createElement('button');
        this.btnClose.innerText = "X";
        this.btnClose.classList.add("w3-red", "w3-right");

        this.divUser = document.createElement('div');
        this.divUser.innerText = "Cargando usuario...";
        this.divUser.classList.add("w3-container", "w3-green");

        this.divAdddress = document.createElement('div');
        this.divAdddress.innerText = "Cargando direccion...";
        this.divAdddress.classList.add("w3-container", "w3-light-blue");

        this.company = document.createElement('div');
        this.company.innerText = "Cargando compañia...";
        this.company.classList.add("w3-container", "w3-blue");

        this.btnClose.addEventListener("click", function() {this.close()}.bind(this));

        this.dialog.appendChild(this.btnClose);
        this.dialog.appendChild(this.divUser);
        this.dialog.appendChild(this.divAdddress);
        this.dialog.appendChild(this.company);        
        this.appendChild(this.dialog);
    }

    async loadUser(userId)
    {
        let response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        let response_json = await response.json();
      
        this.data = response_json;

        this.divUser.innerText = `Usuario: ${this.data.username}\nID: ${this.data.id}\nNombre: ${this.data.name}`;
        this.divAdddress.innerText = `Direccion:\nCalle: ${this.data.address.street}\nCiudad: ${this.data.address.city}\nCodigo Postal: ${this.data.address.zipcode}`;
        this.company.innerText = `Compañia:\nNombre: ${this.data.company.name}\nEslogan: ${this.data.company.catchPhrase}\nBS: ${this.data.company.bs}`;

    }
    
    open(userId) 
    {
        this.loadUser(userId);
        this.dialog.showModal();
    }

    close() 
    {
        this.dialog.close();
    }
}

customElements.define('wc-modal-dialog', WCModalDialogWindow);

export { WCModalDialogWindow };
class WCModalDialogWindow extends HTMLElement 
{
    constructor() 
    {
        super();

        this.data = null;
        this.dialog = document.createElement('dialog');

        this.divUser = document.createElement('div');
        this.divUser.innerText = "Cargando usuario...";
        this.divUser.classList.add("w3-container", "w3-green");

        this.dialog.classList.add("w3-modal");

        // this.btnClose.addEventListener("click", () => this.close());
        // this.btnClose.addEventListener("click", function() {this.close()}.bind(this));


        this.dialog.appendChild(this.divUser);        
        this.appendChild(this.dialog);
    }

    async loadUser(userId)
    {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts/${userId}');
        let response_json = await response.json();
      
        this.data = response_json;

        this.divUser.innerText = "Usuario: ${this.data.id}";

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
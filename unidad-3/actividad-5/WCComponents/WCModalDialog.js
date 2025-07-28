import { wWCContactForm } from "./WCContactForm.js";

class WCModalDialog extends HTMLElement
{
    constructor ()
    {
        super ();

        this.divW3Container = document.createElement('div');
        this.divW3Container.classList.add("w3-container");

        this.h2 = document.createElement('h2');
        this.h2.textContent = "W3.CSS Modal";

        this.buttonModal = document.createElement('button');
        this.buttonModal.classList.add("w3-button", "w3-black");
        this.buttonModal.innerText = "Contact Us";

        this.divId = document.createElement('div');
        this.divId.id = "id0this1";
        this.divId.classList.add("w3-modal");

        this.divModalContainer = document.createElement('div');
        this.divModalContainer.classList.add("w3-modal-content");

        this.div = document.createElement('div');
        this.div.classList.add("w3-container");

        this.span = document.createElement('span');
        this.span.classList.add("w3-button", "w3-display-topright");
        // this.span.innerHTML = "&times;"; // usando entidad HTML
        this.span.textContent = "×"; // usando el símbolo directamente

        this.form = new wWCContactForm();

        this.div.appendChild(this.span);
        this.div.appendChild(this.form);
        
        this.divModalContainer.appendChild(this.div);

        this.divId.appendChild(this.divModalContainer);

        this.divW3Container.appendChild(this.h2);
        this.divW3Container.appendChild(this.buttonModal);
        this.divW3Container.appendChild(this.divId);

        this.appendChild(this.divW3Container);

    }

    onButtonModal()
    {
        document.getElementById('id0this1').style.display='block';
    }

    onSpanClick()
    {
        document.getElementById('id0this1').style.display='none';
    }

    connectedCallback()
    {
        this.buttonModal.onclick = this.onButtonModal.bind(this);
        this.span.onclick = this.onSpanClick.bind(this);
    }

    disconnectedCallback()
    {
        this.buttonModal.onclick = null;
        this.span.onclick = null;
    }
}

customElements.define('x-wcmodaldialog', WCModalDialog );

export { WCModalDialog };
class wWCContactForm extends HTMLElement
{
    constructor()
    {
        super();

        this.form = document.createElement('form');
        this.form.action = "/action_page.php";
        this.form.classList.add("w3-container", "w3-card-4", "w3-light-grey", "w3-text-blue", "w3-margin");

        this.h2 = document.createElement('h2');
        this.h2.classList.add("w3-center");
        this.h2.textContent = "Contact Us";


        // seccion nombre
        this.divSection1 = document.createElement('div');
        this.divSection1.classList.add("w3-row", "w3-section");

        this.divIcono1 = document.createElement('div');
        this.divIcono1.classList.add("w3-col");
        this.divIcono1.style = "width:50px";
        
        this.i1 = document.createElement('i');
        this.i1.classList.add("w3-xxlarge", "fa", "fa-user");

        this.divInputName = document.createElement('div');
        this.divInputName.classList.add("w3-rest");

        this.inputName = document.createElement('input');
        this.inputName.classList.add("w3-input", "w3-border");
        this.inputName.name = "first";
        this.inputName.type = "text";
        this.inputName.placeholder = "First Name";


        // seccion apellido
        this.divSection2 = document.createElement('div');
        this.divSection2.classList.add("w3-row", "w3-section");

        this.divIcono2 = document.createElement('div');
        this.divIcono2.classList.add("w3-col");
        this.divIcono2.style = "width:50px";
        
        this.i2 = document.createElement('i');
        this.i2.classList.add("w3-xxlarge", "fa", "fa-user");

        this.divInputLastName = document.createElement('div');
        this.divInputLastName.classList.add("w3-rest");

        this.inputLastName = document.createElement('input');
        this.inputLastName.classList.add("w3-input", "w3-border");
        this.inputLastName.name = "last";
        this.inputLastName.type = "text";
        this.inputLastName.placeholder = "Last Name";

        // seccion email
        this.divSection3 = document.createElement('div');
        this.divSection3.classList.add("w3-row", "w3-section");

        this.divIcono3 = document.createElement('div');
        this.divIcono3.classList.add("w3-col");
        this.divIcono3.style = "width:50px";
        
        this.i3 = document.createElement('i');
        this.i3.classList.add("w3-xxlarge", "fa", "fa-envelope-o");

        this.divInputEmail = document.createElement('div');
        this.divInputEmail.classList.add("w3-rest");

        this.inputEmail = document.createElement('input');
        this.inputEmail.classList.add("w3-input", "w3-border");
        this.inputEmail.name = "email";
        this.inputEmail.type = "text";
        this.inputEmail.placeholder = "Email";

        // seccion telefono
        this.divSection4 = document.createElement('div');
        this.divSection4.classList.add("w3-row", "w3-section");

        this.divIcono4 = document.createElement('div');
        this.divIcono4.classList.add("w3-col");
        this.divIcono4.style = "width:50px";
        
        this.i4 = document.createElement('i');
        this.i4.classList.add("w3-xxlarge", "fa", "fa-phone");

        this.divInputPhone = document.createElement('div');
        this.divInputPhone.classList.add("w3-rest");

        this.inputPhone = document.createElement('input');
        this.inputPhone.classList.add("w3-input", "w3-border");
        this.inputPhone.name = "phone";
        this.inputPhone.type = "text";
        this.inputPhone.placeholder = "Phone";

        // seccion mensaje
        this.divSection5 = document.createElement('div');
        this.divSection5.classList.add("w3-row", "w3-section");

        this.divIcono5 = document.createElement('div');
        this.divIcono5.classList.add("w3-col");
        this.divIcono5.style = "width:50px";
        
        this.i5 = document.createElement('i');
        this.i5.classList.add("w3-xxlarge", "fa", "fa-pencil");

        this.divInputMessage = document.createElement('div');
        this.divInputMessage.classList.add("w3-rest");

        this.inputMessage = document.createElement('input');
        this.inputMessage.classList.add("w3-input", "w3-border");
        this.inputMessage.name = "message";
        this.inputMessage.type = "text";
        this.inputMessage.placeholder = "Message";

        // boton enviar
        this.pButton = document.createElement('p');
        this.pButton.classList.add("w3-center");

        this.buttonSend = document.createElement('button'); 
        this.buttonSend.classList.add("w3-button", "w3-section", "w3-blue", "w3-ripple");
        this.buttonSend.innerText = "Send";


        //  estructura seccion nombre
        this.divInputName.appendChild(this.inputName);

        this.divIcono1.appendChild(this.i1);

        this.divSection1.appendChild(this.divIcono1);
        this.divSection1.appendChild(this.divInputName);

        // ------------------------------------------------------

        //  estructura seccion apellido
        this.divInputLastName.appendChild(this.inputLastName);

        this.divIcono2.appendChild(this.i2);

        this.divSection2.appendChild(this.divIcono2);
        this.divSection2.appendChild(this.divInputLastName);
        
        // ------------------------------------------------------

        //  estructura seccion mail
        this.divInputEmail.appendChild(this.inputEmail);

        this.divIcono3.appendChild(this.i3);

        this.divSection3.appendChild(this.divIcono3);
        this.divSection3.appendChild(this.divInputEmail);
        
        // ------------------------------------------------------

        //  estructura seccion phone
        this.divInputPhone.appendChild(this.inputPhone);

        this.divIcono4.appendChild(this.i4);

        this.divSection4.appendChild(this.divIcono4);
        this.divSection4.appendChild(this.divInputPhone);
        
        // ------------------------------------------------------

        //  estructura seccion mensaje
        this.divInputMessage.appendChild(this.inputMessage);

        this.divIcono5.appendChild(this.i5);

        this.divSection5.appendChild(this.divIcono5);
        this.divSection5.appendChild(this.divInputMessage);
        
        // ------------------------------------------------------
        
        this.pButton.appendChild(this.buttonSend);

        // estructura form
        this.form.appendChild(this.h2);
        this.form.appendChild(this.divSection1);
        this.form.appendChild(this.divSection2);
        this.form.appendChild(this.divSection3);
        this.form.appendChild(this.divSection4);
        this.form.appendChild(this.divSection5);
        this.form.appendChild(this.pButton);

        this.appendChild(this.form);

    }
    
    onButttonSendClick()
    {
        alert("Su consulta fue recibida. A la brevedad lo contactaremos. Gracias");
    }

    connectedCallback()
    {
        this.buttonSend.onclick = this.onButttonSendClick.bind(this);
    }

    disconnectedCallback()
    {
        this.buttonSend.onclick = null;
    }

}

customElements.define('x-wwccontanform', wWCContactForm );

export { wWCContactForm };
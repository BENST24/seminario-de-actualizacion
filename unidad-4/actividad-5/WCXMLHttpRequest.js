import { ControllerRequestEndpoint } from "./ControllerRequestEndpoint.js";
import { WCTable } from "./WCTable.js";


class WCXMLHttpRequestExample extends HTMLElement
{
    constructor()
    {
        super();

        this.controllerRequest = new ControllerRequestEndpoint();

        this.requestBtn = document.createElement("button");
        this.clearBtn = document.createElement("button");
        this.table = new WCTable();

        this.requestBtn.innerText = "Efecuar peticion";
        this.clearBtn.innerText = "Limpiar";

        this.appendChild(this.requestBtn);
        this.appendChild(this.clearBtn); 
        this.appendChild(this.table);
    }

    onClearButtonClick(event)
    {
        this.table.clearTable();
	}

    onRequestButtonClick(event)
    {  
        this.controllerRequest.tableDataRequest((err, data) => {
            if (err) {
                window.alert("Error al cargar los datos");
                console.error("Error en la peticion", err);
            } else {
                this.table.setData(data);
            }
        });
    }

    connectedCallback()
    {
        this.requestBtn.onclick = this.onRequestButtonClick.bind(this);
        this.clearBtn.onclick = this.onClearButtonClick.bind(this);
    }

    disconnectredCallback()
    {
        this.requestBtn.onclick = null;
        this.clearBtn.onclick = null;
    }
}

customElements.define('x-request', WCXMLHttpRequestExample );

export { WCXMLHttpRequestExample };
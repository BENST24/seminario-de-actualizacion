class Table extends HTMLElement 
{
    constructor() 
    {
        super();

        this.table = document.createElement('table');

        // Crear thead y encabezado
        this.thead = document.createElement("thead");
        let headerRow = this.thead.insertRow();
        ["ID", "Usuario", "Nombre", "Correo", "Web", "Telefono"].forEach(text => {
            let cell = headerRow.insertCell();
            cell.innerText = text;
            headerRow.appendChild(cell);
        });
        this.thead.appendChild(headerRow);
        this.table.appendChild(this.thead);

        // Crear tbody para los datos
        this.tbody = document.createElement("tbody");
        this.table.appendChild(this.tbody);

        // Agregar clases de estilo
        this.table.classList.add("w3-card-4", "w3-centered", "w3-table-all", "w3-hoverable", "w3-margin", "w3-small");
        headerRow.classList.add("w3-green");
        this.table.style = "width: 60%";
        
        this.appendChild(this.table);
    }

    insertRow(data)
    {
        let row = this.tbody.insertRow();
        row.insertCell().innerText = data.id;
        row.insertCell().innerText = data.username;
        row.insertCell().innerText = data.name;

        // Celda de correo con clase personalizada
        let emailCell = row.insertCell();
        emailCell.innerText = data.email;
        emailCell.classList.add("w3-tag", "w3-blue", "w3-round");
        emailCell.style = "padding:3px"

        row.insertCell().innerText = data.website;
        row.insertCell().innerText = data.phone;
    }

    setData(array)
    {
        this.tbody.textContent = "";
        array.forEach(function(item) 
        {
            this.insertRow(item);
        }.bind(this));
    }

    clearTable()
    {
        this.tbody.textContent = "";
    }
}

customElements.define('x-table', Table);

export { Table };
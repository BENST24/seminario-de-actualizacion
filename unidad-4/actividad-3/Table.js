class Table extends HTMLElement 
{
    constructor() 
    {
        super();

        this.table = document.createElement('table');

        // Crear thead y encabezado
        this.thead = document.createElement("thead");
        let headerRow = this.thead.insertRow();
        ["userId", "id", "title", "body"].forEach(text => {
            let cell = headerRow.insertCell();
            cell.innerText = text;
            headerRow.appendChild(cell);
        });
        this.thead.appendChild(headerRow);
        this.table.appendChild(this.thead);

        // Crear tbody para los datos
        this.tbody = document.createElement("tbody");
        this.table.appendChild(this.tbody);

        this.appendChild(this.table);
    }

    insertRow(data)
    {
        let row = this.tbody.insertRow();
        row.insertCell().innerText = data.userId;
        row.insertCell().innerText = data.id;
        row.insertCell().innerText = data.title;
        row.insertCell().innerText = data.body;
    }

    setData(array)
    {
        this.tbody.innerHTML = "";
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
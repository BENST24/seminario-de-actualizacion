class ControllerRequestEndpoint 
{
    constructor()
    {}

    tableDataRequest(callback)
    {
        const xhr = new XMLHttpRequest();

        xhr.onload = (event) => 
        {
            if (xhr.readyState === 4 && xhr.status === 200 ) 
            {
                let data = JSON.parse(xhr.responseText);
                callback(null, data);
            }
            else 
            {
                console.error(xhr.statusText);
                callback(new Error(xhr.statusText), null);
            }
        }

        xhr.onerror = (event) => 
        {
            console.error(xhr.statusText);
            callback(new Error(xhr.statusText), null);
        };
        
        xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/');
        xhr.send();  
    }

    async requestDataDodalDialog(userId)
    {
        let response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        return await response.json();
    }
}

export { ControllerRequestEndpoint };
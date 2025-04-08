export async function getData(method, endpoint, token, body={}) {
    let res;
    // If method POST
    if (method === "POST" || method === "UPDATE" || method === "DELETE"){
        // TODO: Use ENUM
        res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`, // Attach token to request
            },
            body: JSON.stringify(body),
            credentials: "include",
        });

    }  else {
        // GET -> No body 
        res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`, // Attach token to request
            },
            credentials: "include",
        });

    }


    return res;
}

export async function sendFile(endpoint, token, formData) {
    let res;
 
        res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: formData,
            credentials: "include",
        });

    
    return res;
}


async function getData(method, endpoint, token, body={}) {
    let res;
    // If method POST
    if (method === "POST" || method === "UPDATE"){
        // TODO: Use ENUM
        res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`, // Attach token to request
            },
            body: JSON.stringify(body)
        });

    }  else {
        // GET, DELETE -> No body 
        res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`, // Attach token to request
            }
        });

    }


    return res;
}

export default getData;

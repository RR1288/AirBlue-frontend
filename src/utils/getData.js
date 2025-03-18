async function getData(method, endpoint, body=null) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`, // Attach token to request
        },
        body: JSON.stringify(body)
    });

    // const result = await res.json();
    // if (!result.success) {
    //     throw new Error(`Error in response: ${result.message}`);
    // }

    // return result.data;
    return res;
}

export default getData;

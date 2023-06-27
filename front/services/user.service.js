const url = 'http://minikit.pythonanywhere.com/users';

export const getUserByEmail = (email) => {
    const queryParams = new URLSearchParams({ email });
    const fetchUrl = `${url}/getUser?${queryParams}`;

    return fetch(fetchUrl)
        .then(response => response.json())
        .then(data => {
            return data;
        })
};

export const addUser = (body) => {
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(body)
    })
        .then(response => { return response.json() })
}

export const getUsers = () => {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

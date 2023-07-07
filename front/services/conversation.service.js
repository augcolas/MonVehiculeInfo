const url = 'http://minikit.pythonanywhere.com/conversations';


export const createConversation = (user_id, contact_id, vehicle_id) => {
    console.log('json',JSON.stringify({user_id, contact_id, vehicle_id}))
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({user_id, contact_id, vehicle_id})
    }).then((response) => {
        return response.json();
    })
}


export const createMessage = (conversation_id, content, user_id) => {
    return fetch(`${url}/${conversation_id}/messages`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({content, user_id})
    }).then((response) => {
        return response.json()
    })
}

export const checkConversationExist = (user_id, contact_id) => {
    return fetch(`${url}/exist?user_id=${user_id}&contact_id=${contact_id}`).then((response) => {
        return response.json()
    });

}

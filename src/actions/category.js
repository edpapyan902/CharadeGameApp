export const API_URL = "http://192.168.109.83:8000";

export const getCategory = (callback) => dispatch => {
    fetch(API_URL + "/api/category", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(res => {
            if (res.err)
                callback({ success: false, data: null });
            else {
                callback({ success: true, data: data });
            }
        })
        .catch(err => callback({ success: false, data: err }));
}
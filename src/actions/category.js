// export const API_URL = "http://10.0.2.2:8000";
export const API_URL = "http://3.23.49.124";

export const getCategory = (callback) => {
    fetch(API_URL + "/api/category", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(res => {
            if (res.Success)
                callback({ success: true, data: res });
            else
                callback({ success: false, data: null });
        })
        .catch(err => {
            callback({ success: false, data: err })
        });
}

export const getWord = (category, callback) => {
    fetch(`${API_URL}/api/word/${category}`, {
        method: "GET",
        header: {
            'Content-Type': 'application/json'
        },
    })

        .then(res => res.json())
        .then(res => {
            if (res.Success)
                callback({ success: true, data: res });
            else
                callback({ success: false, data: null });
        })
        .catch(err => callback({ success: false, data: err }));
}

export const getAdsense = (category, callback) => {
    fetch(`${API_URL}/api/adsense/${category}`, {
        method: "GET",
        header: {
            'Content-Type': 'application/json'
        },
    })

        .then(res => res.json())
        .then(res => {
            if (res.Success)
                callback({ success: true, data: res });
            else
                callback({ success: false, data: null });
        })
        .catch(err => callback({ success: false, data: err }));
}
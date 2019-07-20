export default function loadData(url, action) {
    return (dispatch) => {
        console.warn('loadData url', url);
        fetch(url)
            .then((response) => {
                if (response.status !== 200) {
                    console.warn(`Looks like there was a problem. Status Code: ${
                        response.status}`);
                    return;
                }
                response.json().then((data) => {
                    console.warn('loadData загрузил и отправляет dispatch', data);
                    dispatch({type: action, payload: data});
                });
            })
            .catch((err) => {
                console.warn('Fetch Error :-S', err);
            });
    };
}
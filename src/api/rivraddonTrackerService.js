export default function (event_type) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            "eventType": event_type
        });

        const xhr = new XMLHttpRequest();

        xhr.onerror = (e) => {
            reject(e);
        };

        xhr.onabort = () => {
            reject(new Error('aborted'));
        };

        xhr.onload = () => {
            const status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                resolve();
            } else {
                reject(new Error('unsuccessful response code'));
            }
        };

        xhr.open("POST", "https://tracker.simplaex-code-challenge.com/");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    });
}

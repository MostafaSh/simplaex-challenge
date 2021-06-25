export default function (event_type) {
    const data = JSON.stringify({
        "eventType": event_type
    });

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === XMLHttpRequest.DONE) {
            const status = xhr.status;
            if (!(status === 0 || (status >= 200 && status < 400))) {
                console.error('error in rivraddon tracker service', status);
            }
        }
    });

    xhr.open("POST", "https://tracker.simplaex-code-challenge.com/");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}

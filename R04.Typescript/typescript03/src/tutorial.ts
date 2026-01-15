enum ServerResponseStatus {
    Success,
    Error,
}
console.log(ServerResponseStatus);

const fecha = new Date().toLocaleDateString();
console.log(fecha);
console.log(typeof fecha);

interface ServerResponse {
    results: ServerResponseStatus;
    data: string[];
    date: string;
}

function getServerResponse(): ServerResponse {
    return {
        results: 0,
        data: ["firest item", "second item"],
        date: fecha,
    };
}

const response: ServerResponse = getServerResponse();
console.log(response);

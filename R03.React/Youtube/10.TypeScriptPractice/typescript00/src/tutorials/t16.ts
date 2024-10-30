enum ServerResponseStatus {
    Success = 200,
    Error = 500,
}
console.log(ServerResponseStatus);
/* 
Object.values(ServerResponseStatus).forEach((x) => {
    if (typeof x === "number") {
        console.log(x);
    }
}); 
*/

interface ServerResponse {
    result: ServerResponseStatus;
    data: ["first item", "second item"];
}

function getServerResponse(): ServerResponse {
    return {
        result: ServerResponseStatus.Success,
        data: ["first item", "second item"],
    };
}

const response: ServerResponse = getServerResponse();
console.log(response);

// 1xx informational response - the request was received, continuing process

// 2xx  the request was successfull, received, understood and accepted
const OK = 200;
// anrop som försöker skapa någon slags data
const CREATED = 201;

// 3xx redirection - further action needs to be taken in order to complete the request

// 4xx client error - the request contains bad syntax or cannot be fulfilled
const BAD_REQUEST = 400;
// klienten försöker göra ett anrop som klienten inte får göra, tex. delete user utan att vara admin
const UNAUTHORIZED = 401;
// klienten är bannad från sida, man får inte göra anrop
const FORBIDDEN = 403;
// Anropet hittade ingen server överhuvudtaget, troligen url:en är fel
const NOT_FOUND = 404;
const METHOD_NOT_ALLOWED = 405;
// Om man försöker göra anrop som redan körts, eller returnera användare som redan finns i databas
const DUPLICATE_RESOURCE = 409
// inside joke - 418 = im a teapot

// 5xx server error - the server failed to fulfil an apparaently valid request
// Servern mottog anropet, men visste ej hur den skulle hantera anropet 
const INTERNAL_SERVER_ERROR = 500;

export default {
    OK,
    CREATED,
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND,
    METHOD_NOT_ALLOWED,
    DUPLICATE_RESOURCE,
    INTERNAL_SERVER_ERROR
}


const notFound = (request, response, next) => {
    const error = new Error(`Not Found: ${request.OriginalUrl}`);
    response.status(404);
    next(error);
}

export default {
    notFound
}
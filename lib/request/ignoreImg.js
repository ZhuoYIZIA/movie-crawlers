module.exports = request => {
    if (request.resourceType() === 'document') {
        request.continue();
    } else {
        request.abort();
    }
}
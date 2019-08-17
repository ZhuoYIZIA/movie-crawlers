function pageParser() {
    function getLinks() {
        let link = [];
        document.querySelectorAll('.release_movie_name>a').forEach(item => {
            link.push({
                title: item.innerText,
                link: item.href
            })
        });
        return link;
    }
    return {
        links: getLinks(),
    }
}

module.exports = pageParser;
function contentParser() {
    function movieInfo() {
        let info = {
            poster: "unknown",
            tw_name: "unknown",
            zh_name: "unknown",
            movieType: "unknown",
            playdate: "unknown",
            movieLength: "unknown",
            issueCompany: "unknown",
            director: "unknown",
            actor: [],
            evaluation: "unknown",
            expectation: "unknown",
            store: "unknown",
            trailer: "unknown",
        }
        info.poster = document.querySelector('.movie_intro_foto > img').getAttribute('src');
        info.tw_name = document.querySelector('.movie_intro_info_r>h1').innerText;
        info.zh_name = document.querySelector('.movie_intro_info_r>h3').innerText;
        info.movieType = document.querySelector('.level_name>a').innerText;
        let movieIntro = document.querySelectorAll('.movie_intro_info_r > span');
        info.playdate = movieIntro[0].innerText;
        info.movieLength = movieIntro[1].innerText;
        info.issueCompany = movieIntro[2].innerText;
        // let movieMember = document.querySelectorAll('.movie_intro_info_r > span');
        info.director = document.querySelector('.movie_intro_list').innerText;
        actorArray = document.querySelectorAll('.movie_intro_list > a');
        actorArray.forEach(item => {
            info.actor.push(item.innerText);
        });
        info.evaluation = document.querySelector('.score > .score_num').innerText;
        info.expectation = document.querySelector('.circlenum > .num > span').innerText;
        info.store = document.querySelector('.gray_infobox_inner > span').innerText;
        info.trailer = document.querySelector('.color_btnbox > .btn_s_vedio').getAttribute('href');

        return info;
    };

    // function getComments() {
    //     let comments = {

    //     }
    // };

    function getVideoLinks() {
        // let videoItems = [];

        // document.querySelectorAll('.slick-list > .slick-track > li').forEach(item => {
        //     videoItems.push({
        //         // test: item.querySelector('a > .trailer_inner > h2').innerText,
        //         // link: item.querySelector('a').getAttribute('href')
        //         test: 'asdf'
        //     });
        // });

        // return videoItems;
        // return 
    };
    return {
        movieInfo: movieInfo(),
        // comments: getComments(),
        videoLinks: getVideoLinks(),
    }
}

module.exports = contentParser;
'use strict';
var learnjs = {};

learnjs.problemView = function(data) { 
    // templetes の .problem-viewをコピーして、問題番号をタイトルにつけて表示
    var problemNumber = parseInt(data, 10);
    var view = $('.templates .problem-view').clone();
    view.find('.title').text('problem #' + problemNumber);
    learnjs.applyObject(learnjs.problems[problemNumber-1], view);
    return view;
}
learnjs.showView = function (hash) {
    var routes = {
        '#problem': learnjs.problemView
    };
    var hashParts = hash.split('-');
    var viewFn = routes[hashParts[0]];
    if (viewFn) {
        $('.view-container').empty().append(viewFn(hashParts[1]));
    }
}
learnjs.appOnReady = function () {
    window.onhashchange = function () {
        learnjs.showView(window.location.hash);
    }
    learnjs.showView(window.location.hash);
}
learnjs.problems = [
    {
        description: "What is truth?",
        code: "function problem() { return __; }"
    },
    {
        description: "Simple Math",
        code: "function problem() { return 42 ==== 6 * __; "
    }
];

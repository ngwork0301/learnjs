'use strict';
var learnjs = {};
learnjs.showView = function (hash) {
    var problemView = $('<div class="problem-view"></div>').text('Comming soon!');
    $('.view-container').empty().append(problemView);
}
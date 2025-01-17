describe('LearnJS', function () {
    it('ナビバーが表示される', function () {
        learnjs.showView('');
        expect($('.nav-container').length).toEqual(1);
    });
    it('problem viewが表示される (can show a problem view)', function () {
        // problem viewが表示されることを確認する
        learnjs.showView('#problem-1');
        expect($('.view-container .problem-view').length).toEqual(1);
    });
    it('hashが入れられていない場合は、landing viewを表示する (shows the landing page view when there is no hash)', function () {
        // hashが入れられていない場合は、landing viewを表示することを確認
        learnjs.showView('');
        expect($('.view-container .landing-view').length).toEqual(1);
    });
    it('適当な問題コード42を渡して、それがproblem viewに渡せている (passes the hash view parameter to the view function)', function () {
        // 適当な問題コードを渡して、それがproblem viewに渡せていることを確認
        spyOn(learnjs, 'problemView');
        learnjs.showView('#problem-42');
        expect(learnjs.problemView).toHaveBeenCalledWith('42');
    });
    it('ロードしたときにルータが呼び出せている (invokes the router when loaded)', function () {
        spyOn(learnjs, 'showView');
        learnjs.appOnReady();
        expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
    });
    it('ハッシュを入れてリクエストしたときにイベントが発火すること確認 (subscribes to the hash change event)', function() {
        learnjs.appOnReady();
        spyOn(learnjs, 'showView');
        $(window).trigger('hashchange');
        expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
    });
    describe('problem view', function () {
        var view;
        beforeEach(function() {
            view = learnjs.problemView('1');
        });
        it('タイトルが問題コードを含んで表示できている (has a title that includes the problem number)', function () {
            // problem viewの具体的なコンテンツのなかに問題コードが含まれていることを確認
            expect(view.find('.title').text()).toEqual('problem #1');
        });
        it('descriptionが表示されている (shows the description)', function () {
            expect(view.find('[data-name="description"]').text()).toEqual('What is truth?');
        });
        it('問題コードが表示されている (shows the problem code)',function () {
            expect(view.find('[data-name="code"]').text()).toEqual('function problem() { return __; }');
        });
    });
    describe('anser section', function () {
        var view;
        beforeEach(function() {
            view = learnjs.problemView('1');
        });
        it('ボタンアクションで正しい答えをチェックできる (can check a correct answer by hitting a button)', function () {
            view.find('.answer').val('true');
            view.find('.check-btn').click();
            expect(view.find('.result').text()).toContain('Correct!');
        });
        it('不正解をリジェクトする (reject an incorrect answer)', function(){
            view.find('.answer').val('false');
            view.find('.check-btn').click();
            expect(view.find('.result').text()).toEqual('Incorrect!')
        });
        it('次の問題へのリンクを表示する', function () {
            view.find('.answer').val('true');
            view.find('.check-btn').click();
            var resultFlash = view.find('.result');
            expect(resultFlash.find('a').text()).toEqual('Next Problem');
            expect(resultFlash.find('a').attr('href')).toEqual('#problem-2');
        });
        it("最後の問題に正解後は、You're Finished!を表示", function(){
            lastNumber = learnjs.problems.length;
            view = learnjs.problemView(lastNumber);
            view.find('.answer').val('7');
            view.find('.check-btn').click();
            var resultFlash = view.find('.result');
            expect(resultFlash.text()).toContain("Correct! You're Finished!");
            expect(resultFlash.find('a').text()).not.toContain('Next Problem');
        });
    })
});

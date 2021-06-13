describe('LearnJS', function () {
    it('can show a problem view', function () {
        // problem viewが表示されることを確認する
        learnjs.showView('#problem-1');
        expect($('.view-container .problem-view').length).toEqual(1);
    });
    it('shows the landing page view when there is no hash', function () {
        // hashが入れられていない場合は、landing viewを表示することを確認
        learnjs.showView('');
        expect($('.view-container .landing-view').length).toEqual(1);
    });
    it('passes the hash view parameter to the view function', function () {
        // 適当な問題コードを渡して、それがproblem viewに渡せていることを確認
        spyOn(learnjs, 'problemView');
        learnjs.showView('#problem-42');
        expect(learnjs.problemView).toHaveBeenCalledWith('42');
    });
    it('invokes the router when loaded', function () {
        learnjs.appOnReady();
        spyOn(learnjs, 'showView');
        $(window).trigger('hashchange');
        expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
    });
    it('subscribes to the hash change event', function() {
        learnjs.appOnReady();
        spyOn(learnjs, 'showView');
        $(window).trigger('hashchange');
        expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
      });
    describe('problem view', function () {
        it('has a title that includes the problem number', function () {
            // problem viewの具体的なコンテンツのなかに問題コードが含まれていることを確認
            expect(view .find('.title').text().toEqual('Problem #1'));
        });
        it('shows the description', function () {
            expect(view.find('[data-name="description"').text().toEqual('What is trurh?'));
        });
        it('shows the problem code',function () {
            expect(view.find('[data-name="description"').text().toEqual('function problem() { return _; }'));
        });
    });
});

class QuestionEndView {

    constructor(parent_container) {
        this.parent_container = parent_container;
    }

    render() {
        $(`${this.parent_container}`).html(`
          <div id="question-end-view" style="display: none;" class="row">
            <div class="col-lg-8">
              <div class="text-container" style="margin-top: 0px;">
                <h1>Geen vragen meer!</h1>
                <p class="p-large">Er zijn geen unieke vragen meer, druk snel op <span class="code-block">E</span> en check de eindstand!</p>
              </div>
            </div>
          </div>
        `)

        return $('#question-end-view').fadeIn(500).promise()
    }

    hide() {
      return $('#question-end-view').fadeOut(500).promise()
    }
}

export default QuestionEndView;
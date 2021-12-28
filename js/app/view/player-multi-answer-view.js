class PlayerMultiAnswerView {

    constructor(parent_container) {
        this.parent_container = parent_container;
        this.deadline_timer = undefined
        this.onAnswerFn = () => { };
    }

    onAnswer(onAnswerFn) {
        this.onAnswerFn = onAnswerFn
        return this;
    }
    
    render(answer_options, deadline) {
      this.isFinished = false;
      this.deadline_timer = setInterval(() => {
        var now = new Date()
        now.setSeconds( now.getSeconds() + 10 )
        
        if(now.getTime() >= Date.parse(deadline)) {
          $("header").addClass("warning")
        }
      }, 1000)
      $("#player-answer-view .col-lg-12 .entry").off();

      $(`${this.parent_container}`).html(`
          <div id="player-answer-view" class="container">
              <div id="answer-options" class="col-lg-12">
                <div class="text-container">
                  <h3>Meerkeuze vraag</h3>
                </div>
                  ${ this.getAnswerOptions(answer_options) }
              <div>
          </div>
      `)

      $("#player-answer-view .col-lg-12 .entry").on('click', (event) => {
          const now = new Date().getTime()

          clearInterval(this.deadline_timer)
          $("header").removeClass("warning")

          if(now > Date.parse(deadline) || this.isFinished) return;

          this.onAnswerFn(
            $(event.currentTarget).find('.link').html()
          )

          $('#player-answer-view .col-lg-12 .entry.selected').removeClass('selected')
          $(event.currentTarget).addClass('selected')
      })

      return $('#player-answer-view').fadeIn(250).promise()
    }

    hide() {
      return $('#player-answer-view').fadeOut(250).promise()
    }

    setFinished() {
      clearInterval(this.deadline_timer)
      $("header").removeClass("warning")

      this.isFinished = true;
    }

    setWrongAnswers(correct_answer) {
      $('#answer-options .entry').each((index, target) => {
        const option = $(target).find('.link').html()

        if(correct_answer !== option) {
          $(target).addClass('wrong')
        } else {
          $(target).addClass('correct')
        }
      })
    }

    getAnswerOptions(options) {
        let content = ''

        const letters = ['A', 'B', 'C', 'D', 'E'];

        options.forEach((option, index) => {
            content += `
              <div id="answer-${letters[index].toLowerCase()}" style="width: 100%;" class="rest entry">
                <div class="others d-flex">
                  <div class="rank">
                    <p class="num">${letters[index]}</p>
                  </div>
                  <div class="info d-flex">
                    <p class="link">${option}</p>
                  </div>
                </div>
              </div>
            `
        })

        return content;
    }
}

export default PlayerMultiAnswerView;
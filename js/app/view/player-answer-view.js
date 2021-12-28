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

      $("#player-answer-view .col-lg-12 #answer-btn").off();

      $(`${this.parent_container}`).html(`
          <div id="player-answer-view" class="container">
              <div id="answer-options" class="col-lg-12">
                ${ this.getAnswerInput(answer_options[0].length) }
                <a class="btn-solid-lg" style="margin-bottom: 0px;" id="answer-btn">Send!</a>
              <div>
          </div>
      `)

      $("#player-answer-view .col-lg-12 #answer-btn").on('click', (event) => {
          const now = new Date().getTime()

          clearInterval(this.deadline_timer)
          $("header").removeClass("warning")

          if(now > Date.parse(deadline) || this.isFinished) return;

          this.onAnswerFn(
            $("input[name='answer']").val()
          )

          $("input[name='answer']").attr('disabled', true)

          $(event.currentTarget).fadeOut(250)
      })

      return $('#player-answer-view').fadeIn(250).promise()
    }

    getAnswerInput(count) {
        return `
            <div class="text-container">
                <h3>Open question</h3>
                <p>Answer has ${count} characters, casing and/or spacing will be ignored.</p>
                <input class="input-solid-reg" style="margin-bottom: 0px;" name="answer" type="text" placeholder="..." />
            </div>
        `
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
      const value = $('#answer-options input').val()

      if(this.isCorrectAnswer(value, correct_answer)) {
        $('#answer-options input').addClass('correct')
      } else {
        $('#answer-options input').addClass('wrong')
        $('#player-answer-view .text-container').append(`<input class="input-solid-reg correct" style="margin-bottom: 0px; display: none;" name="correct-answer" type="text" value="${correct_answer}" />`)
        $("#player-answer-view input[name='correct-answer']").fadeIn(250)
      }
    }

    isCorrectAnswer(given_answer, correct_answer) {
      given_answer = this.strip(given_answer)
      correct_answer = this.strip(correct_answer)

      if(correct_answer.length < 5) return given_answer === correct_answer

      // correct_answer contains all characters from given answer
      // correct_answer length is equal, or 1 more, or 1 less.
      return [...given_answer].every(char => [...correct_answer].includes(char)) 
              && (correct_answer.length === given_answer.length || correct_answer.length === given_answer.length - 1 || correct_answer.length === given_answer.length + 1) 
    }

    strip(value) {
      return value.toLowerCase().replace(/\s/gm, '')
    }
}

export default PlayerMultiAnswerView;
import AnsweringComponent from "../component/answering-component.js";

class QuestionView {

  constructor(parent_container) {
    this.timers = []
    this.players_answered = []
    this.parent_container = parent_container;
    this.onTimerEndsFn = () => { }
  }

  onTimerEnds(onTimerEndsFn) {
    this.onTimerEndsFn = onTimerEndsFn
    return this;
  }

  render(message) {
    const answering_component = new AnsweringComponent(message.players);

    $(`${this.parent_container}`).html(`
      <div id="question-view" class="row" style="display:none;">
        <div class="col-lg-12 mb-5">
          <h2 style="text-align: center;">${message.question}</h2>
        </div>
        <div style="display: flex; flex-direction: column;" class="col-lg-6">
          ${
            message.image === null
              ? ''
              : `<img src="data:image/jpeg;base64,${message.image}" class="question-image" ${message.blurred ? `style="filter: blur(10px);"`  : ''} />`
          }     
        </div>
        <div style="display: flex; flex-direction: column;" class="${message.image == null ? 'col-lg-12' : 'col-lg-6'}">                    
          ${ answering_component.render() }            
        </div>
      </div>
    `)

    message.players.forEach(player => {
      this.runTimers(message, player)
    });

    return $('#question-view').fadeIn(500).promise()
  }

  hide() {
    return $('#question-view').fadeOut(500).promise()
  }

  runTimers(message, player) {
    const deadline = Date.parse(message.deadline)

    this.players_answered = []

    $(`#state-${player.id} .countdown-timer`).html(`
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            stroke-dasharray="283"
            style="color: white;"
            class="base-timer__path-remaining-${player.id} base-timer__path-remaining"
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <span></span>
    `)

    const countdown = setInterval(() => {

      const secsForQuestion = message.answers.length > 1 ? 30 : 45

      const now = new Date().getTime();
      const distance = deadline - now;
      const seconds = Math.floor(distance / 1000)
      const color = seconds > 10 ? 'white': 'red';     

      if(seconds <= 0) {
        clearInterval(countdown)
        this.onTimerEndsFn()
        this.removeBlur()
      }

      if(this.players_answered.includes(player.id)) {
        return;
      }

      if(seconds >= 0) {

        if(message.blurred) {
          this.setBlur(seconds - 5)
        }

        function calculateTimeFraction() {
          const rawTimeFraction = seconds / secsForQuestion;
          return rawTimeFraction - (1 / secsForQuestion) * (1 - rawTimeFraction);
        }

        const circleDasharray = `${(calculateTimeFraction() * 283).toFixed(0)} 283`;
        
        const elements = document.getElementsByClassName(`base-timer__path-remaining-${player.id}`);

        for (let element of elements) {
          element.setAttribute("stroke-dasharray", circleDasharray)
        }

        $(`#state-${player.id} span`).html(seconds);

        if(seconds <= 10) {
          $(`#state-${player.id} path`).css('color', 'red')
        }
      }
    }, 1000)

    this.timers.push(countdown)
  }

  setBlur(value) {
    if(value < 0) return;

    $('.question-image').css('filter', `blur(${value}px)`)
  }

  removeBlur() {
    $('.question-image').css('filter', `blur(0px)`)
  }

  setAnswered(session) {
    this.players_answered.push(session)
    $(`#state-${session} .countdown-timer path`).css('color', 'white');
    $(`#state-${session} span`).html('<i class="fas fa-check"></i>')
  }

  resetTimers() {
    this.timers.forEach(timer => {
      clearInterval(timer)
    })
  }

  setAnswersCorrect(players) {
    players.forEach(player => {
      // $(`#state-${player.id} .countdown-timer path`).css('color', 'transparent');
      // $(`#state-${player.id} .base-timer__path-elapsed`).css('fill', '#1DB954')

      $(`#state-${player.id}`).css('background-color', '#1DB954')
    })
  }

  setAnswersWrong(players) {
    players.forEach(player => {
      $(`#state-${player.id} span`).html('<i class="fas fa-times"></i>')
      // $(`#state-${player.id} .countdown-timer path`).css('color', 'transparent');
      // $(`#state-${player.id} .base-timer__path-elapsed`).css('fill', '#fe5461')

      $(`#state-${player.id}`).css('background-color', '#FE5461')
    })

    $(`.entry`).each((index, target) => {
      const background_color = $(target).css("background-color");

      if(background_color === 'rgb(38, 36, 49)') {
        $(target).find('.countdown-timer path').css('color', 'white');
        $(target).find('span').html('<i class="fas fa-times"></i>')
        $(target).css('background-color', '#FE5461');
      }
    })
  }
}

export default QuestionView;
import { ip } from '../config.js'
import Toast from '../component/toast.js'
import WelcomeView from '../view/welcome-view.js';
import QuestionView from '../view/question-view.js';
import LeaderboardView from '../view/leaderboard-view.js';
import QuestionEndView from '../view/question-end-view.js';

const CONNECT = (session_id) => {
    const socket = new WebSocket(`ws://${ip}:8081/websocket?session_id=${session_id}`);

    let has_ended = false;

    const welcome_view = new WelcomeView('#views')
    const question_view = new QuestionView('#views')
    const leaderboard_view = new LeaderboardView('#views')
    const question_end_view = new QuestionEndView('#views')

    let active_view;

    socket.addEventListener('open', function (event) {
        const message = {
            type: 'OBSERVER_JOIN'
        }

        welcome_view.render()
        active_view = welcome_view

        socket.send(JSON.stringify(message))
    });

    // Listen for messages
    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if(message.type === "LEADERBOARD") {
          active_view.hide().done(() => {
              leaderboard_view.render(message.players, has_ended)
              active_view = leaderboard_view
          })
        }

        if(message.type === "PLAYER_JOIN") {
          Toast.notify(`<span>${message.name}</span> doet nu mee!`, "quiz-primary", 5000, true)
        }

        if(message.type === "QUESTION") {
            active_view.hide().done(() => {
                question_view
                  .onTimerEnds(() => {
                    const payload = {
                      type: 'TIMEOUT'
                    }

                    socket.send(
                      JSON.stringify(payload)
                    )
                  })
                  .render(message)
                active_view = question_view
            })
        }
        
        if(message.type === "PLAYER_ANSWERED") {
          question_view.setAnswered(message.player.id)
        }

        if(message.type === "SHOW_QUESTION_RESULT") {
          question_view.resetTimers()
          question_view.setAnswersCorrect(message.correct)
          question_view.setAnswersWrong(message.wrong)
        }

        if(message.type === "QUESTION_EMPTY") {
          active_view.hide().done(() => {
            question_end_view.render()
            active_view = question_end_view;
            has_ended = true
          })
        }
    };

    $("body").on("keydown", function(e){
          
        // SPACE
        if(e.keyCode == 32) {
          const message = {
            type: 'SHOW_QUESTION'
          }
          
          socket.send(JSON.stringify(message))
          return false;
        }

        // R || E
        if(e.keyCode == 82 || e.keyCode == 69) {
          console.log("Show leaderboard")

          leaderboard_view.setFireworks(e.keyCode == 69)

          const message = {
            type: 'SHOW_LEADERBOARD'
          }
            
          socket.send(JSON.stringify(message))
          return false;
        }
      });
}

export default { CONNECT }
import { ip } from '../config.js'
import PlayerAnswerView from '../view/player-answer-view.js';
import PlayerMultiAnswerView from '../view/player-multi-answer-view.js';
import PlayerReadyView from '../view/player-ready-view.js';
import RegisterView from '../view/register-view.js';

var IS_CONNECTED = null;

const CONNECT = (session_id) => {
    const socket = new WebSocket(`ws://${ip}:8081/websocket?session_id=${session_id}`);

    return new Promise((resolve, reject) => {
        const register_view = new RegisterView('#views')
        const welcome_view = new PlayerReadyView('#views')
        const player_answer_view = new PlayerAnswerView('#views')
        const player_multi_answer_view = new PlayerMultiAnswerView('#views')

        let active_view;

        socket.onopen = (event) => {
            register_view
                .onRegister(() => {
                    const payload = {
                        type: "PLAYER_JOIN",
                        name: $("input[name='player-name']").val()
                    }
            
                    socket.send(
                        JSON.stringify(payload)
                    )
            
                    active_view.hide().done(() => {
                        welcome_view.render(payload.name)
                        active_view = welcome_view;
                    })
                })
                .render()
            
            active_view = register_view;
            IS_CONNECTED = true;

            console.log(IS_CONNECTED)

            resolve(IS_CONNECTED)
        }

        // Listen for messages
        socket.onmessage = (evt) => {
            const message = JSON.parse(evt.data);

            if(message.type == 'QUESTION' && message.answers.length == 1) {
                active_view.hide().done(() => {
                    player_answer_view
                        .onAnswer((answer) => {
                            const epoch_millis = new Date().getTime()
                            const deadline_millis = Date.parse(message.deadline)

                            const response =  {
                                type: "ANSWER",
                                answer: answer,
                                score: (deadline_millis - epoch_millis) / 100
                            }
                            
                            socket.send(
                                JSON.stringify(response)
                            )
                        })
                        .render(message.answers, message.deadline)

                    active_view = player_answer_view
                })
            }

            if(message.type == 'QUESTION' && message.answers.length > 1) {
                active_view.hide().done(() => {
                    player_multi_answer_view
                        .onAnswer((answer) => {
                            const epoch_millis = new Date().getTime()
                            const deadline_millis = Date.parse(message.deadline)

                            const response =  {
                                type: "ANSWER",
                                answer: answer,
                                score: (deadline_millis - epoch_millis) / 100
                            }
                            
                            socket.send(
                                JSON.stringify(response)
                            )
                        })
                        .render(message.answers, message.deadline)

                    active_view = player_multi_answer_view
                })
            }

            if(message.type === "SHOW_QUESTION_RESULT") {
                if(active_view == player_answer_view) {
                    player_answer_view.setFinished()
                    player_answer_view.setWrongAnswers(message.answer)
                } else {
                    player_multi_answer_view.setFinished()
                    player_multi_answer_view.setWrongAnswers(message.answer)
                }
            }
        }

        socket.onerror = (error) => {
            IS_CONNECTED = false
            reject(error)
        }

        socket.onclose = (error) => {
            IS_CONNECTED = false
            reject(error)
        }
    })
}

const RECONNECT = async (session_id) => {
    try {
        return await CONNECT(session_id)
    } catch (err) {
        console.log('WEBSOCKET_RECONNECT: Error', new Error(err).message)
    }
}

export default { CONNECT, RECONNECT, IS_CONNECTED }
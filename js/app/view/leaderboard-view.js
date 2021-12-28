import LeaderboardEntryComponent from '../component/leaderboard-entry-component.js'

class LeaderboardView {

    constructor(parent_container) {
        this.parent_container = parent_container;
        this.fireworks = false
    }

    render(players) {
        $(`${this.parent_container}`).html(`
          <div id="leaderboard-view" style="display: none;" class="row">
            <div class="col-lg-12">
                <h1 class="mb-5">${this.fireworks ? 'Eindstand' : 'Tussenstand'}</h1>
                ${ this.getLeaderboardContent(players) }
              </div>
            </div>
          </div>
        `)

        var promise = $('#leaderboard-view').fadeIn(500).promise()

        if(this.fireworks) {
            promise.done(() => {                
                var duration = 15 * 1000;
                var animationEnd = Date.now() + duration;
                var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

                function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
                }

                var interval = setInterval(function() {
                var timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                var particleCount = 50 * (timeLeft / duration);
                // since particles fall down, start a bit higher than random
                    window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                    window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
                }, 250);
            })
        }
        
        return promise;
    }

    hide() {
      return $('#leaderboard-view').fadeOut(500).promise()
    }

    getLeaderboardContent(players) {
        let content = ''

        players.forEach(player => {
            content += new LeaderboardEntryComponent(player).render();
        })

        return content;
    }

    setFireworks(enabled) {
        this.fireworks = enabled
    }
}

export default LeaderboardView;
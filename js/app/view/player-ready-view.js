class PlayerReadyView {

    constructor(parent_container) {
        this.parent_container = parent_container;
    }

    render(player_name) {
        $(`${this.parent_container}`).html(`
            <div id="player-ready-view" class="row" style="display: none;">
                <div class="col-lg-12" style="text-align:center">
                    <h2>Welcome ${player_name}!</h2>
                    <p class="p-large pt-3">We're almost ready, we're waiting for all players to join, whereafter the quiz will start.</p>
                </div> <!-- end of col -->
            </div> 
        `)

        return $('#player-ready-view').fadeIn(500).promise()
    }

    hide() {
      return $('#player-ready-view').fadeOut(250).promise()
    }
}

export default PlayerReadyView;
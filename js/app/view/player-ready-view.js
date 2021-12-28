class PlayerReadyView {

    constructor(parent_container) {
        this.parent_container = parent_container;
    }

    render(player_name) {
        $(`${this.parent_container}`).html(`
            <div id="player-ready-view" class="row" style="display: none;">
                <div class="col-lg-12" style="text-align:center">
                    <h2>Welkom ${player_name}!</h2>
                    <p class="p-large pt-3">We zijn er bijna klaar voor, nog even geduld tot alle spelers zich hebben aangemeld, en dan zal het spel beginnen.</p>
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
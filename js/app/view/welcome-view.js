class WelcomeView {

    constructor(parent_container) {
        this.parent_container = parent_container;
    }

    render() {
        $(`${this.parent_container}`).html(`
          <div id="welcome-view" style="display: none;" class="row">
            <div class="col-lg-8">
              <div class="text-container" style="margin-top: 0px;">
                <h1>Welcome!</h1>
                <p class="p-large">Quickly go to <span class="code-block">http://192.168.2.10:8080/player.html</span> and join the quiz!</p>
              </div>
            </div>
          </div>
        `)

        return $('#welcome-view').fadeIn(500).promise()
    }

    hide() {
      return $('#welcome-view').fadeOut(500).promise()
    }
}

export default WelcomeView;
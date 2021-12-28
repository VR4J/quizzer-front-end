class AnsweringComponent {

  constructor(players) {
    this.players = players
  }

  render() {
    var content = '<div id="answering-component">' 

    this.players.forEach(player => {
      content += `
        <div id="state-${player.id}" class="rest entry">
          <div class="others d-flex">
            <div class="countdown-timer">
        
            </div>
            <div class="info d-flex">
              <p class="link">${player.name}</p>
            </div>
          </div>
        </div>
      `
    })

    return content + '</div>';
  }
}

export default AnsweringComponent
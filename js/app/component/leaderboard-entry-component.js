class LeaderboardEntryComponent {
  
    constructor(player) {
      this.player = player
    }
  
    render() {
      return `
            <div id="leaderboard-entry-${this.player.id}" class="rest entry">
                <div class="others d-flex">
                <div class="rank">
                    <i class="fas fa-caret-up"></i>
                    <p class="num">${this.player.rank}</p>
                </div>
                <div class="info d-flex">
                    <p class="link">${this.player.name}</p>
                </div>
                <div class="points d-flex">
                    <p class="total">${this.player.score}</p>
                </div>
                </div>
            </div>
        `
    }
  }
  
  export default LeaderboardEntryComponent
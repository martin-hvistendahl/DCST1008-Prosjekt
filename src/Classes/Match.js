import ShadowTeam from './ShadowTeam';

class Match {
	round;
	teams = [];
	results = [];
	MatchNumber;
	matchSeed;
	winner;

	constructor(team0, team1, MatchNumber, round) {
		this.round = round;
		this.teams[0] = team0;
		this.teams[1] = team1;
		this.MatchNumber = MatchNumber;
		this.matchSeed = team0.seed < team1.seed ? team0.seed : team1.seed;

		setTimeout(() => {
			if (team0.constructor.name == 'ShadowTeam' && this.round.roundNumber == 0) {
				this.updateScore(0, 3);
			} else if (team1.constructor.name == 'ShadowTeam' && this.round.roundNumber == 0) {
				this.updateScore(3, 0);
			}
		}, 100);
	}

	updateScore(score0, score1) {
		this.results[0] = score0;
		this.results[1] = score1;
		if (score0 - score1 != 0) {
			this.winner = score0 > score1 ? this.teams[0] : this.teams[1];
			this.winner.seed = this.matchSeed;
			if (this.round.roundNumber != this.round.numberOfRounds) {
				for (
					let i = 0;
					i < this.round.tournament.rounds[this.round.roundNumber + 1].teams.length;
					i++
				) {
					if (
						this.round.tournament.rounds[this.round.roundNumber + 1].teams[i].seed ==
						this.matchSeed
					) {
						this.round.tournament.rounds[this.round.roundNumber + 1].teams[i] =
							this.winner;
					}
				}
				this.round.tournament.rounds[this.round.roundNumber + 1].matches = [];
				this.round.tournament.rounds[this.round.roundNumber + 1].addMatches();
			}
		}
	}
}

export default Match;

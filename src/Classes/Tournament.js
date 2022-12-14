import Round from './round';
//this class is the whole tournament with all the other classes in this folder. Including every information about he tournament
class Torunament {
	name;
	tournamentID;
	numberOfRounds;
	generalSettings = null;
	winner = null;
	teams = [];
	rounds = [];
	hasBronze = false;
	tie = false;

	constructor(name, tournamentID, teams, generalSettings) {
		this.name = name;
		this.tournamentID = tournamentID;
		this.generalSettings = generalSettings;
		console.log(this);
		if (teams != false) {
			this.teams = teams;
			this.startTournament();
		}
	}

	startTournament() {
		if (this.generalSettings.type == 'bracket') {
			this.createBrackets();
		} else {
			this.createRoundRobin();
		}
	}

	createBrackets() {
		this.numberOfRounds = this.setBracketRounds(this.teams);
		this.playWalkover();
	}

	setBracketRounds(teams) {
		let numberOfRounds = 0;
		while (Math.pow(2, numberOfRounds) < teams.length) {
			numberOfRounds += 1;
		}
		let roundNumber = 0;
		while (Math.pow(2, roundNumber) < teams.length) {
			if (roundNumber == 0) {
				this.rounds.push(new Round(numberOfRounds, 0, this, teams));
			} else {
				this.rounds.push(new Round(numberOfRounds, roundNumber, this, false));
			}
			roundNumber += 1;
		}
		return numberOfRounds;
	}
	//if a team meets a shawdowteam the get a walkover
	playWalkover() {
		for (const i of this.rounds[0].matches) {
			if (i.teams[0].constructor.name == 'ShadowTeam') {
				i.updateScore(0, 3);
			} else if (i.teams[1].constructor.name == 'ShadowTeam') {
				i.updateScore(3, 0);
			}
		}
	}

	//
	createRoundRobin() {
		this.numberOfRounds = this.setRoundRobinRounds(this.teams);
		this.playWalkover();
	}

	setRoundRobinRounds(teams) {
		let numberOfRounds = teams.length - 1 + (teams.length % 2);
		let roundNumber = 0;
		while (roundNumber < numberOfRounds) {
			this.rounds.push(new Round(numberOfRounds, roundNumber, this, teams));

			if (teams.length % 2 == 0) {
				let secondTeam = teams[1];
				teams.splice(1, 1);
				teams.push(secondTeam);
			} else {
				let firstTeam = teams.shift();
				teams.push(firstTeam);
			}

			roundNumber += 1;
		}
		return numberOfRounds;
	}

	findRoundRobinWinner() {
		if (
			!this.rounds
				.map(
					(round) =>
						!round.matches
							.map((match) =>
								match.results.reduce((p, e) => p + e) != 0 ? true : false
							)
							.includes(false)
				)
				.includes(false)
		) {
			if (
				this.teams
					.sort(
						(a, b) =>
							b.score.reduce((sum, e) => sum + e, 0) -
							a.score.reduce((sum, e) => sum + e, 0)
					)[0]
					.score.reduce((start, e) => start + e, 0) ==
				this.teams
					.sort(
						(a, b) =>
							b.score.reduce((sum, e) => sum + e, 0) -
							a.score.reduce((sum, e) => sum + e, 0)
					)[1]
					.score.reduce((start, e) => start + e, 0)
			) {
				this.tie = true;
			}
			this.winner = this.teams.sort(
				(a, b) =>
					b.score.reduce((sum, e) => sum + e, 0) - a.score.reduce((sum, e) => sum + e, 0)
			)[0];
		}
	}
}

export default Torunament;

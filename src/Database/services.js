import { pool } from './mysql-pool';

class UpdateDatabase {
	deleteTournament(tournamentID, success) {
		pool.query(
			'DELETE FROM Tournament WHERE TournamentID=?',
			[tournamentID],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}

	addTournament(tournamentObject, success) {
		pool.query(
			'INSERT INTO Tournament (TournamentID, TournamentName, TournamentType, TournamentGamemode) VALUES (?, ?, ?, ?)',
			[
				tournamentObject.tournamentID,
				tournamentObject.name,
				tournamentObject.generalSettings.type,
				tournamentObject.generalSettings.gamemode,
			],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}

	deleteGameMatch(tournamentID, success) {
		pool.query(
			'DELETE FROM GameMatch WHERE TournamentID=?',
			[tournamentID],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}

	addGameMatch(match, success) {
		pool.query(
			'INSERT INTO GameMatch (TournamentID, MatchNumber, RoundNumber, Team1, Team2, Team1Score, Team2Score) VALUES (?, ?, ?, ?, ?, ?, ?)',
			[
				match.round.tournament.tournamentID,
				match.ind,
				match.round.roundNumber,
				match.teams[0].id,
				match.teams[1].id,
				match.results.length != 2 ? 0 : match.results[0],
				match.results.length != 2 ? 0 : match.results[1],
			],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}

	deleteTeams(tournamentID, success) {
		pool.query('DELETE FROM Team WHERE TournamentID=?', [tournamentID], (error, results) => {
			if (error) return console.error(error);

			success();
		});
	}

	addTeam(team, success) {
		pool.query(
			'INSERT INTO Team (TeamID, TeamName, IsShadow, TournamentID) VALUES (?, ?, ?, ?)',
			[team.id, team.name, team.constructor.name != 'ShadowTeam' ? 0 : 1, team.tournamentID],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}

	deleteTeamMember(tournamentID, success) {
		pool.query(
			'DELETE FROM TeamMember WHERE TournamentID=?',
			[tournamentID],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}

	addTeamMember(teamMemberInfo, success) {
		pool.query(
			'INSERT INTO TeamMember (PlayerName, PlayerTrophies, TeamID, TournamentID) VALUES (?, ?, ?, ?)',
			[
				teamMemberInfo.name,
				teamMemberInfo.trophies,
				teamMemberInfo.teamID,
				teamMemberInfo.tournamentID,
			],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}

	updateGameMatch(tournament, i, j, success) {
		pool.query(
			'UPDATE GameMatch SET Team1=?, Team2=?, Team1Score=?, Team2Score=? WHERE RoundNumber=? && MatchNumber=? && TournamentID=?',
			[
				tournament.rounds[i].matches[j].teams[0].id,
				tournament.rounds[i].matches[j].teams[1].id,
				tournament.rounds[i].matches[j].results.length != 2
					? 0
					: tournament.rounds[i].matches[j].results[0],
				tournament.rounds[i].matches[j].results.length != 2
					? 0
					: tournament.rounds[i].matches[j].results[1],
				i,
				j,
				tournament.tournamentID,
			],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}

	selectAllTournaments(success) {
		pool.query('SELECT * FROM Tournament', (error, results) => {
			if (error) return console.error(error); // If error, show error in console (in red text) and return

			success(results);
		});
	}

	selectAllTeams(success) {
		pool.query('SELECT * FROM Team', (error, results) => {
			if (error) return console.error(error); // If error, show error in console (in red text) and return

			success(results);
		});
	}

	selectTeamMember(tournamentID, success) {
		pool.query(
			'SELECT * FROM TeamMember WHERE TournamentID= ?',
			[tournamentID],
			(error, results) => {
				if (error) return console.error(error); // If error, show error in console (in red text) and return

				success(results);
			}
		);
	}

	selectTeam(tournamentID, success) {
		pool.query('SELECT * FROM Team WHERE TournamentID= ?', [tournamentID], (error, results) => {
			if (error) return console.error(error); // If error, show error in console (in red text) and return

			success(results);
		});
	}

	selectGameMatch(tournamentID, success) {
		pool.query(
			'SELECT * FROM GameMatch WHERE TournamentID= ?',
			[tournamentID],
			(error, results) => {
				if (error) return console.error(error); // If error, show error in console (in red text) and return

				success(results);
			}
		);
	}

	selectTournament(tournamentID, success) {
		pool.query(
			'SELECT * FROM Tournament WHERE TournamentID= ?',
			[tournamentID],
			(error, results) => {
				if (error) return console.error(error); // If error, show error in console (in red text) and return

				success(results);
			}
		);
	}
}
export let updateDatabase = new UpdateDatabase();

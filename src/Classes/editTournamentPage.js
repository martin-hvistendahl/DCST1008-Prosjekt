import { pool } from '../mysql-pool';

class EditService {
	getWinners(success) {
		pool.query('SELECT * FROM GameMatch', (error, results) => {
			if (error) return console.error(error);

			success(results);
		});
	}

	getWinner(MatchID, success) {
		pool.query('SELECT * FROM GameMatch WHERE MatchID=?', [MatchID], (error, results) => {
			if (error) return console.error(error);

			success(results[0]);
		});
	}

	updateWinner(match, success) {
		pool.query(
			'UPDATE GameMatch SET Completed=?, Team1Score=?, Team2Score=? WHERE MatchID=?',
			[match.Completed, match.Team1Score, match.Team2Score, match.MatchID],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}
}
export let editService = new EditService();

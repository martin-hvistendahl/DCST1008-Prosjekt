import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { pool } from '../mysql-pool';
import { updateDatabase } from '../Classes/pushDatabase';
let x;
export class Overview extends Component {
	tournaments = [];
	render() {
		return (
			<div className="overview">
				<div>
					<div className="confirm" id="confirm">
						<p id="tournamentName"></p>
						<div>
							<em className="yesno" onClick={() => this.delete()}>
								Yes
							</em>
							<em className="yesno" onClick={() => this.nodelete()}>
								No
							</em>
						</div>
					</div>
				</div>
				<h1 className="title">Clasnering</h1>
				<div className="centerview">
					Overview of Tournaments <br />
					<div className="scroll">
						{this.tournaments.map((tournament) => (
							<div key={tournament.TournamentID}>
								<button className="xx" onClick={() => this.confirm(tournament)}>
									X
								</button>
								<NavLink
									className="login"
									to={'/tournamentpage/' + tournament.TournamentID}
								>
									{tournament.TournamentName}
								</NavLink>
							</div>
						))}
					</div>
				</div>
				<br />
				<NavLink className="login" to="/new">
					New tournament
				</NavLink>
			</div>
		);
	}
	confirm(id) {
		document.getElementById('confirm').style.visibility = 'visible';

		x = id;
		console.log(id);
		document.getElementById('tournamentName').innerText =
			'Are you sure you want to delete "' + id.TournamentName + '"';
	}
	nodelete() {
		document.getElementById('confirm').style.visibility = 'hidden';
	}
	delete() {
		document.getElementById('confirm').style.visibility = 'hidden';
		updateDatabase.deleteTournament(x.TournamentID, () => console.log());
		updateDatabase.deleteGameMatch(x.TournamentID, () => console.log());
		updateDatabase.deleteTeams(x.TournamentID, () => console.log());
		updateDatabase.deleteTeamMember(x.TournamentID, () => console.log());
		this.mounted();
	}
	mounted() {
		pool.query('SELECT * FROM Tournament', (error, results) => {
			if (error) return console.error(error);

			this.tournaments = results;
		});
	}
}

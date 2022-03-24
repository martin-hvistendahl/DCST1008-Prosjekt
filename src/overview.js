import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from './mysql-pool';

export class Choose extends Component {
	tournaments = [];
	render() {
		return (
			<div
				style={{
					fontSize: '40px',
				}}
			>
				<h1
					style={{
						textAlign: 'center',
					}}
				>
					Clasnering
				</h1>
				<br /> Overview of Tournaments <br />
				{this.tournaments.map((tournament) => (
					<li key={tournament.TournamentID}>
						<NavLink to={'/tournamentpage/' + tournament.TournamentID}>
							{tournament.TournamentName}
						</NavLink>
					</li>
				))}
				<NavLink to="/new">New tournament</NavLink>
			</div>
		);
	}
	mounted() {
		pool.query('SELECT * FROM Tournament', (error, results) => {
			if (error) return console.error(error); // If error, show error in console (in red text) and return

			this.tournaments = results;
		});
	}
}

export class New extends Component {
	bestof = '';
	type = '';
	gamemode = 0;
	render() {
		return (
			<div>
				<br />
				Select tournament type
				<select
					value={this.type}
					onChange={(event) => (this.type = event.currentTarget.value)}
				>
					<option value="bracket">Bracket</option>
					<option value="roundrobin">Round robin</option>
				</select>
				<br />
				<br />
				Select match type
				<select
					value={this.gamemode}
					onChange={(event) => (this.gamemode = event.currentTarget.value)}
				>
					<option value="0">1v1</option>
					<option value="0">2v2 - Generated teams</option>
					<option value="1">2v2 - Custom Teams</option>
					<option value="0">1v1 Double Elixir</option>
					<option value="0">2v2 - Double Elixir - Generated teams</option>
					<option value="1">2v2 - Double Elixir - Custom Teams</option>
				</select>
				<br />
				<br />
				Amount of rounds
				<select
					value={this.bestof}
					onChange={(event) => (this.bestof = event.currentTarget.value)}
				>
					<option value="bracket">Best of 1</option>
					<option value="roundrobin">Best of 3</option>
				</select>
				<br />
				<br />
				<NavLink to={'/players/' + this.gamemode}>
					<button type="button">Create tournament</button>
				</NavLink>
			</div>
		);
	}
}

export class Overview extends Component {
	render() {
		return <div>Overview</div>;
	}
}

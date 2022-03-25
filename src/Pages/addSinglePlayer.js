import * as React from 'react';
import { Component } from 'react-simplified';
import { pool } from '../mysql-pool';
import { NavLink } from 'react-router-dom';
import Torunament from '../Classes/tournament';
import Team from '../Classes/team';
import TeamMember from '../Classes/teamMember';
import { settings } from './newTournament';

export let tournamentplayer = [null, new Date()];

export class AddSinglePlayer extends Component {
	team = '';
	name1 = '';
	trophies1 = '';
	teams = [];
	form = null;
	link = '';
	tournamentcreator = [];
	tournamentIDs = [];
	teamIDs = [];
	teamID = 0;

	render() {
		if (this.tournamentIDs.length == 0) return null;

		return (
			<div>
				<form ref={(instance) => (this.form = instance)}>
					<br />
					<br /> Player 1
					<input
						type="text"
						value={this.name1}
						placeholder="Nickname"
						size="10"
						onChange={(event) => (this.name1 = event.currentTarget.value)}
						required
					/>
					<input
						type="number"
						value={this.trophies1}
						placeholder="Trophies"
						size="10"
						onChange={(event) => (this.trophies1 = event.currentTarget.value)}
						required
					/>
					<br />
					<br />
					<button type="button" onClick={this.buttonClicked}>
						Add team
					</button>
				</form>

				<button
					onClick={() => this.createObjects()}
					style={{
						backgroundColor: 'blue',
						size: 'large',
						marginLeft: '700px',
						marginTop: '10px',
						height: '40px',
						width: '100px',
					}}
					type="button"
				>
					Create Tournament
				</button>

				{this.tournamentcreator.map(() => (
					<NavLink to={this.link}>
						<button
							onClick={() => this.createObjects()}
							style={{
								backgroundColor: 'red',
								size: 'large',
								marginLeft: '700px',
								marginTop: '50px',
								height: '40px',
								width: '100px',
							}}
							type="button"
						>
							Show Torunament
						</button>
					</NavLink>
				))}
				<br />
				<div>
					{this.teams.map((team, i) => (
						<div key={i} style={{ float: 'left' }}>
							<em key={1}>
								Name: {team[1][0]} Trophies {team[1][1]}
							</em>

							<button
								type="button"
								id={i}
								onClick={(i) => this.teams.splice(i.target.id, 1)}
							>
								x
							</button>

							<br />
							<br />
						</div>
					))}
				</div>
			</div>
		);
	}

	mounted() {
		pool.query('SELECT TournamentID FROM Tournament', (error, results) => {
			if (error) return console.error(error); // If error, show error in console (in red text) and return

			this.tournamentIDs = results;
			this.tournamentIDs = this.tournamentIDs.map((Tournament) => Tournament.TournamentID);
			this.tournamentIDs.sort((a, b) => b - a);
		});
		pool.query('SELECT TeamID FROM Team', (error, results) => {
			if (error) return console.error(error); // If error, show error in console (in red text) and return

			this.teamIDs = results;
			this.teamIDs = this.teamIDs.map((Team) => Team.TeamID);
			this.teamIDs.sort((a, b) => b - a);
		});
	}

	buttonClicked() {
		// if (!this.form.reportValidity()) return;

		this.teams.push([this.team, [this.name1, this.trophies1]]);

		this.name1 = '';
		this.trophies1 = '';
	}

	createObjects() {
		console.log(this.tournamentIDs[0] + 1, 'test1');
		if (this.teams.length > 1) {
			this.teamObj = [];
			this.teamID = parseInt(this.teamIDs[0]);
			console.log(this.teamIDs);
			for (const i of this.teams) {
				this.teamID++;
				let aTeam = new Team(i[1][0], this.teamID, this.tournamentIDs[0] + 1);
				aTeam.addMember(
					new TeamMember(i[1][0], parseInt(i[1][1]), aTeam.id, this.tournamentIDs[0] + 1)
				);
				this.teamObj.push(aTeam);
			}
			console.log(this.tournamentIDs[0] + 1, 'test2');
			tournamentplayer = [
				new Torunament(settings.name, this.tournamentIDs[0] + 1, this.teamObj, settings),
				new Date(),
			];
			this.tournamentcreator[0] = true;
			this.link =
				'/tournamentpage/' +
				tournamentplayer[0].TournamentID +
				'/' +
				tournamentplayer[0].TournamentID;
		}
	}
}

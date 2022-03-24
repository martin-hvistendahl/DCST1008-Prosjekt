import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route, withRouter } from 'react-router-dom';
import { pool } from '../mysql-pool';
import { editService } from '../Classes/editTournamentPage';
import Torunament from '../Classes/Tournament';
import TeamMember from '../Classes/TeamMember';
import Team from '../Classes/Team';
import Match from '../Classes/Match';
import ShadowTeam from '../Classes/ShadowTeam';

export let tournament = null;

export class TournamentPage extends Component {
	matches = [];
	teamMember = [];
	team = [];
	tournamentChoser = null;
	tournamentObject = null;
	teamObjects = [];
	teamMemberObjects = [];
	matchObjects = [];

	link = '';
	loded = 'Loding from database';
	render() {
		if (!this.tournamentObject) return null;

		console.log(this.tournamentObject);
		return (
			<div>
				<div>{this.loded}</div>
				<NavLink to={this.link}>{'When loded click here'}</NavLink>

				{/* {this.tournamentObject.rounds.map((round) => (
					<div>
						<div key={round.roundNumber}>Round {round.roundNumber + 1}:</div>
						<ul key={round.roundNumber + 'm'}>
							{round.matches.map((match) => (
								<div>
									<div key={match.matchNumber}>
										<div key={0}>Match {match.matchNumber}</div>
										{match.teams
											.filter((team) => team.constructor.name != 'ShadowTeam')
											.map((team) => (
												<div key={team.id}>
													<em key={0}>
														{team.name}
														{team.teamMembers.map((member) => (
															<li key={member.name}>{member.name}</li>
														))}
													</em>
												</div>
											))}
									</div>{' '}
									<br />
								</div>
							))}
						</ul>
					</div>
				))} */}

				{/*<div>round1:</div>
				<ul>
					{this.matches
						.filter((e) => e.TournamentID == this.tournamentChoser.TournamentID)
						.map((matchInfo) => (
							<div key={matchInfo.MatchID}>
								Kampnummer:
								<NavLink to={'/matches/' + matchInfo.MatchID + '/edit'}>
									{matchInfo.MatchNumber}
								</NavLink>
								<br></br>
								Team 1:
								{this.team
									.filter((x) => x.TeamID == matchInfo.Team1)
									.map((teamName) => (
										<em key={teamName.TeamID}> {teamName.TeamName}</em>
									))}
								<ul>
									{this.teamMember
										.filter((e) => e.TeamID == matchInfo.Team1)
										.map((teamMembers) => (
											<li key={teamMembers.TeamID}>
												{teamMembers.PlayerName}
											</li>
										))}
								</ul>
								Team 2:
								{this.team
									.filter((e) => e.TeamID == matchInfo.Team2)
									.map((teamName) => (
										<em key={'Team2' + teamName.TeamID}>
											{' '}
											{teamName.TeamName}
										</em>
									))}
								<ul>
									{this.teamMember
										.filter((e) => e.TeamID == matchInfo.Team2)
										.map((teamMembers) => (
											<li key={'Team2' + teamMembers.TeamID}>
												{teamMembers.PlayerName}
											</li>
										))}
								</ul>
								<br></br>
							</div>
						))}
				</ul>
										*/}
			</div>
		);
	}

	mounted() {
		let tournamentID = [this.props.match.params.TournamentID];

		function firstDatabase() {
			return new Promise((resolve) => {
				pool.query(
					'SELECT TeamID, PlayerName, PlayerTrophies FROM TeamMember WHERE TournamentID= ?',
					[tournamentID],
					(error, results) => {
						if (error) return console.error(error); // If error, show error in console (in red text) and return

						resolve([results]);
					}
				);
			});
		}
		function secondDatabase(inn) {
			return new Promise((resolve) => {
				pool.query(
					'SELECT MatchID, RoundNumber, TournamentID, MatchNumber, Team1, Team2, Completed, Team1Score, Team2Score FROM GameMatch',
					(error, results) => {
						if (error) return console.error(error); // If error, show error in console (in red text) and return

						let out = inn;
						out.push(results);
						resolve(out);
					}
				);
			});
		}
		function thirdDatabase(inn) {
			return new Promise((resolve) => {
				pool.query(
					'SELECT TeamID, IsShadow, TeamName FROM Team WHERE TournamentID= ?',
					[tournamentID],
					(error, results) => {
						if (error) return console.error(error); // If error, show error in console (in red text) and return

						let out = inn;
						out.push(results);
						resolve(out);
					}
				);
			});
		}
		function fourthDatabase(inn) {
			return new Promise((resolve) => {
				pool.query(
					'SELECT TournamentID, TournamentName FROM Tournament WHERE TournamentID= ?',
					[tournamentID],

					(error, results) => {
						if (error) return console.error(error); // If error, show error in console (in red text) and return

						let out = inn;
						out.push(results);
						resolve(out);
					}
				);
			});
		}

		function makeClasses(table, teamObj, teamMemberObj, tournamentObj, matchObj) {
			return new Promise((resolve) => {
				let promTeamMember = table[0];
				let promMatches = table[1];
				let promTeam = table[2];
				let promTournamentChoser = table[3];

				for (const i of promTeam) {
					if (!i.isShadow) {
						teamObj.push(new Team(i.TeamName, i.TeamID));
					} else {
						teamObj.push(new ShadowTeam());
					}
				}

				for (const i of promTeamMember) {
					let aTeamMember = new TeamMember(i.PlayerName, i.PlayerTrophies);
					teamMemberObj.push(aTeamMember);
					for (const j of teamObj) {
						if (j.id == i.TeamID) {
							j.addMember(aTeamMember);
						}
					}
				}
				console.log(teamObj);
				tournamentObj = new Torunament(
					promTournamentChoser[0].TournamentName,
					promTournamentChoser[0].TournamentID,
					teamObj
				);

				for (const i of promMatches) {
					let team1 = null;
					let team2 = null;
					for (const j of teamObj) {
						if (i.Team1 == j.id) {
							team1 = j;
						}
						if (i.Team2 == j.id) {
							team2 = j;
						}
					}
					let matchnumb =
						i.RoundNumber == 0
							? 1 + i.MatchNumber
							: tournamentObj.rounds[i.RoundNumber - 1].firstMatchNumber +
							  i.MatchNumber;
					if (i.TournamentID == tournamentObj.TorunamentId) {
						matchObj.push(
							new Match(
								team1,
								team2,
								matchnumb,
								tournamentObj.rounds[i.RoundNumber],
								i.MatchNumber,
								i.Team1Score,
								i.Team2Score
							)
						);
					}
				}

				for (const i of matchObj) {
					tournamentObj.rounds[i.round.roundNumber].matches[i.ind] = i;
				}

				resolve([teamObj, teamMemberObj, tournamentObj, matchObj]);
			});
		}

		async function Kjør(teamObj, teamMemberObj, tournamentObj, matchObj) {
			try {
				let table1 = await firstDatabase();
				let table2 = await secondDatabase(table1);
				let table3 = await thirdDatabase(table2);
				let table4 = await fourthDatabase(table3);

				let finished = await makeClasses(
					table4,
					teamObj,
					teamMemberObj,
					tournamentObj,
					matchObj
				);
				return finished;
			} catch (error) {
				console.error(error);
			}
		}
		(async () => {
			let out = await Kjør(
				this.teamObjects,
				this.teamMemberObjects,
				this.tournamentObject,
				this.matchObjects
			);
			console.log(out);
			this.teamObjects = out[0];
			this.teamMemberObjects = out[1];
			this.tournamentObject = out[2];
			tournament = this.tournamentObject;
			this.matchObjects = out[3];

			this.link =
				'/tournamentpage/' +
				this.tournamentObject.TournamentID +
				'/' +
				this.tournamentObject.TournamentID;

			this.loded = 'Finished loading, you may now proceed';
		})();
	}

	makeTournament(table) {}
}

export class EditTournamentPage extends Component {
	match = null;

	render() {
		if (!this.match) return null;

		return (
			<div>
				<ul>
					<li>
						Completed:{' '}
						<input
							type="text"
							value={this.match.Completed}
							onChange={(event) => (this.match.Completed = event.currentTarget.value)}
						/>
					</li>
					<li>
						Team 1 Score:{' '}
						<input
							type="number"
							value={this.match.Team1Score}
							onChange={(event) =>
								(this.match.Team1Score = event.currentTarget.value)
							}
						/>
					</li>
					<li>
						Team 2 Score:{' '}
						<input
							type="number"
							value={this.match.Team2Score}
							onChange={(event) =>
								(this.match.Team2Score = event.currentTarget.value)
							}
						/>
					</li>
				</ul>
				<button type="button" onClick={this.save}>
					Save
				</button>
			</div>
		);
	}

	mounted() {
		editService.getWinner(this.props.match.params.MatchID, (match) => {
			this.match = match;
		});
	}

	save() {
		editService.updateWinner(this.match, () => {
			history.push('/matches/' + this.match.MatchID);
		});
	}
}

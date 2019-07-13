import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid/v4";
import Joke from "./Joke";
import "./JokeList.css";

export default class JokeList extends Component {
  static defaultProps = {
    numJokesToFetch: 10
  };
  state = {
    jokes: []
  };
  async componentDidMount() {
    //load jokes
    let jokes = [];
    const url = "https://icanhazdadjoke.com/";
    while (jokes.length < this.props.numJokesToFetch) {
      const res = await axios.get(url, {
        headers: { Accept: "application/json" }
      });
      jokes.push({ id: uuid(), text: res.data.joke, votes: 0 });
    }
    this.setState({
      jokes
    });
  }
  handleVote = (id, delta) => {
    this.setState(prevState => ({
      jokes: prevState.jokes.map(joke =>
        joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
      )
    }));
  };

  render() {
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img
            alt="laughing emoji"
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
          />
          <button className="JokeList-getmore">New Jokes</button>
        </div>

        <div className="JokeList-jokes">
          {this.state.jokes.map(el => (
            <Joke
              key={el.id}
              text={el.text}
              votes={el.votes}
              upvote={() => this.handleVote(el.id, 1)}
              downvote={() => this.handleVote(el.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }
}

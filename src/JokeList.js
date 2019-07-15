import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid/v4";
import Joke from "./Joke";
import "./JokeList.css";

export default class JokeList extends Component {
  static defaultProps = {
    numJokesToFetch: 10
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      loading: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.getJokes = this.getJokes.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.alreadySeenJokes = new Set(this.state.jokes.map(j => j.text));
  }
  componentDidMount() {
    //load jokes
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  }
  async getJokes() {
    try {
      let jokes = [];
      const url = "https://icanhazdadjoke.com/";
      while (jokes.length < this.props.numJokesToFetch) {
        const res = await axios.get(url, {
          headers: { Accept: "application/json" }
        });
        if (!this.alreadySeenJokes.has(res.data.joke)) {
          jokes.push({ id: uuid(), text: res.data.joke, votes: 0 });
        } else {
          console.log("found a duplicate", res.data.joke);
        }
      }
      this.setState(
        prevState => ({
          jokes: [...prevState.jokes, ...jokes],
          loading: false
        }),
        () =>
          window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
      );
    } catch (error) {
      alert(error);
      this.setState({
        loading: false
      });
    }
  }
  handleVote = (id, delta) => {
    this.setState(
      prevState => ({
        jokes: prevState.jokes.map(joke =>
          joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
        )
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  };

  handleClick = () => {
    this.setState({ loading: true }, this.getJokes);
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="JokeList-spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <p className="JokeList-title">Loading...</p>
        </div>
      );
    }
    let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
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
          <button onClick={this.handleClick} className="JokeList-getmore">
            Fetch Jokes
          </button>
        </div>

        <div className="JokeList-jokes">
          {jokes.map(el => (
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

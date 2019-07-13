import React, { Component } from "react";
import axios from "axios";

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
      jokes.push(res.data.joke);
    }
    this.setState({
      jokes
    });
  }
  render() {
    return (
      <>
        <h1>Dad Jokes</h1>
        <ul className="JokeList-jokes">
            {this.state.jokes.map(j => (
                <li>{j}</li>
            ))}
        </ul>
      </>
    );
  }
}

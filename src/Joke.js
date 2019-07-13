import React from "react";
import "./Joke.css";

export default function Joke({ votes, text, downvote, upvote }) {
  return (
    <div className="Joke">
      <div className="Joke-buttons">
        <i className="fas fa-arrow-up" onClick={upvote}/>
        <span className="Joke-votes">{votes}</span>
        <i className="fas fa-arrow-down" onClick={downvote}/>
      </div>
      <div className="Joke-text">{text}</div>
      <div className="Joke-smiley"><i class="em em-rolling_on_the_floor_laughing"></i></div>
    </div>
  );
}

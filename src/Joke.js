import React from "react";

export default function Joke({ votes, text, downvote, upvote }) {
  return (
    <div className="Joke">
      <div className="Joke-buttons">
        <i className="fas fa-arrow-up" onClick={upvote}/>
        <span>{votes}</span>
        <i className="fas fa-arrow-down" onClick={downvote}/>
      </div>
      <div className="Joke-text">{text}</div>
    </div>
  );
}

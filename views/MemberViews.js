import React from "react";

const exports = {};

exports.GetVote = class extends React.Component {
  render() {
    const { parent, canVote, vote } = this.props;
    return (
      <div>
        Please click the button to vote
        <button disabled={!canVote} onClick={() => parent.getVote("YES")}>
          Yes
        </button>
        <button disabled={!canVote} onClick={() => parent.getVote("NO")}>
          No
        </button>
      </div>
    );
  }
};

exports.WaitingForResults = class extends React.Component {
  render() {
    return <div>Waiting for results...</div>;
  }
};

exports.Done = class extends React.Component {
  render() {
    const { outcome } = this.props;
    return (
      <div>
        Thank you for voting. The current poll stands as:
        <br />
        {outcome || "Unknown"}
      </div>
    );
  }
};

exports.Timeout = class extends React.Component {
  render() {
    return <div>There's been a timeout. (The voting period has ended)</div>;
  }
};

export default exports;

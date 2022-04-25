import React from "react";
import MemberViews from "./MemberViews";

const exports = { ...MemberViews };

exports.Wrapper = class extends React.Component {
  render() {
    const { content } = this.props;
    return (
      <div className="Attacher">
        <h2>Voter</h2>
        {content}
      </div>
    );
  }
};

exports.Attach = class extends React.Component {
  render() {
    const { parent } = this.props;
    const { ctcInfoStr } = this.state || {};
    return (
      <div>
        Please paste the contract info to attach to:
        <br />
        <textarea
          spellCheck="false"
          className="ContractInfo"
          onChange={(e) => this.setState({ ctcInfoStr: e.currentTarget.value })}
          placeholder="{}"
        />
        <br />
        <button
          disabled={!ctcInfoStr}
          onClick={() => parent.attach(ctcInfoStr)}
        >
          Attach
        </button>
      </div>
    );
  }
};

exports.Attaching = class extends React.Component {
  render() {
    return <div>Attaching, please wait...</div>;
  }
};
export default exports;

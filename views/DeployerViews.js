import React from "react";
import MemberViews from "./MemeberViews";

const exports = { ...MemberViews };

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

exports.Wrapper = class extends React.Component {
  render() {
    const { content } = this.props;
    return (
      <div className="Deployer">
        <h2>proposer (Proposal)</h2>
        {content}
      </div>
    );
  }
};

exports.CreateProposal = class extends React.Component {
  render() {
    const { parent, standardUnit } = this.props;
    const description = (this.state || {}).description;
    const amount = (this.state || {}).amount;
    const deadline = (this.state || {}).deadline;
    return (
      <div className={`fixed bg-black/70 w-full top-0 left-0 h-full`}>
        <div className="fixed bg-white w-4/5 h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 z-10">
          <div className="flex justify-between">
            <span className="font-inter font-semibold">Create a proposal</span>
          </div>
          <form className="flex flex-col py-1">
            <input
              type="text"
              placeholder="Description"
              className="border-2 px-1 py-2 my-1"
              onChange={(e) =>
                this.setState({ description: e.currentTarget.value })
              }
            />{" "}
            <input
              type="number"
              placeholder="Amount"
              className="border-2 px-1 py-2 my-1"
              onChange={(e) => this.setState({ amount: e.currentTarget.value })}
            />{" "}
            <input
              type="amount"
              placeholder="Deadline"
              className="border-2 px-1 py-2 my-1"
              onChange={(e) =>
                this.setState({ deadline: e.currentTarget.value })
              }
            />{" "}
            {standardUnit}
            <button
              onClick={() =>
                parent.CreateProposal(description, amount, deadline)
              }
              className="bg-blue-500 text-white font-inter py-2
              rounded-md my-1"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }
};

exports.Deploy = class extends React.Component {
  render() {
    const { parent, description, amount, deadline, standardUnit } = this.props;
    return (
      <div>
        Proposal :{" "}
        <strong>
          {description} {amount} {deadline}
        </strong>{" "}
        {standardUnit}
        <br />
        <button onClick={() => parent.deploy()}>Deploy</button>
      </div>
    );
  }
};

exports.Deploying = class extends React.Component {
  render() {
    return <div>Deploying... please wait.</div>;
  }
};

exports.WaitingForAttacher = class extends React.Component {
  async copyToClipborad(button) {
    const { ctcInfoStr } = this.props;
    navigator.clipboard.writeText(ctcInfoStr);
    const origInnerHTML = button.innerHTML;
    button.innerHTML = "Copied!";
    button.disabled = true;
    await sleep(1000);
    button.innerHTML = origInnerHTML;
    button.disabled = false;
  }

  render() {
    const { ctcInfoStr } = this.props;
    return (
      <div>
        Please give voters this contract info:
        <pre className="ContractInfo">{ctcInfoStr}</pre>
        <button onClick={(e) => this.copyToClipborad(e.currentTarget)}>
          Copy to clipboard
        </button>
      </div>
    );
  }
};

export default exports;

import React from "react";

const exports = {};

exports.Wrapper = class extends React.Component {
  render() {
    const { content } = this.props;
    return (
      <div className="App">
        <header className="App-header" id="root">
          <h1>Skull Warrior DAO</h1>
          {content}
        </header>
      </div>
    );
  }
};

exports.GetNft = class extends React.Component {
  render() {
    return (
      <div>
        If you do not have a membership NFT you cannot make a proposal or vote.
        Please click on the link below and follow the instructions to get the
        NFT.
        <br />
        <a href="https://github.com/goonerlabs/NFT-for-DAO-1.git">
          get your nft here{"https://github.com/goonerlabs/NFT-for-DAO-1.git"}
        </a>
        <p>have the NFT already? click on the button below to proceed</p>
        <button onClick={() => parent.skipGetNft()}>proceed</button>
      </div>
    );
  }
};

exports.ConnectAccount = class extends React.Component {
  render() {
    return (
      <div>
        Please wait while we connect to your account. If this takes more than a
        few seconds, there may be something wrong.
      </div>
    );
  }
};

exports.FundAccount = class extends React.Component {
  render() {
    const { bal, standardUnit, defaultFundAmt, parent } = this.props;
    const amt = (this.state || {}).amt || defaultFundAmt;
    return (
      <div>
        <h2>Fund account</h2>
        <br />
        Balance: {bal} {standardUnit}
        <hr />
        Would you like to fund your account with additional {standardUnit}?
        <br />
        (This only works on certain devnets)
        <br />
        <input
          type="number"
          placeholder={defaultFundAmt}
          onChange={(e) => this.setState({ amt: e.currentTarget.value })}
        />
        <button onClick={() => parent.fundAccount(amt)}>Fund Account</button>
        <button onClick={() => parent.skipFundAccount()}>Skip</button>
      </div>
    );
  }
};

exports.DeployerOrAttacher = class extends React.Component {
  render() {
    const { parent } = this.props;
    return (
      <div>
        Please select a role:
        <br />
        <p>
          <button onClick={() => parent.selectDeployer()}>Proposer</button>
          <br /> Set the wager, deploy the contract.
        </p>
        <p>
          <button onClick={() => parent.selectAttacher()}>Voter</button>
          <br /> Attach to the proposers's contract.
        </p>
      </div>
    );
  }
};

export default exports;

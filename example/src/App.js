import React, { Component } from 'react';

import Only from 'react-only-when';

class Radio extends Component {
  onChange = () => {
    const { onChange, value } = this.props;
    onChange(value);
  }

  render() {
    const { label, value, group, checked } = this.props;
    const htmlId = `input__${value}`;
    return (
      <div>
        <input
          type="radio"
          id={htmlId}
          value={value}
          checked={checked}
          onChange={this.onChange}
          group={group}
        />
        <label htmlFor={htmlId}>{label}</label>
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    show: true,
    hiddenMode: 'withNull',
    cssValue: ''
  };

  hiddenModes = ['withNull', 'withVisibility', 'withDisplay', 'withCss'];

  toggle = () => this.setState(state => ({ show: !state.show }));

  setHiddenMode = hiddenMode => this.setState({ hiddenMode });

  onCssValueChange = ({ target }) => this.setState({ cssValue: target.value });

  render() {
    const { show, hiddenMode, cssValue } = this.state;

    return (
      <div className="app">
        <div className="setup">
          <div className="radio-group">
            {
              this.hiddenModes.map(mode => (
                <Radio
                  key={mode}
                  value={mode}
                  label={mode}
                  group="hiddenMode"
                  checked={mode === hiddenMode}
                  onChange={this.setHiddenMode}
                />
              ))
            }
            {
              <Only when={hiddenMode === "withCss"}>
                <input value={cssValue} onChange={this.onCssValueChange} placeholder="Enter a css class name" />
              </Only>
            }
          </div>
          <button onClick={this.toggle} className="toggle-btn">Toggle when</button>
        </div>
        <div className="elements">
          <Only ref={ref => this.onlyExample = ref} when={show} hiddenMode={hiddenMode} className={cssValue}>
            <div style={{ color: "green" }} className="some-class">
              <h1>Here I Am</h1>
            </div>
          </Only>
          <div>
            <h2>I'm Always Here...</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

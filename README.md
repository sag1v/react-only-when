# react-only-when

> A declarative component for conditional rendering

[![NPM](https://img.shields.io/npm/v/react-only-when.svg)](https://www.npmjs.com/package/react-only-when) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-only-when
```

## Usage
```jsx
import Only from 'react-only-when'

<Only when={true}>
  <h1>Here I Am</h1>
</Only>
```

## Full Example
```jsx
import React from 'react';
import Only from 'react-only-when'

class App extends React.Component {
  state = {
    show: true
  };

  toggle = () => this.setState(state => ({ show: !state.show }));

  render() {
    const { show } = this.state;
    return (
      <div className="app">
        <button onClick={this.toggle}>Toggle</button>
        <Only when={show}>
          <h1>Here I Am</h1>
        </Only>
      </div>
    );
  }
}
```

## License

MIT © [sag1v](https://github.com/sag1v)

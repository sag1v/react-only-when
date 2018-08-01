import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Only from './'

Enzyme.configure({ adapter: new Adapter() });

describe('Only', () => {
  it('Not rendering children', () => {
    const wrapper = shallow(
      <Only when={false}>
        <span
          id="child"
        />
      </Only>
    );
    const child = wrapper.find('#child');

    expect(child.length).toEqual(0);
  });

  it('Not touching the style or className', () => {
    const classNameToTest = 'test-className';

    const wrapper = shallow(
      <Only when={true}>
        <span
          id="child"
          style={{ color: 'green' }}
          className={classNameToTest}
        />
      </Only>
    );
    const child = wrapper.find('#child');
    const { style, className } = child.props();
    const hasColor = style.color === 'green';
    const hasClassName = className === classNameToTest;
    expect(hasColor && hasClassName).toEqual(true);
  });

  it('Adding style visibility (without deleting other styles)', () => {
    const wrapper = shallow(
      <Only when={false} hiddenMode="withVisibility">
        <span id="child" style={{ color: 'green' }} />
      </Only>
    );
    const child = wrapper.find('#child');
    const { style } = child.props();
    const visibilityHidden = style.visibility === 'hidden';
    const color = style.color === 'green';
    expect(visibilityHidden && color).toEqual(true);
  });

  it('Adding style display (without deleting other styles)', () => {
    const wrapper = shallow(
      <Only when={false} hiddenMode="withDisplay">
        <span id="child" style={{ color: 'green' }} />
      </Only>
    );
    const child = wrapper.find('#child');
    const { style } = child.props();
    const displayNone = style.display === 'none';
    const color = style.color === 'green';
    expect(displayNone && color).toEqual(true);
  });

  it('Joining className (default class)', () => {
    const defaultClassName = Only.defaultProps.className;
    const testClassName = 'test-className';
    const wrapper = shallow(
      <Only when={false} hiddenMode="withCss">
        <span id="child" className={testClassName} />
      </Only>
    );
    const child = wrapper.find('#child');
    const { className } = child.props();
    const isClassNameAdded = ~className.indexOf(defaultClassName);
    const isTestClassNameExists = ~className.indexOf(testClassName);
    expect(isClassNameAdded && isTestClassNameExists).toBeTruthy();
  });

  it('Joining className (as prop)', () => {
    const classAsProp = 'test-class-prop';
    const testClassName = 'test-className';

    const wrapper = shallow(
      <Only when={false} hiddenMode="withCss" className={classAsProp}>
        <span id="child" className={testClassName} />
      </Only>
    );
    const child = wrapper.find('#child');
    const { className } = child.props();
    const isClassNameAdded = ~className.indexOf(classAsProp);
    const isTestClassNameExists = ~className.indexOf(testClassName);

    expect(isClassNameAdded && isTestClassNameExists).toBeTruthy();
  });

})

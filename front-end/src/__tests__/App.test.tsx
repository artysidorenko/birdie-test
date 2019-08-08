import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import * as chai from 'chai';
import { expect as _expect } from 'chai';

import App from '../App';
import store from '@App/store';
import General from '@App/views/General';
import Home from '@App/views/Home';
import Nutrition from '@App/views/Nutrition';
import Other from '@App/views/Other';

import matcher from 'chai-react-element';
chai.use(matcher);


/* Normally part of src/setupTests.js but ... */
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
/* ... file was not being picked up by CRA so added manually */

/* tslint:disable:no-unused-expression */

describe('Application', () => {

  it('renders without crashing (shallow)', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders without crashing (mount)', () => {
    const wrapper = mount(<Provider store={store}><Router><App /></Router></Provider>);
    _expect(wrapper).to.exist;
  });

  it('calls componentDidMount', () => {
    const mockHook = jest.spyOn(App.prototype, 'componentDidMount');
    mockHook.mockImplementation(() => { });
    shallow(<App />);
    expect(mockHook.mock.calls.length).toBe(1);
  });

  // it('renders 4 views on mounting', () => {
  //   const wrapper = mount(<Provider store={store}><Router><App /></Router></Provider>);
  //   _expect(wrapper.containsMatchingElement(<General/>)).to.be.true;
  // });

});

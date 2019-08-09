import * as React from 'react';
import { shallow } from 'enzyme';
import { expect as _expect } from 'chai';

import Home from '@App/views/Home';

/* Normally part of src/setupTests.js but ... */
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
/* ... file was not being picked up by CRA so added manually */

/* tslint:disable:no-unused-expression */

describe('Home Page', () => {

  it('renders without crashing (shallow)', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
});

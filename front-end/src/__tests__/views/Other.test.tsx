import * as React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { expect as _expect } from 'chai';

import Other from '@App/views/Other';
import store from '@App/store';

/* Normally part of src/setupTests.js but ... */
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
/* ... file was not being picked up by CRA so added manually */

/* tslint:disable:no-unused-expression */

describe('Other Page', () => {

  it('renders without crashing (shallow)', () => {
    const wrapper = shallow(<Provider store={store}><Other /></Provider>);
    expect(wrapper).toMatchSnapshot();
  });
});

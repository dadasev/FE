import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from '../SearchBar';
import Strings from '../../utils/Strings'

let wrapped;

beforeEach(()=>{
    wrapped = shallow(<SearchBar />);
})

test('imports and renders a SearchBar label', () => {
    const value = wrapped.find("label").text()
    expect(value).toEqual('Video Search');
});

test('renders a button', () => {
    expect(wrapped.find("button").length).toEqual(1);
});

import React from 'react';
import { shallow } from 'enzyme';
import App from '.';
import SearchBar from '../SearchBar';
import VideoDetail from '../VideoDetail';

let wrapped;

beforeEach(()=>{
    wrapped = shallow(<App />);
})

test('renders a SearchBar', () => {
    expect(wrapped.find(SearchBar).length).toEqual(1);
});

test('renders a VideoDetail', () => {
    expect(wrapped.find(VideoDetail).length).toEqual(1);
});
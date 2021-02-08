import React from 'react';
import { mount } from 'enzyme';
import VideoList from '../VideoList';

let wrapped;

const videos = [
    {id: {videoId: "65r789gh1"}, snippet: {title: "test video1", thumbnails: { medium: {url: "url1"}}}},
    {id: {videoId: "65r789gh2"}, snippet: {title: "test video2", thumbnails: { medium: {url: "url2"}}}},
    {id: {videoId: "65r789gh3"}, snippet: {title: "test video3", thumbnails: { medium: {url: "url3"}}}},
];

beforeEach(()=>{
    wrapped = mount(<VideoList videos={videos} />);
});

it("accepts video props", () => {
    expect(wrapped.props().videos).toEqual(videos);
});

test('renders correct number of VideoItems', () => {
    expect(wrapped.find("img").length).toEqual(3);
});
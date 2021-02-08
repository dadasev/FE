import React from 'react';
import { mount } from 'enzyme';
import VideoItem from '../VideoItem';

let wrapped;

const video = {
    id: {
        videoId: "65r789ghi"
    },
    snippet: {
        title: "test video",
        thumbnails: {
            medium: {
                url: "url"
            }
        }
    }
};

beforeEach(()=>{
    wrapped = mount(<VideoItem video={video} />);
});

test('renders an image', () => {
    expect(wrapped.find("img").length).toEqual(1);
});

it("accepts video props", () => {
    expect(wrapped.props().video.snippet.title).toEqual("test video");
});
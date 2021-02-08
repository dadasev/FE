import React from 'react';
import { mount } from 'enzyme';
import VideoDetail from '../VideoDetail';

let wrapped;

const video = {
    id: {
        videoId: "65r789ghi"
    }
};

describe("passing props", () => {
    it("accepts video props", () => {
        wrapped = mount(<VideoDetail video={video} />);
        expect(wrapped.props().video).toEqual(video);
    });
    it("shows 'Loading...' before the props are passed", () => {
        wrapped = mount(<VideoDetail />);
        const value = wrapped.find("div").text();
        expect(value).toEqual("Loading...");
    });
  });
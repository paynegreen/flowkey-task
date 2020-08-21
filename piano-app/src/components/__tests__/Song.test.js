import React from "react";
import { render } from "@testing-library/react";
import Song from "../Song";

const song = {
    _id: "some_random_text",
    title: "Song title",
    keyStokes: [{ midiNumber: 51, duration: 200, time: 830 }],
    elapseTime: 1000,
};

const replaySong = jest.fn();

test("it should display a song", () => {
    const { getByText } = render(<Song song={song} replaySong={replaySong} mode="IDLE" />);
    expect(getByText("Song title")).toBeTruthy();
});

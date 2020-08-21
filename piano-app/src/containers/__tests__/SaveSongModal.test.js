import React from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "react-apollo/test-utils";
import SaveSongModal from "../SaveSongModal";

const song = {};
const modal = true;
const setModal = jest.fn;

test("it should render modal", () => {
    const { getByPlaceholderText } = render(
        <MockedProvider>
            <SaveSongModal song={song} modal={modal} setModal={setModal} />
        </MockedProvider>
    );
    expect(getByPlaceholderText("Name of Song")).toBeTruthy();
});

import React from "react";
import { render } from "@testing-library/react";
import Timer from "../Timer";

const seconds = 0;
const setSeconds = jest.fn;
const mode = "IDLE";

test("it should render timer", () => {
    const { getByText } = render(<Timer seconds={seconds} setSeconds={setSeconds} mode={mode} />);
    expect(getByText("00:00")).toBeTruthy();
});

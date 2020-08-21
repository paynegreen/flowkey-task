import React from "react";
import { render } from "@testing-library/react";
import RecordSection from "../RecordSection";

const onStopClick = jest.fn;
const onRecordClick = jest.fn;
const setSeconds = jest.fn;

test("should be true", () => {
    const { getByText } = render(
        <RecordSection
            mode="IDLE"
            onStopClick={onStopClick}
            onRecordClick={onRecordClick}
            seconds={0}
            setSeconds={setSeconds}
        />
    );

    expect(getByText("00:00")).toBeTruthy();
    expect(getByText("Current Mode: IDLE")).toBeTruthy();
    expect(getByText("Record")).toBeTruthy();
});

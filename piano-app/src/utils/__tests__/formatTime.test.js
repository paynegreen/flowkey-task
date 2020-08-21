import formatTime from "../formatTime";

test("It assert to true", () => {
    const seconds = 3600;
    const time = formatTime(seconds);
    expect(time).toEqual("01:00:00");
});

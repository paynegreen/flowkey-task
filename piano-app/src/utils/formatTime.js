const formatTime = secs => {
    // if (sec.toString().length >= 2) {
    //     return sec.toString();
    // }

    // return `00${sec}`.substr(-2);

    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours, minutes, seconds]
        .map(v => (v < 10 ? "0" + v : v))
        .filter((v, i) => v !== "00" || i > 0)
        .join(":");
    // var minutes = Math.floor(secs / 60000);
    // var seconds = ((secs % 60000) / 1000).toFixed(0);
    // return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

// const formatTime = duration => {
//     let seconds = Math.floor((duration / 1000) % 60),
//         minutes = Math.floor((duration / (1000 * 60)) % 60);

//     minutes = minutes < 10 ? "0" + minutes : minutes;
//     seconds = seconds < 10 ? "0" + seconds : seconds;

//     return minutes + ":" + seconds;
// };

export default formatTime;

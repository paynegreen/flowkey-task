class Timing {
    constructor(onChange) {
        this.time = 0;
        this.onChange = onChange;
        this.timerInterval = null;
        // this.timerInterval = setInterval(() => this.incrementTime(), 10);
    }

    start() {
        this.time += 1;
        this.timerInterval = setInterval(() => this.onChange(this.time++), 1000);
        console.log("assigned", this.timerInterval);
    }

    end = () => {
        console.log("clearInterval", this.timerInterval);
        clearInterval(this.timerInterval);
    };
}

export default Timing;

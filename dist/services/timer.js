export class Timer {
    constructor(duration, onTimeUp, onTick) {
        this.interval = null;
        this.duration = duration;
        this.remaining = duration;
        this.onTimeUp = onTimeUp;
        this.onTick = onTick;
    }
    start() {
        this.interval = setInterval(() => {
            this.remaining--;
            this.onTick(this.remaining);
            if (this.remaining <= 0) {
                this.stop();
                this.onTimeUp();
            }
        }, 1000);
    }
    stop() {
        if (this.interval !== null)
            clearInterval(this.interval);
    }
    reset() {
        this.stop();
        this.remaining = this.duration;
    }
}

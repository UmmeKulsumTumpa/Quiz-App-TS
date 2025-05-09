export class Timer {
    private duration: number;
    private remaining: number;
    private interval: number | null = null;
    private onTimeUp: () => void;
    private onTick: (time: number) => void;

    constructor(duration: number, onTimeUp: () => void, onTick: (time: number) => void) {
        this.duration = duration;
        this.remaining = duration;
        this.onTimeUp = onTimeUp;
        this.onTick = onTick;
    }

    start(): void {
        this.interval = setInterval(() => {
            this.remaining--;
            this.onTick(this.remaining);
            if (this.remaining <= 0) {
                this.stop();
                this.onTimeUp();
            }
        }, 1000) as unknown as number;
    }

    stop(): void {
        if (this.interval !== null) clearInterval(this.interval);
    }

    reset(): void {
        this.stop();
        this.remaining = this.duration;
    }
}

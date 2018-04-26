class Caret {
    
    public readonly element: string;
    private symbol: string;
    private millisecBlinkRate: number;
    private initialized: boolean;
    private isBlinking: boolean;
    private intervalHandle: number;

    get blinkRate(): number {
        return this.millisecBlinkRate;
    }
    set blinkRate(milliseconds: number) {
        if (milliseconds >= 0) {
            this.millisecBlinkRate = milliseconds;
        }
    }

    public constructor(element: string, symbol: string = "|", blinkSpeed: number = 100) {
        this.element = element;
        this.symbol = symbol;
        this.blinkRate = blinkSpeed;
        this.initialized = false;
        this.isBlinking = false;
        this.intervalHandle = null;
    } 

    public init(): void {
        $(this.element).text(this.symbol);
        this.initialized = true;
    }

    public remove(): void {
        if (this.isBlinking) {
            this.blinkStop();
        }
        $(this.element).remove();
    }

    public hide(): void {
        if (this.isBlinking) {
            this.blinkStop();
        }
        $(this.element).removeClass("caret-on").addClass("caret-off");
    }

    public blinkStart(): void {
        if(!this.isBlinking) {
            
            if (!this.initialized) {
                this.init();
            }

            this.intervalHandle = setInterval(() => { 
                if ($(this.element).css("visibility") == "hidden") {
                    $(this.element).removeClass("caret-off").addClass("caret-on");
                } else {
                    $(this.element).removeClass("caret-on").addClass("caret-off");
                }
            }, this.blinkRate);

            this.isBlinking = true;
        }
    }

    public blinkStop(): void {
        if (this.isBlinking) {
            clearInterval(this.intervalHandle);
            $(this.element).removeClass("caret-off").addClass("caret-on");
            this.isBlinking = false;
        }
    }
}
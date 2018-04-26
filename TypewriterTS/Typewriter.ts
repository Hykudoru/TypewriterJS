class Typewriter {

    private caret: Caret;
    private element: string;
    private millisecCharOutputRate: number;
    private millisecUntilComplete: number;
    
    get characterOutputRate(): number {
        return this.millisecCharOutputRate;
    }

    set characterOutputRate(milliseconds: number) {
        if (milliseconds >= 0) {
            this.millisecCharOutputRate = milliseconds;
        }
    }

    get target(): string {
        return this.element;
    }

    set target(element: string) {
        if (true) {//...
            this.element = element;
        }
    }

    get duration(): number {
        return this.millisecUntilComplete;
    }

    public constructor(element: string, characterOutputRate: number, caret: Caret) {
        $(element).text("");
        this.target = element;
        this.characterOutputRate = characterOutputRate;
        this.caret = caret;
        this.millisecUntilComplete = 0;
    }

    get caretObject(): Caret {
        return this.caret;
    }

    public blink(on: boolean): void {
        if (on) {
            this.caret.blinkStart();
        }
        else {
            this.caret.blinkStop();
        }
    }

    private enqueue(text: string, millisecDelayBefore: number = 0, millisecDelayAfter: number = 0, deleteTextWhenFinished: boolean = false): Typewriter {
        
        if (millisecDelayBefore < 0) {
            millisecDelayBefore = 0;
        }
        if (millisecDelayAfter < 0) {
            millisecDelayAfter = 0;
        }

        //Determine time needed to complete to inform any potential subsequent calls of when it's safe to fire. 
        this.millisecUntilComplete = (text.length * this.characterOutputRate) + millisecDelayBefore + millisecDelayAfter;

        //Potentially pause before firing depending on millisecDelayBefore parameter 
        //and whether or not anything has already been added to the queue.
        setTimeout(() => {
            let charIndex: number = 0;
            let typing: number = setInterval(() => {
                if (charIndex < text.length) {
                    $(this.element).append(text.charAt(charIndex++));
                } 
                else {
                    clearInterval(typing);
                    this.millisecUntilComplete = 0;
                    setTimeout(() => {
                        if (deleteTextWhenFinished) {
                            $(this.element).text("");
                        }
                    }, millisecDelayAfter);
                }
            }, this.characterOutputRate);

        }, millisecDelayBefore);

        return this;
    }

    public enqueueOutput(text: string, millisecDelayBefore: number = 0, millisecDelayAfter: number = 0, deleteTextWhenFinished: boolean = false): Typewriter {
        this.enqueue(text, this.millisecUntilComplete + millisecDelayBefore, millisecDelayAfter, deleteTextWhenFinished);
        
        return this;
    }

}
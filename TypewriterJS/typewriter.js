var Caret = (function () {
    function Caret(element, symbol, blinkSpeed) {
        if (symbol === void 0) { symbol = "|"; }
        if (blinkSpeed === void 0) { blinkSpeed = 100; }
        this.element = element;
        this.symbol = symbol;
        this.blinkRate = blinkSpeed;
        this.initialized = false;
        this.isBlinking = false;
        this.intervalHandle = null;
    }
    Object.defineProperty(Caret.prototype, "blinkRate", {
        get: function () {
            return this.millisecBlinkRate;
        },
        set: function (milliseconds) {
            if (milliseconds >= 0) {
                this.millisecBlinkRate = milliseconds;
            }
        },
        enumerable: true,
        configurable: true
    });
    Caret.prototype.init = function () {
        $(this.element).text(this.symbol);
        this.initialized = true;
    };
    Caret.prototype.remove = function () {
        if (this.isBlinking) {
            this.blinkStop();
        }
        $(this.element).remove();
    };
    Caret.prototype.hide = function () {
        if (this.isBlinking) {
            this.blinkStop();
        }
        $(this.element).removeClass("caret-on").addClass("caret-off");
    };
    Caret.prototype.blinkStart = function () {
        var _this = this;
        if (!this.isBlinking) {
            if (!this.initialized) {
                this.init();
            }
            this.intervalHandle = setInterval(function () {
                if ($(_this.element).css("visibility") == "hidden") {
                    $(_this.element).removeClass("caret-off").addClass("caret-on");
                }
                else {
                    $(_this.element).removeClass("caret-on").addClass("caret-off");
                }
            }, this.blinkRate);
            this.isBlinking = true;
        }
    };
    Caret.prototype.blinkStop = function () {
        if (this.isBlinking) {
            clearInterval(this.intervalHandle);
            $(this.element).removeClass("caret-off").addClass("caret-on");
            this.isBlinking = false;
        }
    };
    return Caret;
}());

var Typewriter = (function () {
    function Typewriter(element, characterOutputRate, caret) {
        $(element).text("");
        this.target = element;
        this.characterOutputRate = characterOutputRate;
        this.caret = caret;
        this.millisecUntilComplete = 0;
    }
    Object.defineProperty(Typewriter.prototype, "characterOutputRate", {
        get: function () {
            return this.millisecCharOutputRate;
        },
        set: function (milliseconds) {
            if (milliseconds >= 0) {
                this.millisecCharOutputRate = milliseconds;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Typewriter.prototype, "target", {
        get: function () {
            return this.element;
        },
        set: function (element) {
            if (true) {
                this.element = element;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Typewriter.prototype, "duration", {
        get: function () {
            return this.millisecUntilComplete;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Typewriter.prototype, "caretObject", {
        get: function () {
            return this.caret;
        },
        enumerable: true,
        configurable: true
    });
    Typewriter.prototype.blink = function (on) {
        if (on) {
            this.caret.blinkStart();
        }
        else {
            this.caret.blinkStop();
        }
    };
    Typewriter.prototype.enqueue = function (text, millisecDelayBefore, millisecDelayAfter, deleteTextWhenFinished) {
        var _this = this;
        if (millisecDelayBefore === void 0) { millisecDelayBefore = 0; }
        if (millisecDelayAfter === void 0) { millisecDelayAfter = 0; }
        if (deleteTextWhenFinished === void 0) { deleteTextWhenFinished = false; }
        if (millisecDelayBefore < 0) {
            millisecDelayBefore = 0;
        }
        if (millisecDelayAfter < 0) {
            millisecDelayAfter = 0;
        }
        this.millisecUntilComplete = (text.length * this.characterOutputRate) + millisecDelayBefore + millisecDelayAfter;
        setTimeout(function () {
            var charIndex = 0;
            var typing = setInterval(function () {
                if (charIndex < text.length) {
                    $(_this.element).append(text.charAt(charIndex++));
                }
                else {
                    clearInterval(typing);
                    _this.millisecUntilComplete = 0;
                    setTimeout(function () {
                        if (deleteTextWhenFinished) {
                            $(_this.element).text("");
                        }
                    }, millisecDelayAfter);
                }
            }, _this.characterOutputRate);
        }, millisecDelayBefore);
        return this;
    };
    Typewriter.prototype.enqueueOutput = function (text, millisecDelayBefore, millisecDelayAfter, deleteTextWhenFinished) {
        if (millisecDelayBefore === void 0) { millisecDelayBefore = 0; }
        if (millisecDelayAfter === void 0) { millisecDelayAfter = 0; }
        if (deleteTextWhenFinished === void 0) { deleteTextWhenFinished = false; }
        this.enqueue(text, this.millisecUntilComplete + millisecDelayBefore, millisecDelayAfter, deleteTextWhenFinished);
        return this;
    };
    return Typewriter;
}());
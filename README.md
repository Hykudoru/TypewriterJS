# Typewriter
Typewriter is an automated typing program that can receive a string of messages and output each characters at desired intervals to simulate human typing. 

Originally written in Typescript version ~2.0

## TypewriterTS
<pre>
TypewriterTS/
  /Caret.ts 
  /Typewriter.ts
</pre>

## TypewriterJS
<pre>
TypewriterJS/
  /typewriter.js
</pre>

## HTML
<pre><code>
<span id="typewriter" data-output="Welcome!>>Searching for happy thoughts...>>Critical error: 'Fresh out of coffee!'" 
  data-rate="100" 
  data-delay="2000" 
  data-offset="100" 
  data-caret-symbol="|" 
  data-caret-blink="false" 
  data-caret-blink-rate="500">
</span><span></span>
</code></pre>

## JS
<pre><code>
const powerbutton = $("#power");
const tw = document.getElementById("typewriter");

power.on("click", () => {

    // Disable button and prepare and initiate typewriter program.
    powerbutton.off();
    powerbutton.removeClass("btn-power-off").addClass("btn-power-on");
    
    // Display alert box containing output.
    $("#alert").css("animation-name", "alert-toggle-on");

    let headline = new Typewriter("#typewriter", parseInt(tw.dataset.rate), new Caret("#typewriter ~ span", tw.dataset.caretSymbol,  parseInt(tw.dataset.caretBlinkRate)));
    let delay = parseInt(tw.dataset.delay);
    let offset = parseInt(tw.dataset.offset);
    let messages = tw.dataset.output.split(">>");

    headline.caretObject.init();
    if (tw.dataset.caretBlink == "true") {
        headline.caretObject.blinkStart();
    }

    for (let i = 0; i < messages.length; i++) {
        headline.enqueueOutput(messages[i].trim(), offset, delay, true);
    }

    setTimeout(function () {
        headline.caretObject.hide();
        powerbutton.removeClass("btn-power-on").addClass("btn-power-off");
        $("#alert").css("animation-name", "alert-toggle-off"); // Hide alert box
        powerbutton.on("click", Client.resetPowerButton);
    }, headline.duration);
});
</code></pre>

Copyright (c) 2018 Alexander Fish.

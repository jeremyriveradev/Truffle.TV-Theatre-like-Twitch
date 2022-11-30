// ==UserScript==
// @name         Truffle.TV - Full Theatre on hidden chat
// @namespace    https://www.youtube.com/
// @version      1.1
// @description  Like Twitch, when chat is hidden the video will resize to the full browser width
// @author       jeremyriveradev
// @match        https://www.youtube.com/watch?*
// @icon         data:image/png;base64,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
// ==/UserScript==

(function() {
    "use strict";

    var log_title = "[Truffle.TV - Full Theatre]";

    console.log(`${log_title}: Script Active`);

    var addFullTheatre = function () {
        // Atatch variable to window to keep track of retries
        if(!window.truffleFullTheatre) window.truffleFullTheatre = 0;
        window.truffleFullTheatre++;

        // Initialize if page is a livestream and Truffle Theatre mode is active
        if (!document.querySelector("#chat")) {
            console.log(`${log_title}: Checking for Livestream... ${window.truffleFullTheatre * 3 - 3}s elapsed (9s limit)`);
            if (window.truffleFullTheatre > 3) {
                console.log(`${log_title}: Page is not livestream or took more than 9s to load page... Restart extension or Reload Page to try again`);
                return }
            setTimeout(addFullTheatre, 3000);
            return
        }
        if (!document.querySelector("body[data-mogul-theater-mode]")) {
            console.log(`${log_title}: Searching for Truffle Custom Theatre Mode... ${window.truffleFullTheatre * 3 - 3}s elapsed (60s limit)`);
            if (window.truffleFullTheatre > 20) {
                console.log(`${log_title}: Page is livestream, but Truffle Custom Theatre Mode is not active. Enable it and Restart extension or Reload Page to try again`);
                return }
            setTimeout(addFullTheatre, 3000);
            return
        }
        else {

            console.log(`${log_title}: mogul found`);

            // Get chat button and player elements
            var ytdchatbut = document.querySelector("#chat button"),
                ytdwatchflexy = document.querySelector("ytd-watch-flexy");

            //Failsafe function
            var checkFullTheatreStyle = function () {
                // Check button state, sometimes intense browser lag causes the function to desync
                if(document.querySelector("#chat button").ariaPressed !== null) {
                    console.log(document.querySelector("#chat button").ariaPressed, ytdwatchflexy.classList.contains("truffle-unobtrusive-hide-chat"));
                    if(document.querySelector("#chat button").ariaPressed === "true" && ytdwatchflexy.classList.contains("truffle-unobtrusive-hide-chat") === false) {
                        console.log(document.querySelector("#chat button").ariaPressed, ytdwatchflexy.classList.contains("truffle-unobtrusive-hide-chat"));
                        ytdwatchflexy.classList.add('truffle-unobtrusive-hide-chat')
                        dispatchEvent(new Event('resize'));
                        return
                    }
                    if(document.querySelector("#chat button").ariaPressed === "false" && ytdwatchflexy.classList.contains("truffle-unobtrusive-hide-chat") === true) {
                        console.log(document.querySelector("#chat button").ariaPressed, ytdwatchflexy.classList.contains("truffle-unobtrusive-hide-chat"));
                        ytdwatchflexy.classList.remove('truffle-unobtrusive-hide-chat')
                        dispatchEvent(new Event('resize'));
                    }
                }
            }

            // Apply/Remove Full Theatre class on 'Show Chat'/'Hide Chat' button click
            ytdchatbut.addEventListener("click", () => {
                // If truffle theatre mode turned off after class already applied, remove class
                if(document.body.getAttribute('data-mogul-theater-mode') === null && ytdwatchflexy.classList.contains("truffle-unobtrusive-hide-chat")) {
                    ytdwatchflexy.classList.remove('truffle-unobtrusive-hide-chat');
                    dispatchEvent(new Event('resize'));
                    return }
                // Apply/Remove class
                ytdwatchflexy.classList.toggle('truffle-unobtrusive-hide-chat');
                // Failsafe, check button state
                new Promise(resolve => setTimeout(checkFullTheatreStyle,500));
                // Send resize event for YT API video rescaling
                dispatchEvent(new Event('resize'));
                updateFullTheatreCSS();
            });

            // Clean up conflicting rules from Truffle Theatre mode
            [...document.getElementsByTagName("STYLE")].forEach((e) =>
                (e.textContent.substr(1,7) === "/* Make") && (e.sheet.cssRules[2].deleteRule(1)));

            // Styles subject to live change
            var trufflefulltheatre_dynamicstyle = document.createElement("STYLE");
            document.head.appendChild(trufflefulltheatre_dynamicstyle);
            // Update style variables on view change
            var updateFullTheatreCSS = function () {
                var ytdmasthead = document.querySelector("ytd-masthead");
                var ytdchatbut = document.querySelector("#chat button");
                trufflefulltheatre_dynamicstyle.innerHTML = `
:root {
    --ytd-masthead-height: ${ytdmasthead.offsetHeight}px;
    --ytd-chat-button-height: ${ytdchatbut.offsetHeight}px;
}`
            }
            updateFullTheatreCSS();
            document.addEventListener("resize", updateFullTheatreCSS());
            document.addEventListener("zoom", updateFullTheatreCSS());

            // Add static style to document
            var trufflefulltheatre_staticstyle = document.createElement("STYLE");
            trufflefulltheatre_staticstyle.innerHTML += `
/* YT removed their normalization... Adding some back */
html, body { overflow-x: hidden; }
/* Move entire Chat view to the side, rotate it, fill vertical space */
body[data-mogul-theater-mode] .truffle-unobtrusive-hide-chat #chat {
	width: calc(100vh - var(--ytd-masthead-height)) !important;
	transform: rotate(-90deg)
        translateY(calc(100% - var(--ytd-chat-button-height)));
}
/* Rotate 'Show Chat' text to correct orientation, add spacing to fit larger button */
body[data-mogul-theater-mode] .truffle-unobtrusive-hide-chat #chat .cbox {
	transform: rotate(180deg);
	letter-spacing: 0.5vh;
    opacity: 0.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
body[data-mogul-theater-mode] .truffle-unobtrusive-hide-chat #chat button:hover .cbox {
	opacity: 1;
    transition: 0.15s;
}
body[data-mogul-theater-mode] .truffle-unobtrusive-hide-chat #chat button{
    height: 25px;
    font-size: 13px;
}
/* Theatre mode base style*/
body[data-mogul-theater-mode] #player-theater-container.ytd-watch-flexy {
	width: calc(100vw - var(--ytd-watch-flexy-sidebar-width) - var(--ytd-watch-flexy-scrollbar-width));
    max-width: calc(100vw - var(--ytd-watch-flexy-sidebar-width) - var(--ytd-watch-flexy-scrollbar-width));
	height: calc(100vh - var(--ytd-masthead-height)) !important;
	max-height: calc(100vh - var(--ytd-masthead-height)) !important;
}
/* Hidden Chat Theatre mode width edit */
body[data-mogul-theater-mode] .truffle-unobtrusive-hide-chat #player-theater-container.ytd-watch-flexy,
body[data-mogul-theater-mode] .truffle-unobtrusive-hide-chat .ytp-chrome-bottom,
body[data-mogul-theater-mode] .truffle-unobtrusive-hide-chat .ytp-chapter-hover-container {
	width: 100%;
	max-width: calc(100vw - var(--ytd-chat-button-height) - var(--ytd-watch-flexy-scrollbar-width)) !important;
}
`;
            document.head.appendChild(trufflefulltheatre_staticstyle);

            console.log(`${log_title}: Sucessfully applied`);
        }
    }
    addFullTheatre();
})();

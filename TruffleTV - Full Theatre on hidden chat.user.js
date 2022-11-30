// ==UserScript==
// @name         Truffle.TV - Full Theatre on hidden chat
// @namespace    https://www.youtube.com/
// @version      1
// @description  Like Twitch, when chat is hidden the video will resize to the full browser width
// @author       jeremyriveradev
// @match        https://www.youtube.com/watch?*
// @icon         data:image/png;base64,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
// @grant        none
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

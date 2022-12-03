// ==UserScript==
// @name         Truffle.TV - Full Theatre on hidden chat
// @namespace    https://www.youtube.com/
// @version      1.2
// @description  Like Twitch, when chat is hidden the video will resize to the full browser width
// @author       jeremyriveradev
// @match        https://www.youtube.com/watch?*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAIAAADYYG7QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAR9SURBVFhH7VZdTBxVFL4/M7O7w/6wIAIttLSC5a/Yog/WNr60NIopjYYAfTLRtL6aaHwxAW1UNKYPJjb150GrfcQ3H/pQX2yI8c20IWELNg12hS5lcekuy+zM3PHMDyyd3eFatm542G+/zNx75+zZb885987BD4Yvo50E4tx3DCqCeKgI4qEiiIcdJ+ihgzFJlXu5FWdSLohEaEERATuhyQtKM+Xsze9/+2vKnpYNlNLR3qHX64/Y03zKskydSs4lV1cyuqJgvURmDRVcLWVSwJSSAZ+uQVpbs58mVpI3l+ccEQgJzn0dgiB83H/u6JPtzny7uK+m37r6RTweh/Gbz/WfbD783rVvT3cefb6l+91rXw+0HjnW0PH21YsLmWUwMOCzDndRE0KacLhtyVciW9WwLMu2z6d8dV2sNirKnbSuYy1SLYfagvWwIgs+22Az8jW0qKWPXx+/sxjfE61vEMP24rbxwMjdSt7VNA3G0UCoxhe8nVqo8Yeq/cHb/8xXB4LVYtWdlXuGYcbm3DMvX2gfsb5XIOjvZCJEiwj/n6Ahlsqtnu15yVPQoea2C02v2SvFYf0nM+/5a1Hg/BXb4yKYkVKDP4+fefpFT0EvtPV81TRsr2wAAstyy1pmztCzyNAMQ4c5YqrBNGToyGAGYpYhBiA4UTDFWMRERETEWEBYIEKVENxLCioh5k+dmHh/qPXYIwgCNWuJyeziJDJUZ2lbwMQn7+6XIp2m6HUUCuK/OrTVeCbxK2OqGYcSqOtKZv4XXUk6fj3AEQS5UlLTjOkMRiVTy6W07ILj2gO8CEGxZBO6WTWPh5rKeVfyI6SrGdhYXhT2tkiHDiNRcq17knEKkR8hTVN0hrwoth3Ydembmo8+Id0HdUxdTwvJmL0fPcGNkMYrICSEwzUDp5u/uxz99DOht9egtMAmTwjS1uAKcnt0EZJgW0qhUN2pUw1fXgydP0/aO1xmG+Tp4aYMQZC3Yl4R+CIk4POJisoUxWW2Qa6k/yAI6mgrWoDUJpP3r1yZGRycHxvLzc4WmDksNUIYU8PArn+5mZAGbWkp8cOPseGRudEPVmMzUHIum83kKuIJIhQRYfOB62L6jxvTQ2fmxj7M3po1pRQYuFh6DRFCZfgdL67djWdn/7Si4n5UlNBDO449wE0ZoVIEdgccsvY2KXFARaeN9AI/ZVWRfeAIYHssZWAgKvlrHdce4KYMRZ7o8of26Ay7ztxHJw7XHZRDTY5fD/AFUcG3v3Okcd/xULQ1EGyUArWSPyr6I1QKUzFIBZkIAUx9mEjmlfqJIJvrUhhswNIn1waqGuG7u/b3Nbe+Qqjo+PVAkQbt0u4he8UFM+x6DhojuFsHnPmqNO/WE3NDm40XtF/QMRK4Qu9otZAURBCzdSzSyMb8K30/eXWMavrE5LiA6cnaLv5x8ZiQJMrE9PU3uvs+P+C0qXlBqyw3OjXx+3zMnpYNhJJ3nn11oLrHnuYFAayTokyx2QxKrPxaeEjQTgB/l5UZFUE8VATxUBHEww4ThNC/Z0wqYV7mYawAAAAASUVORK5CYII=
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
            return }
        if (!document.querySelector("body[data-mogul-theater-mode]")) {
            console.log(`${log_title}: Searching for Truffle Custom Theatre Mode... ${window.truffleFullTheatre * 3 - 3}s elapsed (60s limit)`);
            if (window.truffleFullTheatre > 20) {
                console.log(`${log_title}: Page is livestream, but Truffle Custom Theatre Mode is not active. Enable it and Restart extension or Reload Page to try again`);
                return }
            setTimeout(addFullTheatre, 3000);
            return }
        if(document.querySelector("#Truffle-Full-Theatre-Style")) {
            console.log(`${log_title}: !Already Applied!`);
            return }

        console.log(`${log_title}: mogul found`);

        // Get chat button and player elements
        var ytdchatbut = document.querySelector("#chat button"),
            ytdwatchflexy = document.querySelector("ytd-watch-flexy");

        //Failsafe function
        var checkFullTheatreStyle = function () {
            // Check button state
            // Desync observed going from a livestream page directly to a different livestream
            // Desync observed when browser lag occurs from fast moving livechat and 'Hide Chat' is pressed
            //* Fixed YT bug where 'Hide chat'/'Show chat' button state is incorrect causing styles to apply inversed
            //* this bug occurs even without this script running
            if(document.querySelector("#chat button").ariaPressed !== null) {
                let chat = document.querySelector("#chat");
                let chat_button = chat.querySelector("button");

                if (chat_button.ariaPressed === "true" &&
                !ytdwatchflexy.classList.contains("truffle-unobtrusive-hide-chat")) {
                    // Fix YT Bug desynced button
                    if (!chat.getAttribute("collapsed")) {
                        console.log(`${log_title}: YT Bug 'Show/Hide chat' button text dysnc! Reload page to fully fix, applied temporary fix.`);
                        chat_button.querySelector("span").textContent = "Hide chat";
                        return
                    }
                    // Fix desynced styles caused by lag
                    console.log(`${log_title}: Desynced Styles! Error:`, document.querySelector("#chat button").ariaPressed, ytdwatchflexy.classList.contains("truffle-unobtrusive-hide-chat"));
                    ytdwatchflexy.classList.add('truffle-unobtrusive-hide-chat');
                    // Send resize event for YT API video rescaling
                    dispatchEvent(new Event('resize'));
                    return
                }
                if (chat_button.ariaPressed === "false" &&
                ytdwatchflexy.classList.contains("truffle-unobtrusive-hide-chat")) {
                    // Fix YT Bug desynced button
                    if (chat.getAttribute("collapsed") != null) {
                        console.log(`${log_title}: YT Bug 'Show/Hide chat' button text dysnc! Reload page to fully fix, applied temporary fix.`);
                        chat_button.querySelector("span").textContent = "Show chat";
                        return
                    }
                    // Fix desynced styles caused by lag
                    console.log(`${log_title}: Desynced Styles! Error:`, document.querySelector("#chat button").ariaPressed, ytdwatchflexy.classList.contains("truffle-unobtrusive-hide-chat"));
                    ytdwatchflexy.classList.remove('truffle-unobtrusive-hide-chat');
                    // Send resize event for YT API video rescaling
                    dispatchEvent(new Event('resize'));
                }
            }
        }
        // Desync Likely on Live Page Change, run fallback function
        new MutationObserver((changes) => { changes.forEach(change => {
                if(change.attributeName.includes('src')) { new Promise(resolve => setTimeout(checkFullTheatreStyle,500)) }});
        }).observe(ytdwatchflexy.querySelector("video"), {attributes : true});

        // Apply/Remove Full Theatre class on 'Show Chat'/'Hide Chat' button click
        ytdchatbut.addEventListener("click", () => {
            // If truffle theatre mode turned off after class already applied, remove class
            if(document.body.getAttribute('data-mogul-theater-mode') == null && ytdwatchflexy.classList.contains("truffle-unobtrusive-hide-chat")) {
                ytdwatchflexy.classList.remove('truffle-unobtrusive-hide-chat');
                dispatchEvent(new Event('resize'));
                return }
            // Apply/Remove class
            ytdwatchflexy.classList.toggle('truffle-unobtrusive-hide-chat');
            // Failsafe function
            new Promise(resolve => setTimeout(checkFullTheatreStyle,500));
            // Send resize event for YT API video rescaling
            dispatchEvent(new Event('resize'));
        });

        // Clean up conflicting rules from Truffle Theatre mode
        const TRUFFLE_SIGNATURE = "/* Make";
        [...document.getElementsByTagName("STYLE")].forEach((e) =>
            (e.textContent.substr(1,7) === TRUFFLE_SIGNATURE) &&
			(e.sheet.cssRules[2].deleteRule(1)));

        // Full Theatre Styling
        var trufflefulltheatre_style = document.createElement("STYLE");
        trufflefulltheatre_style.id = "Truffle-Full-Theatre-Style";
        var ytdmasthead = document.querySelector("ytd-masthead");
        trufflefulltheatre_style.innerHTML += `
/* YT removed their normalization... Adding some back */
html, body { overflow-x: hidden; }

/* YT removed their normalization... Adding some back */
ytd-watch-flexy {
--ytd-masthead-height: ${ytdmasthead.offsetHeight}px;
--ytd-livechat-closed-button-height: 25px; }

@media screen and (min-width: 1014px) {

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
    max-width: calc(100vw - var(--ytd-livechat-closed-button-height) - var(--ytd-watch-flexy-scrollbar-width)) !important;
}

/* Move entire Chat view to the side, rotate it, fill vertical space */
body[data-mogul-theater-mode] .truffle-unobtrusive-hide-chat #chat {
    width: calc(100vh - var(--ytd-masthead-height)) !important;
    transform: rotate(-90deg)
        translateY(calc(100% - var(--ytd-livechat-closed-button-height)));
}
/* Rotate 'Show Chat' text to correct orientation, add letter spacing to fit larger button
   Add harder Fade-in effect */
body[data-mogul-theater-mode] .truffle-unobtrusive-hide-chat #chat .cbox {
    transform: rotate(180deg);
    letter-spacing: 0.5vh;
    opacity: 0.2;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; }
body[data-mogul-theater-mode] .truffle-unobtrusive-hide-chat #chat button:hover .cbox {
    opacity: 1;
    transition: 0.15s; }
/* Thinner Button */
body[data-mogul-theater-mode] .truffle-unobtrusive-hide-chat #chat button{
    height: var(--ytd-livechat-closed-button-height);
    font-size: 13px; }
}
`;
        document.head.appendChild(trufflefulltheatre_style);

        console.log(`${log_title}: Sucessfully applied`);
    }
    addFullTheatre();
})();

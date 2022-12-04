// ==UserScript==
// @name         Truffle.TV - Theatre like Twitch
// @namespace    https://www.youtube.com/
// @version      2
// @description  Like Twitch, in Theatre mode video is resized to take up as much space as possible
// @author       jeremyriveradev
// @match        *://*.youtube.com/watch?*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAIAAADYYG7QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAR9SURBVFhH7VZdTBxVFL4/M7O7w/6wIAIttLSC5a/Yog/WNr60NIopjYYAfTLRtL6aaHwxAW1UNKYPJjb150GrfcQ3H/pQX2yI8c20IWELNg12hS5lcekuy+zM3PHMDyyd3eFatm542G+/zNx75+zZb885987BD4Yvo50E4tx3DCqCeKgI4qEiiIcdJ+ihgzFJlXu5FWdSLohEaEERATuhyQtKM+Xsze9/+2vKnpYNlNLR3qHX64/Y03zKskydSs4lV1cyuqJgvURmDRVcLWVSwJSSAZ+uQVpbs58mVpI3l+ccEQgJzn0dgiB83H/u6JPtzny7uK+m37r6RTweh/Gbz/WfbD783rVvT3cefb6l+91rXw+0HjnW0PH21YsLmWUwMOCzDndRE0KacLhtyVciW9WwLMu2z6d8dV2sNirKnbSuYy1SLYfagvWwIgs+22Az8jW0qKWPXx+/sxjfE61vEMP24rbxwMjdSt7VNA3G0UCoxhe8nVqo8Yeq/cHb/8xXB4LVYtWdlXuGYcbm3DMvX2gfsb5XIOjvZCJEiwj/n6Ahlsqtnu15yVPQoea2C02v2SvFYf0nM+/5a1Hg/BXb4yKYkVKDP4+fefpFT0EvtPV81TRsr2wAAstyy1pmztCzyNAMQ4c5YqrBNGToyGAGYpYhBiA4UTDFWMRERETEWEBYIEKVENxLCioh5k+dmHh/qPXYIwgCNWuJyeziJDJUZ2lbwMQn7+6XIp2m6HUUCuK/OrTVeCbxK2OqGYcSqOtKZv4XXUk6fj3AEQS5UlLTjOkMRiVTy6W07ILj2gO8CEGxZBO6WTWPh5rKeVfyI6SrGdhYXhT2tkiHDiNRcq17knEKkR8hTVN0hrwoth3Ydembmo8+Id0HdUxdTwvJmL0fPcGNkMYrICSEwzUDp5u/uxz99DOht9egtMAmTwjS1uAKcnt0EZJgW0qhUN2pUw1fXgydP0/aO1xmG+Tp4aYMQZC3Yl4R+CIk4POJisoUxWW2Qa6k/yAI6mgrWoDUJpP3r1yZGRycHxvLzc4WmDksNUIYU8PArn+5mZAGbWkp8cOPseGRudEPVmMzUHIum83kKuIJIhQRYfOB62L6jxvTQ2fmxj7M3po1pRQYuFh6DRFCZfgdL67djWdn/7Si4n5UlNBDO449wE0ZoVIEdgccsvY2KXFARaeN9AI/ZVWRfeAIYHssZWAgKvlrHdce4KYMRZ7o8of26Ay7ztxHJw7XHZRDTY5fD/AFUcG3v3Okcd/xULQ1EGyUArWSPyr6I1QKUzFIBZkIAUx9mEjmlfqJIJvrUhhswNIn1waqGuG7u/b3Nbe+Qqjo+PVAkQbt0u4he8UFM+x6DhojuFsHnPmqNO/WE3NDm40XtF/QMRK4Qu9otZAURBCzdSzSyMb8K30/eXWMavrE5LiA6cnaLv5x8ZiQJMrE9PU3uvs+P+C0qXlBqyw3OjXx+3zMnpYNhJJ3nn11oLrHnuYFAayTokyx2QxKrPxaeEjQTgB/l5UZFUE8VATxUBHEww4ThNC/Z0wqYV7mYawAAAAASUVORK5CYII=
// ==/UserScript==

(function() {
    "use strict";

    var log_title = "[Truffle.TV Addon - Theatre like Twitch]";
    
    var addFullTheatre = function () {
        // Atatch variable to window to keep track of retries
        if(!window.truffleFullTheatre) window.truffleFullTheatre = 0;
        window.truffleFullTheatre++;

        // Check if already applied
        if(window.truffleFullTheatreApplied || document.querySelector("Truffle-Full-Theatre-Style")) {
            console.log(`${log_title}: !Already Applied!`);
            return }
        // Initialize if page is a livestream and Truffle Theatre mode is active
        if (!document.querySelector("#chat")) {
            console.log(`${log_title}: Checking for Livestream... ${window.truffleFullTheatre * 3 - 3}s elapsed (9s limit)`);
            if (window.truffleFullTheatre > 3) {
                console.log(`${log_title}: Page is not livestream or took more than 9s to load page... Restart extension or Reload Page to try again`);
                return }
            setTimeout(addFullTheatre, 3000);
            return }
        if (!document.querySelector("body[data-mogul-theater-mode]")) {
            if (window.truffleFullTheatre > 4) { return }
            setTimeout(addFullTheatre, 3000);
            return }

        console.log(`${log_title}: mogul found`);

        // Get chat button and player elements
        var ytdchatbut = document.querySelector("#chat button"),
            ytdwatchflexy = document.querySelector("ytd-watch-flexy");

        //Failsafe function
        var checkFullTheatreStyle = function () {
            // Check button state
            // Desync observed going from a livestream page directly to a different livestream
            // Desync observed when browser lag occurs from fast moving livechat and 'Show/Hide Chat' is pressed
            //* Fixed YT bug where 'Hide chat'/'Show chat' button state is incorrect causing styles to apply inversed
            //* this bug occurs even without this script running
            if(document.querySelector("#chat button").ariaPressed !== null) {
                let chat = document.querySelector("#chat");
                let chat_button = chat.querySelector("button");

                if (!document.querySelector("Truffle-Full-Theatre-Twitch-Hide-Chat-Icon") 
                && document.querySelector("body[data-mogul-theater-mode]")) {
                    console.log(document.querySelector('data-mogul-theater-mode'));
                    document.querySelector("#show-hide-button button").appendChild(icon);
                }
                if (chat_button.ariaPressed === "true" &&
                !ytdwatchflexy.classList.contains("truffle-unobtrusive-hide-chat")) {
                    // Fix desynced styles caused by lag
                    console.log(`${log_title}: Desynced Styles! Error:`, document.querySelector("#chat button").ariaPressed, ytdwatchflexy.classList.contains("truffle-unobtrusive-hide-chat"));
                    ytdwatchflexy.classList.add('truffle-unobtrusive-hide-chat');
                    // Send resize event for YT API video rescaling
                    dispatchEvent(new Event('resize'));
                    return
                }
                if (chat_button.ariaPressed === "false" &&
                ytdwatchflexy.classList.contains("truffle-unobtrusive-hide-chat")) {
                    // Fix desynced styles caused by lag
                    console.log(`${log_title}: Desynced Styles! Error:`, document.querySelector("#chat button").ariaPressed, ytdwatchflexy.classList.contains("truffle-unobtrusive-hide-chat"));
                    ytdwatchflexy.classList.remove('truffle-unobtrusive-hide-chat');
                    // Send resize event for YT API video rescaling
                    dispatchEvent(new Event('resize'));
                }
            }
        }
        // Desync Likely on Live Page Change (no document load even is ran), run fallback function
        // Correct styles if Custom Theatre Mode turned off
        var error_check = new MutationObserver((changes) => { changes.forEach(change => {
                if( change.attributeName.includes('src') || change.attributeName.includes('data-mogul-theater-mode') ) { 
                    if (!document.querySelector("body[data-mogul-theater-mode]")) {
                        let icon = document.querySelector("#Truffle-Full-Theatre-Twitch-Hide-Chat-Icon");
                        if(icon) { icon.remove(); }
                        dispatchEvent(new Event('resize')); }
                    new Promise(resolve => setTimeout(checkFullTheatreStyle,500)) }});
        })
        error_check.observe(ytdwatchflexy.querySelector("video"), {attributes : true});
        error_check.observe(document.body, {attributes : true});

        // Clean up conflicting rules from Truffle.TV Custom Theatre Mode
        const TRUFFLE_SIGNATURE = "/* Make";
        [...document.getElementsByTagName("STYLE")].forEach((e) => {
            if(e.textContent.substr(1,7) === TRUFFLE_SIGNATURE) {
                e.sheet.deleteRule(0);
                e.sheet.cssRules[1].deleteRule(0);
                e.sheet.cssRules[1].deleteRule(0); }});

        // Full Theatre Styling
        var trufflefulltheatre_style = document.createElement("STYLE");
        trufflefulltheatre_style.id = "Truffle-Full-Theatre-Style";
        trufflefulltheatre_style.innerHTML += `
/* YT removed their normalization... Adding some back */
html, body { overflow-x: hidden; }

@media screen and (min-width: 1014px) {

/** Theatre mode base styling */
body[data-mogul-theater-mode] #player-theater-container.ytd-watch-flexy {
    width: calc(100vw - var(--ytd-watch-flexy-sidebar-width) - var(--ytd-watch-flexy-scrollbar-width));
    max-width: calc(100vw - var(--ytd-watch-flexy-sidebar-width) - var(--ytd-watch-flexy-scrollbar-width)); }
body[data-mogul-theater-mode] #player-theater-container.ytd-watch-flexy,
body[data-mogul-theater-mode] #chat.ytd-watch-flexy {
    height: 100vh !important;
    max-height: 100vh !important; }
/* Move document to top */
body[data-mogul-theater-mode] #content {
    margin-top: -56px; }
/* Position Secondary list to adjustments */
body[data-mogul-theater-mode] ytd-watch-flexy[theater] #secondary {
   margin-top: 56px; }
/* Position Truffle Pins correctly to adjustments */
body[data-mogul-theater-mode] ytd-watch-flexy[theater] #secondary #chips {
   padding-top: 10px; }
/* Position Truffle Support button to adjustments */
body[data-mogul-theater-mode] .truffle-embed {
    margin-top: -42px !important;
    margin-bottom: 43px !important; }

/* Re-apply Truffle Chat Positioning */
body[data-mogul-theater-mode] #chat.ytd-watch-flexy {
    width: var(--ytd-watch-flexy-sidebar-width);
    top: 0;
    right: 0px;
    position: absolute !important;
    transition: 0.3s ease-out;
    z-index: 3000; }

/** Chat hidden positioning and resizing */
/* Hidden Chat player width */
body[data-mogul-theater-mode] .truffle-unobtrusive-hide-chat #player-theater-container.ytd-watch-flexy,
body[data-mogul-theater-mode] .truffle-unobtrusive-hide-chat .ytp-chrome-bottom,
body[data-mogul-theater-mode] .truffle-unobtrusive-hide-chat .ytp-chapter-hover-container {
    width: 100%;
    max-width: calc(100vw - var(--ytd-watch-flexy-scrollbar-width)) !important; }
/* Move Chat view to the side */
body[data-mogul-theater-mode] .truffle-unobtrusive-hide-chat #chat {
    transform: translateX(calc(var(--ytd-watch-flexy-sidebar-width))); }

/** Masthead */
/* Fully invisible until hover */
body[data-mogul-theater-mode] #masthead-container {
    opacity: 0;
    transition: opacity .2s ease; }
body[data-mogul-theater-mode] #masthead-container:hover {
    z-index: 3010; }
/* Extend hover range */
body[data-mogul-theater-mode] #masthead-container::after {
    height: 3vh;
    width: 100vw;
    top: 56px;
    background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%);
    opacity: 0.6;
    pointer-events: all; }

/**^ Twitch Show/Chat button */
/* Cleanup Button styles */
body[data-mogul-theater-mode] #chat #show-hide-button * {
    border: none;
    padding: 0;
    background: none;
    transition: 0.1s ease-in; }
body[data-mogul-theater-mode] #chat #show-hide-button button > :not(#Truffle-Full-Theatre-Twitch-Hide-Chat-Icon) {
    height: 0;
    width: 0;
    visibility: hidden; }
/** Chat Open */
/* Button Positioning */
body[data-mogul-theater-mode] #chat #show-hide-button {
    top: 6px;
    right: 50px;
    position: absolute;
    flex: none; }
/* Button Styling */
body[data-mogul-theater-mode] #chat #Truffle-Full-Theatre-Twitch-Hide-Chat-Icon {
    width: 20px;
    height: 20px;
    padding: 6px 8px 8px;
    margin: 0 auto;
    border-radius: 10%;
    fill: white;
    opacity: 0.3;
    background: none;
    transition: 0.1s ease-in; }
/* Button hover fade-in */
body[data-mogul-theater-mode] #chat #show-hide-button:hover #Truffle-Full-Theatre-Twitch-Hide-Chat-Icon {
    opacity: 1;
    background: #FFF2; }
/** Chat Closed */
/* Move button position */
body[data-mogul-theater-mode] #chat[collapsed] {
    overflow: visible; }
body[data-mogul-theater-mode] #chat[collapsed] #show-hide-button {
    top: 9vh;
    right: 415px;
    transform: rotate(180deg);
    opacity: 0; }
body[data-mogul-theater-mode] #chat[collapsed] #show-hide-button,
body[data-mogul-theater-mode] #chat[collapsed] #show-hide-button #Truffle-Full-Theatre-Twitch-Hide-Chat-Icon {
    transition: 0.15s ease-in; }
/* Tie hover effect of button to player controls */
body[data-mogul-theater-mode] #chat[collapsed] #show-hide-button:hover {
    opacity: 1; }
body[data-mogul-theater-mode] #player-theater-container:hover ~ #columns > #secondary > #secondary-inner > #chat[collapsed] #show-hide-button,
body[data-mogul-theater-mode] #player-theater-container:hover ~ #columns > #secondary > #secondary-inner > #chat[collapsed] #show-hide-button #Truffle-Full-Theatre-Twitch-Hide-Chat-Icon {
    opacity: 1; }
}
`;
        document.head.appendChild(trufflefulltheatre_style);

        // HTML for SVG Twitch Show/Hide Icon
        const TWITCH_SHOWHIDE_BUTTON_ICON = `<svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="ScIconSVG-sc-1q25cff-1 dSicFr"><g><path d="M4 16V4H2v12h2zM13 15l-1.5-1.5L14 11H6V9h8l-2.5-2.5L13 5l5 5-5 5z"></path></g></svg>`;
        var icon = document.createElement("DIV");
        icon.id = "Truffle-Full-Theatre-Twitch-Hide-Chat-Icon";
        icon.innerHTML = TWITCH_SHOWHIDE_BUTTON_ICON;
        document.querySelector("#show-hide-button button").appendChild(icon);

        // Apply/Remove Full Theatre class on 'Show Chat'/'Hide Chat' button click
        ytdchatbut.addEventListener("click", () => {
            // skip run if Custom Theatre Mode isn't active
            if(!document.querySelector('body[data-mogul-theater-mode]')) { return }
            // Apply/Remove class
            ytdwatchflexy.classList.toggle('truffle-unobtrusive-hide-chat');
            // Failsafe function
            new Promise(resolve => setTimeout(checkFullTheatreStyle,500));
            // Send resize event for YT API video rescaling
            dispatchEvent(new Event('resize'));
        });

        window.truffleFullTheatreApplied = true;
        console.log(`${log_title}: Sucessfully applied`);
    }
    addFullTheatre();
})();
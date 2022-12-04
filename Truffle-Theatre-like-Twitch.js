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
        // Desync Likely on Live Page Change, run fallback function
        new MutationObserver((changes) => { changes.forEach(change => {
                if(change.attributeName.includes('src')) { new Promise(resolve => setTimeout(checkFullTheatreStyle,500)) }});
        }).observe(ytdwatchflexy.querySelector("video"), {attributes : true});


        // Clean up conflicting rules from Truffle Theatre mode
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

/* Theatre mode base style*/
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
   margin-top: 59px; }
/* Position Truffle Pins correctly to adjustments */
body[data-mogul-theater-mode] ytd-watch-flexy[theater] #secondary #chips {
   padding-top: 6px; }
/* Position Truffle Support button to adjustments */
.truffle-embed {
    margin-bottom: 50px !important; }

/* Re-apply Truffle Chat Positioning */
body[data-mogul-theater-mode] #chat.ytd-watch-flexy {
    width: var(--ytd-watch-flexy-sidebar-width);
    top: 0;
    right: 0px;
    position: absolute !important;
    transition: 0.3s ease-out;
    z-index: 3000; }

/* Hidden Chat player width */
body[data-mogul-theater-mode] .truffle-unobtrusive-hide-chat #player-theater-container.ytd-watch-flexy,
body[data-mogul-theater-mode] .truffle-unobtrusive-hide-chat .ytp-chrome-bottom,
body[data-mogul-theater-mode] .truffle-unobtrusive-hide-chat .ytp-chapter-hover-container {
    width: 100%;
    max-width: calc(100vw - var(--ytd-watch-flexy-scrollbar-width)) !important; }
/* Move Chat view to the side */
body[data-mogul-theater-mode] .truffle-unobtrusive-hide-chat #chat {
    transform: translateX(calc(var(--ytd-watch-flexy-sidebar-width))); }

/* Masthead fully invisible */
body[data-mogul-theater-mode] #masthead-container {
    opacity: 0;
    transition: opacity .2s ease; }
body[data-mogul-theater-mode] #masthead-container:hover {
    z-index: 3010; }
/* Extend hover range of masthead */
body[data-mogul-theater-mode] #masthead-container::after {
    height: 3vh;
    width: 100vw;
    top: 56px;
    background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%);
    opacity: 0.6;
    pointer-events: all; }

/* Twitch Show/Chat button */
/* Cleanup Button styles */
body[data-mogul-theater-mode] #chat #show-hide-button * {
    border: none;
    padding: 0;
    background: none; }
body[data-mogul-theater-mode] #chat #show-hide-button button > :not(#Truffle-Full-Theatre-Twitch-Hide-Chat-Icon) {
    height: 0;
    width: 0;
    visibility: hidden; }
/* Chat Open */
/* Button Positioning */
body[data-mogul-theater-mode] #chat #show-hide-button {
    top: 6px;
    right: 50px;
    position: absolute;
    flex: none;
    transition: 0.15s ease-in; }
/* Button Styling */
body[data-mogul-theater-mode] #chat #Truffle-Full-Theatre-Twitch-Hide-Chat-Icon {
    width: 20px;
    height: 20px;
    padding: 6px 8px 8px;
    margin: 0 auto;
    border-radius: 10%;
    fill: white;
    background: none; }
body[data-mogul-theater-mode] #chat #show-hide-button:hover #Truffle-Full-Theatre-Twitch-Hide-Chat-Icon {
    background: #FFF2;
}
/* Move button on chat collaped */
body[data-mogul-theater-mode] #chat[collapsed] {
    overflow: visible; }
body[data-mogul-theater-mode] #chat[collapsed] #show-hide-button {
    top: 9vh;
    right: 415px;
    transform: rotate(180deg);
    opacity: 0; }
/* Tie hover effect of button to player controls */
body[data-mogul-theater-mode] #chat[collapsed] #show-hide-button:hover {
    opacity: 1; }
body[data-mogul-theater-mode] #player-theater-container:hover ~  #columns > #secondary > #secondary-inner > #chat[collapsed] #show-hide-button {
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
            // If truffle theatre mode turned off after class already applied, remove class
            if(document.body.getAttribute('data-mogul-theater-mode') == null && ytdwatchflexy.classList.contains("truffle-unobtrusive-hide-chat")) {
                ytdwatchflexy.classList.remove('truffle-unobtrusive-hide-chat');
                dispatchEvent(new Event('resize'));
                return }
            document.querySelector("#show-hide-button button").appendChild(icon);
            // Apply/Remove class
            ytdwatchflexy.classList.toggle('truffle-unobtrusive-hide-chat');
            // Failsafe function
            new Promise(resolve => setTimeout(checkFullTheatreStyle,500));
            // Send resize event for YT API video rescaling
            dispatchEvent(new Event('resize'));
        });

        console.log(`${log_title}: Sucessfully applied`);
    }
    addFullTheatre();

    //<svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="ScIconSVG-sc-1q25cff-1 dSicFr"><g><path d="M4 16V4H2v12h2zM13 15l-1.5-1.5L14 11H6V9h8l-2.5-2.5L13 5l5 5-5 5z"></path></g></svg>
})();
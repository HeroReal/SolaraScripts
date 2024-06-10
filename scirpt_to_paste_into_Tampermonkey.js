// ==UserScript==
// @name         -
// @namespace    http://tampermonkey.net/
// @version      1.22
// @description  -
// @author       -
// @match        *://*.roblox.com/*
// @downloadURL  https://raw.githubusercontent.com/HeroReal/SolaraScripts/main/scirpt_to_paste_into_Tampermonkey.js
// @updateURL    https://raw.githubusercontent.com/HeroReal/SolaraScripts/main/scirpt_to_paste_into_Tampermonkey.js
// @grant        none
// @icon         https://github.com/HeroReal/SolaraScripts/assets/172195499/6b705cdc-6e5e-461c-9da7-72b53d9414ad
// ==/UserScript==

(function() {
    'use strict';

    // Check if the user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Create and style the frame
    const frame = document.createElement('div');
    frame.style.position = 'fixed';
    frame.style.width = '500px';
    frame.style.height = '400px';
    frame.style.top = '50%';
    frame.style.left = '50%';
    frame.style.transform = 'translate(-50%, -50%) scale(0)';
    frame.style.backgroundColor = '#f0f0f0'; // Light grey background for Neumorphism
    frame.style.boxShadow = '20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff'; // Softer shadows for Neumorphism
    frame.style.transition = 'transform 0.5s ease';
    frame.style.zIndex = '1000';
    frame.style.borderRadius = '20px';
    frame.style.display = 'flex';
    frame.style.flexDirection = 'column';
    frame.style.alignItems = 'center';
    frame.style.justifyContent = 'center';
    frame.style.padding = '20px';
    frame.style.boxSizing = 'border-box';
    frame.style.cursor = 'move';
    document.body.appendChild(frame);

    // Create and style the version text
    const versionText = document.createElement('div');
    versionText.innerText = 'V1.21 - Made By HeroReal';
    versionText.style.position = 'absolute';
    versionText.style.bottom = '10px';
    versionText.style.right = '10px';
    versionText.style.fontSize = '14px';
    versionText.style.background = 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)';
    versionText.style.backgroundClip = 'text';
    versionText.style.color = 'transparent';
    versionText.style.fontWeight = 'bold';
    versionText.style.userSelect = 'none'; // Prevent text selection
    frame.appendChild(versionText);

    // Function to create and style buttons
    function createButton(text, url) {
        const button = document.createElement('button');
        button.innerText = text;
        button.style.padding = '10px 20px';
        button.style.margin = '10px 0';
        button.style.fontSize = '16px';
        button.style.cursor = 'pointer';
        button.style.border = 'none';
        button.style.borderRadius = '10px';
        button.style.backgroundColor = '#f0f0f0'; // Match button background to frame
        button.style.boxShadow = 'inset 5px 5px 10px #d9d9d9, inset -5px -5px 10px #ffffff'; // Inset shadows for button
        button.style.transition = 'transform 0.2s ease';
        button.onmousedown = () => {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                window.location.href = url;
            }, 200); // Redirect after animation completes
        };
        button.onmouseup = () => {
            button.style.transform = 'scale(1)';
        };
        return button;
    }

    // Add buttons to the frame
    const buttons = [
        createButton('King Exploits "MIRKO KING"', 'https://www.kingexploits.com'),
        createButton('Rblx Scirpts (not recommended)', 'https://www.rblxscripts.net'),
        createButton('Rbx Script (not recommended)', 'https://rbxscript.com'),
        createButton('Roblox Scripts "SirMeme"', 'https://robloxscripts.com'),
        createButton('Open Source', 'https://github.com/HeroReal/SolaraScripts')
    ];

    buttons.forEach(button => frame.appendChild(button));

    // Listen for the "P" key press to toggle the frame on desktop
    if (!isMobile) {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'p' || event.key === 'P') {
                toggleFrame();
            }
        });
    }

    // Add dragging functionality
    let isDragging = false;
    let offsetX, offsetY;

    frame.addEventListener('mousedown', (e) => {
        if (!isMobile) {
            isDragging = true;
            offsetX = e.clientX - frame.getBoundingClientRect().left;
            offsetY = e.clientY - frame.getBoundingClientRect().top;
            frame.style.cursor = 'grabbing';
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            frame.style.left = `${e.clientX - offsetX}px`;
            frame.style.top = `${e.clientY - offsetY}px`;
            frame.style.transform = 'translate(0, 0)'; // Reset transform for accurate positioning
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            frame.style.cursor = 'move';
        }
    });

    // Create and style the mobile toggle button
    if (isMobile) {
        const mobileToggleButton = document.createElement('button');
        mobileToggleButton.innerText = 'Open Frame';
        mobileToggleButton.style.position = 'fixed';
        mobileToggleButton.style.bottom = '20px';
        mobileToggleButton.style.right = '20px';
        mobileToggleButton.style.padding = '10px 20px';
        mobileToggleButton.style.fontSize = '16px';
        mobileToggleButton.style.cursor = 'pointer';
        mobileToggleButton.style.border = 'none';
        mobileToggleButton.style.borderRadius = '10px';
        mobileToggleButton.style.backgroundColor = '#f0f0f0'; // Match button background to frame
        mobileToggleButton.style.boxShadow = '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff'; // Soft shadows for button
        mobileToggleButton.style.transition = 'transform 0.2s ease';
        mobileToggleButton.onmousedown = () => {
            mobileToggleButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                toggleFrame(true);
            }, 200); // Open frame after animation completes
        };
        mobileToggleButton.onmouseup = () => {
            mobileToggleButton.style.transform = 'scale(1)';
        };
        document.body.appendChild(mobileToggleButton);
    }

    // Function to toggle frame visibility
    function toggleFrame(show) {
        const isVisible = frame.style.transform === 'translate(-50%, -50%) scale(1)';
        frame.style.transform = isVisible ? 'translate(-50%, -50%) scale(0)' : 'translate(-50%, -50%) scale(1)';
        versionText.style.display = isVisible ? 'none' : 'block'; // Show/hide version text
    }

    // Create and style the close button for the frame
    if (isMobile) {
        const closeButton = document.createElement('button');
        closeButton.innerText = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.padding = '5px 10px';
        closeButton.style.fontSize = '14px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '5px';
        closeButton.style.backgroundColor = '#f0f0f0'; // Match button background to frame
        closeButton.style.boxShadow = 'inset 5px 5px 10px #d9d9d9, inset -5px -5px 10px #ffffff'; // Inset shadows for button
        closeButton.style.transition = 'transform 0.2s ease';
        closeButton.onmousedown = () => {
            closeButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                toggleFrame(false);
            }, 200); // Close frame after animation completes
        };
        closeButton.onmouseup = () => {
            closeButton.style.transform = 'scale(1)';
        };
        frame.appendChild(closeButton);
    }
})();

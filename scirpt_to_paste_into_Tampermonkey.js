// ==UserScript==
// @name         Neumorphic Movable Frame with Buttons for Roblox
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Opens a neumorphic frame with animation on "P" key press, containing multiple buttons that link to websites. The frame is movable, buttons have smooth click animations, and supports mobile with a dedicated toggle button and close button inside the frame.
// @author       YourName
// @match        *://*.roblox.com/*
// @updateURL    https://raw.githubusercontent.com/HeroReal/SolaraScripts/main/scirpt_to_paste_into_Tampermonkey.js
// @downloadURL  https://raw.githubusercontent.com/HeroReal/SolaraScripts/main/scirpt_to_paste_into_Tampermonkey.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

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
            setTimeout(() => window.location.href = url, 200); // Redirect after animation completes
        };
        button.onmouseup = () => button.style.transform = 'scale(1)';
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

    // Listen for the "P" key press to toggle the frame
    document.addEventListener('keydown', (event) => {
        if (event.key === 'p' || event.key === 'P') {
            if (frame.style.transform === 'translate(-50%, -50%) scale(0)') {
                frame.style.transform = 'translate(-50%, -50%) scale(1)';
            } else {
                frame.style.transform = 'translate(-50%, -50%) scale(0)';
            }
        }
    });

    // Add dragging functionality
    let isDragging = false;
    let offsetX, offsetY;

    frame.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - frame.getBoundingClientRect().left;
        offsetY = e.clientY - frame.getBoundingClientRect().top;
        frame.style.cursor = 'grabbing';
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
})();

function centralize() {
    chrome.windows.getLastFocused(
        {populate: false}, 
        function(currentWindow) {
            chrome.system.display.getInfo(function(info) {
                if (info && info.length > 0) {
                    const display = getClosestDisplayForWindowPosition(info, currentWindow);
                    const displayWidth = display.workArea.width;
                    const displayHeight = display.workArea.height;
        
                    const toBeWidth = Math.round((displayWidth / 4) * 3);
                    const leftPos = display.workArea.left + Math.round((displayWidth - toBeWidth) / 2);

                    const toBeHeight = displayHeight - 20;
                    const topPos = display.workArea.top + 10;

                    chrome.windows.update(
                        currentWindow.id, 
                        { 
                            width: toBeWidth,
                            height: toBeHeight,
                            left: leftPos,
                            top: topPos,
                            state: 'normal'
                        });
                }
            });
        }
    );
}

function getClosestDisplayForWindowPosition(displays, window) {
    if (displays.length == 1) {
        return displays[0];
    } 

    const windowPosition = { x: window.top, y: window.left };

    let points = [];

    for (let i = 0; i < displays.length; i++) {
        points.push({ 
            x: displays[i].workArea.top, 
            y: displays[i].workArea.left,
            display: displays[i]
        });
    }

    closest = points.reduce((a, b) => distance(a, windowPosition) < distance(b, windowPosition) ? a : b);

    return closest.display;
}

function distance(p, point) {
    return Math.sqrt(Math.pow(point.x - p.x, 2) + Math.pow(point.y - p.y, 2))
}

chrome.commands.onCommand.addListener((command) => {
    if (command === "centralize") {
        centralize();
    }
});

chrome.action.onClicked.addListener((tab) => {
    centralize();
});
function centralize() {
    chrome.windows.getLastFocused(
        {populate: false}, 
        function(currentWindow) {
            chrome.system.display.getInfo(function(info) {
                if (info && info.length > 0) {
                    const display = info[0];
                    const displayWidth = display.workArea.width;
                    const displayHeight = display.workArea.height;
        
                    const toBeWidth = Math.round((displayWidth / 4) * 3);
                    const leftPos = Math.round((displayWidth - toBeWidth) / 2);

                    const toBeHeight = displayHeight - 20;
                    const topPos = display.workArea.top + 10;

                    chrome.windows.update(
                        currentWindow.id, 
                        { 
                            width: toBeWidth,
                            height: toBeHeight,
                            left: leftPos,
                            top: topPos
                        });
                }
            });
        }
    );
}

chrome.commands.onCommand.addListener((command) => {
    if (command === "centralize") {
        centralize();
    }
});

chrome.action.onClicked.addListener((tab) => {
    centralize();
});
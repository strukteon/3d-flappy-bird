(() => {
    document.getElementsByClassName("button")[0].onclick = click;

    const elems = {
        gameScene: document.getElementsByClassName("game-scene")[0],
        overlay: document.getElementsByClassName("overlay")[0],
        score: document.getElementsByClassName("score")[0],
        player: document.getElementsByClassName("player")[0],
        pipes: document.getElementsByClassName("pipes")[0],
        bottomPipe: document.getElementsByClassName("bottom")[0],
        topPipe: document.getElementsByClassName("top")[0],
    }

    let gameRunning = false;
    let score = 0;

    let playerGravity = -.03;
    let playerSpeedY = 0;
    let playerY = 50;
    let playerX = 10 + 20 / 2;

    let pipesOffsetY = 0;
    let pipesX = -20;
    let pipesSpeedX = -.5;
    let pipesPassedPlayer = false;

    let recentTimestamp;
    function draw(timestamp) {
        if (recentTimestamp === undefined) recentTimestamp = timestamp;
        const relTime = gameRunning ? (timestamp - recentTimestamp) / 7 : 0;

        playerSpeedY += playerGravity * relTime;
        playerY = Math.max(0, playerY + playerSpeedY * relTime);

        elems.player.style.setProperty("--pos-y", `${playerY}px`)
        elems.player.style.setProperty("--rot", `${-playerSpeedY * 10}deg`)

        pipesX = pipesX + pipesSpeedX * relTime;
        if (pipesX <= -20) {
            pipesX = 110;
            pipesPassedPlayer = false;
            pipesOffsetY = Math.floor(Math.random() * 60) - 30;
            elems.pipes.style.setProperty("--pos-y", `${pipesOffsetY}px`)
        }

        elems.pipes.style.setProperty("--pos-x", `${pipesX}px`)


        if (pipesX < playerX && ! pipesPassedPlayer) {
            pipesPassedPlayer = true;
            score++;
            elems.score.innerText = score;
        }

        if (gameRunning &&
            (playerY === 0
                || divsOverlapping(elems.player, elems.topPipe)
                || divsOverlapping(elems.player, elems.bottomPipe))) {
            console.log("game over")
            gameRunning = false
            elems.overlay.innerText = "Game Over";
            elems.gameScene.classList.add("paused");
        }

        recentTimestamp = timestamp;
        window.requestAnimationFrame(draw)
    }
    window.requestAnimationFrame(draw)

    function click() {
        if (!gameRunning) {
            gameRunning = true;
            elems.gameScene.classList.remove("paused");
            score = 0;
            playerX = 10 + 20 / 2;
            playerY = 50;
            playerSpeedY = 1;
            pipesX = -20;
            pipesPassedPlayer = false;
            elems.score.innerText = score;
        } else {
            playerSpeedY = 1.4;
            console.log(playerSpeedY)
        }
    }

    console.log(elems.topPipe.getBoundingClientRect())
    console.log(elems.bottomPipe.getBoundingClientRect())
    console.log(elems.player.getBoundingClientRect())

    function divsOverlapping(div1, div2) {
        let d1 = div1.getBoundingClientRect();
        let d2 = div2.getBoundingClientRect();
        let ox = Math.abs(d1.left - d2.left) < (d1.left < d2.left ? d2.width : d1.width);
        let oy = Math.abs(d1.bottom - d2.bottom) < (d1.bottom < d2.bottom ? d2.height : d1.height);
        return ox && oy;
    }
})();
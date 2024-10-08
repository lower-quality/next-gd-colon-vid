fetch("https://gdcolon.com/nextvideo.json?t=" + Date.now()).then(res => res.json()).then(data => {
    if (data.video) { // yes video rn
        document.getElementById("yesVid").style.removeProperty("display")
        if (data.info) document.getElementById("extraVidInfo").innerHTML = data.info
        let videoID = data.video.split("?")[0].split("/").at(-1).split("=").at(-1)
        document.getElementById("videoLink").setAttribute("src", videoLink = "https://www.youtube.com/embed/" + videoID)
    }

    else if (!data.active) { // no video rn
        document.getElementById("noVid").style.removeProperty("display")
        if (data.info) document.getElementById("extraInfo").innerHTML = data.info
    }

    else {
        document.getElementById("main").style.removeProperty("display")
        addPercent("scripting", data.scripting || 0)
        addPercent("recording", data.recording || 0)
        addPercent("editing", data.editing || 0)

        if (data.info) document.getElementById("infoText").innerHTML = data.info
        else document.getElementById("infoBox").style.display = "none"

        let dateStr = new Date(data.updated).toLocaleString([], { dateStyle: "full", timeStyle: "short" })
        let timeZone = new Date().toLocaleDateString(undefined, { day: '2-digit', timeZoneName: 'short' }).substring(4)
        document.getElementById("lastUpdated").textContent = `${dateStr} (${timeZone})`
    }

    document.getElementById("loading").style.display = "none"
})

function addPercent(key, val) {
    let box = `.barBox[section="${key}"]`
    if (val == "hidden") return document.querySelector(box).style.display = "none"

    let text = document.querySelector(`${box} .progressBar h2`)
    let bar = document.querySelector(`${box} .barProgress`)

    if (val == "wip") {
        text.classList.add("inProgress")
        bar.classList.add("inProgress")
        return text.textContent = "In progress"
    }

    text.textContent = Math.floor(val) + "%"
    bar.style.width = (val + "%")
}
const { ipcRenderer } = require('electron')

const Timer = require('timer.js')

function startWork() {
  let workTimer = new Timer({
    tick: 1,
    ontick(ms) {
      updateTime(ms)
    },
    onend() {
      notification()
    },
  })
  workTimer.start(10)
}

function updateTime(ms) {
  let timerContainer = document.getElementById('timer-container')
  timerContainer.innerText = ms
}

async function notification() {
  let res = await ipcRenderer.invoke('work-notification')
  if (res === 'rest') {
    setTimeout(() => {
      alert('休息一下')
    }, 5000)
  } else if (res === 'work') {
    startWork()
  }
}

startWork()

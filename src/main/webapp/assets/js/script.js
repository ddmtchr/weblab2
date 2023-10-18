const tableBody = document.querySelector('#result-table tbody')
const xError = document.querySelector('#x-error-label')
const yError = document.querySelector('#y-error-label')
const rError = document.querySelector('#r-error-label')
const canvasError = document.querySelector('#canvas-error-label')
const xField = document.querySelector('#x-input')
const rField = document.querySelector('#r-input')
const mainForm = document.querySelector('#main-form')
const clearButton = document.querySelector('#clear-button')
const themeToggleButton = document.querySelector('#theme-toggle-button')
const uglyThemeButton = document.querySelector('#ugly-theme-button')
const modeSelectButton = document.querySelector('#mode-selector')

rField.value = getSavedValue('r-input')

const drawer = new Drawer(false)
getPoints()
    .then(() => {
        drawer.drawGraph()
        drawer.drawPoints()
    })

mainForm.addEventListener('submit', async function (event) {
    event.preventDefault()

    const x = xField.value
    const y = document.querySelector('input[name="y"]:checked').value
    const checkboxGroup = document.querySelectorAll('.choice-group .chb:checked')
    const r = rField.value
    clearErrorLabels()

    if (isNumeric(x) && parseFloat(x) > -5 && parseFloat(x) < 3 && checkboxGroup.length === 1 && r !== '') {
        try {
            const response = await sendRequest(x, y, r)
            await processResponse(response)
        } catch (e) {
            console.log(e)
        }
    } else {
        if (!(isNumeric(x) && parseFloat(x) > -5 && parseFloat(x) < 3)) {
            xError.textContent = 'X must be a float between -5 and 3'
        }
        if (checkboxGroup.length !== 1) {
            yError.textContent = 'Y must be selected'
        }
        if (r === '') {
            rError.textContent = 'R must be selected'
        }
    }
})

drawer.canvas.addEventListener('click', async function (event) {
    const r = rField.value
    clearErrorLabels()
    if (r !== '') {
        const scaledX = drawer.scaleX(event.x, r)
        const scaledY = drawer.scaleY(event.y, r)
        if (parseFloat(scaledX) > -5 && parseFloat(scaledX) < 3) {
            try {
                const response = await sendRequest(scaledX, scaledY, r)
                await processResponse(response)
            } catch (e) {
                console.log(e)
            }
        } else {
            canvasError.textContent = 'X is out of range (-5; 3)'
        }
    } else {
        canvasError.textContent = 'Select R to set point by click'
    }
})

clearButton.addEventListener('click', async function (event) {
    try {
        event.preventDefault()
        drawer.lastPointIsDrawn = false
        drawer.points = []
        drawer.drawGraph()

        const response = await sendRequest(0, 0, 0, 0)
        if (response.ok) {
            fillTable(null)
        }
    } catch (e) {
        console.log(e)
    }
})

themeToggleButton.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme')
    document.body.classList.remove('ugly-theme')

    if (document.body.classList.contains('dark-theme')) {
        themeToggleButton.textContent = 'To the light side'
    } else {
        themeToggleButton.textContent = 'To the dark side'
    }

    drawer.drawGraph()
    if (drawer.drawAllPoints) {
        drawer.drawPoints()
    } else if (drawer.lastPointIsDrawn) {
        drawer.drawPoint(drawer.lastPoint, drawer.getPointColor())
    }
})

uglyThemeButton.addEventListener('click', function () {
    document.body.classList.toggle('ugly-theme')

    drawer.drawGraph()
    if (drawer.drawAllPoints) {
        drawer.drawPoints()
    } else if (drawer.lastPointIsDrawn) {
        drawer.drawPoint(drawer.lastPoint, drawer.getPointColor())
    }
})

modeSelectButton.addEventListener('click', function () {
    drawer.drawAllPoints = !drawer.drawAllPoints
    drawer.drawGraph()
    if (drawer.drawAllPoints) {
        modeSelectButton.textContent = 'All points'
        drawer.drawPoints()
    } else {
        modeSelectButton.textContent = 'Last point'
        if (drawer.lastPointIsDrawn) drawer.drawPoint(drawer.lastPoint, drawer.getPointColor())
    }
})

xField.addEventListener('input', function () {
    const input = xField.value
    if (isNumeric(input) || input.trim() === '') {
        if (-5 < input && input < 3) {
            xField.classList.remove('invalid')
        } else {
            xField.classList.add('invalid')
        }
    } else {
        xField.classList.add('invalid')
    }
})

rField.addEventListener('change', function () {
    saveValue(rField)
    if (rField.value !== '') {
        for (const point of drawer.points) {
            point['r'] = rField.value
        }
        drawer.drawGraph()
        drawer.drawPoints()
    }
})

async function getPoints() {
    const startResponse = await sendRequest('all')
    await processResponse(startResponse)
}

async function sendRequest(...args) {
    const params = {
        method: 'POST',
        body: prepareParams(args),
    }
    return await fetch('/weblab2/controllerServlet', params)
}

async function processResponse(response) {
    if (response.ok) {
        const responseDataJSON = await response.text() // JSON
        const responseObject = JSON.parse(responseDataJSON) // Object array
        if (responseObject instanceof Array) {
            for (const point of responseObject) {
                point['r'] = rField.value
                processPoint(point)
            }
        } else {
            const point = {
                x: responseObject['x'],
                y: responseObject['y'],
                r: responseObject['r'],
            }
            processPoint(point)
            fillTable(responseObject)
        }
    } else {
        console.log(`https://http.cat/${response.status}`)
        window.location.href = `https://http.cat/${response.status}`
    }
}

function processPoint(point) {
    if (!drawer.drawAllPoints) {
        drawer.drawGraph()
    }
    drawer.drawPoint(point, drawer.getPointColor())
    drawer.points.push(point)
}

function fillTable(resultsObjects) {
    if (resultsObjects === null) tableBody.innerHTML = ''
    else {
        const newRow = tableBody.insertRow()
        const resultCell = newRow.insertCell(0)
        const xCell = newRow.insertCell(1)
        const yCell = newRow.insertCell(2)
        const rCell = newRow.insertCell(3)
        const execTimeCell = newRow.insertCell(4)
        const currentTimeCell = newRow.insertCell(5)
        resultCell.innerHTML = resultsObjects['result']
        xCell.innerHTML = +resultsObjects['x']
        yCell.innerHTML = +resultsObjects['y']
        rCell.innerHTML = +resultsObjects['r']
        execTimeCell.innerHTML = resultsObjects['execTime']
        currentTimeCell.innerHTML = resultsObjects['currentTime']
    }
}

function isNumeric(str) {
    return /^\s*[+-]?([0-9]*[.])?[0-9]+\s*$/.test(str)
}

function prepareParams(args) {
    const requestData = new URLSearchParams()
    requestData.append('x', args[0])
    requestData.append('y', args[1])
    requestData.append('r', args[2])
    if (args.length > 3) requestData.append('clear', '')
    if (args.length === 1) requestData.append('all', '')
    return requestData
}

function clearErrorLabels() {
    xError.textContent = ''
    yError.textContent = ''
    rError.textContent = ''
    canvasError.textContent = ''
}

function saveValue(el) {
    localStorage.setItem(el.id, el.value)
}

function getSavedValue(id) {
    if (!localStorage.getItem(id)) {
        return ''
    }
    return localStorage.getItem(id)
}

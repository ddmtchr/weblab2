const tableBody = document.querySelector('#result-table tbody')
const yError = document.querySelector('#y-error-label')
const rError = document.querySelector('#r-error-label')
const yField = document.querySelector('#y-input')
const mainForm = document.querySelector('#main-form')
const clearButton = document.querySelector('#clear-button')
const themeToggleButton = document.querySelector('#theme-toggle-button')
const uglyThemeButton = document.querySelector('#ugly-theme-button')

const drawer = new Drawer(false)
drawer.drawGraph(false)
fillTable(JSON.parse(getFromLocalStorage('previousResults')))

mainForm.addEventListener('submit', async function (event) {
    event.preventDefault()

    const y = yField.value
    const checkboxGroup = document.querySelectorAll('.checkbox-group .chb:checked')

    if (isNumeric(y) && parseFloat(y) >= -5 && parseFloat(y) <= 5 && checkboxGroup.length === 1) {
        try {
            const params = {
                method: 'POST',
            }
            const requestData = new FormData(this)
            const response = await fetch('/weblab2/controllerServlet?' + new URLSearchParams(requestData),
                params)

            if (response.ok) {
                const responseDataJSON = await response.text() // JSON
                const responseObject = JSON.parse(responseDataJSON) // Object array

                const point = {
                    x: responseObject['x'],
                    y: responseObject['y'],
                    r: responseObject['r'],
                }

                const previousResultsJSON = getFromLocalStorage('previousResults') // JSON
                const previousResults = JSON.parse(previousResultsJSON) // Object array
                previousResults.push(responseObject)

                localStorage.setItem('previousResults', JSON.stringify(previousResults))

                drawer.drawPoint(point, getComputedStyle(document.body).getPropertyValue('--canvas-point-color'))
                fillTable(previousResults)

                yError.textContent = ''
                rError.textContent = ''
            } else {
                console.log(`https://http.cat/${response.status}`)
                window.location.href = `https://http.cat/${response.status}`
            }
        } catch (e) {
            console.log(e)
        }
    } else if (!(isNumeric(y) && parseFloat(y) >= -5 && parseFloat(y) <= 5)) {
        yError.textContent = 'Y must be a float between -5 and 5'
    } else if (checkboxGroup.length !== 1) {
        rError.textContent = 'Exactly 1 checkbox should be selected'
    }
})

clearButton.addEventListener('click', function (event) {
    event.preventDefault()
    drawer.lastPointIsDrawn = false
    drawer.drawGraph(true)
    localStorage.clear()
    fillTable([])
})

themeToggleButton.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme')
    document.body.classList.remove('ugly-theme')

    if (document.body.classList.contains('dark-theme')) {
        themeToggleButton.textContent = "To the light side"
    } else {
        themeToggleButton.textContent = "To the dark side"
    }

    drawer.drawGraph(true)
    if (drawer.lastPointIsDrawn) {
        drawer.drawPoint(drawer.lastPoint, getComputedStyle(document.body).getPropertyValue('--canvas-point-color'))
    }
})

uglyThemeButton.addEventListener('click', function () {
    document.body.classList.toggle('ugly-theme')

    drawer.drawGraph(true)
    if (drawer.lastPointIsDrawn) {
        drawer.drawPoint(drawer.lastPoint, getComputedStyle(document.body).getPropertyValue('--canvas-point-color'))
    }
})

yField.addEventListener('input', function () {
    const input = yField.value
    if (isNumeric(input) || input.trim() === '') {
        if (-5 < input && input < 5) {
            yField.classList.remove('invalid')
        } else {
            yField.classList.add('invalid')
        }
    } else {
        yField.classList.add('invalid')
    }
})

function fillTable(resultsObjects) {
    tableBody.innerHTML = ''
    for (const result of resultsObjects) {
        const newRow = tableBody.insertRow()
        const resultCell = newRow.insertCell(0)
        const xCell = newRow.insertCell(1)
        const yCell = newRow.insertCell(2)
        const rCell = newRow.insertCell(3)
        const execTimeCell = newRow.insertCell(4)
        const currentTimeCell = newRow.insertCell(5)
        resultCell.innerHTML = result['result']
        xCell.innerHTML = +result['x']
        yCell.innerHTML = +result['y']
        rCell.innerHTML = +result['r']
        execTimeCell.innerHTML = result['execTime']
        currentTimeCell.innerHTML = result['currentTime']
    }
}

function isNumeric(str) {
    //return !isNaN(parseFloat(str)) && isFinite(str)
    return /^\s*[+-]?([0-9]*[.])?[0-9]+\s*$/.test(str)
}

function getFromLocalStorage(key) {
    return localStorage.getItem(key) === null ? JSON.stringify([]) : localStorage.getItem(key)
}

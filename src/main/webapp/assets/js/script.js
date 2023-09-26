const tableBody = document.querySelector('#result-table tbody')
const xError = document.querySelector('#x-error-label')
const yError = document.querySelector('#y-error-label')
const rError = document.querySelector('#r-error-label')
const xField = document.querySelector('#x-input')
const rField = document.querySelector('#r-input')
const mainForm = document.querySelector('#main-form')
const clearButton = document.querySelector('#clear-button')
const themeToggleButton = document.querySelector('#theme-toggle-button')
const uglyThemeButton = document.querySelector('#ugly-theme-button')

const drawer = new Drawer(false)
drawer.drawGraph(false)
fillTable(JSON.parse(getFromLocalStorage('previousResults')))

mainForm.addEventListener('submit', async function (event) {
    event.preventDefault()

    const x = xField.value
    const checkboxGroup = document.querySelectorAll('.choice-group .chb:checked')
    const r = rField.value

    xError.textContent = ''
    yError.textContent = ''
    rError.textContent = ''
    if (isNumeric(x) && parseFloat(x) > -5 && parseFloat(x) < 3 && checkboxGroup.length === 1 && r !== '') {
        try {
            const params = {
                method: 'POST',
            }
            const requestData = new FormData(this)
            const response = await fetch('/weblab2/controllerServlet?' + new URLSearchParams(requestData),
                params) // todo args

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
            } else {
                console.log(`https://http.cat/${response.status}`)
                window.location.href = `https://http.cat/${response.status}`
            }
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

// yField.addEventListener('input', function () {
//     const input = yField.value
//     if (isNumeric(input) || input.trim() === '') {
//         if (-5 < input && input < 5) {
//             yField.classList.remove('invalid')
//         } else {
//             yField.classList.add('invalid')
//         }
//     } else {
//         yField.classList.add('invalid')
//     }
// })

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

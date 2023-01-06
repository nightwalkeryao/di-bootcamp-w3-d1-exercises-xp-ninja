"use strict"

// Exercise 1 : Calendar

// 1. Create a function called createCalendar(year, month)
// 2. The function should create a calendar for the given year/month.
// 3. The calendar should be a table, where a week is <tr>, and a day is <td>. The table top should be <th> with weekday names: the first day should be Monday, and so on until Sunday.

/**
 * @abstract Create a calendar for given year and month and add it to the page
 * @param {number} year as YYYY
 * @param {number} month as MM
 * @returns {undefined}
 */
function createCalendar(year, month) {
    let table = document.createElement('table')
    // Create table header for weekday names
    table.appendChild(document.createElement('thead'))
    let headTr = document.createElement('tr')
    let days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
    days.forEach(d => {
        let th = document.createElement('th')
        th.textContent = d
        headTr.appendChild(th)
    })
    table.querySelector('thead').appendChild(headTr)
    // Build a list of all the days in the given month
    let date = new Date(year, month, 0),
        daysCount = date.getDate(),
        dates = []

    for (let day = 1; day <= daysCount; day++) {
        date.setDate(day)
        dates.push(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
    }

    let cal = [] // Calendar
    let week = []
    week.length = 7
    week.fill(null)
    dates.forEach(d => {
        let j = d.getDay()
        if (j === 1) { // Monday
            // Start a new week on every monday
            week = []
            week.length = 7
            week.fill(null)
        }
        week[(j - 1 + 7) % 7] = d
        if (j === 0 || d.getDate() === daysCount) // Sunday or end of month
            // Sunday is the last day of the week
            cal.push(week)
    })

    // Add weeks as rows (tr) and days as columns (td) to the table
    table.appendChild(document.createElement('tbody'))
    let today = new Date()
    cal.forEach(w => {
        let tr = document.createElement('tr')
        w.forEach(d => {
            let td = document.createElement('td')
            td.innerHTML = d === null ? '&middot;' : d.getDate().toString()
            if (d !== null && d.toDateString() == today.toDateString())
                td.classList.add('today') // Highlight today on the calendar
            tr.appendChild(td)
        })
        table.querySelector('tbody').appendChild(tr)
    })

    // Add the calendar table to the document
    let firstEl = document.body.children[0]
    firstEl.parentNode.insertBefore(table, firstEl)
    // Add some styles to the calendar
    let link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = './style.css'
    document.head.appendChild(link)
}

createCalendar(2023, 1)

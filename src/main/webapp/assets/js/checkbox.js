const checkboxes = document.querySelectorAll('.chb')
checkboxes.forEach((chbx) => {
    chbx.onchange = () => {
        this.checked = !this.checked
        checkboxes.forEach((cb) => {
            if (cb !== chbx) cb.checked = false
        })
    }
})
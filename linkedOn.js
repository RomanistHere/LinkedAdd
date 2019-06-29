'use strict';

var enabled = true
var canReturn
watchPopUp()

async function run() {
    if (!enabled) return false

    let searchResults = document.querySelectorAll('.search-result__occluded-item')

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    let disabled = false

    const start = async () => {
        await asyncForEach(searchResults, async (item) => {
            if (disabled) return

            let fullName = item.querySelector('.actor-name').textContent
            let name = fullName.split(' ')[0]
            let surname = fullName.split(' ')[1]
            console.log(name)

            let button = item.querySelector('.search-result__action-button')
            let textButton = button ? button.textContent.trimStart().trimEnd() : null

            if (textButton == 'Connect') {
                button.click()
                await connectWithMessage()
                document.querySelector('.artdeco-button--3.mr1').click()
                document.querySelector('.send-invite__custom-message').value = 'Hello ' + name + '! I would like to add you in my network. Also, I am sorry if I did not print your name properly. I am developing tool for linkedin, that automatically connects people from search page and this message have been written programmatically. So I could mess it up. Let me know if you interested in this tool or we can just have small chat. Thank you and have a nice day!'
                document.querySelector('.artdeco-button--3.ml1').click()
            }

            // disabled = true
        })
    }

    await start()
    console.log('___________FINISHED__________')
    check()
}

function check() {
    console.log('CHECKING')
    let searchResults = document.querySelectorAll('.search-result__occluded-item')
    for (let i = 0; i <= searchResults.length; i++) {
        let button = searchResults[i] ? searchResults[i].querySelector('.search-result__action-button') : null
        let textButton = button ? button.textContent.trimStart().trimEnd() : null
        if (textButton == 'Connect') {
            console.log('rerun')
            run()
            break
            return
        }
    }
    console.log('good')
    document.querySelector('.artdeco-pagination__button--next').click()
}

async function connectWithMessage() {
    canReturn = false
    watchPopUp()
    const freeze = m => new Promise(r => setTimeout(r, m))

    async function canWeReturn() {
        if (!canReturn) {
            // console.log('POPUP CHANGED - BEFORE')
            await freeze(200)
            await canWeReturn()
        }
        else {
            // console.log('POPUP CHANGED - AFTER')
            await freeze(200)
            return
        }
    }

    await canWeReturn()
    return
}

function watchPopUp () {
    let popUp = document.getElementById('li-modal-container')    

    let dom_observer = new MutationObserver(function(mutation) {
        // console.log('POPUP CHANGED')
        canReturn = true
        dom_observer.disconnect()
    })

    dom_observer.observe(popUp, {
        attributeOldValue: true,
        childList: true,
    })
}

function observeSearchCont() {
    let searchCont = document.querySelector('.authentication-outlet').children[0]

    let dom_observer = new MutationObserver(function(mutation) {
        mutation.forEach(function(mutation) {
            if (mutation.oldValue) {
                console.log('PAGE RELOADED')
                checkIfContReady()
            }
        })
    })

    dom_observer.observe(searchCont, { 
        attributes: true,
        attributeFilter: ['class'],
        attributeOldValue: true,
    })

    checkIfContReady()
}

observeSearchCont()

function checkIfContReady() { 
    window.scrollTo(0, document.body.scrollHeight)      
    try {
        let searchResults = document.querySelectorAll('.search-result__occluded-item')
        searchResults.forEach(item => {
            let button = item.querySelector('.search-result__action-button')
            let fullName = item.querySelector('.actor-name').textContent
            // let textButton = button.textContent
        })
        console.log('good')
        run()
    } catch {
        setTimeout(checkIfContReady, 1000)
    }
}
'use strict';

var enabled = true
var canReturn
watchPopUp()

function run() {
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
            let textButton = button.textContent.trimStart().trimEnd()
            if (textButton == 'Connect') {
                button.click()
                await connectWithMessage()
                document.querySelector('.artdeco-button--3.mr1').click()
                document.querySelector('.send-invite__custom-message').value = 'Hello ' + name + '! I would like to have you in my network, thank you and have a nice day!'
                document.querySelector('.artdeco-button--3.ml1').click()
            }

            disabled = true
        })
    }

    start()
}

async function connectWithMessage() {
    canReturn = false
    watchPopUp()
    const freeze = m => new Promise(r => setTimeout(r, m))

    async function canWeReturn() {
        if (!canReturn) {
            console.log('POPUP CHANGED - BEFORE')
            await freeze(200)
            await canWeReturn()
        }
        else {
            console.log('POPUP CHANGED - AFTER')
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
        console.log('POPUP CHANGED')
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
                setTimeout(run, 1000);
            }
        })
    })

    dom_observer.observe(searchCont, { 
        attributes: true,
        attributeFilter: ['class'],
        attributeOldValue: true,
    })

    run()
}

observeSearchCont()
'use strict';

var enabled = true;

function run() {
    // console.log(enabled)
    if (!enabled) return false

    // let elements = document.querySelectorAll(".search-result__action-button")

    // for (let i=0; i < elements.length; i++) {

    //     let element = elements[i]

    //     element.click()

    //     if (document.querySelector('.artdeco-button--3.ml1')) {
    //         document.querySelector('.artdeco-button--3.ml1').click()
    //         setTimeout(function() {
    //             document.querySelector('.artdeco-button--3.ml1').click()
    //             document.querySelector('.artdeco-pagination__button--next').click()
    //         }, 1000);
    //     }
        
    // }

    // document.querySelector('.artdeco-pagination__button--next').click()
    console.log('uploaded')
}

observeSearchCont()

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
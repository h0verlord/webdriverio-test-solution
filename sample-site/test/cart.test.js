var cart = require('./objects/cart.page.js');

describe('Cart Functionality', () => {

    beforeEach(() => {
        browser.url('/product-page.html')
    })

    it('should only let you buy after setting quantity', () => {        
        expect(cart.btn.isEnabled(), 'buy Now should be disabled to begin.').to.be.false
        cart.qty.setValue(10)
        expect(cart.btn.isEnabled(), 'after setting Qty, buy now should be enabled.').to.be.true
    })

    describe('checkout process', () => {
        beforeEach(() => {
            cart.qty.setValue(10)
            cart.btn.click()
        })

        it('should disable buy now button during processing', () => {
            expect(cart.btn.isEnabled(), 'buy now should be disabled after clicking').to.be.false
            expect(cart.btn.getText(), 'Verify buy now text has changed').to.contain('Purchasing')
        })

        it('should show a thank you message with cart.qty and type', ()=>{

            cart.thankYou.waitForExist(5000)
            expect(cart.thankYou.getText()).to.contain('10 T-800 Model 101')
        })

        it('should clear input after completion', ()=>{
            cart.qty.waitForValue(3000,true)
            //browser.waitForValue(cart.qty, 3000, true)
        })

        it('should hide thank you message after clicking close button', ()=>{
            cart.thankYou.waitForExist(5000)
            $('.close-button').click()
            cart.thankYou.waitForVisible(null, true)
        })
    })
})
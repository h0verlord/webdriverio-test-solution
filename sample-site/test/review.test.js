var reviewForm = require('./objects/reviewForm.page')

describe('The product review form', () => {
    beforeEach(() => {
        browser.url('/product-page.html')
    })

    it('should add a review when submitted properly', () => {
        reviewForm.submit()
        var hasReview = browser.isExisting('.comment=This is a review')
        expect(hasReview, 'comment is non-existing').to.be.true
    })

    it('should show an error message if the input is wrong', () => {

        var isErrorShowing = reviewForm.reviewError.isVisible()
        expect(isErrorShowing).to.be.false;
        reviewForm.submit()
        var isErrorShowing = reviewForm.reviewError.isVisible()
        expect(isErrorShowing).to.be.true;

    })

    it('should hide the error when input is corrected', () => {
        reviewForm.submit()
        var isErrorShowing = reviewForm.emailError.isVisible()
        expect(isErrorShowing).to.be.true;

        reviewForm.submit('email@example.com')
        var isErrorShowing = reviewForm.emailError.isVisible()
        expect(isErrorShowing).to.be.false;

        browser.setValue('#review-content', 'valid content')
        reviewForm.submit()

        var isMainErrorShowing = reviewForm.formError.isVisible()
        var isContentErrorShowing = reviewForm.reviewError.isVisible()
        expect(isMainErrorShowing).to.be.false;
        expect(isContentErrorShowing).to.be.false;
    })

    it('should focus on the first invalid input field on error', ()=>{
        var emailHasFocus = reviewForm.email.hasFocus()
        expect(emailHasFocus, 'email should now have focus').to.be.false

        reviewForm.submit()
        var emailHasFocus = reviewForm.email.hasFocus()
        expect(emailHasFocus, 'email should not have focus').to.be.true

        reviewForm.submit('valid@example.com')
        var contentHasFocus = reviewForm.content.hasFocus()
        expect(contentHasFocus, 'content should now have focus').to.be.false
    })
})
const reviewForm = require('./objects/reviewForm.page')

describe('The product review form', () => {
  beforeEach(() => {
    browser.url('/product-page.html')
  })

  it('should add a review when submitted properly', () => {
    reviewForm.submit('email@email.com', 'This is a review')
    const hasReview = browser.isExisting('.comment=This is a review')
    expect(hasReview, 'comment is non-existing').to.be.true
  })

  it('should show an error message if the input is wrong', () => {
    let isErrorShowing = reviewForm.reviewError.isVisible()
    expect(isErrorShowing).to.be.false
    reviewForm.submit()
    isErrorShowing = reviewForm.reviewError.isVisible()
    expect(isErrorShowing).to.be.true
  })

  it('should hide the error when input is corrected', () => {
    reviewForm.submit()
    let isErrorShowing = reviewForm.emailError.isVisible()
    expect(isErrorShowing).to.be.true

    reviewForm.submit('email@example.com')
    isErrorShowing = reviewForm.emailError.isVisible()
    expect(isErrorShowing).to.be.false

    reviewForm.submit('email@email.com', 'This is a review')

    const isMainErrorShowing = reviewForm.formError.isVisible()
    const isContentErrorShowing = reviewForm.reviewError.isVisible()
    expect(isMainErrorShowing).to.be.false
    expect(isContentErrorShowing).to.be.false
  })

  it('should focus on the first invalid input field on error', () => {
    let emailHasFocus = reviewForm.email.hasFocus()
    expect(emailHasFocus, 'email should now have focus').to.be.false

    reviewForm.submit()
    emailHasFocus = reviewForm.email.hasFocus()
    expect(emailHasFocus, 'email should not have focus').to.be.true

    reviewForm.submit('valid@example.com')
    const contentHasFocus = reviewForm.content.hasFocus()
    expect(contentHasFocus, 'content should now have focus').to.be.false
  })
})

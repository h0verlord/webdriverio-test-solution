class ReviewForm {
  get btnSubmit() {
    return $("button[type='submit']")
  }
  get email() {
    return $('#review-email')
  }
  get content() {
    return $('#review-content')
  }
  get formError() {
    return $('p=There are some errors in your review.')
  }
  get emailError() {
    return $('p=Please enter a valid email address.')
  }
  get reviewError() {
    return $("p=A review without text isn't much of a review.")
  }

  submit(email, review) {
    if (email) {
      this.email.setValue(email)
    }
    if (review) {
      this.content.setValue(review)
    }
    this.btnSubmit.click()
  }
}
module.exports = new ReviewForm()

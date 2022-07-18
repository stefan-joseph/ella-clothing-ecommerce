export default function validateForm(values) {
  let errors = {};

  //first name
  if ("firstName" in values) {
    if (!values.firstName) {
      errors.firstName = "First name required";
    } else if (!/^[A-Za-z]+/.test(values.firstName.trim())) {
      errors.firstName = "Enter a valid first name";
    }
  }

  //last name
  if ("lastName" in values) {
    if (!values.lastName) {
      errors.lastName = "Last name required";
    } else if (!/^[A-Za-z]+/.test(values.lastName.trim())) {
      errors.lastName = "Enter a valid last name";
    }
  }

  // email
  if ("email" in values) {
    if (!values.email) {
      errors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }
  }

  // password
  if ("password" in values) {
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password needs to be 6 characters or more";
    }
  }

  //password2
  if ("password2" in values) {
    if (!values.password2) {
      errors.password2 = "Password is required";
    } else if (values.password2 !== values.password) {
      errors.password2 = "Passwords do not match";
    }
  }

  // old password
  if ("oldPassword" in values) {
    if (!values.oldPassword) {
      errors.oldPassword = "Password is required";
    } else if (values.oldPassword.length < 6) {
      errors.oldPassword = "Password needs to be 6 characters or more";
    }
  }

  // street
  if ("street" in values) {
    if (!values.street) {
      errors.street = "Street is required";
    }
  }

  // city
  if ("city" in values) {
    if (!values.city) {
      errors.city = "City is required";
    }
  }

  // state
  if ("state" in values) {
    if (!values.state) {
      errors.state = "State is required";
    }
  }

  // country
  if ("country" in values) {
    if (!values.country) {
      errors.country = "Country is required";
    } else if (values.country !== "USA") {
      errors.country = "Country is invalid";
    }
  }

  // zip
  if ("zip" in values) {
    if (!values.zip) {
      errors.zip = "Zip code is required";
    } else if (!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(values.zip)) {
      errors.zip = "Zip code is invalid";
    }
  }

  // tel
  if ("tel" in values) {
    if (!values.tel) {
      errors.tel = "Telephone number is required";
    } else if (
      !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(
        values.tel
      )
    ) {
      errors.tel = "Telephone number is invalid";
    }
  }

  // color
  if ("color" in values) {
    if (!values.color) {
      errors.color = "Please select a color";
    }
  }

  //size
  if ("size" in values) {
    if (!values.size) {
      errors.size = "Please select a size";
    }
  }

  //quantity
  if ("quantity" in values) {
    if (!values.quantity || values.quantity === "NaN") {
      errors.quantity = "Please select a quantity";
    } else if (parseInt(values.quantity) < 1) {
      errors.quantity = "Minimum quantity is 1";
    }
  }

  // rating
  if ("rating" in values) {
    if (!values.rating) {
      errors.rating = "Please select a rating";
    } else if (values.rating < 1 || values.rating > 5) {
      errors.rating = "Rating must be a number between 1 and 5";
    }
  }

  // title
  if ("title" in values) {
    if (!values.title) {
      errors.title = "Please provide a title";
    } else if (values.title.length > 50) {
      errors.title = "Title should be less than 50 characters";
    }
  }

  // comment
  if ("comment" in values) {
    if (!values.comment) {
      errors.comment = "Please provide a comment";
    } else if (values.comment.length > 400) {
      errors.comment = "Comment should be less than 400 characters";
    }
  }
  // console.log(errors);
  return errors;
}

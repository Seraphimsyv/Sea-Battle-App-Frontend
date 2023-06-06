export const MAX_SHIP : number = 5;
export const CELL_SIZE : number = 35;

type CanvasData = {
  general: {
    lineColor: string,
    background: string,
    missed: string,
    destroyed: string
  }
}

export const CANVAS : CanvasData = {
  general: {
    lineColor: "rgb(55, 150, 250)",
    background: "linear-gradient(rgb(21 44 56) 0%, rgb(0, 119, 182) 100%)",
    missed: "rgb(102, 121, 140)",
    destroyed: "rgb(186, 34, 61)"
  }
}

export const ErrorAlertText = {
  auth: {
    signin: {
      validation: 'Sorry, there was an error validating the entered data.\n' +
      'Please check the correctness of filling in all the required fields and try again.',
      empty: 'Sorry, but you need to fill in all the required fields to complete the registration.\n' +
      'Please fill in all the necessary information and try again.',
      exists: 'Sorry, but a user with these details already exists.\n' + 
      'Please enter unique information or log in to your existing account.',
      server: 'Sorry, there was a server error while processing your request.\n' +
      'Please try again later or contact the website administrator'
    },
    login: {
      invalid: 'Sorry, but the entered authorization data is incorrect.\n' +
      'Please check the correctness of the entered data and try again.',
      empty: 'Sorry, but you must fill in all the fields for authorization.\n' +
      'Please enter your credentials and try again.',
      password: 'Sorry, but the entered password is incorrect.\n' +
      'Please check the correctness of the entered password and try again.'
    }
  }
}
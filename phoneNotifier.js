const readline = require("readline");

// Create a readline interface to handle user input from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Observer Base Class
class Observer {
  // Method to handle updates, which can be overridden by subclasses
  update(phoneNumber) {
    console.log(`Observer received notification for phone number: ${phoneNumber}`);
  }
}

// Concrete observer that prints the phone number when updated
class PrintPhoneNumberObserver extends Observer {
  // Override the update method to print the phone number
  update(phoneNumber) {
    console.log(`Phone number dialed: ${phoneNumber}`);
  }
}

// Concrete observer that displays a message when dialing
class DialingMessageObserver extends Observer {
  // Override the update method to show a dialing message
  update(phoneNumber) {
    console.log(`Now Dialling ${phoneNumber}`);
  }
}

// Telephone class that manages phone numbers and observers
class Telephone {
  constructor() {
    this.phoneNumbers = [];  // Array to store phone numbers
    this.observers = [];     // Array to store observers
  }

  // Method to add a phone number to the list
  AddPhoneNumber(phoneNumber) {
    // Check if the phone number is already in the list
    if (!this.phoneNumbers.includes(phoneNumber)) {
      this.phoneNumbers.push(phoneNumber);  // Add phone number
      console.log(`Phone number ${phoneNumber} added.`);
    } else {
      console.log(`Phone number ${phoneNumber} already exists.`);
    }
  }

  // Method to remove a phone number from the list
  RemovePhoneNumber(phoneNumber) {
    const index = this.phoneNumbers.indexOf(phoneNumber);
    if (index !== -1) {
      this.phoneNumbers.splice(index, 1);  // Remove phone number
      console.log(`Phone number ${phoneNumber} removed.`);
    } else {
      console.log(`Phone number ${phoneNumber} not found.`);
    }
  }

  // Method to dial a phone number
  DialPhoneNumber(phoneNumber) {
    // Check if the phone number exists in the list
    if (this.phoneNumbers.includes(phoneNumber)) {
      console.log(`Dialing ${phoneNumber}...`);
      this.notifyObservers(phoneNumber);  // Notify all observers
    } else {
      console.log(`Phone number ${phoneNumber} not found.`);
    }
  }

  // Method to add an observer to the list
  addObserver(observer) {
    this.observers.push(observer);
    console.log(`Observer added.`);
  }

  // Method to remove an observer from the list
  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);  // Remove observer
      console.log(`Observer removed.`);
    }
  }

  // Method to notify all observers of a change
  notifyObservers(phoneNumber) {
    for (const observer of this.observers) {
      observer.update(phoneNumber);  // Call the update method on each observer
    }
  }
}

// Helper function to prompt the user for input and pass it to a callback
function askQuestion(question, callback) {
  rl.question(question, callback);
}

// Main function to handle user input and interaction
function handleUserInput() {
  const myPhone = new Telephone();  // Create a new Telephone instance
  const printPhoneNumberObserver = new PrintPhoneNumberObserver();  // Create a PrintPhoneNumberObserver
  const dialingMessageObserver = new DialingMessageObserver();  // Create a DialingMessageObserver

  // Add both observers to the telephone
  myPhone.addObserver(printPhoneNumberObserver);
  myPhone.addObserver(dialingMessageObserver);

  // Function to display the main menu and handle the user's choice
  function mainMenu() {
    askQuestion(`
      Please select an action:
      1: Add a phone number
      2: Remove a phone number
      3: Dial a phone number
      4: Remove an observer
      5: Exit
    `, function(action) {
      switch (action) {
        case "1":
          // Prompt the user to add a phone number
          askQuestion("Enter the phone number to add: ", function(phoneNumberToAdd) {
            myPhone.AddPhoneNumber(phoneNumberToAdd);  // Add the phone number
            mainMenu();  // Show the menu again
          });
          break;
        case "2":
          // Prompt the user to remove a phone number
          askQuestion("Enter the phone number to remove: ", function(phoneNumberToRemove) {
            myPhone.RemovePhoneNumber(phoneNumberToRemove);  // Remove the phone number
            mainMenu();  // Show the menu again
          });
          break;
        case "3":
          // Prompt the user to dial a phone number
          askQuestion("Enter the phone number to dial: ", function(phoneNumberToDial) {
            myPhone.DialPhoneNumber(phoneNumberToDial);  // Dial the phone number
            mainMenu();  // Show the menu again
          });
          break;
        case "4":
          // Prompt the user to choose an observer to remove
          askQuestion(`
            1: Remove PrintPhoneNumberObserver
            2: Remove DialingMessageObserver
          `, function(removeObserverAction) {
            if (removeObserverAction === "1") {
              myPhone.removeObserver(printPhoneNumberObserver);  // Remove the PrintPhoneNumberObserver
            } else if (removeObserverAction === "2") {
              myPhone.removeObserver(dialingMessageObserver);  // Remove the DialingMessageObserver
            }
            mainMenu();  // Show the menu again
          });
          break;
        case "5":
          // Exit the program
          console.log("Exiting the system.");
          rl.close();  // Close the readline interface
          return;
        default:
          console.log("Invalid option. Please try again.");
          mainMenu();  // Show the menu again
          break;
      }
    });
  }

  mainMenu();  // Show the menu when the program starts
}

// Start the user input process
handleUserInput();

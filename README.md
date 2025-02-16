# Observer Pattern Telephone System

This project demonstrates the use of the **Observer Design Pattern** in a basic telephone management system. The system allows the user to add, remove, and dial phone numbers, as well as manage observers that receive notifications when actions (like dialing a number) occur.

## Features

- Add a phone number to the telephone's contact list.
- Remove a phone number from the contact list.
- Dial a phone number and notify all registered observers.
- Manage observers, allowing you to add or remove specific behaviors upon dialing a number (e.g., print phone number or display dialing message).
  
## Technologies Used

- JavaScript (Node.js)
- Observer Design Pattern
- `readline` module for user input handling in the terminal

How It Works
The telephone system uses the Observer Pattern, allowing various actions (like dialing a number) to notify one or more observers that have been registered. Observers are able to react to these actions, such as printing the dialed number or displaying a custom message.

Classes
Observer: The base class that defines an update() method, which will be called by the Telephone class when an action occurs.
PrintPhoneNumberObserver: A concrete observer that prints the phone number when it is dialed.
DialingMessageObserver: A concrete observer that displays a "Now Dialing" message when a phone number is dialed.
Telephone: The main class responsible for managing phone numbers and notifying observers.
Methods
addObserver(observer): Add an observer to the list of observers.
removeObserver(observer): Remove an observer from the list.
AddPhoneNumber(phoneNumber): Add a phone number to the contact list.
RemovePhoneNumber(phoneNumber): Remove a phone number from the contact list.
DialPhoneNumber(phoneNumber): Dial a phone number and notify all registered observers.
Example Usage
Start the application by running the node command.
Select an action from the menu:
Add a phone number.
Remove a phone number.
Dial a phone number (this will notify observers).
Remove an observer.
Exit the program.
# Phone-Notifier

# Dynamic Form with CRUD Operations

This project implements a dynamic form where users can input data such as **Name**, **Age**, **Email**, **Contact Number**, **Gender**, and **Address**. The form supports real-time validation, and the submitted data is stored in `localStorage`. A table is also provided to display the form entries with CRUD (Create, Read, Update, Delete) operations.

## Features

### Dynamic Form
- Users can fill out a form with multiple fields:
  - **Text Inputs** for Name, Age, Email, and Address.
  - **Select Dropdown** for Gender.
  - **Checkbox** for agreement or preferences.
  
### Form Validation
- **Required Fields**: Ensures all fields are filled before submission.
- **Email Validation**: Checks that the email format is correct.
- **Contact Number Validation**: Ensures the contact number has the correct length.
- **Age Validation**: Ensures the age is a valid number and within a reasonable range.

### CRUD Operations

- **Create**: New form entries can be added to `localStorage` when the user submits the form.
- **Read**: After submission, the form data is displayed in a **dynamic table**.
- **Update**: Users can edit existing entries from the table, and changes will be saved back to `localStorage`.
- **Delete**: Users can delete entries from the table, and the changes will be reflected in `localStorage`.

### Search
- **Search Bar**: Allows users to filter the displayed data by **Name** or **Email** for quick access to specific entries.

## Functionality

### Form Submission
- When the form is submitted, the input fields are validated:
  - Required fields (Name, Email, etc.) must be filled in.
  - Email is validated for proper format.
  - Contact Number length and Age are validated.
- If the form passes validation, the data is saved to `localStorage` and the page reloads to display the updated data in the table.

### Table Display
- Initially, a default set of customer data is displayed in the table.
- Each entry includes buttons to **Edit** and **Delete**.
  - Clicking **Edit** allows you to update an existing entry.
  - Clicking **Delete** will remove the entry from both the table and `localStorage`.
- The table is searchable by **Name** and **Email** using a search bar above the table.

### CRUD Operations
- **Create**: When a new form is submitted, a new entry is created and added to the table.
- **Read**: Data from `localStorage` is displayed in the table each time the page loads or after a form submission.
- **Update**: Clicking **Edit** on a row enables editing of the entry’s fields. When the user clicks **Save**, the changes are updated in both the table and `localStorage`.
- **Delete**: Clicking **Delete** on a row removes the entry from both the table and `localStorage`, updating the UI immediately.

## Technologies Used

- **React.js**: The core JavaScript library used for building the user interface and managing the state of the application.
- **Bootstrap**: A CSS framework used for styling the form, table, and buttons.
- **localStorage**: Used for storing form data in the browser’s local storage, ensuring data persistence even after a page reload.

## Once you refresh the browser you will see the update


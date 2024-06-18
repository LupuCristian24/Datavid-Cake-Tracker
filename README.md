# Datavid Cake Tracker

Datavid Cake Tracker is a management tool designed to help track and celebrate birthdays of team members in a remote multinational company setting. This application allows you to add new members, view a list of all members sorted by upcoming birthdays, and manage existing member data.

## Features

- Add new members with attributes: First Name, Last Name, Birth Date, Country, City.
- Ensure members are at least 18 years old before adding.
- View a list of all members and their information.
- Sort the member list by closest to date birthdays.
- Homepage visualization of upcoming birthdays using FullCalendar.

## Prerequisites

Before running the Datavid Cake Tracker application, ensure you have the following installed:

- Node.js and npm (for frontend dependencies)
- Python (for backend development)

## Installation

1. **Install frontend dependencies:**

        npm install


2. **Install required Python packages:**

        cd "(your path)\birthday-tracker\src\backend"
        pip install -r requirements.txt

3. **Start the backend server:**

        python app.py

4. **Start the frontend development server:**

        cd "(your path)\birthday-tracker"
        npm run dev

5. **Access the application:**

Open your web browser and go to http://localhost:5173 to view and interact with the Datavid Cake Tracker application.

## Usage

- Home: Displays a calendar view of upcoming birthdays.
- Add New Birthday: Navigate to /add to add a new member’s birthday. Fill out the form with required information and submit.
- List Birthdays: Navigate to /list to view a sortable list of all members and their birthdays. You can also delete members from this page.
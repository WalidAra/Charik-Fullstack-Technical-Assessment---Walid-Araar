# Charik Fullstack Technical Assessment

This project is a fullstack application that integrates with HubSpot's private app features, allowing users to manage and link deals and contacts seamlessly through a CRM interface.

## Features
1. **User Authentication**: Login and register functionality.
2. **Contact and Deal Management**:
    - Display lists of contacts and deals.
    - Filter contacts and deals by name.
3. **Linking**:
    - Link deal to a contact or vice versa.
    - Bulk selection for efficient linking.
4. **Integration with HubSpot**:
    - Fetch contacts and deals via HubSpot API.
    - Perform linking operations using HubSpot API endpoints.

---

## Technologies Used
### Backend
- Python 3
- Django REST Framework
- HubSpot API

### Frontend
- React.js
- State Management (React useState and useEffect and zustand)

---

## Installation Instructions

### Prerequisites
- Python 3 installed on your machine.
- Node.js and npm installed.

### Project Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/WalidAra/Charik-Fullstack-Technical-Assessment---Walid-Araar.git
    cd Charik-Fullstack-Technical-Assessment---Walid-Araar
    ```
2. Install commitizen for better commit messages:
    ```bash
    npm install -g commitizen
    ```

### Backend Setup
1. Navigate to the backend directory and create a virtual environment:
    ```bash
    cd server
    python3 -m venv env
    source env/bin/activate  # On Windows: env\Scripts\activate
    ```
2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3. Set up your HubSpot API key:
    In the backend directory, create a `.env` file:
    ```env
    CRM_KEY=your_hubspot_api_key
    ```
4. Run the Django server:
    ```bash
    python manage.py migrate
    python manage.py runserver PORT
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd client
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the React development server:
    ```bash
    npm run dev
    ```

---

## Project Structure

### Backend
- `views.py`: Contains API views for fetching contacts, deals, and linking.
- `urls.py`: Maps API endpoints.
- `.env`: Stores sensitive API keys and configuration.

### Frontend
- `src/components`: Uses ATOMIC architecture Contains React components like Login, Register, Home, and Table and atomic ui components

---

## How to Use

### Set Up a HubSpot Private App:
1. Go to HubSpot's Developer Portal.
2. Create a private app with the necessary permissions for contacts and deals.
3. Generate an API key and set it in your `.env` file.

### Run the Application:
1. Start both the backend and frontend servers.
2. Navigate to `http://localhost:5173` in your browser.

### Features:
- Log in or register to access the app.
- View, filter, and link contacts and deals.
- Use the bulk linking feature for efficiency.

---

## Screenshots

### Login Page
![Login Page](./login.png)

### Dashboard
![Dashboard](./home.png)

---

## Deployment
- **Backend**: Deploy on platforms like Heroku, DigitalOcean,render or AWS.
- **Frontend**: Deploy on Vercel,Netlify or render.

---

## Known Issues
- Ensure your API key has the correct permissions.
- Use ngrok if testing locally with HubSpot requires public access to the API.

---

## Author
- **Walid Araar**
- **Email**: arawalid90@gmail.com
- **GitHub**: [WalidAra](https://github.com/WalidAra)

---

## Demo Video
[View Demo](https://drive.google.com/file/d/15slA1NUJmHMTca3h0-ovMPgxvrY7iChc/view?usp=sharing)
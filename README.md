# Dwelling Duo

**Dwelling Duo** is a web application developed using Django that allows users to list, search, and filter properties for sale or rent. The application features user authentication, property management, and dynamic search functionalities, enhancing the user experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- User authentication (registration, login, logout)
- Create, update, and delete property listings
- Search properties by title, price range, location, and availability
- Dynamic filtering with AJAX for seamless user experience
- Responsive design for mobile and desktop users

## Technologies Used

- Python
- Django
- HTML
- CSS
- JavaScript (with AJAX for dynamic functionality)
- SQLite (or PostgreSQL, depending on configuration)

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/dwelling-duo.git
   cd dwelling-duo
2. **Setup a virtual Environment:**

## Installation Steps

### Set up a virtual environment:

```bash
python -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`

### Install dependencies

```bash
pip install -r requirements.txt

## Access the Application

Open your web browser and navigate to [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

## Usage

- Register a new account or log in to an existing account.
- You can create a new property listing through the dashboard.
- Use the search bar to filter properties based on your criteria (title, price range, location, availability).
- Click on a property listing to view its details.
- Admin users can manage property listings through the admin panel.

## API Endpoints

The application includes the following API endpoints:

- `GET /properties/`: Fetch all properties with optional filtering and sorting parameters.
- `POST /properties/`: Create a new property listing (requires authentication).
- `GET /properties/<pk>/`: Retrieve details for a specific property.
- `PUT /properties/<pk>/`: Update a specific property (requires authentication).
- `DELETE /properties/<pk>/`: Delete a specific property (requires authentication).




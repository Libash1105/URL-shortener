# URL Shortener

A simple URL shortening service that converts long URLs into shorter, more manageable links. Built with Node.js, Express, and MongoDB.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- Shortens long URLs to a more manageable format
- Stores original and shortened URLs in a MongoDB database
- Redirects shortened URLs to the original URL

## Technologies Used
- Node.js
- Express
- MongoDB
- nanoid (for generating unique short URLs)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) installed and running locally or use MongoDB Atlas
- Git for version control

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/URL-shortener.git
   cd URL-shortener

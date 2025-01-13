# TheAsk Properties

Welcome to **TheAsk Properties**, your one-stop solution for seamless real estate management. This web application allows users to explore, manage, and list properties, ensuring a smooth experience for property seekers and owners alike.

## Features

### 1. **For Property Seekers**
- **Advanced Property Search:** Filter properties by location, price range, type, and more.
- **Detailed Property Listings:** View high-quality images, descriptions, and amenities for each property.
- **Contact Sellers:** Get in touch with property owners directly through the platform.

### 2. **For Property Owners**
- **Create Listings:** Easily add properties with images, descriptions, and pricing details.
- **Manage Listings:** Update, delete, or pause property listings anytime.
- **Analytics Dashboard:** Track the performance of your listings, including views and inquiries.

### 3. **Additional Features**
- **User Profiles:** Secure user accounts to manage personal details and saved properties.
- **Mobile Responsive:** Optimized for seamless use on desktops, tablets, and smartphones.
- **Secure Authentication:** Secure sign-up and sign-in with encrypted passwords.

## Technology Stack

TheAsk Properties is built using modern web technologies:

### Frontend:
- **React.js:** For a dynamic and responsive user interface.
- **Tailwind CSS:** For sleek and modern styling.

### Backend:
- **Node.js & Express.js:** For server-side logic and API endpoints.
- **MongoDB:** As the database to store property and user data.

### Additional Tools:
- **Redux Toolkit:** For state management.
- **JWT:** For secure authentication.
- **Cloudinary:** For image storage and optimization.

## Getting Started

### Prerequisites
To run TheAsk Properties locally, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/TonyBlaiseNTAHE/The_Ask_Properties.git
   cd The_Ask_Properties
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   cd client
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Run the Application:**
   Open two terminal windows or tabs:
   - **Backend:**
     ```bash
     npm run server
     ```
   - **Frontend:**
     ```bash
     cd client
     npm start
     ```

5. **Access the App:**
   Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Deployment

TheAsk Properties can be deployed on platforms like:
- **Frontend:** Vercel, Netlify
- **Backend:** Render, Heroku, or AWS

## Contributing

We welcome contributions from the community! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push your changes:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request on the main repository.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For inquiries or support, please contact:
- **Author:** Tony Blaise NTAHE
- **Email:** ntahetonyblaise@example.com
- **GitHub:** [TonyBlaiseNTAHE](https://github.com/TonyBlaiseNTAHE)

---
Thank you for using TheAsk Properties! We hope you have a great experience.


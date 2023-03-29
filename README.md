# Code Titans Tech Share

This repo has a bunch of examples of how powerful Google's Firebase is.

## Clone the repo

```
git clone https://github.com/InfantDerrick/csci5117-tech-share.git
```

## What is Firebase?

Firebase is a Google product that helps developers build, manage and grow their apps easily. Developers can build their apps in a quick and secure manner, and since no programming is needed on the firebase side it makes using its features much more efficient. Firebase provides services to android, ios, web and unity, it provides cloud storage, and it uses NoSQL for the database for the storage of data.

## What are some of the services Firebase provides?

Firebase allows users to host static sites, access a realtime database and cloud storage, handle user authentication, and provide analytics and engagement data. This modular approach is very useful in a production setting. Cloud Firestore is also a prime example of how Firebase acts as a Backend as a Service )BaaS).

### Setup Your Environment

Run the following 2 commands:
```npm install```\
```npm start```

# Useful Examples
## Read

## Write
You are able to write data to the Firestore DB by utilizing the function you are importing from Firebase.

### Import the correct dependencies
```js
import { collection, addDoc } from "firebase/firestore";
```

### Write the function to write the new data
```js
  // Add message to Firestore
  const sendMessage = async (content) => {
    await addDoc(collection(db, "messages"), {
      text: content,
      username: username,
      timestamp: new Date()
    });
  };
```
### Nested Collection
If you look into the Firestore console in your Firebase console, you will notice that data is being written into the\
messages collection as documents. Firestore DB is a very powerful solution to structure your data. You are able to\
have nested collections existing within top-level collections. This tree-like structure allows you to design your\
data into as many different formats for your own purposes.\

In this case we have the following structure:
```
messages > document(s) > {text: data, username: username, timestamp: current-date}
```
## Auth


This will run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

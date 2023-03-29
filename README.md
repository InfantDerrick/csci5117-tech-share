# Code Titans Tech Share

This repo has a bunch of examples of how powerful Google's Firebase is.

## Clone the repo

```
git clone https://github.com/InfantDerrick/csci5117-tech-share.git
```

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

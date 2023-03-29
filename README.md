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

Reading Data from Firestore to your application is one of the most important aspects of the Chat Room. In this demo, we will be showing two different ways to read the data from Firestore. The first method is a simple get function, which connnects to Firestore and reads the data once on demand. Here is the code below:
```js 
const getMessages = async () => {
    
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const querySnapshot = await getDocs(q);
    const messagesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    console.log(messagesData);
  }

  getMessages();
```

In a real-time database, we want to read based on changes in our React state, so that we dynamically change our React components. The best way to read data with this intention is to add a listener that waits for a change in state to trigger a read to Firestore. This approach uses the "onSnapshot" listener and the useEffect hook to dynamically trigger reads based off of changes to effectively read the data from Firestore. Here is the code below:
```js 
useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
    });
    return unsubscribe;
  }, []);
```

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
Firebase Authentication is a service provided by Google's Firebase platform that enables you to authenticate users with your application. With Firebase Authentication, you can easily add authentication to your application and give your users a streamlined sign-in experience alongside with everything else in your backend!

To get started with Firebase Authentication, you will need to do the following:

1. Set up Firebase in your application: To use Firebase Authentication, you will first need to create a Firebase project in the Firebase Console and add the Firebase SDK to your application. You can do this by following the instructions provided in the Firebase documentation.

2. Enable Authentication in your Firebase Console: Once you have set up Firebase in your application, you will need to enable Authentication in your Firebase Console. This can be done by going to the Authentication section of your Firebase Console and following the prompts to enable the authentication providers that you want to use.

3. Implement Authentication in your application: After you have enabled Authentication in your Firebase Console, you can start implementing authentication in your application. Firebase provides a number of SDKs for different platforms, including iOS, Android, Web, and more. You can use these SDKs to authenticate users with your application and manage their authentication state.

4. Test your Authentication implementation: Once you have implemented Authentication in your application, you should test it thoroughly to make sure that it is working as expected. Firebase provides a number of testing tools that you can use to test your Authentication implementation, including the Firebase Authentication Emulator and the Firebase Test Lab.

```jsx
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/chat");
      }
    });
    return unsubscribe;
  }, [navigate]);
```

When the component is mounted, it uses the useEffect hook to listen for changes in the authentication state using the onAuthStateChanged function from Firebase Authentication. If a user is already signed in, the component navigates to the chat page using the navigate function from the useNavigate hook.

```jsx
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Sign up successful:", userCredential.user);
      navigate("/chat");
    } catch (error) {
      setError(error.message);
    }
  };
```

The handleSignUp function is called when the user submits the sign-up form. It uses the createUserWithEmailAndPassword function from Firebase Authentication to create a new user with the provided email and password. If the sign-up is successful, the function logs a message to the console and navigates to the chat page using the navigate function. If there is an error, the function sets the error state variable with the error message.

```jsx
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Login successful:", userCredential.user);
      navigate("/chat");
    } catch (error) {
      setError(error.message);
    }
  };
```

The handleLogin function is called when the user submits the login form. It uses the signInWithEmailAndPassword function from Firebase Authentication to log in the user with the provided email and password. If the login is successful, the function logs a message to the console and navigates to the chat page using the navigate function. If there is an error, the function sets the error state variable with the error message.


This will run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

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

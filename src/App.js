import './App.css';
import app from './firebase.init';
import { useState } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, signOut } from 'firebase/auth';

const auth = getAuth(app)


function App() {
  const [user, setUser] = useState({})
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider()

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
      })
      .catch(error => {
        console.log("error", error)
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
  }

  return (
    <div className="App">
      <h2>plz sign in</h2>
      {!user.displayName ? <div>
        <button onClick={handleGoogleSignIn} className="google-sign-in-btn"><img className='google-logo' src="https://image.similarpng.com/very-thumbnail/2020/12/Flat-design-Google-logo-design-Vector-PNG.png" alt="" /></button>

        <button onClick={handleGithubSignIn} className="google-sign-in-btn"><img className='google-logo' src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" /></button>
      </div> :
        <button onClick={handleSignOut}>sign out</button>}






      <h2>Your Name: {user.displayName}</h2>
      <p>Your Email: {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;

import './App.css';

import { Auth } from 'aws-amplify';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState({ username: '', password: '', email: '', phone_number: '', authenticationCode: '' });
  const [step, setStep] = useState(0);

  const onChange = e => {
    setUser(Object.assign({}, user, { [e.target.name]: e.target.value }));
  }

  const signUp = async () => {
    const { username, password, email, phone_number } = user;
    try {
      await Auth.signUp({ username, password, attributes: { email, phone_number } })
      setStep(1);
      console.log('successful signup!')
    } catch (err) {
      console.log('error signing up! ', err)
    }
  }

  const confirmSignup = async () => {
    const { username, authenticationCode } = user;
    try {
      await Auth.confirmSignUp(username, authenticationCode)
      console.log('user signup success')
    } catch (err) {
      console.log('error confirming signup! ', err)
    }
  }

  return (
    <div className="App">
      {
        step === 0 && (
          <div>
            <input placeholder='user name' onChange={onChange} name='username' style={styles.input} />
            <input placeholder='password' onChange={onChange} name='password' style={styles.input} />
            <input placeholder='email' onChange={onChange} name='email' style={styles.input} />
            <input placeholder='phone number' onChange={onChange} name='phone_number' style={styles.input} />
            <button onClick={signUp}>Sign Up</button>
          </div>
        )
      }
      {
        step === 1 && (
          <div>
            <input placeholder='user name' onChange={onChange} name='username' style={styles.input} />
            <input placeholder='authentication code' onChange={onChange} name='authenticationCode' style={styles.input} />
            <button onClick={confirmSignup}>Confirm Sign Up</button>
          </div>
        )
      }
    </div>
  );
}

const styles = {
  input: {
    height: 35, margin: 10
  }
}

export default App;

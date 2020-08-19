import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import Member from './Member';


  // mock data, array of objects with team member info
const initialTeamList = [
  {
    id: uuid(), // uuid is a library to generate random, unique ids
    name: 'Apple',
    email: 'apple@app.com',
    role: 'Frontend',
  },
]

    // what the state will be set to initially; object with three key/value pairs
const initialFormValues = {
  name: '',
  email: '',
  role: '',
}

const fakeAxiosGet = () => {
  return Promise.resolve({ status: 200, success: true, data: initialTeamList })
}
const fakeAxiosPost = (url, { name, email, role }) => {
  const newMember = { id: uuid(), name, email, role }
  return Promise.resolve({ status: 200, success: true, data: newMember })
}

function App() {
  const [teamMemberList, setTeamMemberList] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)

  // function that uses the setFormValues func to take the values inputed and set them to the inputName
  const updateForm = (inputName, inputValue) => {
    setFormValues({...formValues, [inputName]: inputValue})
  }

  const submitForm = () => {
        const teamMember = {
          name: formValues.name.trim(),
          email: formValues.email.trim(),
          role: formValues.role,
        }

      if (!teamMember.name || !teamMember.email) return

      fakeAxiosPost('fake.com', teamMember)
          .then(res => {
            setTeamMemberList([ res.data, ...teamMemberList])
          })
          .catch(error => {
            debugger
            console.log(error)
          })
          .finally(() => {
        setFormValues(initialFormValues); 
          })
  }

    useEffect(() => {
    fakeAxiosGet('fakeapi.com').then(res => setTeamMemberList(res.data))
  }, [])

  return (
    <div className="App">
      <header className="App-header">Team Members App</header>

      <Form 
          values={formValues}
          update={updateForm}
          submit={submitForm}
        />
        {
          teamMemberList.map(member => {
            return (
              <Member key={member.id} details={member} />
            )
          })
        }

    </div>
  );
}

export default App;

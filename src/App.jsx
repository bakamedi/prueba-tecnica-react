import { useState, useEffect } from 'react'
import { getOptions, submitForm } from './services/api';
import './App.css'

function App() {
  // Estados del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dropdownData, setDropdownData] = useState([]); // state que almacena las opciones
  const [selectedOption, setSelectedOption] = useState(''); // state que almacena la opcion seleccionada
  const [formErrors, setFormErrors] = useState({});
  
  useEffect(() => {
    // Modifica el codigo para traer las opciones del proyecto de flask usando axios
    getOptions()
      .then(response => {
        setDropdownData(response.data.options); // espera que el backend retorne { options: [...] }
      })
      .catch(error => {
        console.error('Error fetching dropdown options:', error);
      });
  }, []);

  // Función para manejar el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) errors.email = "Email is not valid";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const formData = {
        name,
        email,
        selectedOption,
      };

      submitForm(formData)
        .then(response => {
          console.log('Form submitted successfully', response.data);
          alert('Form submitted!');
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          alert('Error submitting form');
        });
    }
  };

  return (
    <div className="App">
      <h1>Simple Form</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        {/* Nombre */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={{ width: '100%', padding: '8px' }} 
          />
          {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}
        </div>

        {/* Correo */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '8px' }} 
          />
          {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
        </div>

        {/* Dropdown */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="dropdown">Select an option</label>
          <select 
            id="dropdown" 
            value={selectedOption} 
            onChange={(e) => setSelectedOption(e.target.value)} 
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="">-- Select --</option>
            {dropdownData.map((opt, index) => (
              <option key={index} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Submit button */}
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
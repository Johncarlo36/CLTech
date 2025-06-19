import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import UserContext from '../context/UserContext';

const notyf = new Notyf();

export default function Profile() {
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (user.id) {
      fetch('http://localhost:4000/users/details', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data && data._id) {
            setDetails(data);
          } else if (data && data.message === 'User not found') {
            notyf.error('User not found.');
          } else {
            notyf.error('Something went wrong, kindly contact us for assistance.');
          }
        })
        .catch(err => {
          console.error('Error fetching user details:', err);
          notyf.error('Something went wrong, kindly contact us for assistance.');
        });
    }
  }, [user.id]);

  if (!user.id) {
    return <Navigate to="/courses" />;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '4rem auto' }}>
      <Card
        className="p-5"
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '10px'
        }}
      >
        <h2 className="mb-3">Profile</h2>
        {details ? (
          <>
            <h4 className="mb-4">{`${details.firstName} ${details.lastName}`}</h4>
            <hr style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
            <h5 className="mt-4">Contacts</h5>
            <ul style={{ paddingLeft: '20px' }}>
              <li>Email: {details.email}</li>
              <li>Mobile No: {details.mobileNo}</li>
            </ul>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Card>
    </div>
  );
}

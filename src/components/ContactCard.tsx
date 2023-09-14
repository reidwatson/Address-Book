import React from 'react';
import './ContactCard.css';
interface Props {
  contact: any;
}
const ContactCard: React.FC<Props> = ({ contact }) => {
  return (
    <div className='card'>

      <div className='row'>
        <div className='companyName'>
          <span>{contact.CompanyName}</span>
        </div>
        <div className='companyCode'>
        <span>{contact.CustomerID}</span>
        </div>
      </div>

      <div className='hr-div'></div>

      <div className='row'>
        <div className='contact'>
          <label>Contact:</label>
          <span className='contactName'>{contact.ContactName}</span>
          <span className='contactTitle'>{contact.ContactTitle}</span>
        </div>
        <div className='info'>
          <label>Info:</label>
          <span className='email'>{contact.Email}</span>
          <span className='phone'>{contact.Phone}</span>
          <span className='fax'>{contact.Fax}</span>
        </div>
      </div>

      <div className='hr-div'></div>

      <div className='row'>
        <div className='location'>
          <label>Location:</label>

          <span className='address1'>{contact.Address}</span>
          <span className='address1'>{contact.City}, {contact.Country} {contact.PostalCode}</span>
        </div>
      </div>

    </div>
  );
};

export default ContactCard;

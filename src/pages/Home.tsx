import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ContactCard from '../components/ContactCard';
import { XMLParser } from "fast-xml-parser";
import DataTable from 'react-data-table-component';
import './Home.css';

const Home: React.FC = () => {

  //react hook variables
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [viewMode, setViewMode] = useState('table');//either 'table' or 'card'


  //column definitions for the data table
  const columns = [
    {
      name: 'Address',
      selector: (row: any) => row.Address,
      sortable: true
    }, {
      name: 'City',
      selector: (row: any) => row.City,
      sortable: true
    }, {
      name: 'Company Name',
      selector: (row: any) => row.CompanyName,
      sortable: true
    }, {
      name: 'Contact Name',
      selector: (row: any) => row.ContactName,
      sortable: true
    }, {
      name: 'Contact Title',
      selector: (row: any) => row.ContactTitle,
      sortable: true
    }, {
      name: 'Country',
      selector: (row: any) => row.Country,
      sortable: true
    }, {
      name: 'Customer ID',
      selector: (row: any) => row.CustomerID,
      sortable: true
    }, {
      name: 'Email',
      selector: (row: any) => row.Email,
      sortable: true
    }, {
      name: 'Fax',
      selector: (row: any) => row.Fax,
      sortable: true
    }, {
      name: 'Phone',
      selector: (row: any) => row.Phone,
      sortable: true
    }, {
      name: 'Postal Code',
      selector: (row: any) => row.PostalCode,
      sortable: true
    }
  ];


  //initialization function: get the xml data from the local path, parse to json, set json data as react hook variable.
  useEffect(() => {
    fetch('/xml/ab.xml')
      .then(response => response.text())
      .then(data => {
        console.log(data);
        const parser = new XMLParser();
        let jsonData = parser.parse(data);
        setData(jsonData.AddressBook.Contact);
        setFilteredData(jsonData.AddressBook.Contact);
      })
      .catch(error => {
        console.error('Error fetching the XML:', error);
      });
  }, []);



  //scrub the names of all accent marks so search terms work on accented characters too
  //(I got this regex from chatgpt -- not gonna lie)
  function scrub(name: string) {
    return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
  }

  //filter the data being shown whenever the search term gets updated (whenever you type in the input field)
  //if the input field is blank or there is an error, default back to the whole data set.
  useEffect(() => {
    try {
      console.log('searching...', searchTerm)
      let result = [...data];

      //if there is a search term, filter the data by this term
      //make a long string, upper cased, no accents, for every object; then see if this string includes the search term
      if (searchTerm !== '') {
        let scrubbedTerm = scrub(searchTerm);
        result = result.filter((x: any) => scrub(`${x.Address} ${x.City} ${x.CompanyName} ${x.ContactName} ${x.ContactTitle} ${x.Country} ${x.CustomerID} ${x.Email} ${x.Fax} ${x.Phone} ${x.PostalCode}`).includes(scrubbedTerm));
      }

      setFilteredData(result);
    } catch (e) {
      console.error('Error trying to filter data: ', e)
      setFilteredData(data);
    }
  }, [searchTerm]);//listen to changes on 'searchTerm'


  //switch between table and card view
  function toggleMode() {
    try {
      if (viewMode === 'table') {
        setViewMode('card');
      } else if (viewMode === 'card') {
        setViewMode('table');
      }
    } catch (e) {
      console.error('Error trying to toggle viewMode: ', e)
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Address Book</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Address Book</IonTitle>
          </IonToolbar>
        </IonHeader>

        <section className='searchWrapper'>
          <div className='searchColumn'>
            <label>Filter by any field</label>
            <input type='text' value={searchTerm} onInput={(e: any) => setSearchTerm(e.target.value)} placeholder='Search Term' />
          </div>

          <div className='searchColumn'>
            <span className='toggleMode' onClick={() => toggleMode()}>
              {
                viewMode === 'table' ? (
                  <>Switch To Card View</>
                ) : (
                  <>Switch To Table View</>
                )
              }
            </span>
          </div>
        </section>

        {
          viewMode === 'table' ? (
            <section className='tableWrapper'>
              <DataTable data={filteredData} columns={columns} responsive pagination />
            </section>
          ) : (
            <div className='cardsWrapper'>
              {
                filteredData.map((x: any) => {
                  return (<ContactCard contact={x} />)
                })
              }
            </div>
          )
        }

      </IonContent>
    </IonPage>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { XMLParser } from "fast-xml-parser";
import DataTable from 'react-data-table-component';
import './Home.css';

const Home: React.FC = () => {

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

  const [data, setData] = useState([]);


  useEffect(() => {
    fetch('/xml/ab.xml')
      .then(response => response.text())
      .then(data => {
        console.log(data);
        const parser = new XMLParser();
        let jsonData = parser.parse(data);
        console.log(jsonData);
        setData(jsonData.AddressBook.Contact);
      })
      .catch(error => {
        console.error('Error fetching the XML:', error);
      });
  }, []);



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>

        <DataTable data={data} columns={columns} responsive pagination />

        {/* <ExploreContainer /> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;

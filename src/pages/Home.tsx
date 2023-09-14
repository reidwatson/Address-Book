import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { XMLParser } from "fast-xml-parser";
import './Home.css';

const Home: React.FC = () => {


  useEffect(() => {
    fetch('/xml/ab.xml')
        .then(response => response.text())
        .then(data => {
            console.log(data);
            const parser = new XMLParser();
            let jsonData = parser.parse(data);
            console.log(jsonData);
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
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;

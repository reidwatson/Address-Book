# Address-Book
Simple address book app

Single-page web application that can compile to native iOS or Android by use of [Ionic Framework](https://ionicframework.com/docs/)

---
To run in your web browser, clone this repository and:
- Have Node / npm installed
- Have Ionic cli installed ([Tutorial Here](https://ionicframework.com/docs/intro/cli))
- Run `npm install`
- Run `ionic serve` or `npm start` or even `react-scripts start`
---

At the end of the day, this is mostly a react application. Ionic is only used to port to a mobile application, and makes it very easy to do so.

If this project did not request a mobile port, I would have likely just built it in straight react, because the Ionic UI components can be hard to deal with at times.

To build into an iOS app, simply have xcode installed and run:
- `ionic cap build ios`

This tells Capacitor, Ionic's framework for generating native apps, to build the project as an ios app.
It will then build and open your project in xcode, where you can load it onto your device.

---
Here is a demo of me using it on my phone:


https://github.com/reidwatson/Address-Book/assets/65178364/e33c8fd3-c151-4adf-8d0e-4e715e5a0b7e

---
And here is a demo of me using it in the browser:

https://github.com/reidwatson/Address-Book/assets/65178364/5a17b451-d8f2-49dd-adfd-90fa4c5bfbef


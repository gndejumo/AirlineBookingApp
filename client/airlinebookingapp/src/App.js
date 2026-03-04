import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const firstName = "John";
  const lastName = "Doe";
  const students = {
    firstName: "Jane",
    lastName: "Smith",
    age: 22
  }

  return (
      <>
      <Header />
      <main>
      <h1>Hello World {firstName} {lastName}, {students.age}</h1>
      </main>
      <Footer />
      </>
  );
}

export default App;

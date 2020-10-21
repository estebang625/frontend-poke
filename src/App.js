import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";
function App() {
    const url = "https://poke-daycare.herokuapp.com/"
    const [poke, setpoke] = React.useState([])
    const emptyPoke = {
        name: "",
        evolved: "",
        img: "",
        owner: ""
    }


const [selectedPoke, setSelectedPoke] = React.useState(emptyPoke);
  // FUNCTION TO FETCH DOGS
  const getPoke = () => {
    fetch(url + "/dog/")
    .then(response => response.json())
    .then(data => {
      setPoke(data)
    })
  }

  React.useEffect(() => {
    getPoke()
  }, [])

  const handleCreate = (newPoke) => {
    fetch(url+"/pokemon/", {
      method: "post",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(newPoke)
    })
    .then(response => getPoke())
  
    const handleUpdate = (poke) => {
        fetch(url + "/poke/" + poke._id, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(poke),
        }).then(response =>
          // don't need the response from the post but will be using the .then to update the list of dogs
          getPoke()
        );
      };
      //selectdog which selects a dog
      const selectPoke = (poke) => {
        setSelectedPoke(poke)
      }
      
      //delete dog function to delete a dog
      const deletePoke = (poke) => {
        fetch(url + "/poke/" + poke._id, {
          method: "delete"
        })
        .then((response) => getPoke());
      };
      
        return (
          <div className="App">
            <h1>Pokemon Daycare!</h1>
            <hr />
            <Link to="/create">
              <button>Add Poke</button>
            </Link>
            <main>
            <Switch>
                <Route exact path="/" render={(rp) => <Display {...rp} poke={poke} selectPoke={selectPoke} deletePoke={deletePoke}/>} />
                <Route
                  exact
                  path="/createpoke"
                  render={(rp) => (
                    <Form {...rp} label="create" poke={emptyPoke} handleSubmit={handleCreate} />
                  )}
                />
                <Route
                  exact
                  path="/editpoke"
                  render={(rp) => (
                    <Form {...rp} label="update" poke={selectedPoke} handleSubmit={handleUpdate} />
                  )}
                />
              </Switch>
            </main>
          </div>
        );
      }
    }
      export default App;
      
  
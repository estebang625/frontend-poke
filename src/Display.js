import React from "react";

const Display = (props) => {
  const { poke } = props;

  const loaded = () => (
    <div style={{ textAlign: "center" }}>
      {poke.map((poke) => (
        <article>
          <img src={poke.img} />
          <h1>{poke.name}</h1>
          <h3>{poke.evolved}</h3>
          <h3>{poke.owner}</h3>
          <button onClick={() => {
            props.selectPoke(poke)
            props.history.push("/edit")
          }}>Edit</button>
          <button onClick={() => {
            props.deletePoke(poke)
          }}>Delete</button>
        </article>
      ))}
    </div>
  );

  const loading = <h1>Loading...</h1>;

  return poke.length > 0 ? loaded() : <h1>loading</h1>;
};

export default Display;

import React from 'react';
import { Link } from 'react-router-dom';

function Error404() {
  return (
    <div>
      <h1>Page non trouvé</h1>
      <p>La page que vous recherchez n&apos;existe pas</p>
      <Link to="/">Retour</Link>
    </div>
  );
}

export default Error404;

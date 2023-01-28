import fetch from 'node-fetch';
export const url = 'https://plankton-app-xhkom.ondigitalocean.app/api/movies';


// Handler calls endpoint /movies by default unless /id is passed into handler as second argument.
export const apiHandler = async (url, queryId = '') => {
  
        const res = await fetch(
          !queryId ? url : `${url}/${queryId}`);
       
          const data = await res.json();
          return data;
}
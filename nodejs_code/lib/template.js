const template = {
  HTML: (title, content, list) => {
    return `<!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h3><a href="/create">create</a></h3>
            <h2>${title}</h2>
      
            <p>
            ${content}  
            </p>
          </body>
          </html>
          `;
  },
  File: (title, content, list) => {
    return `<!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        <h3><a href="/create">create</a></h3>
        <a href="/update/?id=${title}">update</a>
  
        <form action="delete_process" method="post">
           <input name="title"value="${title}" type="hidden">
     <input type="submit" value="delete">
    </form>
  
        <h2>${title}</h2>
  
        <p>
        ${content}  
        </p>
      </body>
      </html>
      `;
  },
};

module.exports = template;

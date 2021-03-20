export default function getThumbnailTemplate(coupon: string) {
  return `<!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>Thumbnail</title>
  
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet">
  
    <style>
      * {
        margin: 0; 
        padding: 0;
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: Roboto, sans-serif;
        color: #FFF;
        height: 100vh;
      }
  
      #wrapper {
        width: 1080px;
        height: 1920px;
        background: url('https://i.imgur.com/xPaEbVc.png') no-repeat center;

        position: relative;
      }
  
      h1 {
        position: absolute;

        top: 1340px;
        left: 50%;
        transform: translateX(-50%);

        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 73px;
        line-height: 86px;
        text-transform: uppercase;

        color: #FFFFFF;
      }
    </style>
  </head>
  <body>
    <div id="wrapper">
      <h1>${coupon}</h1>
    </div>
  </body>
  </html>
  `;
}

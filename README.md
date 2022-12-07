# react-holygrail
React Holy Grail - State of each column shared with the rest

## Errors

Increase counter not functioning.

```superagent.min.js:1          GET http://localhost:8080/data 404 (Not Found)```

## Design

- HTML Layout
- CSS Styles
- JS Logic
- React JS Framework

User Interface (UI). Referenced inside of index.html, index.js, styles.css.
- header.js
- footer.js
- left.js
- right.js
- article.js

## Create Files

1. Article Component ```article.js```.  Return PlusMinus Component tag inside the article tag. Pass a props of handle onto that component.  Include a div for the title, which is the name of the section. Include a Data tag, which passes in the data with props.

```
function Article(props){
    return (<>
        <article> 
            <PlusMinus section="article" handle={props.handle}/>
            <div className="section">Article:{props.data.article}</div>
            <Data data={props.data}/>
        </article>
    </>);
}
```

2. Footer Component

```
function Footer(props){
    return (<>
        <footer> 
            <PlusMinus section="footer" handle={props.handle}/>
            <div className="section">Footer:{props.data.footer}</div>
            <Data data={props.data}/> 
        </footer> 
    </>);
}
```

3. Header Component

```
function Header(props){
    return (<>
        <header>
            <PlusMinus section="header" handle={props.handle}/>
            <div className="section">Header:{props.data.header}</div>
            <Data data={props.data}/>
        </header>
    </>);
}
```

4. Left Component

```
function Left(props){
    return (<>
        <aside> 
            <PlusMinus section="left" handle={props.handle}/>
            <div className="section">Left:{props.data.left}</div>
            <Data data={props.data}/>
        </aside>
    </>);
}
```

5. Right Component

```
function Right(props){
    return (<>
        <aside>
            <PlusMinus section="right" handle={props.handle}/>
            <div className="section">Right:{props.data.right}</div>
            <Data data={props.data}/>            
        </aside>
    </>);
}
```

6. App Component

Main app component to bring in the components and styles you’ve created, along with the relevant dependencies needed for your application to run. Remember to run http-server in order to view your application in the browser on localhost:8080.

- index.html to bring in all the components, libraries, and styles.

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Holy Grail</title>

    <!-- styles -->
    <link rel="stylesheet" href="styles.css">

    <!-- superagent for  http calls -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/superagent/3.8.3/superagent.min.js"></script>    

    <!-- don't use this in production: -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>


      <span id="root"></span>


    <!-- we will put our teact component inside this div -->
    

    <!-- load react -->
    <script src="https://unpkg.com/react/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.development.js" crossorigin></script>

    <!-- load our react component. -->
    <script src="header.js" defer type="text/babel"></script>    
    <script src="left.js" defer type="text/babel"></script>
    <script src="article.js" defer type="text/babel"></script>
    <script src="right.js" defer type="text/babel"></script>
    <script src="footer.js" defer type="text/babel"></script>    
    <script src="index.js" defer type="text/babel"></script>


  </body>
</html>
```

- Create index.js.

```
function PlusMinus(props){
    function handle(e){
        if(e.target.id.includes('minus')){
            props.handle({name:props.section, value: -1});
            return;    
        }
        props.handle({name:props.section, value: 1});    
    }
    return (<>
        <img src={`icons/${props.section}_plus.png`} id="plus" onClick={((e) => handle(e))}/>
        <img src={`icons/${props.section}_minus.png`} id="minus" onClick={((e) => handle(e))}/>
    </>);
}
//===========Display the state of the data through the 'props' for each section========
function Data(props){
    return (<div>
        Header:  {props.data.header}, 
        Left:    {props.data.left}, 
        Article: {props.data.article}, 
        Right:   {props.data.right}, 
        Footer:  {props.data.footer}
    </div>);
}

function update(section, value) {
    return new Promise((resolve, reject) => {
        var url = `/update/${section}/${value}`;        
        superagent
            .get(url)
            .end(function(err, res){
                err ? reject(null) : resolve(res.body);
            });
    });
}

function read() {
    return new Promise((resolve, reject) => {
        var url = '/data';
        superagent
            .get(url)
            .end(function(err, res){
                err ? reject(null) : resolve(res.body);
            });
    });
}

function App(){

    //=======Define the data that will hold ALL of the state of ALL of the sections of the Holy Grail.==================
    const [data, setData]   = React.useState({header:0,left:0,article:0,right:0,footer:0});    

    React.useEffect(() => {
        // read db data & update UI
        const response = read()
            .then(res => {
                setData(res)
        });        
    }, []);
    //=========Where does the 'section' argument come from?=========
    function handle(section){
        // update db & local state
        const response = update(section.name, section.value)
            .then(res => {
                setData(res)
            });
    }
    //===========Reference each component and pass to each component both, the data and the handle function.========================
    return (<>
        <div className="grid">        
            <Header  handle={handle} data={data}/>
            <Left    handle={handle} data={data}/>
            <Article handle={handle} data={data}/>
            <Right   handle={handle} data={data}/>
            <Footer  handle={handle} data={data}/>
        </div>
    </>);
}
//=============Refrence the "root" element and load the App() component into the root.===========
ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
```

## Styles, grid, sections

```styles.css```

```
.grid{
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    gap: 5px;
    height: 90vh;
}
.section{
  font-size: 2em;
  font-weight: 800;
}
header, aside, article, footer{
    border-style: solid;
    font-size: 1em;
}
aside{
  background: #98FB98;    
}
article{
  background: #FFCCD6;    
}
header, footer{
  grid-column: 1 / 4;
  background: #94C9FA;    
}

body{
  font-family: Arial;
}
button{
    font-size: 1em;
}
img{
  height: 32px;
  width: 32px;
}
```

## [Redis](https://redis.io/)
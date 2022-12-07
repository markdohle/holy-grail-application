/*
1. Access the props and then 'props.handle', 'props.data', passes on the information.
2. Reference the PlusMinus component and Data component from index.js.
*/

function Article(props){
    return (<>
        <article> 
            <PlusMinus section="article" handle={props.handle}/>
            <div className="section">Article:{props.data.article}</div>
            <Data data={props.data}/>
        </article>
    </>);
}
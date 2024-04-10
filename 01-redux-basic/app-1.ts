// Acciones
 interface Action {
    type:string;
    payload?: any;
 }

 const state = 10;

 const decrementadorAction : Action ={
    type: "DECREMENTAR"
 }

 const incrementadorAction : Action = {
    type: "INCREMENTAR"
 }

 const multiplicarAction : Action = {
    type: "MULTIPLICAR",
    payload: 2
 }

 const dividirAction : Action = {
    type: "DIVIDIR",
    payload: 2
 }

 function reducer (state = 10 , action : Action) {

    switch(action.type){

        case "INCREMENTAR":
            return state += 1;

        case "DECREMENTAR":
            return state -= 1;
        
        case "MULTIPLICAR":
            return state * action.payload
                    
        case "DIVIDIR":
            return state / action.payload

        default:
            return state
    }
 
 }

console.log( reducer(state,decrementadorAction) );

console.log( reducer(state,incrementadorAction) );

console.log( reducer(state,multiplicarAction) );

console.log( reducer(state,dividirAction) );

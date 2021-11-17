export const stateToStorage = (state, newItem = []) => {
    const storage = localStorage;
    for(let key in state) {
        if(typeof state[key] === "object") {
            storage.setItem(key, JSON.stringify(state[key]));
        } else {
            storage.setItem(key, state[key]); 
        }
    }
}
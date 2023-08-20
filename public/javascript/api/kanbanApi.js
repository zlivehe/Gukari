export default class KanbanApi {
static getItems(columnId){ //finds a column by id and returns its items
    const data = read();
    const column = data.find((c) => c.id === columnId);
    if(!column) return [];
    return column.items;

}
}
function read(){
    const json = localStorage.getItem('kanban-data');
    if(!json) return [
        {
            id: 1,
            items:[]
        },
        {
            id: 2,
            items:[]
        },
        {
            id: 3,
            items:[]
        },
    ]
    return JSON.parse(json);
}

function save(data){
    localStorage.setItem('kanban-data', JSON.stringify(data));
    
}
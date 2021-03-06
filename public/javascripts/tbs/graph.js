class Graph { 
    
    constructor(noOfVertices) 
    { 
        this.noOfVertices = noOfVertices; 
        this.AdjList = new Map();
        this.isDirected = true; 
    } 
  
    addVertex(v) 
    { 
        this.AdjList.set(v, []); 
    }

    addEdge(v, w) 
    { 
        this.AdjList.get(v).push(w);
    } 
    
    print() 
    { 
        var get_keys = this.AdjList.keys(); 
    
        for (var i of get_keys)  
        { 
            var get_values = this.AdjList.get(i); 
            var conc = ""; 
    
            for (var j of get_values) 
                conc += j + " "; 
    
            console.log(i + " -> " + conc); 
        } 
    } 
  
    bfs(startingNode) 
    { 
    
        var visited = []; 
        for (var i = 0; i < this.noOfVertices; i++) 
            visited[i] = false; 
    
        var q = new Queue(); 
    
        visited[startingNode] = true; 
        q.enqueue(startingNode); 
    
        while (!q.isEmpty()) { 
            var getQueueElement = q.dequeue(); 
    
            console.log(getQueueElement); 
    
            var get_List = this.AdjList.get(getQueueElement); 
    
            for (var i in get_List) { 
                var neigh = get_List[i]; 
    
                if (!visited[neigh]) { 
                    visited[neigh] = true; 
                    q.enqueue(neigh); 
                } 
            } 
        } 
    }
    
    dfs(startingNode) 
    { 
        var visited = []; 
        for (var i = 0; i < this.noOfVertices; i++) 
            visited[i] = false; 
    
        this.exploreNodes(startingNode, visited); 
    } 

    exploreNodes(vert, visited) 
    { 
        visited[vert] = true; 
        console.log(vert); 
    
        var neighbours = this.AdjList.get(vert); 
    
        for (var i in neighbours) { 
            var neighbour = neighbours[i]; 
            if (!visited[neighbour]) 
                this.exploreNodes(neighbour, visited); 
        } 
    }
} 
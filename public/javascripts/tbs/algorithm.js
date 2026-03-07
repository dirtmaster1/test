class Algorithm {

aStarSearch(start, end)
{
    // Track nodes we've already evaluated
    var closedSet = [];
    // Track nodes we're considering
    var openSet = [];
    
    // Initialize the starting node with its heuristic distance to the goal
    start.f = this.getManhattanDistance(start.position, end.position);
    openSet.push(start);

    var current = start;

    // Continue searching until we've checked all possible paths
    while(openSet.length > 0) 
    {
        // Find the node in openSet with the lowest f-score (most promising path)
        var low = 0;
        for(var i = 0; i < openSet.length; i++)
        {
            if(openSet[i].f < openSet[low].f)
            {
                low = i;
            }
        }

        // Set current to the most promising node
        current = openSet[low]; 

        // Check if we've reached the goal
        if (current === end) {
            return this.buildPath(current);
        }

        // Move the current node from openSet (to explore) to closedSet (already explored)
        this.removeItemFromArray(openSet, current);
        closedSet.push(current);

        // Get all neighboring nodes from the current node
        var neighbors = current.neighbors;

        // Skip if this node has no neighbors
        if(!neighbors)
        {
            continue;
        }

        // Evaluate each neighbor
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];

            // Only consider neighbors that haven't been explored and are accessible
            if (!closedSet.includes(neighbor) && neighbor.is_accessible) {
                // Calculate the cost to reach this neighbor through the current node
                var tempG = current.g + this.getManhattanDistance(neighbor.position, current.position);

                // Check if this is a better path to the neighbor than previously found
                var newPath = false;
                if (openSet.includes(neighbor)) {
                    // Neighbor is already in openSet, check if we found a better path
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                } else {
                    // Neighbor hasn't been added to openSet yet
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                }

                // If we found a better path, update the neighbor's scores
                if (newPath) {
                    // h = heuristic distance from neighbor to goal
                    neighbor.h = this.getManhattanDistance(neighbor.position, end.position);
                    // f = g (cost so far) + h (estimated cost to goal)
                    neighbor.f = neighbor.g + neighbor.h;
                    // Track where we came from for path reconstruction
                    neighbor.parent = current;
                }
            }
        }   
    } 

    // No path found
    return null;
}
    

    buildPath(node)
    {
        var current = node;
        var path = [];
        while(current.parent)
        {
            path.push(current);
            current = current.parent;
        }

        return path.reverse();
    }

    removeItemFromArray(arr, value)
    {
        var index = arr.indexOf(value);
        if (index > -1) {
        arr.splice(index, 1);
        }
    }
    
    getManhattanDistance(pos0, pos1) {
        // This is the Manhattan distance
        var d1 = Math.abs (pos1.x - pos0.x);
        var d2 = Math.abs (pos1.y - pos0.y);
        return d1 + d2;
      }
}
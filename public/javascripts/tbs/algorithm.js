class Algorithm {

    aStarSearch(start, end)
    {
        var closedSet = [];
        var openSet = [];
        
        start.f = this.getManhattanDistance(start.position, end.position);
        openSet.push(start);

        var current = start;

        // Am I still searching?
        while(openSet.length > 0) 
        {
            // Best next option
            var low = 0;
            for(var i = 0; i < openSet.length; i++)
            {
                if(openSet[i].f < openSet[low].f)
                {
                    low = i;
                }
            }

            current = openSet[low]; 

            // Did I finish?
            if (current === end) {
                return this.buildPath(current);
              }

            // Best option moves from openSet to closedSet
            this.removeItemFromArray(openSet, current);
            closedSet.push(current);

            // Check all the neighbors
            var neighbors = current.neighbors;

            if(!neighbors)
            {
                continue;
            }

            for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];

            // Valid next spot?
            if (!closedSet.includes(neighbor) && neighbor.is_accessible) {
                var tempG = current.g + this.getManhattanDistance(neighbor.position, current.position);

                // Is this a better path than before?
                var newPath = false;
                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                }

                    // Yes, it's a better path
                    if (newPath) {
                        neighbor.h = this.getManhattanDistance(neighbor.position, current.position);
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.parent = current;
                    }
                }
            }   
        } 

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